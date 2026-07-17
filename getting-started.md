# Getting Started with Claude Code — NTT_Website

> Chuyển từ bản demo tĩnh (chat) sang "cửa sổ code" thật để dựng website có dữ liệu, admin, trang chi tiết.
> Áp dụng cùng bộ tài liệu trong `/docs`.

## 1. Cài Claude Code

- Dễ nhất: tải **Desktop app** (macOS/Windows/Linux) — có giao diện đồ họa, không cần terminal.
- Hoặc dùng **native installer** (không cần Node.js, không cần quyền admin).
- Hoặc qua **npm**: `npm install -g @anthropic-ai/claude-code` (cần Node.js 22+).
- Kiểm tra cài đặt thành công: chạy `claude --version`.

## 2. Đăng nhập

- Mở Claude Code, đăng nhập bằng tài khoản Claude **Pro hoặc Max** (gói miễn phí không bao gồm Claude Code).
- Hoặc dùng API key qua Console (trả theo token) nếu không muốn subscription.

## 3. Trỏ vào repo dự án

- Clone `https://github.com/phuonglanb-ai/NTT_Website.git` về máy (nếu chưa).
- Đảm bảo 8 file trong `docs/product-brief.md, content-model.md, design-system.md, sitemap.md, ai-knowledge-policy.md, moderation-policy.md, acceptance-criteria.md, security-requirements.md` đã có trong thư mục `docs/`.
- Mở Claude Code (hoặc Desktop app) trỏ vào thư mục repo này.

## 4. Đổi `.clinerules` → `CLAUDE.md`

- Claude Code đọc file quy tắc tên **`CLAUDE.md`** ở gốc repo (không phải `.clinerules` — đó là quy ước của Cline).
- Cách nhanh nhất: đổi tên file `.clinerules` đã có thành `CLAUDE.md`, giữ nguyên nội dung.
- Hoặc: chạy lệnh `/init` bên trong Claude Code để nó tự sinh khung `CLAUDE.md`, rồi dán nội dung quy tắc cũ vào.

## 5. Plan Mode → duyệt → Act

- Bật **Plan Mode** trong Claude Code.
- Dán nguyên văn prompt trong `docs/plan-mode-prompt.md` (mục "PLAN MODE prompt").
- Đọc kỹ kế hoạch nó trả về — đặc biệt mục **"unresolved decisions"**; kiểm nó **giữ đúng** ba cõi làm điều hướng chính và mô hình đền-có-salon (không làm phẳng thành menu hàn lâm, không mở bình luận tràn vào lõi Nàng).
- Duyệt kế hoạch → dán tiếp prompt "First ACT prompt" để dựng **Vertical Slice 1 (Artwork Publishing)** theo đúng `acceptance-criteria.md`.

---

**Lưu ý:** mọi thao tác ghi/sửa file hoặc chạy lệnh terminal, Claude Code sẽ **hỏi xin phép** trước — đây là hành vi mặc định an toàn, không nên tắt hoàn toàn (auto-approve) ở giai đoạn đầu.
