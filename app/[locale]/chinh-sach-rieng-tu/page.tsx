import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư — Nguyễn Tuấn Thịnh",
};

// Ban thao do agent soan -- CAN Lan/nghe si doc duyet truoc khi ra mat that
// (xem docs/runbook.md, muc "Truoc khi ra mat").
const CONTENT = {
  vi: {
    title: "Chính sách quyền riêng tư",
    updated: "Cập nhật lần cuối: 2026",
    sections: [
      {
        h: "Chúng tôi thu thập gì",
        p: "Website này không yêu cầu bạn tạo tài khoản. Dữ liệu cá nhân duy nhất chúng tôi nhận là thông tin bạn tự nguyện điền vào form Liên hệ: họ tên, địa chỉ email và nội dung lời nhắn.",
      },
      {
        h: "Dùng để làm gì",
        p: "Chỉ để đọc và phản hồi lời nhắn của bạn. Chúng tôi không dùng thông tin này cho quảng cáo, không bán, không chia sẻ với bên thứ ba.",
      },
      {
        h: "Ai xem được",
        p: "Chỉ nghệ sĩ và người quản trị được cấp quyền mới đọc được lời nhắn. Thông tin này không hiển thị ở bất kỳ trang công khai nào.",
      },
      {
        h: "Cookie",
        p: "Website không dùng cookie theo dõi hay quảng cáo. Chúng tôi chỉ dùng một cookie ghi nhớ ngôn ngữ bạn chọn (tiếng Việt hoặc tiếng Anh), và cookie đăng nhập dành riêng cho người quản trị. Thống kê lượt truy cập (nếu có) được thu thập ẩn danh, không dùng cookie và không nhận diện cá nhân.",
      },
      {
        h: "Lưu trữ và bảo mật",
        p: "Dữ liệu được lưu trên hạ tầng của Supabase, có kiểm soát truy cập theo vai trò. Kết nối tới website luôn được mã hoá (HTTPS).",
      },
      {
        h: "Quyền của bạn",
        p: "Bạn có thể yêu cầu xem, sửa hoặc xoá thông tin bạn đã gửi. Hãy liên hệ qua trang Liên hệ và nêu rõ yêu cầu.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 2026",
    sections: [
      {
        h: "What we collect",
        p: "This website does not require you to create an account. The only personal data we receive is what you voluntarily enter in the Contact form: your name, email address and message.",
      },
      {
        h: "How we use it",
        p: "Only to read and reply to your message. We do not use it for advertising, do not sell it, and do not share it with third parties.",
      },
      {
        h: "Who can see it",
        p: "Only the artist and authorised administrators can read messages. This information never appears on any public page.",
      },
      {
        h: "Cookies",
        p: "This website uses no tracking or advertising cookies. We only use a cookie remembering your chosen language (Vietnamese or English), plus a sign-in cookie for administrators. Visit statistics, if collected, are anonymous, cookieless and do not identify individuals.",
      },
      {
        h: "Storage and security",
        p: "Data is stored on Supabase infrastructure with role-based access control. Connections to this website are always encrypted (HTTPS).",
      },
      {
        h: "Your rights",
        p: "You may request access to, correction of, or deletion of the information you submitted. Please reach us via the Contact page.",
      },
    ],
  },
};

export default async function PrivacyPage({
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
