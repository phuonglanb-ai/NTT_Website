/**
 * Anh xa trang thai NOI BO cua tac pham sang MOT nhan hien thi cong khai.
 *
 * Database giu hai truong rieng:
 *   - ownership_status : available | collected | reserved | not_for_sale
 *   - exhibition_status: in_studio | on_display | on_loan | archived
 *
 * Cong khai chi hien mot dong duy nhat, va KHONG bao gio he lo giao dich
 * (`reserved`, `not_for_sale`) hay danh tinh nguoi mua -- theo
 * `product-brief.md` muc 4 va `security-requirements.md`.
 *
 * Thu tu uu tien co chu y: da vao suu tap thi luon hien "Thuoc bo suu tap
 * rieng", khong bao gio hien "Hien dien tai xuong".
 */
export type ArtworkStatusKey = "inCollection" | "onDisplay" | "inStudio" | "onRequest";

export function artworkStatusKey(
  ownershipStatus: string,
  exhibitionStatus: string,
): ArtworkStatusKey {
  if (ownershipStatus === "collected") return "inCollection";
  if (exhibitionStatus === "on_display" || exhibitionStatus === "on_loan") return "onDisplay";
  if (exhibitionStatus === "in_studio") return "inStudio";
  return "onRequest";
}
