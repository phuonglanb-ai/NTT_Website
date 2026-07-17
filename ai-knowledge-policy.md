# AI Knowledge & Q&A Policy — Website Nguyễn Tuấn Thịnh

> Áp dụng cho mục "Hỏi đáp nghệ thuật" (V2/V3). Nguyên tắc chủ đạo: **không nối chatbot vào internet**; chỉ trả lời từ kho tri thức được kiểm soát, **luôn dẫn nguồn**, **biết từ chối**.

## 1. Ba lớp nguồn (thứ tự ưu tiên)

- **Lớp A — Nguồn chính thức của nghệ sĩ** *(ưu tiên cao nhất khi hỏi về chính anh Thịnh)*: tiểu sử, phỏng vấn, tuyên ngôn, bài viết, ghi chép, thuyết minh tác phẩm, transcript video, catalogue.
- **Lớp B — Học thuật tuyển chọn:** sách/nghiên cứu có quyền dùng, tạp chí nghệ thuật, bảo tàng, đại học, lịch sử mỹ thuật, catalogue chính thức.
- **Lớp C — Web ngoài (chỉ allowlist):** domain trong danh sách cho phép, metadata nguồn rõ; không lấy nguồn vô danh/chất lượng thấp; **nội dung crawl không mặc nhiên đúng**.

## 2. Pipeline dữ liệu

Nguồn → Thu thập → **Kiểm tra quyền & bản quyền** → Làm sạch (HTML/PDF/text) → Tách đoạn (chunk) → Gắn metadata → Tạo embeddings → Lưu vector DB (pgvector) → Kiểm thử truy xuất → **Admin phê duyệt** → vào knowledge base.

## 3. Metadata tối thiểu mỗi nguồn

`source_id, title, author, publisher, source_type, original_url, publication_date, retrieved_at, language, copyright_status, license, review_status, reliability_level, artist_relevance, full_text_hash`

## 4. Mô hình trả lời

Câu hỏi → phân loại → truy xuất đoạn liên quan → **lọc theo độ tin cậy & quyền (RLS)** → **LLM chỉ trả lời từ dữ liệu tìm được** → dẫn nguồn → chấm confidence → **hiển thị hoặc từ chối**.

Câu trả lời tốt phải phân biệt rõ: đâu là **dữ kiện** · đâu là **nhận định của nguồn** · đâu là **tổng hợp của AI** · đâu là **vấn đề còn tranh luận** · **khi nào không đủ dữ liệu để kết luận**.

## 5. Quản trị crawl (Lớp C)

- **Thứ tự ưu tiên thu thập:** admin upload → API chính thức → RSS → sitemap → trang có cấu trúc ổn định → browser automation (chỉ khi bất đắc dĩ). **Không crawl cả internet.**
- **Allowlist** mỗi domain kèm: mục đích · loại nội dung · tần suất · quy tắc lưu trữ · tình trạng quyền · người phê duyệt.
- **Luồng an toàn:** scheduler → kiểm `robots.txt` → kiểm allowlist → lấy trang mới/đổi → loại menu & quảng cáo → so hash tránh trùng → hàng chờ duyệt → **admin duyệt** → vào kho.
- **Điểm pháp lý (bắt buộc nhớ):** tuân thủ `robots.txt` **không** đồng nghĩa với quyền **sao chép, lưu trữ hay tái xuất bản** — còn phải xét điều khoản sử dụng & bản quyền của nguồn. Với tư liệu có bản quyền: **diễn giải và dẫn nguồn**, không tái xuất bản nguyên văn.

## 6. Artist voice integrity (bất di)

AI **không bao giờ** gán ý nghĩa cho tác phẩm như thể đó là lời anh Thịnh. Khi được hỏi "anh Thịnh nghĩ gì về…", chỉ được trích **Lớp A có thật**; không có thì trả lời **không đủ dữ liệu**.

## 7. Bộ đánh giá (≥100 câu)

- **Loại câu hỏi:** có đáp án rõ · mơ hồ · không có dữ liệu · gây dẫn dắt · đòi AI bịa · tranh luận học thuật · hỏi giá · hỏi đời tư · xúc phạm.
- **Tiêu chí chấm:** Correctness · Faithfulness to source · Citation accuracy · Source quality · Coverage · Uncertainty handling · Safety · **Artist voice integrity**.
- **Tần suất:** chạy lại **hàng tháng** và mỗi khi đổi nguồn hoặc đổi model.
