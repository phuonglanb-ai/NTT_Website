-- Ban tieng Anh cua LOI NGHE SI cho trang Nghe si.
--
-- Truoc day statement_en de trong CO CHU Y: ban dich may khong duoc coi la loi
-- nghe si da phe duyet (CLAUDE.md muc 7), nen giao dien tieng Anh khong hien
-- khoi nay.
--
-- Nay da co phe duyet: Nguyen Tuan Thinh duyet ban dich ngay 22/07/2026.
-- Ghi tai docs/content-approvals.md.
--
-- Chay lai nhieu lan van an toan (idempotent).

update public.artists set
  statement_en = $txt$I begin with what the eye sees and the body feels: the line of a figure, a rooftop, a stretch of forest, a movement of colour.

As they enter the work, they are no longer intact descriptions. A form may be compressed, a landscape simplified, a colour pushed as far as it needs to go to hold the pulse of life inside the subject.

Along that path, women are a presence apart. In them I see natural beauty, vitality, love, closeness — and also what an artist can never fully understand, yet feels deeply connected to. A realm of peace that lives in each of us.

I do not want to explain the work in the viewer's place. I only open a space where each person can look, feel, and meet again there something of their own.$txt$
where slug = 'nguyen-tuan-thinh';
