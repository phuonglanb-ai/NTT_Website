# Sổ phê duyệt nội dung

Sổ này ghi lại **ai đã duyệt văn bản nào, vào ngày nào, bằng hình thức gì** — trước khi
văn bản đó được xuất bản lên website.

Lý do phải có sổ: `CLAUDE.md` (mục *An toàn & liêm chính*) quy định **không xuất bản nội
dung AI tự sinh nếu chưa được phê duyệt**, và **không bao giờ trình bày văn bản AI như thể
là lời nghệ sĩ**. Sổ này là bằng chứng để về sau còn tra lại được.

## Cách dùng

Mỗi lần thêm một đoạn văn bản mới thuộc loại **Lời nghệ sĩ** hoặc **Bài của bạn hữu**, ghi
thêm một mục vào bảng tương ứng. Nếu chưa có dòng phê duyệt, **chưa được đăng**.

Bốn loại giọng văn (theo mục 20 trong bộ nội dung tiếng Việt):

| Loại | Nghĩa | Ai duyệt |
|---|---|---|
| `artist_voice` | Lời của chính nghệ sĩ | **Bắt buộc** Nguyễn Tuấn Thịnh duyệt |
| `editorial_voice` | Lời biên tập, giới thiệu | Chủ dự án duyệt |
| `contributor_voice` | Bài của khách mời / bạn hữu | Tác giả cho phép đăng + chủ dự án duyệt |
| `ai_assisted_draft` | Bản nháp có AI hỗ trợ | **Chưa được xuất bản** |

> Hệ thống hiện **chưa có trường lưu nhãn giọng văn** trong cơ sở dữ liệu. Cho tới khi có,
> sổ này là nơi lưu duy nhất. Với bài của bạn hữu, dùng tạm cột `author` (tên người viết)
> để người đọc phân biệt được.

---

## Lời nghệ sĩ (`artist_voice`)

| Văn bản | Nơi hiển thị | Người duyệt | Ngày duyệt | Hình thức |
|---|---|---|---|---|
| "Tôi không vẽ người phụ nữ. Tôi vẽ cảm nhận của mình về thế giới của họ…" (bản đầy đủ 4 đoạn) | Trang cõi **Nàng** — `messages/vi.json` → `collections.nang.artistNote` | Nguyễn Tuấn Thịnh | 22/07/2026 | Tin nhắn |
| "Tôi bắt đầu từ những gì mắt nhìn thấy và thân thể cảm nhận…" (Lời nghệ sĩ tổng quát) | Trang **Nghệ sĩ** — nhập qua Admin vào trường *Tuyên ngôn / Lời nghệ sĩ* | Nguyễn Tuấn Thịnh | 22/07/2026 | Tin nhắn |

### Bản dịch tiếng Anh của Lời nghệ sĩ

Hai đoạn dưới đây là **bản dịch do AI soạn**, sau đó **Nguyễn Tuấn Thịnh đọc và
duyệt ngày 22/07/2026**. Nhờ có bước duyệt này, chúng mới đủ điều kiện xuất bản
như lời nghệ sĩ (`CLAUDE.md` mục 7: bản dịch máy *không tự động* được coi là lời
nghệ sĩ đã phê duyệt).

| Văn bản | Nơi hiển thị | Người duyệt | Ngày duyệt |
|---|---|---|---|
| "I do not paint women. I paint my feeling of their world…" | Trang cõi **Her** — `messages/en.json` → `collections.nang.artistNote` | Nguyễn Tuấn Thịnh | 22/07/2026 |
| "I begin with what the eye sees and the body feels…" | Trang **Nghệ sĩ** (EN) — `artists.statement_en` | Nguyễn Tuấn Thịnh | 22/07/2026 |

Câu mở đầu đoạn thứ nhất lấy nguyên từ bản song ngữ đã chốt trong
`product-brief.md` mục 1, không dịch lại.

---

## Bài của bạn hữu (`contributor_voice`)

| Bài | Tác giả | Nơi đăng lần đầu | Ngày đăng gốc | Nghệ sĩ đồng ý đăng lại |
|---|---|---|---|---|
| "Bản giao hưởng dữ dội của thân thể và màu sắc" | Bùi Phương Lan | Facebook của họa sĩ | 23/09/2025 | Có — chính họa sĩ đã đăng |

**Lưu ý khi đăng bài này qua Admin:**

1. Tạo bản ghi **người bạn hữu** với tên `Bùi Phương Lan` trước, rồi mới tạo bài đóng góp
   gắn vào người đó. Tên tác giả hiện ngay dưới tiêu đề bài.
2. Bài có nội dung diễn giải mạnh về thân thể và dục tính — theo `moderation-policy.md`
   mục 3, phải đọc duyệt toàn bộ trước khi chuyển sang *Xuất bản*.
3. Câu miễn trừ trách nhiệm đã có sẵn ở đầu trang **Bạn hữu & Đối thoại**, không cần
   chép lại vào từng bài.

---

## Nội dung biên tập (`editorial_voice`)

Toàn bộ lời dẫn, lời giới thiệu, nhãn nút và thông báo hệ thống trong `messages/vi.json`
và `messages/en.json` thuộc loại này. Do chủ dự án (Bùi Phương Lan) soạn và duyệt, áp
dụng ngày **22/07/2026**. Các văn bản này **không viết ở ngôi "tôi"** và không giả làm
lời nghệ sĩ.

## Trang pháp lý

Hai trang này ban đầu là **bản thảo do agent soạn**, nên bắt buộc phải có người
duyệt trước khi coi là văn bản chính thức.

| Trang | Người duyệt | Ngày duyệt |
|---|---|---|
| Chính sách quyền riêng tư (`/chinh-sach-rieng-tu`) | Nguyễn Tuấn Thịnh | 22/07/2026 |
| Điều khoản sử dụng hình ảnh (`/dieu-khoan-hinh-anh`) | Nguyễn Tuấn Thịnh | 22/07/2026 |

> Đây là **phê duyệt của chủ sở hữu nội dung**, không phải thẩm định pháp lý.
> Nếu sau này website nhận thanh toán, bán tác phẩm trực tuyến, hoặc thu thập
> thêm dữ liệu cá nhân ngoài form liên hệ, nên nhờ luật sư rà lại — bộ nội dung
> tiếng Việt (mục 17) cũng đã tự ghi chú điều này cho phần bản quyền hình ảnh.
