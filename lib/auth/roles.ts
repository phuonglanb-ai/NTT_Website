import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Thu tu phai khop enum user_role trong Postgres (supabase/migrations/..._extensions_enums.sql)
// vi Postgres so sanh enum theo thu tu khai bao -- giu 2 noi dong bo thu cong.
export const ROLE_RANK = {
  guest: 0,
  member: 1,
  contributor: 2,
  editor: 3,
  artist: 4,
  moderator: 5,
  admin: 6,
} as const;

export type UserRole = keyof typeof ROLE_RANK;

export type CurrentUser = {
  userId: string;
  email: string | null;
  role: UserRole;
};

export async function getCurrentUserRole(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return {
    userId: user.id,
    email: user.email ?? null,
    role: (data?.role as UserRole | undefined) ?? "guest",
  };
}

/**
 * Dung o dau Server Component can gate quyen. Chua dang nhap -> redirect
 * thang toi trang login. Da dang nhap nhung role khong du -> KHONG redirect
 * (tranh vong lap ve login) -- tra ve authorized:false de trang tu hien
 * thong bao "khong co quyen".
 */
export async function requireRole(
  minRole: UserRole,
): Promise<CurrentUser & { authorized: boolean }> {
  const current = await getCurrentUserRole();

  if (!current) {
    redirect("/admin/login");
  }

  return {
    ...current,
    authorized: ROLE_RANK[current.role] >= ROLE_RANK[minRole],
  };
}
