// Server Component thuan -- dung <form method="GET"> de loc, khong can
// JavaScript phia client (submit vao chinh URL hien tai, giu nguyen prefix
// locale vi day la form tren trang da render theo locale).
type Props = {
  currentType: string;
  currentYear: string;
  typeOptions: { value: string; label: string }[];
  labels: {
    typeLabel: string;
    yearLabel: string;
    allTypes: string;
    submit: string;
  };
};

export function FilterBar({ currentType, currentYear, typeOptions, labels }: Props) {
  return (
    <form method="GET" className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-xs uppercase tracking-wide text-text-muted">
          {labels.typeLabel}
        </label>
        <select
          id="type"
          name="type"
          defaultValue={currentType}
          className="border border-white/15 bg-bg-elevated px-3 py-2 text-sm text-text"
        >
          <option value="">{labels.allTypes}</option>
          {typeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

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
    </form>
  );
}
