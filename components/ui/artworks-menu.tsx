"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

type Props = {
  label: string;
  allLabel: string;
  menuLabel: string;
  items: { href: string; label: string }[];
};

/**
 * Menu "Tac pham".
 *
 * Truoc day menu chi dung CSS (`group-hover` + `group-focus-within`). Hai loi:
 *  - Tren DIEN THOAI khong co con tro chuot: cham vao la menu mo, roi dieu
 *    huong sang trang moi -- menu VAN MO va de len tieu de trang.
 *  - Tren LAPTOP: bam vao mot muc thi tieu diem (focus) van nam trong menu,
 *    `group-focus-within` giu menu mo, che mat noi dung trang vua mo.
 *
 * Nay quan ly bang trang thai: mo khi ro chuot hoac dung ban phim, va DONG
 * ngay khi duong dan doi, khi bam ra ngoai, hoac khi bam Esc.
 */
export function ArtworksMenu({ label, allLabel, menuLabel, items }: Props) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*
   * Thay vi luu `open` roi dung effect de dong khi doi trang, ta luu DUONG DAN
   * ma menu duoc mo tren do. Menu chi mo khi duong dan hien tai trung voi
   * duong dan da mo -> vua chuyen trang la tu dong dong, khong can effect.
   * Day chinh la thu sua loi menu de len tieu de trang vua mo.
   */
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const setOpen = (next: boolean) => setOpenOnPath(next ? pathname : null);

  useEffect(() => {
    if (!open) return;

    // Goi thang setOpenOnPath (ham setter cua useState, luon on dinh) thay vi
    // setOpen -- de effect khong phu thuoc vao mot ham tao lai moi lan render.
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpenOnPath(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOnPath(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    /*
     * CHI mo bang bam, khong mo bang di chuot.
     * Truoc day dung onMouseEnter/onMouseLeave: tren dien thoai, cham vao nut
     * sinh ra ca su kien chuot gia lap -- `mouseleave` ban ngay sau do va dong
     * menu truoc khi nguoi dung kip nhin. Bam thi hoat dong giong het nhau tren
     * chuot, cam ung va ban phim.
     */
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-1">
        <Link href="/tac-pham" className="transition-colors hover:text-text">
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={menuLabel}
          onClick={() => setOpen(!open)}
          className="px-1 leading-none text-text-muted transition-colors hover:text-text"
        >
          <span aria-hidden="true" className="text-[0.65rem]">
            ▾
          </span>
        </button>
      </div>

      {open && (
        <div
          aria-label={menuLabel}
          className="absolute left-0 top-full z-50 mt-3 min-w-[240px] border border-white/10 bg-bg-elevated py-2 shadow-lg shadow-black/40"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-text-muted hover:text-text"
            >
              {item.label}
            </Link>
          ))}
          <span className="my-2 block border-t border-white/10" aria-hidden="true" />
          <Link
            href="/tac-pham"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-text-muted hover:text-text"
          >
            {allLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
