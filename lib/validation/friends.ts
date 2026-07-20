import { z } from "zod";

export const CONTENT_STATUSES = ["draft", "published"] as const;

export const personInputSchema = z.object({
  name: z.string().trim().min(1, "Bắt buộc nhập tên."),
  roleNoteVi: z.string().trim().optional().default(""),
  roleNoteEn: z.string().trim().optional().default(""),
  bioVi: z.string().trim().optional().default(""),
  bioEn: z.string().trim().optional().default(""),
  status: z.enum(CONTENT_STATUSES).default("draft"),
});

export type PersonInput = z.infer<typeof personInputSchema>;

export const contributionInputSchema = z.object({
  personId: z.string().trim().min(1, "Bắt buộc chọn người."),
  titleVi: z.string().trim().min(1, "Bắt buộc nhập tiêu đề (tiếng Việt)."),
  titleEn: z.string().trim().optional().default(""),
  bodyVi: z.string().trim().optional().default(""),
  bodyEn: z.string().trim().optional().default(""),
  status: z.enum(CONTENT_STATUSES).default("draft"),
});

export type ContributionInput = z.infer<typeof contributionInputSchema>;
