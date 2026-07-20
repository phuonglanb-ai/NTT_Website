"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type Touch as ReactTouch,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 1;
const DOUBLE_TAP_SCALE = 2.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function touchDistance(a: ReactTouch, b: ReactTouch) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

/**
 * Anh vua khung o scale 1 (nhu truoc). Zoom vao thi phong to tai cho + cho
 * keo di chuyen de xem tung vung -- thay the pinch-zoom mac dinh cua trinh
 * duyet (chi zoom ca trang, khong dung cho desktop) bang mot trinh xem
 * chuyen dung, khong can them thu vien ngoai.
 */
export function ZoomPanImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const baseSize = useRef({ width: 0, height: 0 });
  const drag = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(
    null,
  );
  const pinch = useRef<{ startDist: number; startScale: number } | null>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  const measureBase = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    const prev = el.style.transform;
    el.style.transform = "none";
    const rect = el.getBoundingClientRect();
    baseSize.current = { width: rect.width, height: rect.height };
    el.style.transform = prev;
  }, []);

  useEffect(() => {
    measureBase();
    window.addEventListener("resize", measureBase);
    return () => window.removeEventListener("resize", measureBase);
  }, [measureBase]);

  const clampTranslate = useCallback((nextScale: number, next: { x: number; y: number }) => {
    const container = containerRef.current;
    if (!container) return next;
    const containerRect = container.getBoundingClientRect();
    const w = baseSize.current.width * nextScale;
    const h = baseSize.current.height * nextScale;
    const maxX = Math.max(0, (w - containerRect.width) / 2);
    const maxY = Math.max(0, (h - containerRect.height) / 2);
    return { x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) };
  }, []);

  const zoomTo = useCallback(
    (nextScaleRaw: number) => {
      const nextScale = clamp(nextScaleRaw, MIN_SCALE, MAX_SCALE);
      setScale(nextScale);
      setTranslate((t) =>
        nextScale === MIN_SCALE ? { x: 0, y: 0 } : clampTranslate(nextScale, t),
      );
    },
    [clampTranslate],
  );

  function handleWheel(e: ReactWheelEvent) {
    e.preventDefault();
    zoomTo(scale - e.deltaY * 0.0015 * scale);
  }

  function handleDoubleClick() {
    zoomTo(scale > MIN_SCALE ? MIN_SCALE : DOUBLE_TAP_SCALE);
  }

  function handlePointerDown(e: ReactPointerEvent) {
    if (scale <= MIN_SCALE) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsPanning(true);
    drag.current = { startX: e.clientX, startY: e.clientY, origX: translate.x, origY: translate.y };
  }

  function handlePointerMove(e: ReactPointerEvent) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    setTranslate(
      clampTranslate(scale, { x: drag.current.origX + dx, y: drag.current.origY + dy }),
    );
  }

  function endPan() {
    drag.current = null;
    setIsPanning(false);
  }

  function handleTouchStart(e: ReactTouchEvent) {
    if (e.touches.length === 2) {
      pinch.current = { startDist: touchDistance(e.touches[0], e.touches[1]), startScale: scale };
      setIsPinching(true);
    } else if (e.touches.length === 1 && scale > MIN_SCALE) {
      setIsPanning(true);
      drag.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        origX: translate.x,
        origY: translate.y,
      };
    }
  }

  function handleTouchMove(e: ReactTouchEvent) {
    if (e.touches.length === 2 && pinch.current) {
      e.preventDefault();
      const dist = touchDistance(e.touches[0], e.touches[1]);
      zoomTo((dist / pinch.current.startDist) * pinch.current.startScale);
    } else if (e.touches.length === 1 && drag.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - drag.current.startX;
      const dy = e.touches[0].clientY - drag.current.startY;
      setTranslate(
        clampTranslate(scale, { x: drag.current.origX + dx, y: drag.current.origY + dy }),
      );
    }
  }

  function handleTouchEnd(e: ReactTouchEvent) {
    if (e.touches.length < 2) {
      pinch.current = null;
      setIsPinching(false);
    }
    if (e.touches.length === 0) endPan();
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative flex max-h-[55vh] w-full touch-none select-none items-center justify-center overflow-hidden bg-bg-elevated"
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPan}
        onPointerLeave={endPan}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onLoad={measureBase}
          className="max-h-[55vh] w-auto max-w-full object-contain"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transition: isPanning || isPinching ? "none" : "transform 0.15s ease-out",
            cursor: scale > MIN_SCALE ? (isPanning ? "grabbing" : "grab") : "zoom-in",
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
        <button
          type="button"
          onClick={() => zoomTo(scale - ZOOM_STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="Thu nhỏ"
          className="border border-white/15 px-3 py-1 hover:text-text disabled:opacity-30"
        >
          −
        </button>
        <span className="w-12 text-center">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          onClick={() => zoomTo(scale + ZOOM_STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="Phóng to"
          className="border border-white/15 px-3 py-1 hover:text-text disabled:opacity-30"
        >
          +
        </button>
        {scale > MIN_SCALE && (
          <button
            type="button"
            onClick={() => zoomTo(MIN_SCALE)}
            className="border border-white/15 px-3 py-1 hover:text-text"
          >
            Đặt lại
          </button>
        )}
      </div>
    </div>
  );
}
