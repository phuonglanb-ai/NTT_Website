/**
 * URL goc cua site, dung cho sitemap/robots/OG. Dat NEXT_PUBLIC_SITE_URL khi
 * deploy (vd https://nguyentuanthinh.com); fallback localhost khi dev.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
