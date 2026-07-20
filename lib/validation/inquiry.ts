import { z } from "zod";

export const inquiryInputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
});

export type InquiryInput = z.infer<typeof inquiryInputSchema>;
