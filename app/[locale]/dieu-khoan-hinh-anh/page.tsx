import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng hình ảnh — Nguyễn Tuấn Thịnh",
};

// Ban thao do agent soan -- CAN Lan/nghe si doc duyet truoc khi ra mat that
// (xem docs/runbook.md, muc "Truoc khi ra mat").
const CONTENT = {
  vi: {
    title: "Điều khoản sử dụng hình ảnh",
    updated: "Cập nhật lần cuối: 2026",
    sections: [
      {
        h: "Bản quyền",
        p: "Toàn bộ tác phẩm và hình ảnh tác phẩm trên website này thuộc bản quyền của họa sĩ Nguyễn Tuấn Thịnh. Mọi quyền được bảo lưu.",
      },
      {
        h: "Bạn được làm gì",
        p: "Bạn được tự do xem, thưởng lãm trực tuyến và chia sẻ đường dẫn tới trang tác phẩm.",
      },
      {
        h: "Bạn không được làm gì nếu chưa có văn bản cho phép",
        p: "Tải xuống, sao chép, in ấn, chỉnh sửa, tái xuất bản hình ảnh tác phẩm; sử dụng cho mục đích thương mại; hoặc dùng làm dữ liệu huấn luyện cho hệ thống trí tuệ nhân tạo.",
      },
      {
        h: "Dành cho báo chí",
        p: "Một số tác phẩm được đánh dấu cho phép sử dụng với mục đích báo chí. Vui lòng liên hệ trước để nhận bản ảnh phù hợp cùng thông tin ghi nguồn chính xác.",
      },
      {
        h: "Xin phép sử dụng",
        p: "Mọi đề nghị sử dụng hình ảnh, hợp tác trưng bày hoặc xuất bản, xin gửi qua trang Liên hệ. Vui lòng nêu rõ mục đích, phạm vi và thời hạn sử dụng.",
      },
    ],
  },
  en: {
    title: "Image Use Terms",
    updated: "Last updated: 2026",
    sections: [
      {
        h: "Copyright",
        p: "All artworks and artwork images on this website are copyright of the painter Nguyễn Tuấn Thịnh. All rights reserved.",
      },
      {
        h: "What you may do",
        p: "You are free to view the works online and to share links to artwork pages.",
      },
      {
        h: "What you may not do without written permission",
        p: "Download, copy, print, modify or republish artwork images; use them commercially; or use them as training data for artificial intelligence systems.",
      },
      {
        h: "For press",
        p: "Selected works are marked as available for press use. Please contact us in advance to receive suitable image files together with correct credit information.",
      },
      {
        h: "Requesting permission",
        p: "For image use, exhibition or publishing proposals, please write via the Contact page, stating the purpose, scope and duration of use.",
      },
    ],
  },
};

export default async function ImageTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = locale === "en" ? CONTENT.en : CONTENT.vi;

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-3xl">{c.title}</h1>
      <p className="mt-2 text-sm text-text-muted">{c.updated}</p>

      <div className="mt-12 flex flex-col gap-10">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-sans text-xs uppercase tracking-[0.24em] text-text-muted">
              {s.h}
            </h2>
            <p className="mt-3 leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
