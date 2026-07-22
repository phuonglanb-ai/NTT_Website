import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV === "development";

/**
 * Domain Supabase cho anh tac pham (storage) va goi API.
 *
 * CO Y dung wildcard `https://*.supabase.co` thay vi doc
 * NEXT_PUBLIC_SUPABASE_URL: `headers()` duoc Next.js tinh o luc BUILD, nen
 * neu bien moi truong chua san sang khi build (vd lan deploy dau tren Vercel)
 * thi CSP se im lang thieu domain -> trinh duyet chan het anh tac pham, rat
 * kho doan ra. Wildcard chi noi long trong pham vi *.supabase.co nen van an
 * toan, doi lai khong bao gio vo am tham.
 */
const SUPABASE_HOST = "https://*.supabase.co";

/**
 * Cloudflare Turnstile (chong tin nhan rac o form Lien he).
 *
 * Luon co mat trong CSP, KE CA khi chua dang ky Turnstile -- cung ly do voi
 * SUPABASE_HOST o tren: `headers()` tinh o luc BUILD, neu phu thuoc bien moi
 * truong thi CSP se im lang thieu domain va o kiem tra khong hien ra, rat kho
 * doan. Cho phep san mot domain co dinh cua Cloudflare khong lam yeu CSP.
 */
const TURNSTILE_HOST = "https://challenges.cloudflare.com";

/**
 * CSP thuc dung: khong dung nonce (can wiring qua middleware, phuc tap hon
 * muc can cho MVP) nhung van chan cac vector chinh -- khong cho script/frame
 * tu domain la, khong cho nhung site khac iframe minh.
 * 'unsafe-eval' chi bat o dev (Next/Turbopack can cho HMR).
 */
const csp = [
  "default-src 'self'",
  `img-src 'self' data: blob: ${SUPABASE_HOST}`,
  `connect-src 'self' ${SUPABASE_HOST} ${TURNSTILE_HOST}${isDev ? " ws: wss:" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE_HOST}${isDev ? " 'unsafe-eval'" : ""}`,
  "font-src 'self' data:",
  // Turnstile ve o kiem tra trong mot iframe -> phai cho phep, neu khong o se trang.
  `frame-src 'self' ${TURNSTILE_HOST}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
