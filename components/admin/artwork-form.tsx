"use client";

import { useActionState, useState } from "react";
import type { ArtworkFormState } from "@/app/admin/tac-pham/actions";
import type { ArtworkEditData, ArtworkImage } from "@/lib/content/artworks";
import type { UserRole } from "@/lib/auth/roles";

type Lookup = { id: string; slug?: string; name_vi: string };

type Props = {
  action: (prevState: ArtworkFormState, formData: FormData) => Promise<ArtworkFormState>;
  currentRole: UserRole;
  lookups: {
    collections: Lookup[];
    mediums: Lookup[];
    styles: Lookup[];
    themes: Lookup[];
  };
  initialData?: ArtworkEditData;
  existingImages?: ArtworkImage[];
};

const TYPE_OPTIONS = [
  { value: "painting", label: "Tranh" },
  { value: "sculpture", label: "Điêu khắc" },
  { value: "sketch", label: "Ký họa" },
  { value: "other", label: "Khác" },
];

const OWNERSHIP_OPTIONS = [
  { value: "available", label: "Còn" },
  { value: "collected", label: "Đã thuộc sưu tập" },
  { value: "reserved", label: "Đang giữ chỗ" },
  { value: "not_for_sale", label: "Không bán" },
];

const EXHIBITION_OPTIONS = [
  { value: "in_studio", label: "Tại xưởng vẽ" },
  { value: "on_display", label: "Đang trưng bày" },
  { value: "on_loan", label: "Đang cho mượn" },
  { value: "archived", label: "Lưu trữ" },
];

const IMAGE_RIGHTS_OPTIONS = [
  { value: "viewable", label: "Chỉ xem" },
  { value: "downloadable", label: "Cho phép tải" },
  { value: "press_only", label: "Chỉ dùng cho báo chí" },
];

const STATUS_OPTIONS = [
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Xuất bản" },
];

const fieldClass =
  "w-full border border-white/15 bg-bg-elevated px-3 py-2 text-text outline-none focus:border-accent-cobalt-bright";
const labelClass = "text-sm text-text-muted";

