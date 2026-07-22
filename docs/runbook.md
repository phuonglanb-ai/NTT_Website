# Sổ tay vận hành — Website Nguyễn Tuấn Thịnh

> Dành cho người quản trị website (Lan / nghệ sĩ). Viết bằng ngôn ngữ thường ngày, không cần biết lập trình.
> Mọi việc trong sổ tay này bạn tự làm được, không cần nhờ kỹ thuật.

---

## 1. Đăng nhập khu quản trị

1. Mở địa chỉ website, thêm `/admin` vào cuối (ví dụ `https://tên-miền.com/admin`).
2. Nhập email và mật khẩu đã được cấp. Có nút **Hiện** để xem mật khẩu nếu sợ gõ nhầm.
3. Đăng nhập xong sẽ thấy thanh menu: Tác phẩm · Nghệ sĩ · Triển lãm · Nhật ký · Bạn bè · Lời nhắn.

**Không có nút "Đăng ký"** — đây là chủ ý. Tài khoản chỉ được cấp thủ công (xem mục 7).

---

## 2. Quy tắc quan trọng nhất: Nháp và Xuất bản

Mọi nội dung (tác phẩm, tin tức, bài viết, người bạn…) đều có ô **Trạng thái**:

- **Nháp** — chỉ bạn và người quản trị nhìn thấy. Khách vào web **không** thấy.
- **Xuất bản** — hiện công khai cho mọi người.

> Nếu bạn nhập nội dung mà ngoài trang web không thấy đâu cả → gần như chắc chắn nó đang ở trạng thái **Nháp**. Vào sửa, đổi sang **Xuất bản**, lưu lại.

---

## 3. Thêm một tác phẩm mới

1. Menu **Tác phẩm** → nút **Tạo tác phẩm mới**.
2. Điền các ô có dấu **\*** (bắt buộc):
   - **Mã tác phẩm** theo mẫu `NTT-PTG-2025-001`
     (`PTG` = tranh, `SCL` = điêu khắc, `SKT` = ký họa; `2025` = năm; `001` = số thứ tự)
   - **Năm**, **Tiêu đề (Tiếng Việt)**, **Loại hình**, **Cõi**
3. **Ảnh chính** — bắt buộc khi tạo mới. Kèm theo phải điền **Alt text (VI)** và **Alt text (EN)**:
   đây là dòng mô tả ngắn cho người khiếm thị và cho Google hiểu bức tranh (ví dụ: "Người phụ nữ ngồi bên cửa sổ, nền chàm sẫm").
4. Muốn thêm ảnh cận cảnh: bấm **+ Thêm ảnh chi tiết** (mỗi ảnh cũng cần alt text).
5. Chọn **Trạng thái** → **Xuất bản** nếu muốn hiện ngay.
6. Bấm **Lưu tác phẩm**.

**Lưu ý:** hệ thống tự động lưu 2 bản ảnh — bản hiển thị trên web (đã thu nhỏ, đã xoá thông tin vị trí chụp) và **bản gốc được cất riêng, không ai tải được từ web**.

---

## 4. Nhập thông tin nghệ sĩ

Menu **Nghệ sĩ** → điền Tiểu sử, Tuyên ngôn nghệ thuật, Hành trình sáng tác (mỗi mục có ô tiếng Việt và tiếng Anh) → có thể tải ảnh chân dung → **Lưu**.

Nội dung này hiện ở trang "Nghệ sĩ" công khai. Nếu chỉ điền tiếng Việt, bản tiếng Anh của trang sẽ bỏ trống phần đó.

---

## 5. Viết Nhật ký (tin tức / bài viết)

Menu **Nhật ký** → **Tạo bài mới**. Chọn **Loại nội dung**:

- **Tin tức** — thông báo ngắn.
- **Bài viết** — chọn tiếp phân loại:
  - *Góc nhìn / Hậu trường* → hiện ở trang Nhật ký
  - *Phê bình & đối thoại* → hiện ở trang Nhật ký
  - *Báo chí viết về nghệ sĩ* → hiện ở trang **Nghệ sĩ** (nhớ điền Tác giả + Link bài gốc)

