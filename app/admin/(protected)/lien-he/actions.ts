"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/roles";
import { logAudit } from "@/lib/audit";

export async function setInquiryHandled(id: string, handled: boolean) {
  // Chi Admin duoc cap nhat (dung RLS "admin update inquiries").
  const current = await requireRole("admin");
  if (!current.authorized) return;

  const supabase = await createClient();
  await supabase.from("inquiries").update({ handled }).eq("id", id);

  await logAudit({
    action: "handle",
    entity: "inquiry",
    entityId: id,
    summary: handled ? "Đánh dấu đã xử lý" : "Đánh dấu chưa xử lý",
  });

  revalidatePath("/admin/lien-he");
}
