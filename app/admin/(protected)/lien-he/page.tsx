import { getInquiriesForAdmin } from "@/lib/content/inquiries";
import { setInquiryHandled } from "./actions";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiriesForAdmin();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-3xl">Lời nhắn / Private Inquiry</h1>
      <p className="mt-2 text-sm text-text-muted">
        Chỉ hiển thị trong khu quản trị — không bao giờ lộ ra trang công khai.
      </p>

      {inquiries.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có lời nhắn nào.
        </p>
      ) : (
        <ul className="mt-10 flex flex-col gap-4">
          {inquiries.map((inq) => (
            <li
              key={inq.id}
              className={`border p-4 ${inq.handled ? "border-white/10 opacity-60" : "border-white/20"}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-serif text-lg">{inq.name}</span>
                <span className="text-xs text-text-muted">{inq.createdAt.slice(0, 16).replace("T", " ")}</span>
              </div>
              <a href={`mailto:${inq.email}`} className="text-sm text-accent-cobalt-bright hover:underline">
                {inq.email}
              </a>
              <p className="mt-3 whitespace-pre-wrap text-text">{inq.message}</p>
              <form
                action={async () => {
                  "use server";
                  await setInquiryHandled(inq.id, !inq.handled);
                }}
                className="mt-4"
              >
                <button
                  type="submit"
                  className="border border-white/15 px-3 py-1 text-xs text-text-muted hover:text-text"
                >
                  {inq.handled ? "Đánh dấu chưa xử lý" : "Đánh dấu đã xử lý"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
