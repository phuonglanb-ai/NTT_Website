# NTT_Website

Không gian nghệ thuật và giao lưu của Họa sĩ Nguyễn Tuấn Thịnh.

Website chính thức lưu giữ tác phẩm, hành trình sáng tác và thế giới quan của nghệ sĩ — song ngữ Việt/Anh, thiết kế dark-first để tranh tự phát sáng.

## Cấu trúc nội dung

Điều hướng chính là **ba cõi**: Thế giới của Nàng · Rung cảm Đời sống · Hỗn mang & Trật tự.
Trường phái, chất liệu, chủ đề chỉ là **bộ lọc** bên trong mỗi cõi.

Mô hình "đền có salon": lõi (Trang chủ, Nghệ sĩ, Tác phẩm) giữ tĩnh lặng; tương tác nằm ở cánh salon (Nhật ký, Góc bạn bè, Liên hệ).

## Công nghệ

- **Next.js 16** (App Router) + TypeScript strict + Tailwind CSS v4
- **Supabase**: Postgres (RLS deny-by-default) + Auth + Storage
- **Vercel** hosting · `next-intl` cho song ngữ `/vi` `/en` · `sharp` xử lý ảnh

## Chạy ở máy

```bash
npm install
cp .env.example .env.local   # rồi điền giá trị thật
npm run dev                  # http://localhost:3000
```

Khu quản trị: `/admin` (tài khoản được cấp thủ công, không có đăng ký công khai).

```bash
npm run build      # build production
npx tsc --noEmit   # kiểm tra kiểu
npm run lint
```

## Cơ sở dữ liệu

Migration nằm trong `supabase/migrations/`, áp dụng bằng Supabase CLI:

```bash
npx supabase db push --db-url "<SUPABASE_DB_URL>"
```

## Tài liệu

| File | Nội dung |
|---|---|
| [`docs/runbook.md`](docs/runbook.md) | **Sổ tay vận hành** — hướng dẫn dùng hằng ngày, không cần biết kỹ thuật |
| [`docs/product-brief.md`](docs/product-brief.md) | Phạm vi sản phẩm, đối tượng, MVP |
| [`docs/content-model.md`](docs/content-model.md) | Mô hình dữ liệu |
| [`docs/design-system.md`](docs/design-system.md) | Màu, chữ, bố cục |
| [`docs/sitemap.md`](docs/sitemap.md) | Cây điều hướng, URL |
| [`docs/security-requirements.md`](docs/security-requirements.md) | Yêu cầu bảo mật |
| [`docs/moderation-policy.md`](docs/moderation-policy.md) | Chính sách kiểm duyệt |
| [`docs/ai-knowledge-policy.md`](docs/ai-knowledge-policy.md) | Chính sách tri thức AI (V2) |
| [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md) | Luật cho AI coding agent |

## Nguyên tắc bất di

- Không xuất bản nội dung AI tự sinh khi chưa được phê duyệt.
- Không bao giờ trình bày văn bản AI như thể là lời nghệ sĩ.
- Ảnh gốc lưu ở kho riêng tư; dữ liệu liên hệ không lộ ra API công khai.
