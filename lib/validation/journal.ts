import { z } from "zod";

export const JOURNAL_SOURCES = ["news", "article"] as const;
export const ARTICLE_KINDS = ["journal", "criticism", "press"] as const;
export const CONTENT_STATUSES = ["draft", "published"] as const;

export const journalInputSchema = z.object({
  source: z.enum(JOURNAL_SOURCES),
  // Chi dung khi source = article. Bo qua neu la news.
  kind: z.enum(ARTICLE_KINDS).default("journal"),
  titleVi: z.string().trim().min(1, "Bắt buộc nhập tiêu đề (tiếng Việt)."),
  titleEn: z.string().trim().optional().default(""),
  bodyVi: z.string().trim().optional().default(""),
  bodyEn: z.string().trim().optional().default(""),
  author: z.string().trim().optional().default(""),
  sourceUrl: z.string().trim().optional().default(""),
  status: z.enum(CONTENT_STATUSES).default("draft"),
});

export type JournalInput = z.infer<typeof journalInputSchema>;
