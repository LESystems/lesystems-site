import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getInterPixCharge, isInterConfigured } from "@/lib/inter";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const notifications = Array.isArray(body?.pix) ? body.pix : [];
  if (!isInterConfigured()) return Response.json({ ok:true });
  const admin = createSupabaseAdminClient();
  for (const notification of notifications) {
    const txid = String(notification?.txid || "");
    if (!txid) continue;
    try {
      const charge = await getInterPixCharge(txid);
      if (charge.status !== "CONCLUIDA") continue;
      const { data:payment } = await admin.from("payments").update({ status:"confirmed", confirmed_at:new Date().toISOString() }).eq("provider", "banco_inter").eq("provider_reference", txid).select("project_id").maybeSingle();
      if (payment) {
        await admin.from("projects").update({ status:"payment_confirmed" }).eq("id", payment.project_id);
        await admin.from("audit_logs").insert({ project_id:payment.project_id, action:"payment_confirmed", metadata:{ provider:"banco_inter", txid } });
      }
    } catch (error) { console.error("Inter webhook validation failed", error instanceof Error ? error.message : "Unknown error"); }
  }
  return Response.json({ ok:true });
}
