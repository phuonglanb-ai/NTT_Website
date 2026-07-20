import { z } from "zod";

// 3 tien to da co trong content-model.md (PTG = tranh, SCL = dieu khac,
// SKT = ky hoa); "other" chua co quy uoc rieng nen van chap nhan mau chung.
export const ARTWORK_CODE_PATTERN = /^NTT-[A-Z]{3}-\d{4}-\d{3}$/;

export const ARTWORK_TYPES = ["painting", "sculpture", "sketch", "other"] as const;
export const OWNERSHIP_STATUSES = ["available", "collected", "reserved", "not_for_sale"] as const;
export const EXHIBITION_STATUSES = ["in_studio", "on_display", "on_loan", "archived"] as const;
export const IMAGE_RIGHTS = ["viewable", "downloadable", "press_only"] as const;
export const CONTENT_STATUSES = ["draft", "published"] as const;

export const artworkInputSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Bắt buộc nhập mã tác phẩm.")
    .regex(ARTWORK_CODE_PATTERN, "Mã phải theo mẫu NTT-XXX-YYYY-000, vd NTT-PTG-2025-001."),
  titleVi: z.string().trim().min(1, "Bắt buộc nhập tiêu đề (tiếng Việt)."),
  titleEn: z.string().trim().optional().default(""),
  year: z.coerce
    .number()
    .int("Năm phải là số nguyên.")
    .min(1900, "Năm không hợp lệ.")
    .max(2100, "Năm không hợp lệ."),
  type: z.enum(ARTWORK_TYPES, { message: "Bắt buộc chọn loại hình." }),
  collectionId: z.string().trim().min(1, "Bắt buộc chọn cõi."),
  mediumId: z.string().trim().optional().default(""),
  seriesId: z.string().trim().optional().default(""),
  dimensions: z.string().trim().optional().default(""),
  dominantColors: z.array(z.string()).optional().default([]),
  descObjectiveVi: z.string().trim().optional().default(""),
  descObjectiveEn: z.string().trim().optional().default(""),
  artistNoteVi: z.string().trim().optional().default(""),
  artistNoteEn: z.string().trim().optional().default(""),
  criticNoteVi: z.string().trim().optional().default(""),
  criticNoteEn: z.string().trim().optional().default(""),
  criticNoteAuthor: z.string().trim().optional().default(""),
  contextVi: z.string().trim().optional().default(""),
  contextEn: z.string().trim().optional().default(""),
  artistQuoteVi: z.string().trim().optional().default(""),
  artistQuoteEn: z.string().trim().optional().default(""),
  videoUrl: z.string().trim().optional().default(""),
  ownershipStatus: z.enum(OWNERSHIP_STATUSES).default("available"),
  exhibitionStatus: z.enum(EXHIBITION_STATUSES).default("in_studio"),
  status: z.enum(CONTENT_STATUSES).default("draft"),
  imageRights: z.enum(IMAGE_RIGHTS).default("viewable"),
  keywords: z.array(z.string()).optional().default([]),
  styleIds: z.array(z.string()).optional().default([]),
  themeIds: z.array(z.string()).optional().default([]),
});

export type ArtworkInput = z.infer<typeof artworkInputSchema>;

export const imageAltTextSchema = z.object({
  altTextVi: z.string().trim().min(1, "Bắt buộc nhập alt text (tiếng Việt) cho mỗi ảnh."),
  altTextEn: z.string().trim().min(1, "Bắt buộc nhập alt text (tiếng Anh) cho mỗi ảnh."),
});
