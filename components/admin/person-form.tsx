"use client";

import { useActionState } from "react";
import type { FriendsFormState } from "@/app/admin/(protected)/ban-be/actions";
import type { AdminPerson } from "@/lib/content/friends";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt-bright";
const labelClass = "text-sm text-text-muted";

const STATUS_OPTIONS = [
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Xuất bản" },
];

export function PersonForm({
  action,
  initial,
}: {
  action: (prevState: FriendsFormState, formData: FormData) => Promise<FriendsFormState>;
  initial?: AdminPerson;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label className={labelClass} htmlFor="name">
          Tên *
        </label>
        <input id="name" name="name" required defaultValue={initial?.name} className={fieldClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="roleNoteVi">
            Vai trò / ghi chú (VI)
          </label>
          <input id="roleNoteVi" name="roleNoteVi" defaultValue={initial?.roleNoteVi ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="roleNoteEn">
            Vai trò / ghi chú (EN)
          </label>
          <input id="roleNoteEn" name="roleNoteEn" defaultValue={initial?.roleNoteEn ?? ""} className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="bioVi">
            Giới thiệu (VI)
          </label>
          <textarea id="bioVi" name="bioVi" rows={4} defaultValue={initial?.bioVi ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="bioEn">
            Giới thiệu (EN)
          </label>
          <textarea id="bioEn" name="bioEn" rows={4} defaultValue={initial?.bioEn ?? ""} className={fieldClass} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {initial?.avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={initial.avatarUrl} alt="Ảnh hiện tại" className="h-24 w-24 border border-white/10 object-cover" />
        )}
        <label className={labelClass} htmlFor="avatar">
          Ảnh đại diện (chọn để thay, không bắt buộc)
        </label>
        <input id="avatar" name="avatar" type="file" accept="image/*" />
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
