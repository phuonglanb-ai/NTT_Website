import { NextResponse } from "next/server";

/**
 * TAM THOI - chi de chan doan cau hinh bien moi truong tren Vercel.
 * CHI tra ve co/khong + do dai + vai ky tu dau-cuoi, KHONG BAO GIO tra ve
 * gia tri khoa. Xoa file nay ngay sau khi chan doan xong.
 */
export const dynamic = "force-dynamic";

function describe(name: string) {
  const v = process.env[name];
  if (!v) return { set: false };
  return {
    set: true,
    length: v.length,
    starts: v.slice(0, 12),
    ends: v.slice(-10),
    hasWhitespace: /\s/.test(v),
  };
}

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: describe("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: describe("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: describe("SUPABASE_SERVICE_ROLE_KEY"),
    NEXT_PUBLIC_SITE_URL: describe("NEXT_PUBLIC_SITE_URL"),
  });
}
