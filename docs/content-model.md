# Content Model — Website Nguyễn Tuấn Thịnh

## Nguyên tắc

- **Mô hình dữ liệu TRƯỚC giao diện.** Nếu không, website sớm thành tập trang rời rạc.
- **Đa taxonomy:** một tác phẩm KHÔNG bị ép vào một "trường phái" duy nhất.
- **Phân tầng phân loại:** `collections` = ba cõi cảm xúc (**điều hướng chính**) ≠ `styles`/`mediums`/`themes` = **bộ lọc học thuật (phụ)**.
  → Đây là điểm khác biệt so với cấu trúc bảo tàng thông thường: giữ *cõi* làm mặt tiền, đẩy nhãn hàn lâm xuống làm filter.

## Ba cõi (`collections`) — điều hướng chính

| slug | Tên | Ghi chú |
|---|---|---|
| `nang` | Thế giới của Nàng | nude, tính nữ; **lõi thương hiệu**; tĩnh lặng, **không bình luận** |
| `doi` | Rung cảm Đời sống | đời sống, phong cảnh, chân dung |
| `hon-mang` | Hỗn mang & Trật tự | trừu tượng, thử nghiệm, bóp dáng |

Một tác phẩm thuộc **đúng 1 cõi** (để điều hướng sạch) nhưng gắn **nhiều** `styles`/`themes` tùy ý.

## Mã định danh (giữ nguyên hệ đã có)

- Tranh: `NTT-PTG-YYYY-XXX`
- Điêu khắc: `NTT-SCL-YYYY-XXX`
- Ký họa: `NTT-SKT-YYYY-XXX`  *(đề xuất mới, cho nhất quán)*

## Thực thể `artworks` — các trường

| Nhóm | Trường | Ghi chú |
|---|---|---|
| Định danh | `code`, `title_vi`, `title_en`, `year`, `type` | type: painting / sculpture / sketch / other |
| Phân loại | `collection`, `styles[]`, `series`, `themes[]` | collection = 1 cõi; còn lại đa trị |
| Vật lý | `medium`, `dimensions`, `dominant_colors[]` | dominant_colors phục vụ cả filter lẫn sắc thái UI |
| **Mô tả 3 tầng (ghi rõ tác giả)** | `desc_objective` | dữ kiện khách quan |
| | `artist_note` (+ `author` = Artist) | **chỉ nghệ sĩ** — không AI, không biên tập viên |
| | `critic_note` (+ `critic_author`) | ghi tên người viết; **AI không được giả làm lời nghệ sĩ** |
| Bối cảnh | `context`, `artist_quote` | |
| Hình ảnh | `primary_image`, `detail_images[]`, `video` | detail_images cho chế độ "Chi tiết cảm xúc" |
| Trạng thái | `ownership_status`, `exhibition_status`, `status` | xem enums dưới |
| Quan hệ | `related_exhibitions[]`, `related_articles[]`, `keywords[]` | |
| Pháp lý | `image_rights`, `published_at` | |

## Danh sách thực thể

- **MVP:** `artists`, `artworks`, `artwork_images`, `collections`, `series`, `mediums`, `styles`, `themes`, `exhibitions`, `news`, `articles`, `people`, `friend_contributions`, `inquiries`.
- **V2:** `comments`, `questions`, `answers`, `newsletter_subscribers`, `members`.
- **V2/V3 (AI):** `knowledge_sources`, `knowledge_documents`, `document_chunks` (pgvector).

## Quan hệ chính

```
artist ── tạo ──> artwork
artwork ── thuộc ──> collection (1)
artwork ── gắn ──> styles / themes / series / mediums (n)
artwork ── xuất hiện tại ──> exhibitions (n)
artwork ── được đề cập ──> articles (n)

knowledge_source ──> knowledge_documents ──> document_chunks ──(truy xuất)──> answers
```

## Enums

```
ownership_status : available | collected | reserved | not_for_sale   # không lộ danh tính người mua
exhibition_status: in_studio | on_display | on_loan | archived
status           : draft | published
image_rights     : viewable | downloadable | press_only
```

## Ghi chú quyền (RLS — cho mô hình "đền‑có‑salon")

- Bảng community (`comments`, `questions`) **tồn tại nhưng gated + duyệt trước**; **không** áp cho `collection = nang`.
- `knowledge_documents` có thể chứa tài liệu hạn chế (chỉ Artist / Editor / Researcher được cấp) → bật **Row Level Security**, lọc theo quyền **ngay khi truy xuất RAG** (không chỉ khi hiển thị).
