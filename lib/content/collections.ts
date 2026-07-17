/**
 * Ba cõi (collections) — điều hướng chính theo docs/content-model.md.
 * Đây là danh sách tĩnh cho khung scaffold; sẽ được thay bằng bảng `collections`
 * trong Postgres khi lớp dữ liệu Supabase được nối (Slice 1).
 */
export const COLLECTION_SLUGS = ["nang", "doi", "hon-mang"] as const;

export type CollectionSlug = (typeof COLLECTION_SLUGS)[number];

export function isCollectionSlug(value: string): value is CollectionSlug {
  return (COLLECTION_SLUGS as readonly string[]).includes(value);
}
