import { z } from "zod";

export const artistInputSchema = z.object({
  name: z.string().trim().min(1, "Bắt buộc nhập tên nghệ sĩ."),
  bioVi: z.string().trim().optional().default(""),
  bioEn: z.string().trim().optional().default(""),
  statementVi: z.string().trim().optional().default(""),
  statementEn: z.string().trim().optional().default(""),
  journeyVi: z.string().trim().optional().default(""),
  journeyEn: z.string().trim().optional().default(""),
});

export type ArtistInput = z.infer<typeof artistInputSchema>;
