import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Endpoint CHAN DOAN TAM THOI -- dung de tim nguyen nhan loi 500 tren ban
 * Preview (thang 07/2026). GO BO sau khi xu ly xong.
 *
 * An toan:
 *  - TU CHOI chay tren Production (tra 404), nen khong bao gio lo gi ra ngoai
 *    moi truong that.
 *  - KHONG BAO GIO in ra gia tri bien moi truong. Chi bao: co/khong, do dai,
 *    va vai ky tu dau/cuoi de doi chieu -- du de biet khoa co bi cat cut hay
 *    bi trinh soan thao doi "--" thanh "—" hay khong.
 */
export const dynamic = "force-dynamic";

const VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
] as const;

function looksLikeJwt(value: string) {
  const parts = value.split(".");
  return parts.length === 3 && parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p));
}

function describe(name: string) {
  const raw = process.env[name];
  if (!raw) return { set: false };
  const value = raw.trim();
  return {
    set: true,
    length: value.length,
    hasWhitespace: raw !== value,
    // Bat loi dau gach dai "—" (em dash) lot vao thay cho "--"
    hasEmDash: /[—–]/.test(value),
    looksLikeJwt: value.startsWith("ey") ? looksLikeJwt(value) : undefined,
    starts: value.slice(0, 8),
    ends: value.slice(-6),
  };
}

export async function GET() {
  if (process.env.VERCEL_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const env = Object.fromEntries(VARS.map((name) => [name, describe(name)]));

  // Thu mot truy van that -- day moi la thu cho biet loi cu the.
  let query: { ok: boolean; error?: string; rows?: number };
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("collections").select("slug");
    query = error
      ? { ok: false, error: `${error.code ?? ""} ${error.message}`.trim() }
      : { ok: true, rows: data?.length ?? 0 };
  } catch (err) {
    query = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  return NextResponse.json(
    { vercelEnv: process.env.VERCEL_ENV ?? null, env, query },
    { headers: { "Cache-Control": "no-store" } },
  );
}
