/**
 * URL goc cua site, dung cho sitemap/robots/OG. Dat NEXT_PUBLIC_SITE_URL khi
 * deploy (vd https://nguyentuanthinh.com); fallback localhost khi dev.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Lien he truc tiep cua nghe si, cong khai theo phe duyet cua chu du an
 * (22/07/2026). Email tach lam hai phan de KHONG bao gio xuat hien nguyen ven
 * trong HTML tra ve tu may chu -- xem `components/ui/obfuscated-email.tsx`.
 * Day chi la bien phap chong thu thap tu dong MUC CO BAN, khong phai bao mat.
 */
export const CONTACT = {
  phone: "0914 270 462",
  emailUser: "thinhleparia",
  emailDomain: "gmail.com",
} as const;
