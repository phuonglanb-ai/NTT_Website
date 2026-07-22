import { Link } from "@/i18n/navigation";

// Server Component thuan -- dung <form method="GET"> de loc theo nam, khong can
// JavaScript phia client. Loai hinh da co bo loc rieng noi bat (`TypeFilter`),
// nen o day chi giu `type` bang input an de khong mat lua chon dang co.
type Props = {
  basePath: string;
  currentType: string;
  currentYear: string;
  labels: {
    yearLabel: string;
    submit: string;
    clear: string;
  };
};

export function FilterBar({ basePath, currentType, currentYear, labels }: Props) {
  const hasFilter = Boolean(currentType || currentYear);

  return (
    <form method="GET" className="flex flex-wrap items-end gap-4">
      {currentType && <input type="hidden" name="type" value={currentType} />}

      <div className="flex flex-col gap-1">
        <label htmlFor="year" className="text-xs uppercase tracking-wide text-text-muted">
          {labels.yearLabel}
        </label>
        <input
          id="year"
          name="year"
          type="number"
          defaultValue={currentYear}
          className="w-28 border border-white/15 bg-bg-elevated px-3 py-2 text-sm text-text"
        />
      </div>

      <button
        type="submit"
        className="border border-white/15 px-4 py-2 text-sm text-text-muted hover:text-text"
      >
        {labels.submit}
      </button>

      {hasFilter && (
        <Link href={basePath} className="py-2 text-sm text-text-muted underline hover:text-text">
          {labels.clear}
        </Link>
      )}
    </form>
  );
}
