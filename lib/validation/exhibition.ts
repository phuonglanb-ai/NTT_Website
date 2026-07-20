import { z } from "zod";

export const EXHIBITION_STATUSES = ["in_studio", "on_display", "on_loan", "archived"] as const;
export const CONTENT_STATUSES = ["draft", "published"] as const;

const optionalDate = z
  .string()
  .trim()
  .optional()
  .default("")
  .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Ngày không hợp lệ (YYYY-MM-DD).");

export const exhibitionInputSchema = z.object({
  titleVi: z.string().trim().min(1, "Bắt buộc nhập tiêu đề (tiếng Việt)."),
  titleEn: z.string().trim().optional().default(""),
  venue: z.string().trim().optional().default(""),
  startDate: optionalDate,
  endDate: optionalDate,
  exhibitionStatus: z.enum(EXHIBITION_STATUSES).default("in_studio"),
  descriptionVi: z.string().trim().optional().default(""),
  descriptionEn: z.string().trim().optional().default(""),
  status: z.enum(CONTENT_STATUSES).default("draft"),
});

export type ExhibitionInput = z.infer<typeof exhibitionInputSchema>;
