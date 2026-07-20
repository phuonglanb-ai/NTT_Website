-- Du lieu tham khao that (khong phai mock) cho mediums/styles/themes de form
-- Admin co san lua chon khi tao tac pham dau tien. Rut tu ngon ngu mo ta
-- trong product-brief.md / content-model.md.

insert into public.mediums (name_vi, name_en) values
  ('Sơn dầu trên vải', 'Oil on canvas'),
  ('Acrylic trên vải', 'Acrylic on canvas'),
  ('Chì than trên giấy', 'Charcoal on paper'),
  ('Sơn mài', 'Lacquer'),
  ('Đồng', 'Bronze'),
  ('Thạch cao', 'Plaster');

insert into public.styles (name_vi, name_en) values
  ('Biểu hiện', 'Expressionism'),
  ('Trừu tượng', 'Abstract'),
  ('Hiện thực', 'Realism');

insert into public.themes (name_vi, name_en) values
  ('Tính nữ', 'Femininity'),
  ('Thiên nhiên', 'Nature'),
  ('Ký ức', 'Memory'),
  ('Hỗn mang', 'Chaos');
