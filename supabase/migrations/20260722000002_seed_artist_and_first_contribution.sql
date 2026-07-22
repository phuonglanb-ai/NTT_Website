-- Nhap NOI DUNG THAT cho trang Nghe si va bai dau tien o Ban huu & Doi thoai.
--
-- Truoc migration nay hai trang do hien "Noi dung dang duoc cap nhat", vi bang
-- artists / people / friend_contributions con trong. Bo noi dung tieng Viet moi
-- chi duoc ap vao PHAN CHU GIAO DIEN (messages/*.json); phan noi dung thuoc
-- database thi chua ai nhap.
--
-- Nguon va phe duyet -- xem docs/content-approvals.md:
--   * statement_vi (Loi nghe si): Nguyen Tuan Thinh duyet 22/07/2026 qua tin nhan.
--   * bio / journey: du kien tieu su, khong dien giai y nghia tac pham.
--   * Bai ban huu: tac gia Bui Phuong Lan, dang lan dau tren Facebook cua hoa si
--     ngay 23/09/2025, hoa si dong y dang lai.
--
-- CO Y de trong statement_en. Do la LOI NGHE SI, ma ban dich may khong duoc coi
-- la loi nghe si da phe duyet (CLAUDE.md muc 7). Tieu su va hanh trinh la du
-- kien nen dich duoc binh thuong.
--
-- Chay lai nhieu lan van an toan (idempotent).

update public.artists set
  bio_vi       = $txt$Nguyễn Tuấn Thịnh sinh năm 1962 tại Hà Nội. Ông tốt nghiệp Khoa Hội họa, Đại học Mỹ thuật Việt Nam năm 1985 và hoàn thành chương trình Thạc sĩ Mỹ thuật tại cùng trường năm 2011. Ông là hội viên Hội Mỹ thuật Việt Nam từ năm 1996.

Từ năm 1995 đến nay, Nguyễn Tuấn Thịnh tham gia các triển lãm Mỹ thuật Toàn quốc, triển lãm mỹ thuật thường niên của Hội Mỹ thuật Việt Nam và nhiều triển lãm nhóm tác giả.

Thực hành nghệ thuật của ông trải rộng từ hội họa đến điêu khắc, với những mạch quan tâm bền bỉ về hình thể người, vẻ đẹp tính nữ, cảnh quan, kiến trúc, ký ức nơi chốn và cấu trúc trừu tượng. Ông không tìm cách sao chép nguyên trạng đối tượng. Hình thể thường được bóp, nén hoặc giản lược; màu sắc được đặt cạnh nhau bằng những tương phản mạnh; không gian được tổ chức lại theo trực giác và nhịp cảm riêng.

Trong những tác phẩm về người phụ nữ, sự quyết liệt của đường nét và màu nguyên chất không hướng tới phô bày thân thể, mà làm hiện lên sức sống, sự gần gũi và phẩm chất tự nhiên của hình thể. Ở mảng phong cảnh và đời sống, cảnh vật cũng không chỉ là một địa điểm cụ thể, mà dần trở thành miền ký ức — nơi mái nhà, rừng, phố và kiến trúc cùng tồn tại trong một trạng thái vừa thực vừa nội tâm.

Dù đi qua hình tượng hay trừu tượng, hội họa hay điêu khắc, tác phẩm Nguyễn Tuấn Thịnh luôn được xây dựng trên một sức căng đặc trưng: giữa mạnh và mềm, gần gũi và bí ẩn, bản năng và kỷ luật, hỗn mang và trật tự.$txt$,
  bio_en       = $txt$Nguyễn Tuấn Thịnh was born in 1962 in Hanoi. He graduated from the Painting Faculty of the Vietnam University of Fine Arts in 1985 and completed a Master of Fine Arts at the same university in 2011. He has been a member of the Vietnam Fine Arts Association since 1996.

Since 1995 he has taken part in the National Fine Arts Exhibitions, the annual exhibitions of the Vietnam Fine Arts Association, and numerous group exhibitions.

His practice spans painting and sculpture, held together by enduring concerns: the human figure, the beauty of the feminine, landscape, architecture, the memory of places, and abstract structure. He does not seek to copy his subject as it is. Form is often compressed, condensed or simplified; colours are set against one another in strong contrast; space is reorganised according to intuition and his own sense of rhythm.

In the works about women, the force of line and pure colour is not directed at displaying the body, but at bringing forward its vitality, its intimacy and its natural quality. In the landscapes and scenes of daily life, a place is rarely just a location; it gradually becomes a realm of memory, where rooftops, forests, streets and architecture exist in a state at once real and interior.

Whether through figuration or abstraction, painting or sculpture, his work is built on a characteristic tension: between force and softness, intimacy and mystery, instinct and discipline, chaos and order.$txt$,
  statement_vi = $txt$Tôi bắt đầu từ những gì mắt nhìn thấy và thân thể cảm nhận: một dáng người, một mái nhà, một khoảng rừng hay một chuyển động của màu sắc.

Khi đi vào tác phẩm, chúng không còn là sự mô tả nguyên vẹn. Hình thể có thể được bóp lại, cảnh vật có thể được giản lược, màu sắc có thể được đẩy tới giới hạn cần thiết để giữ lấy nhịp sống bên trong đối tượng.

Trong hành trình ấy, người phụ nữ là một hiện diện đặc biệt. Tôi nhìn thấy ở họ vẻ đẹp tự nhiên, sức sống, tình yêu, sự gần gũi và cả những điều mà người nghệ sĩ không bao giờ có thể hiểu hết, nhưng kết nối sâu sắc. Một Miền bình yên có trong mỗi người.

Tôi không muốn giải thích tác phẩm thay người xem. Tôi chỉ mở ra một khoảng để mỗi người có thể nhìn, cảm nhận và gặp lại trong đó điều thuộc về riêng mình.$txt$,
  journey_vi   = $txt$1962 — Sinh tại Hà Nội, Việt Nam

1985 — Tốt nghiệp Khoa Hội họa, Đại học Mỹ thuật Việt Nam

1995–nay — Tham gia các triển lãm Mỹ thuật Toàn quốc, triển lãm mỹ thuật thường niên của Hội Mỹ thuật Việt Nam và các triển lãm nhóm tác giả

1996 — Trở thành hội viên Hội Mỹ thuật Việt Nam

2011 — Tốt nghiệp Thạc sĩ Mỹ thuật, Đại học Mỹ thuật Việt Nam$txt$,
  journey_en   = $txt$1962 — Born in Hanoi, Vietnam

1985 — Graduated from the Painting Faculty, Vietnam University of Fine Arts

1995–present — Participation in the National Fine Arts Exhibitions, the annual exhibitions of the Vietnam Fine Arts Association, and group exhibitions

1996 — Became a member of the Vietnam Fine Arts Association

2011 — Master of Fine Arts, Vietnam University of Fine Arts$txt$
where slug = 'nguyen-tuan-thinh';

insert into public.people (slug, name, role_note_vi, role_note_en, status)
values (
  'bui-phuong-lan',
  'Bùi Phương Lan',
  $txt$Người viết, bạn hữu của nghệ sĩ$txt$,
  $txt$Writer, friend of the artist$txt$,
  'published'
)
on conflict (slug) do update set
  name         = excluded.name,
  role_note_vi = excluded.role_note_vi,
  role_note_en = excluded.role_note_en,
  status       = excluded.status;

insert into public.friend_contributions
  (person_id, title_vi, title_en, body_vi, status, published_at)
select
  p.id,
  $txt$Bản giao hưởng dữ dội của thân thể và màu sắc$txt$,
  $txt$A fierce symphony of body and colour$txt$,
  $txt$Có những tác phẩm không dừng lại ở việc được nhìn ngắm, mà buộc ta phải đối diện. Tranh của Nguyễn Tuấn Thịnh (K24 – Đại học Mỹ thuật Việt Nam) thuộc về dạng đó. Khi xuất hiện trong không gian triển lãm, chúng không cần cố gắng “lấy lòng” khán giả; thay vào đó, chúng áp đặt sự hiện diện, gợi ra đối thoại, thậm chí gây bất an. Nhưng chính ở sự bất an ấy, nghệ thuật tìm được ý nghĩa của mình: khơi dậy những câu hỏi về thân thể, về dục tính, và về giới hạn mong manh của nhân sinh.

Sức mạnh của màu nguyên chất

Nguyễn Tuấn Thịnh chọn đi cùng màu nguyên chất – những đỏ, vàng, xanh cobalt rực rỡ, căng tràn, ít nhường chỗ cho sự pha loãng. Chúng không “trang điểm” cho hình thể, mà tự trở thành một lực lượng thị giác, đối thoại trực diện với người xem. Màu nguyên chất ở đây không chỉ rực, mà còn dữ dội, chói gắt, đẩy người xem ra khỏi vùng an toàn thị giác. Nếu Fauvism từng giải phóng màu sắc khỏi quy luật tự nhiên, thì Nguyễn Thịnh dường như đưa nó đi xa hơn, biến màu thành một thứ “năng lượng sinh tồn” phả thẳng vào thân thể nhân vật.

Kỹ thuật bóp hình – thân thể như biểu tượng

Điểm then chốt thứ hai là kỹ thuật bóp hình. Nguyễn Thịnh không quan tâm đến giải phẫu chính xác. Những đường cong, những dáng nằm, dáng ngồi được kéo giãn, xoắn vặn, phóng đại, để rồi thân thể hiện ra như một biểu tượng, hơn là một hiện thực. Phụ nữ trong tranh anh không phải là một cá nhân cụ thể; đó là một hiện thân – của ham muốn, của sức mạnh nguyên sơ, của sự mong manh và cả bi kịch. Ở đây, “cái đẹp” không nằm ở sự mượt mà, mà ở chính sự dữ dội, căng tràn, nơi thân thể bị đẩy ra ngoài phạm vi duyên dáng để trở thành ngôn ngữ biểu hiện.

Trải nghiệm trực diện

Người xem có thể cảm thấy mình bị hút vào những khoảng xanh thẳm – như sa vào một khối không khí đặc sệt, vừa mở rộng vừa ngột ngạt. Ở bức khác, họ có thể choáng ngợp trước sự trần trụi của cơ thể bị bóp khối – không còn là một thân thể để chiêm ngưỡng, mà là một hình hài căng nứt, như thể vẽ ra chính sự quá tải của ham muốn và khổ đau. Tranh không chỉ để nhìn, mà để chạm vào những giới hạn của chính cảm giác.

Thân thể – từ dục tính đến nhân sinh

Loạt tranh nude của Nguyễn Thịnh không dừng ở việc khơi gợi khoái cảm thị giác. Chúng đi xa hơn, mở ra khoảng giao thoa giữa ham muốn và bất an, giữa thăng hoa và đổ vỡ. Người xem có thể vừa bị mê hoặc bởi những gam đỏ rực, vừa thấy ngột ngạt, nặng nề trước dáng hình phóng đại. Chính sự lưỡng phân này tạo nên chiều sâu: thân thể phụ nữ trở thành nơi soi chiếu của cả những khát vọng sống lẫn những phận người chênh vênh.

Dấu ấn xã hội – văn hóa

Trong mỹ thuật Việt Nam, nude và biểu hiện cơ thể vẫn là vùng nhạy cảm, nhiều khi bị nhìn bằng ánh mắt dè dặt. Bằng tác phẩm của mình, Nguyễn Tuấn Thịnh như muốn thách thức sự hiện diện của mình ở giới hạn đó, mở rộng biên độ chấp nhận cái đẹp. Đó là một tuyên ngôn giải phóng thân thể – không phải để khêu gợi, mà để khẳng định quyền của nghệ sĩ trong việc đưa bản năng, dục tính và bi kịch con người vào hội họa. Đặt trong dòng chảy mỹ thuật đương đại, tiếng nói ấy không chỉ là cá nhân; nó là sự nhập cuộc vào một cuộc đối thoại rộng lớn hơn: giữa cái riêng và cái chung, giữa Việt Nam và xung quanh, giữa nghệ thuật như trang trí và nghệ thuật như sự chất vấn.

Xuất thân từ Khóa 24 – Đại học Mỹ thuật Việt Nam, Nguyễn Tuấn Thịnh đã chọn một con đường không dễ: con đường của xung đột và ám ảnh. Tranh của anh bước ra để trở nên gai góc, quyết liệt, đôi khi cực đoan. Nhưng chính ở đó, anh tạo nên dấu ấn, với những người xem như chúng tôi. Trong một triển lãm đông đúc, với nhiều tác phẩm đẹp tuyệt của họa sĩ cùng khóa, người ta khó lòng quên những mảng màu nguyên chất và những thân thể bị bóp hình đậm chất biểu hiện trữ tình của anh.

Tranh của Nguyễn Tuấn Thịnh không phải để “yêu ngay”, càng không phải để ngắm cho vui mắt. Chúng để lại một sự rung lắc – một cơn bão màu sắc, một ngọn lửa dữ dội thổi bùng lên trong mắt và neo lại trong trí nhớ. Anh nhắc ta nhớ rằng: nghệ thuật không chỉ để làm đẹp, mà để đối diện, để lay động, và để buộc ta nghĩ sâu hơn về chính sự sống và cái chết trong từng thân thể phàm trần. Và dục tính cũng có thể trong vắt một cách mãnh liệt đầy xúc cảm.$txt$,
  'published',
  timestamptz '2025-09-23 00:00:00+07'
from public.people p
where p.slug = 'bui-phuong-lan'
  and not exists (
    select 1 from public.friend_contributions fc
    where fc.person_id = p.id and fc.title_vi = $txt$Bản giao hưởng dữ dội của thân thể và màu sắc$txt$
  );
