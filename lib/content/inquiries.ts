import { createClient } from "@/lib/supabase/server";

export type AdminInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  handled: boolean;
  createdAt: string;
};

export async function getInquiriesForAdmin(): Promise<AdminInquiry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("id, name, email, message, handled, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    handled: row.handled,
    createdAt: row.created_at,
  }));
}