export function ArtworkForm({ action, currentRole, lookups, initialData, existingImages }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [detailCount, setDetailCount] = useState(0);
  const allowArtistNote = currentRole === "artist" || currentRole === "admin";
  const isEdit = Boolean(initialData);

  const selectedStyleIds = new Set(initialData?.styleIds ?? []);
  const selectedThemeIds = new Set(initialData?.themeIds ?? []);

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="code">
            Mã tác phẩm *
          </label>
          <input
            id="code"
            name="code"
            required
            placeholder="NTT-PTG-2025-001"
            defaultValue={initialData?.code}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="year">
            Năm *
          </label>
          <input
            id="year"
            name="year"
            type="number"
            required
            defaultValue={initialData?.year}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="titleVi">
            Tiêu đề (Tiếng Việt) *
          </label>
          <input id="titleVi" name="titleVi" required defaultValue={initialData?.titleVi} className={fieldClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="titleEn">
            Tiêu đề (English)
          </label>
          <input id="titleEn" name="titleEn" defaultValue={initialData?.titleEn} className={fieldClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="type">
            Loại hình *
          </label>
          <select id="type" name="type" required defaultValue={initialData?.type ?? ""} className={fieldClass}>
            <option value="" disabled>
              Chọn loại hình
            </option>
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="collectionId">
            Cõi *
          </label>
          <select
            id="collectionId"
            name="collectionId"
            required
            defaultValue={initialData?.collectionId ?? ""}
            className={fieldClass}
          >
            <option value="" disabled>
              Chọn cõi
            </option>
            {lookups.collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_vi}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="mediumId">
            Chất liệu
          </label>
          <select
            id="mediumId"
            name="mediumId"
            defaultValue={initialData?.mediumId ?? ""}
            className={fieldClass}
          >
            <option value="">Chưa xác định</option>
            {lookups.mediums.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name_vi}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="dimensions">
            Kích thước
          </label>
          <input
            id="dimensions"
            name="dimensions"
            placeholder="80 × 100 cm"
            defaultValue={initialData?.dimensions ?? ""}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="dominantColors">
            Màu chủ đạo (phân cách bằng dấu phẩy)
          </label>
          <input
            id="dominantColors"
            name="dominantColors"
            defaultValue={initialData?.dominantColors?.join(", ") ?? ""}
            className={fieldClass}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 font-serif text-lg">Mô tả 3 tầng</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="descObjectiveVi">
              Mô tả khách quan (VI)
            </label>
            <textarea
              id="descObjectiveVi"
              name="descObjectiveVi"
              rows={3}
              defaultValue={initialData?.descObjectiveVi ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="descObjectiveEn">
              Mô tả khách quan (EN)
            </label>
            <textarea
              id="descObjectiveEn"
              name="descObjectiveEn"
              rows={3}
              defaultValue={initialData?.descObjectiveEn ?? ""}
              className={fieldClass}
            />
          </div>
        </div>

        {allowArtistNote ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor="artistNoteVi">
                Ghi chú của nghệ sĩ (VI)
              </label>
              <textarea
                id="artistNoteVi"
                name="artistNoteVi"
                rows={3}
                defaultValue={initialData?.artistNoteVi ?? ""}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor="artistNoteEn">
                Ghi chú của nghệ sĩ (EN)
              </label>
              <textarea
                id="artistNoteEn"
                name="artistNoteEn"
                rows={3}
                defaultValue={initialData?.artistNoteEn ?? ""}
                className={fieldClass}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted">
            Ghi chú của nghệ sĩ chỉ Artist/Admin được chỉnh sửa.
            {initialData?.artistNoteVi ? ` Hiện tại: "${initialData.artistNoteVi}"` : ""}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="criticNoteVi">
              Ghi chú phê bình (VI)
            </label>
            <textarea
              id="criticNoteVi"
              name="criticNoteVi"
              rows={3}
              defaultValue={initialData?.criticNoteVi ?? ""}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="criticNoteEn">
              Ghi chú phê bình (EN)
            </label>
            <textarea
              id="criticNoteEn"
              name="criticNoteEn"
              rows={3}
              defaultValue={initialData?.criticNoteEn ?? ""}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:w-1/2">
          <label className={labelClass} htmlFor="criticNoteAuthor">
            Tác giả ghi chú phê bình
          </label>
          <input
            id="criticNoteAuthor"
            name="criticNoteAuthor"
            defaultValue={initialData?.criticNoteAuthor ?? ""}
            className={fieldClass}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 font-serif text-lg sm:col-span-2">Bối cảnh</legend>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="contextVi">
            Bối cảnh (VI)
          </label>
          <textarea id="contextVi" name="contextVi" rows={2} defaultValue={initialData?.contextVi ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="contextEn">
            Bối cảnh (EN)
          </label>
          <textarea id="contextEn" name="contextEn" rows={2} defaultValue={initialData?.contextEn ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="artistQuoteVi">
            Trích lời nghệ sĩ (VI)
          </label>
          <textarea
            id="artistQuoteVi"
            name="artistQuoteVi"
            rows={2}
            defaultValue={initialData?.artistQuoteVi ?? ""}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="artistQuoteEn">
            Trích lời nghệ sĩ (EN)
          </label>
          <textarea
            id="artistQuoteEn"
            name="artistQuoteEn"
            rows={2}
            defaultValue={initialData?.artistQuoteEn ?? ""}
            className={fieldClass}
          />
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 font-serif text-lg sm:col-span-2">Trường phái / chủ đề (bộ lọc phụ)</legend>
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Trường phái</span>
          {lookups.styles.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="styleIds"
                value={s.id}
                defaultChecked={selectedStyleIds.has(s.id)}
              />
              {s.name_vi}
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Chủ đề</span>
          {lookups.themes.map((t) => (
            <label key={t.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="themeIds"
                value={t.id}
                defaultChecked={selectedThemeIds.has(t.id)}
              />
              {t.name_vi}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 font-serif text-lg sm:col-span-2">Trạng thái</legend>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="status">
            Xuất bản
          </label>
          <select id="status" name="status" defaultValue={initialData?.status ?? "draft"} className={fieldClass}>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-text-muted">
            Nháp: chỉ Admin/Editor thấy. Xuất bản: hiện công khai trên trang
            danh mục tác phẩm.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="ownershipStatus">
            Trạng thái sở hữu
          </label>
          <select
            id="ownershipStatus"
            name="ownershipStatus"
            defaultValue={initialData?.ownershipStatus ?? "available"}
            className={fieldClass}
          >
            {OWNERSHIP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="exhibitionStatus">
            Trạng thái triển lãm
          </label>
          <select
            id="exhibitionStatus"
            name="exhibitionStatus"
            defaultValue={initialData?.exhibitionStatus ?? "in_studio"}
            className={fieldClass}
          >
            {EXHIBITION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass} htmlFor="imageRights">
            Quyền hình ảnh
          </label>
          <select
            id="imageRights"
            name="imageRights"
            defaultValue={initialData?.imageRights ?? "viewable"}
            className={fieldClass}
          >
            {IMAGE_RIGHTS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass} htmlFor="keywords">
            Từ khóa (phân cách bằng dấu phẩy)
          </label>
          <input id="keywords" name="keywords" defaultValue={initialData?.keywords?.join(", ") ?? ""} className={fieldClass} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className={labelClass} htmlFor="videoUrl">
            Video (URL, không bắt buộc)
          </label>
          <input id="videoUrl" name="videoUrl" defaultValue={initialData?.videoUrl ?? ""} className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="mb-2 font-serif text-lg">Hình ảnh</legend>

        {existingImages && existingImages.length > 0 && (
          <div>
            <p className={labelClass}>Ảnh hiện có</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {existingImages.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img.id}
                  src={img.webUrl}
                  alt={img.altTextVi}
                  className="h-24 w-24 border border-white/10 object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="primaryImage">
              Ảnh chính {isEdit ? "(chỉ chọn nếu muốn thay)" : "*"}
            </label>
            <input id="primaryImage" name="primaryImage" type="file" accept="image/*" required={!isEdit} />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="primaryAltVi">
              Alt text ảnh chính (VI) {isEdit ? "" : "*"}
            </label>
            <input
              id="primaryAltVi"
              name="primaryAltVi"
              required={!isEdit}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="primaryAltEn">
              Alt text ảnh chính (EN) {isEdit ? "" : "*"}
            </label>
            <input
              id="primaryAltEn"
              name="primaryAltEn"
              required={!isEdit}
              className={fieldClass}
            />
          </div>
        </div>

        {Array.from({ length: detailCount }).map((_, index) => (
          <div key={index} className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor={`detailImage_${index}`}>
                Ảnh chi tiết #{index + 1}
              </label>
              <input id={`detailImage_${index}`} name={`detailImage_${index}`} type="file" accept="image/*" />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor={`detailAltVi_${index}`}>
                Alt text (VI)
              </label>
              <input id={`detailAltVi_${index}`} name={`detailAltVi_${index}`} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor={`detailAltEn_${index}`}>
                Alt text (EN)
              </label>
              <input id={`detailAltEn_${index}`} name={`detailAltEn_${index}`} className={fieldClass} />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setDetailCount((n) => n + 1)}
          className="w-fit border border-white/15 px-4 py-2 text-sm text-text-muted hover:text-text"
        >
          + Thêm ảnh chi tiết
        </button>
      </fieldset>

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
        {pending ? "Đang lưu…" : "Lưu tác phẩm"}
      </button>
    </form>
  );
}
