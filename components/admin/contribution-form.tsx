"use client";

import { useActionState } from "react";
import type { FriendsFormState } from "@/app/admin/(protected)/ban-be/actions";
import type { AdminContribution } from "@/lib/content/friends";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt-bright";
const labelClass = "text-sm text-text-muted";

const STATUS_OPTIONS = [
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Xuất bản" },
];

export function ContributionForm({
  action,
  people,
  initial,
}: {
  action: (prevState: FriendsFormState, formData: FormData) => Promise<FriendsFormState>;
  people: { id: string; name: string }[];
  initial?: AdminContribution;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:w-1/2">
        <label className={labelClass} htmlFor="personId">
          Người đóng góp *
        </label>
        <select
          id="personId"
          name="personId"
          required
          defaultValue={initial?.personId ?? ""}
          className={fieldClass}
        >
          <option value="" disabled>
            Chọn người
          </option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="bodyVi">
            Nội dung (VI)
          </label>
          <textarea id="bodyVi" name="bodyVi" rows={8} defaultValue={initial?.bodyVi ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="bodyEn">
            Nội dung (EN)
          </label>
          <textarea id="bodyEn" name="bodyEn" rows={8} defaultValue={initial?.bodyEn ?? ""} className={fieldClass} />
        </div>
      </div>

      <div className="flex flex-col gap-1 sm:w-1/2">
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
        <p className="text-xs text-text-muted">Nháp: chỉ Admin/Editor thấy. Xuất bản: hiện công khai.</p>
      </div>

      {state?.error && (
        <p role="alert" className="border border-accent-oxblood px-4 py-3 text-sm text-accent-oxblood">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-accent-cobalt-bright px-6 py-3 text-sm text-text transition-colors hover:bg-accent-cobalt disabled:opacity-50"
      >
        {pending ? "Đang lưu…" : "Lưu"}
      </button>
    </form>
  );
}