Đường dẫn của bài được tạo tự động từ tiêu đề (bỏ dấu tiếng Việt).

---

## 6. Góc bạn bè · Lời nhắn

- **Bạn bè**: thêm người (tên, vai trò, giới thiệu, ảnh) → sau đó vào **Bài đóng góp** để thêm bài của họ. Khách **không** tự gửi bài được — mọi nội dung đều do bạn nhập, đúng chủ trương giữ không gian tĩnh lặng.
- **Lời nhắn**: nơi đọc tin nhắn khách gửi từ trang Liên hệ. Bấm **Đánh dấu đã xử lý** khi trả lời xong. Thông tin này **không bao giờ** hiện ra ngoài trang web.

---

## 7. Cấp tài khoản mới cho người khác

Làm trên trang quản lý dữ liệu Supabase (supabase.com → đăng nhập → chọn project):

1. **Authentication → Users → Add user → Create new user**: nhập email + mật khẩu, tick **Auto Confirm User**.
2. Copy **UID** của người vừa tạo.
3. **Table Editor → bảng `user_roles` → Insert row**: dán UID vào `user_id`, chọn `role`:
   - `editor` — nhập và sửa nội dung (đủ dùng cho cộng tác viên)
   - `artist` — như editor, thêm quyền sửa "Ghi chú của nghệ sĩ"
   - `admin` — toàn quyền, xem được Nhật ký hệ thống

---

## 8. Sao lưu và khôi phục dữ liệu

- Supabase **tự sao lưu hằng ngày**. Xem/khôi phục ở: Supabase → **Database → Backups**.
- Gói Free chỉ giữ bản sao lưu trong thời gian ngắn và **không** khôi phục về đúng từng phút. Khi website đã có nhiều nội dung thật, nên cân nhắc nâng lên gói trả phí để có sao lưu dài hạn hơn.
- **Nên làm 3 tháng một lần:** thử khôi phục để chắc chắn bản sao lưu dùng được — đừng đợi đến lúc sự cố mới thử.

---

## 9. Theo dõi dung lượng ảnh

Ảnh gốc độ phân giải cao rất nặng. Xem dung lượng đã dùng ở Supabase → **Storage**.
Gói Free giới hạn khoảng 1GB. Khi gần đầy, có 2 lựa chọn: nâng gói, hoặc giảm kích thước ảnh gốc trước khi tải lên.

---

## 10. Việc phải làm TRƯỚC KHI ra mắt chính thức

- [x] **Đọc và duyệt lại 2 trang pháp lý**: *Chính sách quyền riêng tư* và *Điều khoản sử dụng hình ảnh*. — **Nguyễn Tuấn Thịnh đã duyệt ngày 22/07/2026**, ghi tại `docs/content-approvals.md`.
- [x] **Đổi mật khẩu tài khoản admin** sang mật khẩu mạnh, chỉ bạn biết. — **Đã đổi 22/07/2026.**
- [x] Đặt biến `NEXT_PUBLIC_SITE_URL` bằng địa chỉ thật của website. — **Đã đặt** `https://ntt-website-five.vercel.app`, kiểm ngày 22/07/2026: `sitemap.xml` khai báo đủ 26 URL đúng địa chỉ, `robots.txt` chặn `/admin`. **Phải làm lại khi đổi sang tên miền riêng** — xem mục 12.
- [ ] **Đăng ký Cloudflare Turnstile** (miễn phí) để chống tin nhắn rác ở form Liên hệ — xem hướng dẫn từng bước ở mục 11 bên dưới.

## 11. Cloudflare Turnstile — chống tin nhắn rác

Turnstile là ô "tôi không phải robot" của Cloudflare. Miễn phí, không cần thẻ,
không bắt người dùng chọn hình ảnh như CAPTCHA cũ.

