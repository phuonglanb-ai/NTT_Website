/**
 * THU NGHIEM SAC NEN -- TAM THOI (thang 07/2026).
 *
 * Bon phuong an nen deu la gan-den, do bao hoa rat thap: du de cam nhan sac,
 * khong du de lam sai lech mau tranh (CLAUDE.md muc 4).
 *
 * Do tuong phan gan nhu khong doi giua bon phuong an vi ca bon cung do sang,
 * chi khac sac -- chu nga 16,4-16,9:1; chu mo 7,4-7,6:1.
 *
 * GO BO ca file nay va moi cho tham chieu sau khi chot phuong an.
 */
export const BG_OPTIONS = [
  {
    id: "",
    label: "Hiện tại",
    hex: "#0E0E10",
    note: "Xám lạnh trung tính — sắc mặc định của giao diện tối phần mềm.",
  },
  {
    id: "warm",
    label: "A · Nâu đen ấm",
    hex: "#141110",
    note: "Sắc phòng tranh. Tôn sắc da và hoàng thổ; làm xanh cobalt trong tranh nổi lên nhờ tương phản nóng–lạnh.",
  },
  {
    id: "night",
    label: "B · Xanh đêm",
    hex: "#0C0F16",
    note: "Nối với mảng cobalt trong tranh. Cảm giác đêm, tĩnh.",
  },
  {
    id: "forest",
    label: "C · Lục thẫm",
    hex: "#0B0F0D",
    note: "Nối với mảng rừng trong tranh phong cảnh. Trầm, ít gặp.",
  },
  {
    id: "ink",
    label: "D · Tím than",
    hex: "#110E14",
    note: "Sắc mực. Kín đáo, hơi trang trọng.",
  },
] as const;

export const BG_STORAGE_KEY = "ntt-bg-trial";

/**
 * Script chay TRUOC khi trinh duyet ve trang, de khong bi nhay mau.
 * Doc lua chon da luu roi gan thang vao <html data-bg="...">.
 */
export const BG_INIT_SCRIPT = `try{var v=localStorage.getItem(${JSON.stringify(
  BG_STORAGE_KEY,
)});if(v){document.documentElement.dataset.bg=v}}catch(e){}`;
