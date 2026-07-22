import { Link } from "@/i18n/navigation";

/**
 * Bo loc LOAI HINH dat noi bat ngay dau trang Tac pham.
 *
 * Loai hinh (tranh gia ve / ky hoa / dieu khac / thuc hanh khac) KHONG dua vao
 * menu dieu huong -- ba coi moi la dieu huong chinh (CLAUDE.md muc 1). Dat o
 * day de nguoi xem van toi noi bang mot cu bam.
 *
 * Moi lua chon la mot Link (form GET), giu nguyen `year` va bo `page` de
 * quay ve trang dau khi doi bo loc. URL luon chia se duoc.
 */
type Props = {
  basePath: string;
  currentType: string;
  currentYear: string;
  options: { value: string; label: string }[];
  allLabel: string;
  heading?: string;
};

export function TypeFilter({
  basePath,
  currentType,
  currentYear,
  options,
  allLabel,
  heading,
}: Props) {
  const hrefFor = (type: string) => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (currentYear) params.set("year", currentYear);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const chip = (active: boolean) =>
    [
      "border px-4 py-2 text-sm transition-colors",
      active
        ? "border-accent-cobalt bg-accent-cobalt/20 text-text"
        : "border-white/15 text-text-muted hover:border-white/40 hover:text-text",
    ].join(" ");

  return (
    <div>
      {heading && (
        <h2 className="text-xs uppercase tracking-[0.24em] text-text-muted">{heading}</h2>
      )}
      <div className="mt-3 flex flex-wrap gap-3">
        <Link href={hrefFor("")} className={chip(!currentType)} aria-current={!currentType}>
          {allLabel}
        </Link>
        {options.map((opt) => (
          <Link
            key={opt.value}
            href={hrefFor(opt.value)}
            className={chip(currentType === opt.value)}
            aria-current={currentType === opt.value}
          >
            {opt.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
