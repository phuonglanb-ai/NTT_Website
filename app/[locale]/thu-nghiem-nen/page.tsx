import { notFound } from "next/navigation";
import { getPublishedArtworks } from "@/lib/content/artworks";
import { BG_OPTIONS } from "@/lib/theme-trial";
import { Motif } from "@/components/ui/motif";

/**
 * Trang SO SANH SAC NEN -- tam thoi, chi de chot phuong an.
 *
 * Bay bon phuong an nen CANH NHAU cung mot luc, moi o deu co: tranh that,
 * tieu de, than bai, chu mo, lien ket, nut va o nhap. Muc dich chinh la nhin
 * xem TRANH co bi doi sac khi nen doi hay khong -- day la phep thu quan trong
 * nhat (CLAUDE.md muc 4: khong duoc lam sai lech mau nguyen tac).
 *
 * Khong bao gio ton tai tren website that: production tra 404.
 * GO BO ca thu muc nay sau khi chot.
 */
export const dynamic = "force-dynamic";

const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

export const metadata = { robots: { index: false, follow: false } };

export default async function BgTrialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (IS_PRODUCTION) notFound();

  const { locale } = await params;
  const { items } = await getPublishedArtworks(null, { page: 1 });
  const artwork = items.find((a) => a.primaryImageUrl) ?? null;
  const isEn = locale === "en";

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-serif text-3xl uppercase tracking-[0.14em]">
        So sánh sắc nền
      </h1>
      <p className="mt-5 max-w-2xl leading-[1.5] text-text-muted">
        Bốn phương án bày cạnh nhau để so trực tiếp. Điều cần nhìn kỹ nhất:{" "}
        <span className="text-text">
          màu của bức tranh có bị đổi khi nền đổi không
        </span>
        . Mắt người đọc màu theo tương quan với vùng bao quanh, nên nền càng
        bão hoà thì tranh càng bị nhuộm theo. Cả bốn phương án đều giữ độ bão
        hoà rất thấp để tránh điều đó.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-[1.5] text-text-muted">
        Bảng ở góc dưới bên phải đổi sắc nền cho{" "}
        <span className="text-text">toàn bộ website</span> — dùng nó để duyệt
        các trang thật. Trang này chỉ để so sánh cạnh nhau.
      </p>

      {!artwork && (
        <p className="mt-10 border border-dashed border-white/15 px-6 py-8 text-text-muted">
          Chưa có tác phẩm nào được xuất bản kèm ảnh, nên chưa thể xem phép thử
          quan trọng nhất. Hãy xuất bản ít nhất một tác phẩm rồi mở lại trang
          này.
        </p>
      )}

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {BG_OPTIONS.map((opt) => (
          <div
            key={opt.id || "default"}
            data-bg-sample={opt.id || undefined}
            className="border border-white/15 bg-bg p-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-xl">{opt.label}</h2>
              <code className="text-xs text-text-muted">{opt.hex}</code>
            </div>
            <p className="mt-2 text-sm leading-snug text-text-muted">{opt.note}</p>

            {artwork?.primaryImageUrl && (
              <figure className="mt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artwork.primaryImageUrl}
                  alt={
                    (isEn ? artwork.primaryImageAltEn : artwork.primaryImageAltVi) ?? ""
                  }
                  className="w-full"
                />
                <figcaption className="mt-2 text-xs text-text-muted">
                  {isEn ? artwork.titleEn : artwork.titleVi} · {artwork.year}
                </figcaption>
              </figure>
            )}

            {/* Mau cac thanh phan giao dien tren nen nay */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="flex items-start gap-3 font-serif text-lg leading-snug text-text">
                <Motif className="mt-[0.35rem] h-4 w-4 flex-none text-accent-cobalt-bright" />
                <span>Hình thể, ký ức, khát vọng và vẻ đẹp tính nữ.</span>
              </p>
              <p className="mt-4 leading-[1.5] text-text-muted">
                Thân bài trên nền này. Màu nguyên chất, tương phản mạnh và những
                cấu trúc hình thể quyết liệt tạo nên sức căng thị giác.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a href="#" className="text-sm text-accent-cobalt-bright hover:underline">
                  Liên kết →
                </a>
                <span className="inline-block border border-accent-cobalt-bright px-4 py-2 text-sm text-text">
                  Nút chính
                </span>
                <span className="inline-block border border-white/20 px-4 py-2 text-sm text-text-muted">
                  Nút phụ
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="border border-white/15 bg-bg-elevated px-3 py-2 text-sm text-text-muted">
                  Ô nhập liệu
                </span>
                <span className="text-sm text-accent-oxblood">Thông báo lỗi</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <h2 className="font-serif text-xl">Đã đo sẵn</h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm leading-[1.5] text-text-muted">
          <li>
            Chữ ngà trên nền: <span className="text-text">16,4 – 16,9:1</span> ở cả
            bốn phương án (chuẩn WCAG cần 4,5:1).
          </li>
          <li>
            Chữ mờ trên nền: <span className="text-text">7,4 – 7,6:1</span>.
          </li>
          <li>
            Cobalt sáng dùng cho chữ và viền:{" "}
            <span className="text-text">6,36 – 6,53:1</span>. Sắc cobalt đậm cũ chỉ
            đạt 2,49:1 — không đạt chuẩn, đã sửa.
          </li>
          <li>
            Vì cả bốn cùng độ sáng, chỉ khác sắc, nên{" "}
            <span className="text-text">chọn phương án nào cũng không ảnh hưởng
            khả năng đọc</span>. Hãy chọn theo cảm nhận thị giác và theo việc
            tranh lên màu đẹp nhất trên nền nào.
          </li>
        </ul>
      </div>
    </section>
  );
}
