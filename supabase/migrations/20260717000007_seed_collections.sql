-- Ba coi la du lieu cau truc co dinh (content-model.md), khong phai du lieu
-- demo/mock -- nen nam trong migration va chay ca tren production.

insert into public.collections (slug, name_vi, name_en, note_vi, note_en) values
  ('nang', 'Thế giới của Nàng', 'The World of Nàng',
   'Nude, tính nữ — lõi thương hiệu. Tĩnh lặng, không bình luận.',
   'Nude, femininity — the brand''s core. Quiet, no comments.'),
  ('doi', 'Rung cảm Đời sống', 'Vibrations of Life',
   'Đời sống, phong cảnh, chân dung.',
   'Everyday life, landscape, portraiture.'),
  ('hon-mang', 'Hỗn mang & Trật tự', 'Chaos & Order',
   'Trừu tượng, thử nghiệm, bóp dáng.',
   'Abstract, experimental, distorted form.')
on conflict (slug) do nothing;
