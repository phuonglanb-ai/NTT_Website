# Design System — Website Nguyễn Tuấn Thịnh

## Triết lý

**Dark‑first sanctuary.** Thiết kế là *khung tĩnh lặng*, không "làm đẹp thêm" cho tranh. Truyền tải tương phản cốt lõi của anh: nghệ thuật **mạnh mẽ – táo bạo**, trình bày **dịu dàng – trân trọng**.

> Quan sát nền tảng: tranh của anh phần lớn **sinh ra từ bóng tối** (Nàng hiện lên từ nền chàm sẫm; hoa quỳnh nở trắng trong đêm; phong cảnh nổi khối trong olive–oxblood tối). → Nền **tối** để tranh tự phát sáng và "áp đặt sự hiện diện". Nền trắng làm bạc màu, mất chiaroscuro. Trắng ngà là màu của **chữ và khoảng thở**, không phải màu của tường.

## Màu (design tokens)

```css
--bg:            #0E0E10;  /* than đen */
--bg-elevated:   #1A1A1D;
--text:          #F4EFE6;  /* trắng ngà */
--text-muted:    #A8A29A;
--accent-cobalt: #2B4F9E;  /* rút từ tranh Nàng */
--accent-oxblood:#7A2320;  /* rút từ tranh Đời / Hỗn mang */
```

- Accent dùng **cực kiệm** (link, hover, dấu nhấn) — **không** tô mảng lớn.
- **Sắc thái theo cõi** (trong cùng một hệ): Nàng → cobalt/gold · Đời → olive/đất · Hỗn mang → oxblood/hoàng thổ. Không phá hệ chung.

## Chữ

- **Serif — Playfair Display:** Artist Statement, tự sự, tiêu đề tác phẩm, bình giải.
- **Sans — Inter:** mã ID, kích thước, chất liệu, UI, chú thích kỹ thuật.
- *(Tùy chọn: **Aptima** — font ưa dùng của Lan — nếu muốn thống nhất nhận diện cá nhân. Mặc định vẫn Playfair + Inter cho độ tương phản cảm xúc trên nền tối.)*

## Bố cục & lưới

- Tranh chiếm **≥70%** khung hình; nhiều khoảng tối trống; **một tác phẩm = một "hơi thở"**, tránh lưới dày đặc.
- Mỗi cõi có thể có sắc thái riêng nhưng không phá hệ chung.

## Tương tác ký hiệu (điểm khác biệt lớn nhất)

Trình xem **2 chế độ** mỗi tác phẩm: **"Toàn cảnh" ↔ "Chi tiết cảm xúc"** — zoom bàn tay, đường cong, thớ màu/impasto. Bắt buộc chạy tốt trên mobile, vẫn thấy **tên · năm · chất liệu**.

## Chuyển động

Chậm, gần như tĩnh. Fade dài khi cuộn; **cinemagraph** một chi tiết ở trang chủ. Tránh mọi hiệu ứng "web app" nhanh nhẹn — phản tinh thần thiền.

## Motif & logo

- **Logo:** chữ ký nguyên bản của họa sĩ + dấu triện (seal) tối giản.
- **Motif phụ:** **hoa quỳnh** (nở một lần, trong đêm — cô đọng tinh thần "Nàng"/khoảnh khắc trái tim rung lên). Dùng **rất tiết chế**: divider, loading state, dấu triện phụ cạnh chữ ký. Không lạm dụng.

## Accessibility (WCAG 2.2) & responsive

- **Alt text bắt buộc** cho mọi tác phẩm (vừa tiếp cận vừa SEO).
- Tương phản chữ đạt chuẩn trên nền tối; thao tác được bằng **bàn phím**; **zoom toàn màn hình** hoạt động trên mobile.
- **Mobile‑first**, nền tối, tranh + metadata luôn rõ.

## Component khởi đầu

`artwork-card` · `artwork-detail` (dual‑mode viewer) · `collection-header` (theo cõi) · `statement-block` · `article/journal-layout` · `private-inquiry-form` · `filter-bar` · `friends-contribution-card`.
