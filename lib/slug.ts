/**
 * Sinh slug tu tieu de: bo dau tieng Viet, kebab-case. Dung cho news/articles/
 * exhibitions khi Admin khong tu nhap slug.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // bo dau ket hop
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
