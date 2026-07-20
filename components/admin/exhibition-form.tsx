"use client";

import { useActionState } from "react";
import type { ExhibitionFormState } from "@/app/admin/(protected)/trien-lam/actions";
import type { AdminExhibition } from "@/lib/content/exhibitions";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt";
const labelClass = "text-sm text-text-muted";

const EXHIBITION_STATUS_OPTIONS = [
  { value: "in_studio", label: "Tại xưởng vẽ" },
  { value: "on_display", label: "Đang trưng bày" },
  { value: "on_loan", label: "Đang cho mượn" },
  { value: "archived", label: "Lưu trữ" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Xuất bản" },
];

export function ExhibitionForm({
  action,
  initial,
}: {
  action: (prevState: ExhibitionFormState, formData: FormData) => Promise<ExhibitionFormState>;
  initial?: AdminExhibition;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="titleVi">
            Tiêu đề (VI) *
          </label>
          <input id="titleVi" name="titleVi" required defaultValue={initial?.titleVi} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="titleEn">
            Tiêu đề (EN)
          </label>
          <input id="titleEn" name="titleEn" defaultValue={initial?.titleEn} className={fieldClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="venue">
          Địa điểm
        </label>
        <input id="venue" name="venue" defaultValue={initial?.venue ?? ""} className={fieldClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="startDate">
            Ngày bắt đầu
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={initial?.startDate ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="endDate">
            Ngày kết thúc
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={initial?.endDate ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="descriptionVi">
            Mô tả (VI)
          </label>
          <textarea
            id="descriptionVi"
            name="descriptionVi"
            rows={4}
            defaultValue={initial?.descriptionVi ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="descriptionEn">
            Mô tả (EN)
          </label>
          <textarea
            id="descriptionEn"
            name="descriptionEn"
            rows={4}
            defaultValue={initial?.descriptionEn ?? ""}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="exhibitionStatus">
            Tình trạng triển lãm
          </label>
          <select
            id="exhibitionStatus"
            name="exhibitionStatus"
            defaultValue={initial?.exhibitionStatus ?? "in_studio"}
            className={fieldClass}
          >
            {EXHIBITION_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="status">
            Xuất bản
          </label>
          <select id="status" name="status" defaultValue={initial?.status ?? "draft"} className={fieldClass}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-text-muted">
            Nháp: chỉ Admin/Editor thấy. Xuất bản: hiện công khai.
          </p>
        </div>
      </div>

      {state?.error && (
        <p role="alert" className="border border-accent-oxblood px-4 py-3 text-sm text-accent-oxblood">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-accent-cobalt px-6 py-3 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
      >
        {pending ? "Đang lưu…" : "Lưu triển lãm"}
      </button>
    </form>
  );
}
