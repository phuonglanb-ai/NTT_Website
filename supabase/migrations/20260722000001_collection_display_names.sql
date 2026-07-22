-- Dong bo TEN HIEN THI cua ba coi voi bo noi dung tieng Viet (22/07/2026).
--
-- Chi doi ten hien thi va ghi chu. KHONG doi `slug` -- slug la ma ky thuat on
-- dinh, dung trong URL va truy van (CLAUDE.md muc 1).
--
-- Ten coi tren cac trang cong khai lay tu `messages/vi.json` va `messages/en.json`;
-- bang nay chi phuc vu dropdown trong trang quan tri. Cap nhat de nguoi nhap lieu
-- thay dung ten ma khach nhin thay, khong bi lech.
--
-- Doi lai giao dien tieng Viet chi hien "Nang", tieng Anh chi hien "Her" -- khong
-- ghep "Nang - Her" tren cung mot giao dien.

update public.collections
set name_vi = 'Nàng',
    name_en = 'Her',
    note_vi = 'Hình thể, ký ức, khát vọng và vẻ đẹp tính nữ.',
    note_en = 'Form, memory, longing and the beauty of the feminine.'
where slug = 'nang';

update public.collections
set name_vi = 'Rung cảm đời sống',
    name_en = 'Vibrations of Life',
    note_vi = 'Cảnh vật, kiến trúc và những miền ký ức nơi con người đã sống và đi qua.',
    note_en = 'Landscape, architecture, and the remembered places people have lived and passed through.'
where slug = 'doi';

update public.collections
set name_vi = 'Hỗn mang & Trật tự',
    name_en = 'Chaos & Order',
    note_vi = 'Những thử nghiệm về màu sắc, cấu trúc, biến dạng và vật chất.',
    note_en = 'Experiments in colour, structure, distortion and material.'
where slug = 'hon-mang';
