# Sitemap & User Flows — Website Nguyễn Tuấn Thịnh

## Nguyên tắc điều hướng

- **Ba cõi là mặt tiền.** Điều hướng chính của "Tác phẩm" = Thế giới của Nàng / Rung cảm Đời sống / Hỗn mang & Trật tự. Loại hình (tranh/tượng/ký họa), trường phái, chất liệu, chủ đề, năm → **bộ lọc**, không phải mục menu.
- **Đền‑có‑salon.** Lõi (Trang chủ + Nghệ sĩ + Tác phẩm) tĩnh lặng. Cánh salon (Nhật ký, Hỏi đáp, Góc bạn bè, Cộng đồng) là nơi tương tác.
- **Lõi Nàng không bình luận.** Bình luận chỉ xuất hiện trên **nội dung salon** (blog, bài khách mời) từ V2 — không bao giờ cạnh tác phẩm.

## Cây điều hướng  `[MVP] · [V2] · [V3]`

```
Trang chủ [MVP]
├── Nghệ sĩ [MVP]
│   ├── Tiểu sử
│   ├── Tuyên ngôn nghệ thuật (song ngữ)
│   ├── Hành trình sáng tác
│   ├── Triển lãm & giải thưởng
│   └── Báo chí viết về nghệ sĩ
├── Tác phẩm [MVP]
│   ├── Thế giới của Nàng    (cõi — lõi, không bình luận)
│   ├── Rung cảm Đời sống     (cõi)
│   ├── Hỗn mang & Trật tự    (cõi)
│   ├── [Bộ lọc] loại hình · năm · chất liệu · trường phái · chủ đề · màu chủ đạo
│   └── Trang chi tiết tác phẩm (dual‑mode viewer)
├── Nhật ký [MVP] (salon)
│   ├── Tin tức
│   ├── Triển lãm
│   ├── Blog nghệ sĩ / Góc nhìn
│   ├── Phê bình & đối thoại
│   └── Hậu trường sáng tác (Studio Journal)
├── Góc bạn bè [MVP: biên tập tĩnh] (salon)
│   ├── Nghệ sĩ & bạn hữu
│   ├── Bài viết khách mời
│   ├── Kỷ niệm
│   └── Đối thoại
├── Hỏi đáp nghệ thuật (salon)
│   ├── Hỏi AI            [V2]
│   ├── Hỏi nghệ sĩ       [V2 — duyệt & biên tập]
│   ├── Câu hỏi nổi bật   [V2]
│   └── Nguồn tư liệu     [V2 — hiển thị allowlist + citation]
├── Cộng đồng [V2] (salon)
│   ├── Gửi cảm nhận      (duyệt trước)
│   ├── Bình luận         (chỉ trên nội dung salon; moderation)
│   ├── Đăng ký nhận tin
│   └── Sự kiện
└── Liên hệ / Private Inquiry [MVP]
```

## Bộ lọc (dưới "Tác phẩm")

`type · year · medium · style · theme · dominant_color · ownership_status` — URL filter **chia sẻ được** (query params).

## Luồng người dùng chính

- **Người thưởng lãm:** Trang chủ → cõi → tác phẩm → "Chi tiết cảm xúc" → đọc câu chuyện → tác phẩm liên quan → (salon) gửi cảm nhận.
- **Nhà sưu tập:** Tác phẩm → trạng thái sở hữu → **Private Inquiry** → phản hồi riêng.
- **Nhà nghiên cứu:** Tìm kiếm → lọc (năm/chất liệu/chủ đề) → thông tin tác phẩm → bài viết liên quan → tải citation / yêu cầu tư liệu.
- **Sinh viên mỹ thuật:** Hỏi đáp → trả lời **có nguồn** → nguồn tư liệu → blog/tác phẩm minh họa.
- **Bạn tri kỷ:** Góc bạn bè → gửi bài khách mời (duyệt) → liên kết tới tác phẩm/sự kiện.

## URL scheme (song ngữ)

- Prefix ngôn ngữ: `/vi/…` · `/en/…`
- Cõi: `/vi/tac-pham/nang` · `/vi/tac-pham/doi` · `/vi/tac-pham/hon-mang`
- Chi tiết: `/vi/tac-pham/{collection}/{code}` (vd `…/nang/NTT-PTG-2025-042`)
- Lọc chia sẻ: `/vi/tac-pham?type=painting&year=2025&style=bieu-hien`
- Nhật ký: `/vi/nhat-ky/{slug}` · Bạn bè: `/vi/ban-be/{slug}` · Hỏi đáp: `/vi/hoi-dap`
