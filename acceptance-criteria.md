# Acceptance Criteria — Vertical Slice 1: Artwork Publishing

> Lát chức năng hoàn chỉnh **đầu tiên**, từ giao diện đến dữ liệu. Đây là spec cho **Act Mode**. Chỉ làm phạm vi này; loại trừ ghi rõ ở cuối.

## User stories

- Là **Admin**, tôi muốn nhập/sửa một tác phẩm (đủ trường ở `content-model.md`) để đưa kho tranh lên site.
- Là **Admin**, tôi muốn upload ảnh chính + nhiều ảnh chi tiết cho một tác phẩm.
- Là **Người thưởng lãm**, tôi muốn xem danh mục tác phẩm theo **cõi** và lọc theo **loại hình/năm**.
- Là **Người thưởng lãm**, tôi muốn mở trang chi tiết và chuyển **"Toàn cảnh ↔ Chi tiết cảm xúc"**.

## Acceptance criteria (checklist)

- [ ] Bảng `artworks` + `artwork_images` đúng schema `content-model.md` (gồm **3 tầng mô tả có `author`**).
- [ ] Admin form tạo/sửa tác phẩm; **validate bắt buộc**: `code, title_vi, year, type, collection, primary_image`.
- [ ] Upload ảnh: 1 primary + n detail; sinh **bản hiển thị web**; giữ file gốc ở kho riêng.
- [ ] Trang danh mục **theo cõi** (`/vi/tac-pham/{collection}`), có phân trang.
- [ ] **Bộ lọc** `type` và `year`; URL **chia sẻ được** (query params).
- [ ] Trang chi tiết (`/vi/tac-pham/{collection}/{code}`) với **dual‑mode viewer** (Toàn cảnh / Chi tiết cảm xúc).
- [ ] **Song ngữ**: hiển thị `title_vi/title_en`; prefix `/vi` `/en`.
- [ ] **Dark‑first** theo `design-system.md` (tokens màu; Playfair + Inter).
- [ ] **Loading / empty / error states** cho mọi màn.
- [ ] **Responsive mobile**: tên · năm · chất liệu · điều hướng luôn rõ; zoom hoạt động.
- [ ] **Accessibility**: alt text **bắt buộc** cho ảnh; tương phản đạt; điều hướng bàn phím.
- [ ] **SEO metadata** trang chi tiết (title, description, Open Graph, alt).
- [ ] `ownership_status` hiển thị *"Còn / Đã thuộc sưu tập"* — **không lộ danh tính người mua**.

## Definition of Done

Chạy **lint + type‑check + test** (TypeScript strict) · kiểm thử trong browser với **dữ liệu thật** (≥5 tác phẩm mỗi cõi) · báo cáo file đã đổi + giới hạn đã biết + slice kế tiếp đề xuất · commit trên **branch riêng**, chưa merge production.

## Loại trừ khỏi Slice 1

Authentication cho khách · AI Q&A · bình luận · e‑commerce · crawl · newsletter · tìm kiếm full‑text nâng cao · knowledge base. *(Các slice sau.)*