> ⚠️ **Phải điền ĐỦ CẢ HAI mã.** Website chỉ bật kiểm tra khi có đủ hai biến.
> Nếu chỉ điền một trong hai, **mọi lời nhắn gửi tới đều bị từ chối** — người gửi
> nhận thông báo lỗi, còn bạn không nhận được gì và cũng không biết là đang mất
> thư. Không điền biến nào cả thì form vẫn chạy bình thường (vẫn còn bẫy ẩn
> chống bot và giới hạn tần suất gửi), chỉ là ít một lớp bảo vệ.

### Bước 1 — Tạo site trên Cloudflare

1. Vào **dash.cloudflare.com** → đăng ký tài khoản miễn phí nếu chưa có
   (chỉ cần email, **không cần** chuyển tên miền sang Cloudflare)
2. Menu bên trái → **Turnstile** → **Add widget**
3. Điền:
   - **Widget name**: `NTT Website` (tên gợi nhớ, đặt gì cũng được)
   - **Hostnames**: thêm **từng dòng** các tên miền sẽ dùng:
     - `ntt-website-five.vercel.app` (địa chỉ production hiện tại)
     - `localhost` (để chạy thử ở máy)
     - Tên miền riêng sau này, nếu có
   - **Widget Mode**: chọn **Managed** (Cloudflare tự quyết khi nào cần hỏi thêm —
     hầu hết người dùng thật chỉ thấy ô tự tick, không phải làm gì)
4. Bấm **Create**

Cloudflare hiện ra **hai mã**:

| Tên trên Cloudflare | Điền vào Vercel với tên |
|---|---|
| **Site Key** (công khai, bắt đầu bằng `0x4...`) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` |
| **Secret Key** (bí mật, bắt đầu bằng `0x4...`) | `TURNSTILE_SECRET_KEY` |

**Secret Key là bí mật** — không gửi qua chat, không chụp màn hình đưa cho ai,
không đưa vào code. Chỉ dán thẳng vào Vercel.

### Bước 2 — Điền vào Vercel

1. **vercel.com** → dự án **ntt-website** → **Settings** → **Environment Variables**
2. **Add New**, làm hai lần:

   | Key | Value | Environments |
   |---|---|---|
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Site Key vừa lấy | ✅ Production ✅ Preview ✅ Development |
   | `TURNSTILE_SECRET_KEY` | Secret Key vừa lấy | ✅ Production ✅ Preview ✅ Development |

3. **Nhớ tick cả ba môi trường.** Chỉ tick Production là bản Preview sẽ hỏng —
   đúng lỗi đã gặp ngày 22/07/2026 với biến Supabase.
4. Sang **Deployments** → bản mới nhất → **⋯** → **Redeploy**,
   **bỏ tick** *Use existing Build Cache*.

Bắt buộc phải deploy lại: biến bắt đầu bằng `NEXT_PUBLIC_` được nhúng vào lúc
**build**, không đọc lúc chạy.

### Bước 3 — Kiểm tra

Mở trang **Liên hệ riêng** trên website. Dưới ô "Nội dung liên hệ" phải xuất hiện
một ô kiểm tra nền tối của Cloudflare. Gửi thử một lời nhắn, rồi vào
**Quản trị → Lời nhắn** xem đã nhận được chưa. Nhận được là xong.

Nếu **không thấy ô kiểm tra**: chưa deploy lại, hoặc quên tick môi trường.
Nếu **thấy ô nhưng gửi báo lỗi**: nhiều khả năng thiếu `TURNSTILE_SECRET_KEY`,
hoặc tên miền đang mở chưa có trong danh sách Hostnames ở Bước 1.

### Không cần làm gì thêm

Phần kỹ thuật đã dựng sẵn trong dự án và đã kiểm chứng:
- Ô kiểm tra tự hiện khi có Site Key, tự ẩn khi không có
- Trình duyệt được phép tải script và khung của Cloudflare (đã mở trong CSP tại
  `next.config.ts`)
- Ô kiểm tra tự làm mới khi gửi thất bại (mỗi mã chỉ dùng được một lần)
- Giao diện ô theo nền tối, tiếng Việt ở `/vi` và tiếng Anh ở `/en`
- [ ] Nhập đủ nội dung thật: thông tin nghệ sĩ, và ít nhất vài tác phẩm cho mỗi cõi.

---

## 11. Khi có sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| Nhập nội dung xong nhưng ngoài web không thấy | Kiểm tra ô **Trạng thái** — đang là Nháp thì đổi sang Xuất bản |
| Đăng nhập xong bị đăng xuất liên tục | Kiểm tra **đồng hồ máy tính** có đúng giờ không (Cài đặt → Ngày và giờ → Đồng bộ ngay). Đồng hồ sai làm phiên đăng nhập hết hạn ngay |
| Không lưu được ảnh | Kiểm tra đã điền **cả 2 ô Alt text** chưa — thiếu là hệ thống từ chối lưu |
| Cần sửa gấp dữ liệu mà giao diện quản trị chưa có | Vào Supabase → **Table Editor** sửa trực tiếp (cẩn thận, không có nút hoàn tác) |

---

## 12. Ghi chú kỹ thuật (khi cần nhờ người khác hỗ trợ)

- Website: Next.js + Supabase, chạy trên Vercel.
- Toàn bộ bảng dữ liệu bật **RLS** (chặn mặc định) — khách chỉ đọc được nội dung đã xuất bản.
- **Nhật ký hệ thống** (menu chỉ hiện với Admin) ghi lại ai sửa gì, lúc nào. Không sửa/xoá được, kể cả Admin.
- Website đã bật các lớp bảo vệ trình duyệt (CSP, HSTS…). Bước siết chặt hơn nữa trong tương lai: chuyển CSP sang dùng "nonce" — cần người có kỹ thuật làm.
- Thống kê truy cập dùng Vercel Web Analytics: **không dùng cookie**, không nhận diện cá nhân — vì vậy website **không cần** banner xin phép cookie.

## 12. Đổi sang tên miền riêng

Làm khi bạn mua tên miền thật (ví dụ `nguyentuanthinh.com`). Chưa có thì bỏ qua.

Thứ tự dưới đây quan trọng — làm sai thứ tự thì Google có thể ghi nhận sai địa chỉ.

1. **Gắn tên miền vào Vercel**
   Settings → **Domains** → **Add** → nhập tên miền → Vercel hiện các bản ghi DNS
   cần khai báo. Vào nơi bạn mua tên miền, thêm đúng các bản ghi đó. Chờ Vercel
   báo **Valid Configuration** (thường vài phút, có khi tới 24 giờ).

2. **Đổi biến `NEXT_PUBLIC_SITE_URL`**
   Settings → Environment Variables → sửa giá trị thành địa chỉ mới,
   ví dụ `https://nguyentuanthinh.com`.
   - **Có `https://` ở đầu, KHÔNG có dấu `/` ở cuối.**
   - Tick đủ **cả ba** môi trường.

