# Design System — Website Nguyễn Tuấn Thịnh

## Design Philosophy — Dark-first Sanctuary

Website sử dụng **dark-first sanctuary** làm định hướng thị giác nền tảng
cho các không gian tập trung vào tác phẩm.

Nhiều tác phẩm của Nguyễn Tuấn Thịnh sử dụng sắc độ sâu, tương phản mạnh,
mảng màu dày và cấu trúc hình thể có tính khối. Nền charcoal tối giúp duy trì
chiều sâu, độ tập trung và cảm giác tĩnh lặng, đồng thời hạn chế việc giao diện
cạnh tranh với tác phẩm.

Dark-first không phải là khẳng định rằng mọi tác phẩm chỉ phù hợp với nền tối,
cũng không có nghĩa toàn bộ website phải dùng một màu nền duy nhất.

Các bề mặt sáng hoặc trắng ngà có thể được sử dụng có chọn lọc cho:

- bài viết dài;
- tiểu sử và tư liệu;
- nội dung học thuật;
- form có mật độ thông tin cao;
- trang quản trị;
- một số tác phẩm hoặc series được đánh giá là hiển thị tốt hơn trên nền sáng.

Việc sử dụng nền sáng phải được quyết định theo từng trang, section hoặc
component dựa trên:

- đặc tính sắc độ của tác phẩm;
- khả năng đọc;
- độ tương phản;
- trải nghiệm desktop và mobile;
- accessibility;
- phê duyệt thị giác của chủ dự án.

Nền sáng là một **reading or functional surface**, không phải sự thay thế
mặc định cho căn tính dark-first của gallery.

Không thực hiện global light-theme migration nếu chưa có visual proof of
concept, kiểm thử trên tác phẩm thật và phê duyệt riêng.

## Màu (design tokens)

```css
--bg:            #0E0E10;  /* than đen */
--bg-elevated:   #1A1A1D;
--text:          #F4EFE6;  /* trắng ngà */
--text-muted:    #A8A29A;
--accent-cobalt: #2B4F9E;  /* rút từ tranh Nàng */
--accent-oxblood:#7A2320;  /* rút từ tranh Đời / Hỗn mang */
```

> **Lưu ý triển khai:** trong code (`app/globals.css`), các token này mang tiền tố
> `--color-` theo yêu cầu của Tailwind v4 — `--color-bg`, `--color-text`,
> `--color-accent-cobalt`… Tên ở bảng trên là **tên ngữ nghĩa**, không phải tên
> biến CSS. Không đổi tên token trong code nếu chưa có impact analysis
> (xem `CLAUDE.md` §3).

- Accent dùng **cực kiệm** (link, hover, dấu nhấn) — **không** tô mảng lớn.
- **Sắc thái theo cõi** (trong cùng một hệ): Nàng → cobalt/gold · Đời → olive/đất · Hỗn mang → oxblood/hoàng thổ. Không phá hệ chung.
  - *Trạng thái: **chưa triển khai**. Bảng token trên mới định nghĩa `cobalt` và `oxblood`; `gold`, `olive`, `đất`, `hoàng thổ` chưa có giá trị. Phải định nghĩa token trước khi dùng — không hard-code màu mới (xem `CLAUDE.md` §3).*

## Chữ

- **Serif — Playfair Display:** Artist Statement, tự sự, tiêu đề tác phẩm, bình giải.
- **Sans — Source Sans 3:** thân bài, mã ID, kích thước, chất liệu, UI, chú thích kỹ thuật.
  - *Đây là một **sans humanist** — khung chữ dựa trên nét viết tay, khẩu chữ mở.
    Thay cho Inter (neo-grotesque, nét rất đều và trung tính): Inter đọc tốt nhưng
    cứng và khô, làm cả trang nghiêm nghị quá mức so với tinh thần tác phẩm.
    Source Sans mềm hơn ở cùng một độ rõ nét.*
- **Bộ ký tự `vietnamese` là bắt buộc** cho mọi font. Nếu chỉ khai báo `latin`,
  các chữ có dấu (ữ, ệ, ạ, ơ…) không nằm trong file font được tải về, trình duyệt
  phải lấy tạm từ font hệ thống — chữ tiếng Việt sẽ lệch nét so với chữ không dấu
  ngay trong cùng một dòng.

### Quy tắc chữ nghiêng — nghiêng là *tiếng nói của nghệ sĩ*

Chữ nghiêng mang **một nghĩa duy nhất** trên toàn site: đoạn văn đó là **lời của
Nguyễn Tuấn Thịnh**. Nhờ vậy người đọc phân biệt được giọng nói ngay bằng mắt,
trước cả khi đọc nhãn — hỗ trợ trực tiếp cho yêu cầu phân tầng giọng văn ở
`CLAUDE.md` mục 7.

| Loại nội dung | Kiểu chữ |
|---|---|
| Lời nghệ sĩ (trang Nghệ sĩ, trang cõi, ghi chú tác phẩm) | **Serif nghiêng** |
| Lời biên tập, lời dẫn, miễn trừ trách nhiệm, mô tả khách quan | Chữ đứng |
| Bài của bạn hữu / khách mời | Chữ đứng (phân biệt bằng tên tác giả) |
| Nhãn UI, nút, metadata kỹ thuật | Sans, chữ đứng |

**Không** dùng nghiêng để nhấn mạnh chung chung, để làm mềm giao diện, hay cho
ghi chú phụ. Mỗi lần dùng sai là một lần làm loãng tín hiệu.
- *(Tùy chọn: **Aptima** — font ưa dùng của Lan — nếu muốn thống nhất nhận diện cá nhân. Mặc định vẫn Playfair + Inter: cặp chữ này giữ độ tương phản cảm xúc trên nền charcoal của không gian trưng bày, đồng thời vẫn đọc tốt trên các bề mặt sáng dùng cho văn bản dài.)*

## Bố cục & lưới

- Tranh chiếm **≥70%** khung hình; giữ nhiều khoảng trống tĩnh lặng quanh tác phẩm — trên nền charcoal của không gian trưng bày, khoảng trống này là vùng tối; **một tác phẩm = một "hơi thở"**, tránh lưới dày đặc.
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
- Tương phản chữ phải đạt chuẩn WCAG 2.2 **trên chính bề mặt mà component đứng** — nền charcoal ở không gian trưng bày, hoặc bề mặt sáng ở các vùng đọc/vận hành đã được duyệt riêng. Không giả định chỉ có một loại nền khi kiểm tra tương phản; thao tác được bằng **bàn phím**; **zoom toàn màn hình** hoạt động trên mobile.
- **Mobile‑first**; nền charcoal là mặc định cho các trang tập trung vào tác phẩm; tranh + metadata luôn rõ trên mọi bề mặt đã được duyệt.

## Component khởi đầu

`artwork-card` · `artwork-detail` (dual‑mode viewer) · `collection-header` (theo cõi) · `statement-block` · `article/journal-layout` · `private-inquiry-form` · `filter-bar` · `friends-contribution-card`.
