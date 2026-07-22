"use client";

import { useSyncExternalStore } from "react";
import { BG_OPTIONS, BG_STORAGE_KEY } from "@/lib/theme-trial";

/**
 * Bang chon sac nen -- CHI hien tren Preview va khi chay o may.
 * Production khong bao gio render (xem app/[locale]/layout.tsx).
 *
 * GO BO sau khi chot phuong an.
 */

// Store nho: nguon su that la thuoc tinh data-bg tren <html>, khong phai
// state cua React. Dung useSyncExternalStore de tranh setState trong effect.
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const getSnapshot = () => document.documentElement.dataset.bg ?? "";
const getServerSnapshot = () => "";

function choose(id: string) {
  if (id) document.documentElement.dataset.bg = id;
  else delete document.documentElement.dataset.bg;
  try {
    if (id) localStorage.setItem(BG_STORAGE_KEY, id);
    else localStorage.removeItem(BG_STORAGE_KEY);
  } catch {
    // Che do rieng tu chan localStorage -- van doi duoc mau, chi khong nho.
  }
  emit();
}

export function BgTrialSwitcher() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const active = BG_OPTIONS.find((o) => o.id === current) ?? BG_OPTIONS[0];

  return (
    <aside
      aria-label="Thử nghiệm sắc nền"
      className="fixed bottom-4 right-4 z-[100] max-w-[min(20rem,calc(100vw-2rem))] border border-white/20 bg-bg-elevated/95 p-4 text-sm shadow-xl shadow-black/60 backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
        Thử nghiệm sắc nền
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {BG_OPTIONS.map((opt) => {
          const isActive = opt.id === current;
          return (
            <button
              key={opt.id || "default"}
              type="button"
              onClick={() => choose(opt.id)}
              aria-pressed={isActive}
              title={opt.label}
              className={[
                "flex items-center gap-2 border px-2 py-1 text-xs transition-colors",
                isActive
                  ? "border-accent-cobalt-bright text-text"
                  : "border-white/20 text-text-muted hover:border-white/40 hover:text-text",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="h-4 w-4 flex-none border border-white/30"
                style={{ backgroundColor: opt.hex }}
              />
              {opt.label.split(" · ")[0]}
            </button>
          );
        })}
      </div>

      <p className="mt-3 leading-snug text-text-muted">
        <span className="text-text">{active.label}</span> — {active.note}
      </p>
      <p className="mt-2 text-xs text-text-muted">
        Lựa chọn được nhớ khi bạn chuyển trang. Bảng này không xuất hiện trên
        website thật.
      </p>
    </aside>
  );
}
