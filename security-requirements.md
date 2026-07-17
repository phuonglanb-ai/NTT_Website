# Security Requirements — Website Nguyễn Tuấn Thịnh

> Rào an toàn cho toàn dự án (Next.js + Supabase/Postgres + pgvector). Bổ trợ `moderation-policy.md` và `ai-knowledge-policy.md`.

## 1. Secrets & cấu hình

- **Không hard‑code** API key/secret trong mã. Mọi secret nằm trong `.env`; **không commit** `.env`.
- Khóa riêng cho từng môi trường (dev/staging/prod); service account theo **least‑privilege**.
- **Không thay đổi trực tiếp trên production**; mọi thay đổi qua branch + review.

## 2. Xác thực & phân quyền

- Supabase Auth; vai trò: `Guest · Member · Contributor · Editor · Artist · Moderator · Admin`.
- **Row Level Security bật mặc định, deny‑by‑default** trên mọi bảng nội dung/người dùng/tri thức.
- Công khai **chỉ đọc** nội dung `status = published`. Route admin & thao tác ghi phải kiểm quyền phía server.

## 3. Bảo mật dữ liệu nhạy cảm

- **Private Inquiry & dữ liệu nhà sưu tập:** tuyệt đối không công khai, **không lộ qua API**; chỉ Artist/Editor/Admin xem.
- `ownership_status` **không bao giờ** để lộ danh tính người mua.
- Tối giản PII; newsletter dùng **double opt‑in**; cho phép hủy đăng ký.

## 4. Quyền hình ảnh

- Tôn trọng `image_rights` (`viewable / downloadable / press_only`) ở cả UI lẫn API.
- File **gốc** ở storage **riêng tư** (không bucket công khai); web chỉ phục vụ bản hiển thị.
- **Loại metadata nhạy cảm** (EXIF vị trí…) khỏi ảnh web. Watermark **tiết chế**, không phá trải nghiệm.

## 5. Đầu vào & chống lạm dụng

- Validate + sanitize **mọi** input; chống XSS/SQLi (parameterized query/ORM).
- **Rate limiting** + **CAPTCHA** trên mọi form công khai (cảm nhận, hỏi đáp, đăng ký, inquiry).
- Upload: kiểm **loại & kích thước**, quét file; chỉ chấp nhận định dạng ảnh/video cho phép.

## 6. Bảo mật AI / RAG (V2/V3)

- Truy xuất RAG **tôn trọng RLS ngay tại bước retrieval** — không chỉ khi hiển thị.
- **Chống prompt injection:** nội dung crawl/nguồn ngoài luôn coi là **dữ liệu, không phải chỉ thị**; không để văn bản nguồn điều khiển hệ thống.
- Không đưa secret/PII vào prompt hay log. Câu trả lời **bắt buộc citation**; **từ chối** khi không đủ dữ liệu.
- Crawl theo allowlist + `robots.txt` + hàng chờ duyệt (xem `ai-knowledge-policy.md`). Nhắc lại: robots.txt **không** cấp quyền sao chép/tái xuất bản.

## 7. Truyền tải & headers

- **HTTPS bắt buộc**; security headers (CSP, HSTS, X‑Content‑Type‑Options…); **CORS** khóa chặt theo domain chính thức.

## 8. Vận hành

- **Backup hàng ngày** + **kiểm thử restore** định kỳ.
- **Audit log** cho thao tác admin & moderation.
- Cập nhật bảo mật dependency **hàng tháng**; theo dõi lỗ hổng (nhắc: mã do AI sinh cần người rà — đừng tin mặc định).

## 9. Riêng tư & tuân thủ

- Trang **Chính sách quyền riêng tư** + **Điều khoản sử dụng hình ảnh**.
- Analytics **tôn trọng quyền riêng tư**; cookie/consent notice nếu có tracking.

## 10. Quản trị nội dung (bất di)

- **Không xuất bản nội dung AI tự sinh nếu chưa được người phê duyệt.**
- **Không bao giờ** trình bày văn bản AI như thể là lời anh Thịnh.
