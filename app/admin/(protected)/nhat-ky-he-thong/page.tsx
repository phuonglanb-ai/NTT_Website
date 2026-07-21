import { requireRole } from "@/lib/auth/roles";
import { createClient } from "@/lib/supabase/server";

const ACTION_LABEL: Record<string, string> = {
  create: "Tạo mới",
  update: "Chỉnh sửa",
  delete: "Xoá",
  handle: "Xử lý",
};

export default async function AuditLogPage() {
  // Chi Admin duoc xem nhat ky he thong (RLS cung chan o tang DB).
  const current = await requireRole("admin");
  if (!current.authorized) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-serif text-2xl">Không có quyền</h1>
        <p className="mt-4 text-text-muted">
          Chỉ tài khoản Admin mới xem được nhật ký hệ thống.
        </p>
      </section>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("audit_log")
    .select("id, actor_email, action, entity, entity_id, summary, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = data ?? [];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-serif text-3xl">Nhật ký hệ thống</h1>
      <p className="mt-2 text-sm text-text-muted">
        Ghi lại các thao tác chỉnh sửa nội dung. Chỉ Admin xem được; không sửa/xoá được.
      </p>

      {rows.length === 0 ? (
        <p className="mt-16 border border-dashed border-white/15 px-6 py-10 text-center text-text-muted">
          Chưa có thao tác nào được ghi lại.
        </p>
      ) : (
        <table className="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-text-muted">
              <th className="py-2 pr-4">Thời gian</th>
              <th className="py-2 pr-4">Người thực hiện</th>
              <th className="py-2 pr-4">Thao tác</th>
              <th className="py-2 pr-4">Đối tượng</th>
              <th className="py-2 pr-4">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/5">
                <td className="py-2 pr-4 text-text-muted">
                  {row.created_at.slice(0, 16).replace("T", " ")}
                </td>
                <td className="py-2 pr-4 text-text-muted">{row.actor_email ?? "—"}</td>
                <td className="py-2 pr-4">{ACTION_LABEL[row.action] ?? row.action}</td>
                <td className="py-2 pr-4 text-text-muted">{row.entity}</td>
                <td className="py-2 pr-4 text-text-muted">{row.summary ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
