import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/roles";

type AuditEntry = {
  action: "create" | "update" | "delete" | "handle";
  entity: string;
  entityId?: string | null;
  summary?: string | null;
};

/**
 * Ghi 1 dong nhat ky he thong cho thao tac admin.
 * CO Y nuot loi: nhat ky khong duoc lam hong thao tac nghiep vu cua nguoi dung
 * (vd luu tac pham thanh cong nhung ghi log that bai -> van coi la thanh cong).
 */
export async function logAudit(entry: AuditEntry): Promise<void> {
  try {
    const current = await getCurrentUserRole();
    if (!current) return;

    const supabase = await createClient();
    await supabase.from("audit_log").insert({
      actor_id: current.userId,
      actor_email: current.email,
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entityId ?? null,
      summary: entry.summary ?? null,
    });
  } catch {
    // bo qua co y -- xem chu thich tren
  }
}
