/**
 * Hoa quynh -- motif phu cua nhan dien (design-system.md, muc "Motif & logo").
 * Hoa no mot lan, trong dem.
 *
 * Dung RAT TIET CHE: dau muc cho ba coi, divider giua cac phan. Khong dat
 * canh moi tieu de, khong dung lam trang tri nen.
 *
 * Thuan trang tri -> aria-hidden, khong co y nghia voi trinh doc man hinh.
 */
const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

export function Motif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.9">
        {PETAL_ANGLES.map((angle) => (
          <ellipse
            key={angle}
            cx="12"
            cy="7.6"
            rx="2.1"
            ry="4.4"
            transform={`rotate(${angle} 12 12)`}
          />
        ))}
      </g>
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Duong phan cach giua cac phan, co hoa quynh o giua. Thay cho `border-t`
 * tran -- giu nhip tinh lang nhung bot don dieu.
 */
export function MotifDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-text-muted ${className ?? ""}`}>
      <span className="h-px flex-1 bg-white/10" />
      <Motif className="h-4 w-4 opacity-50" />
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}
