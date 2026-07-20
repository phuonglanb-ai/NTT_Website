"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { inquiryInputSchema } from "@/lib/validation/inquiry";

export type InquiryState = { error?: string; ok?: boolean } | undefined;

// Rate limit toi gian trong bo nho (theo IP). Du cho MVP 1 instance; khi len
// nhieu instance/serverless se can KV/Redis -- ghi chu de nang cap sau.
const lastSubmit = new Map<string, number>();
const MIN_INTERVAL_MS = 60_000;

async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // chua cau hinh -> bo qua (dev)
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: truong an "company" -- bot dien vao thi loai im lang.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { ok: true };
  }

  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null;

  const now = Date.now();
  if (ip) {
    const prev = lastSubmit.get(ip);
    if (prev && now - prev < MIN_INTERVAL_MS) {
      return { error: "rateLimited" };
    }
  }

  const parsed = inquiryInputSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  });
  if (!parsed.success) {
    return { error: "required" };
  }

  const captchaOk = await verifyTurnstile(
    (formData.get("cf-turnstile-response") as string) || null,
    ip,
  );
  if (!captchaOk) {
    return { error: "error" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (error) {
    return { error: "error" };
  }

  if (ip) lastSubmit.set(ip, now);
  return { ok: true };
}
