import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = await request.json().catch(() => ({}));
  const paymentId = body?.data?.id || url.searchParams.get("data.id");
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!paymentId || !token) return Response.json({ ok:true });
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(String(paymentId))}`, { headers:{ Authorization:`Bearer ${token}` } });
  if (!response.ok) return Response.json({ ok:false }, { status:502 });
  const providerPayment = await response.json();
  const internalId = providerPayment.external_reference;
  if (!internalId) return Response.json({ ok:true });
  const admin = createSupabaseAdminClient();
  const status = providerPayment.status === "approved" ? "confirmed" : providerPayment.status === "rejected" || providerPayment.status === "cancelled" ? "failed" : "pending";
  const { data: payment } = await admin.from("payments").update({ status, provider_reference:String(providerPayment.id), confirmed_at:status === "confirmed" ? new Date().toISOString() : null }).eq("id", internalId).select("project_id").maybeSingle();
  if (payment && status === "confirmed") {
    await admin.from("projects").update({ status:"payment_confirmed" }).eq("id", payment.project_id);
    await admin.from("audit_logs").insert({ project_id:payment.project_id, action:"payment_confirmed", metadata:{ provider:"mercado_pago", provider_payment_id:String(providerPayment.id) } });
  }
  return Response.json({ ok:true });
}
