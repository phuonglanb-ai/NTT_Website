"use client";

import { useActionState, useState } from "react";
import type { JournalFormState } from "@/app/admin/(protected)/nhat-ky/actions";
import type { AdminJournalEntry } from "@/lib/content/journal";

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt";
const labelClass = "text-sm text-text-muted";

const SOURCE_OPTIONS = [
  { value: "news", label: "Tin tức" },
  { value: "article", label: "Bài viết" },
];

const KIND_OPTIONS = [
  { value: "journal", label: "Góc nhìn / Hậu trường" },
  { value: "criticism", label: "Phê bình & đối thoại" },
  { value: "press", label: "Báo chí viết về nghệ sĩ" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Xuất bản" },
];

export function JournalForm({
  action,
  initial,
}: {
  action: (prevState: JournalFormState, formData: FormData) => Promise<JournalFormState>;
  initial?: AdminJournalEntry;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  // Khi sua: khoa source (khong doi loai giua news/article). Khi tao: cho chon.
  const isEdit = Boolean(initial);
  const [source, setSource] = useState<string>(initial?.source ?? "article");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="source">
            Loại nội dung
          </label>
          <select
            id="source"
            name="source"
            defaultValue={source}
            disabled={isEdit}
            onChange={(e) => setSource(e.target.value)}
            className={fieldClass}
          >
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {isEdit && <input type="hidden" name="source" value={source} />}
        </div>

        {source === "article" && (
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="kind">
              Phân loại bài viết
            </label>
            <select id="kind" name="kind" defaultValue={initial?.kind ?? "journal"} className={fieldClass}>
              {KIND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
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

      {source === "article" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="author">
              Tác giả (nếu là báo chí / bài khách)
            </label>
            <input id="author" name="author" defaultValue={initial?.author ?? ""} className={fieldClass} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="sourceUrl">
              Link bài gốc (báo chí)
            </label>
            <input id="sourceUrl" name="sourceUrl" defaultValue={initial?.sourceUrl ?? ""} className={fieldClass} />
          </div>
        </div>
      )}

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
        <p className="text-xs text-text-muted">
          Nháp: chỉ Admin/Editor thấy. Xuất bản: hiện công khai.
        </p>
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
        {pending ? "Đang lưu…" : "Lưu"}
      </button>
    </form>
  );
}
