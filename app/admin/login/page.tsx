import { redirect } from "next/navigation";
import { getCurrentUserRole } from "@/lib/auth/roles";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const current = await getCurrentUserRole();
  if (current) {
    redirect("/admin");
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="font-serif text-2xl">Đăng nhập quản trị</h1>
      <p className="mt-2 text-sm text-text-muted">
        Chỉ dành cho tài khoản được cấp thủ công (Editor/Artist/Admin).
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  );
}
