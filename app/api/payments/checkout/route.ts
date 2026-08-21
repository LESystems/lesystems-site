import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const parsed = z.object({ paymentId: z.string().uuid() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Pagamento inválido." }, { status: 400 });
  const session = await createSupabaseServerClient();
  const { data: { user } } = await session.auth.getUser();
  if (!user) return Response.json({ error: "Entre no Hub para continuar." }, { status: 401 });
  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin.from("profiles").select("customer_id").eq("id", user.id).single();
  const { data: payment } = await admin.from("payments").select("id,project_id,amount_cents,status,projects!inner(name,customer_id)").eq("id", parsed.data.paymentId).single();
  const project = payment?.projects as unknown as { name:string; customer_id:string } | null;
  if (!payment || payment.status !== "pending" || !profile?.customer_id || project?.customer_id !== profile.customer_id) return Response.json({ error: "Este pagamento não está disponível para sua conta." }, { status: 403 });
  if (!project) return Response.json({ error: "Projeto não encontrado." }, { status: 404 });
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!token) return Response.json({ error: "O pagamento online está aguardando a ativação financeira da LESystems." }, { status: 503 });
  const origin = new URL(request.url).origin;
  const response = await fetch("https://api.mercadopago.com/checkout/preferences", { method:"POST", headers:{ Authorization:`Bearer ${token}`, "Content-Type":"application/json", "X-Idempotency-Key":payment.id }, body:JSON.stringify({ items:[{ id:payment.project_id, title:`LESystems · ${project.name}`, quantity:1, currency_id:"BRL", unit_price:(payment.amount_cents || 0)/100 }], external_reference:payment.id, back_urls:{ success:`${origin}/hub?pagamento=sucesso`, pending:`${origin}/hub?pagamento=pendente`, failure:`${origin}/hub?pagamento=falhou` }, auto_return:"approved", notification_url:`${origin}/api/payments/webhook` }) });
  const preference = await response.json();
  if (!response.ok || !preference.init_point) return Response.json({ error:"Não foi possível iniciar o pagamento agora." }, { status:502 });
  await admin.from("payments").update({ provider:"mercado_pago", provider_reference:preference.id }).eq("id", payment.id);
  return Response.json({ url: preference.init_point });
}