3. **Deploy lại**, bỏ tick *Use existing Build Cache*.
   Bắt buộc: biến `NEXT_PUBLIC_` được nhúng lúc build.

4. **Thêm tên miền mới vào Cloudflare Turnstile**
   dash.cloudflare.com → Turnstile → widget `NTT Website` → **Settings** →
   thêm tên miền mới vào **Hostnames**. Quên bước này thì ô kiểm tra ở form
   Liên hệ sẽ báo lỗi và **không ai gửi được lời nhắn**.

5. **Kiểm tra lại** — mở hai địa chỉ này trên trình duyệt:
   - `https://<tên miền mới>/sitemap.xml` — mọi dòng `<loc>` phải mang tên miền
     **mới**. Còn thấy `vercel.app` nghĩa là bước 2 hoặc 3 chưa xong.
   - `https://<tên miền mới>/robots.txt` — dòng `Sitemap:` cũng phải là tên miền mới.

6. **Khai báo với Google** (không bắt buộc, nhưng nên làm)
   search.google.com/search-console → thêm tên miền mới → mục **Sitemaps** →
   nộp địa chỉ `sitemap.xml`.

> Địa chỉ cũ `ntt-website-five.vercel.app` vẫn hoạt động sau khi gắn tên miền
> riêng. Vercel tự chuyển hướng sang tên miền chính, nên link cũ ai đó đã lưu
> vẫn vào được.
