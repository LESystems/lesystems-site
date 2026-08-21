import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createInterPixCharge, isInterConfigured } from "@/lib/inter";

export async function POST(request: Request) {
  const parsed = z.object({ paymentId:z.string().uuid() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error:"Pagamento inválido." }, { status:400 });
  const session = await createSupabaseServerClient();
  const { data:{ user } } = await session.auth.getUser();
  if (!user) return Response.json({ error:"Entre no Hub para continuar." }, { status:401 });
  const admin = createSupabaseAdminClient();
  const { data:profile } = await admin.from("profiles").select("customer_id").eq("id", user.id).single();
  const { data:payment } = await admin.from("payments").select("id,project_id,amount_cents,status,provider_reference,projects!inner(name,customer_id)").eq("id", parsed.data.paymentId).single();
  const project = payment?.projects as unknown as { name:string; customer_id:string } | null;
  if (!payment || payment.status !== "pending" || !profile?.customer_id || project?.customer_id !== profile.customer_id) return Response.json({ error:"Este pagamento não está disponível para sua conta." }, { status:403 });
  if (!project) return Response.json({ error:"Projeto não encontrado." }, { status:404 });
  if (!isInterConfigured()) return Response.json({ error:"O Pix está aguardando a ativação da conta Inter Empresas da LESystems." }, { status:503 });
  try {
    const txid = payment.provider_reference || payment.id.replaceAll("-", "").slice(0, 32);
    const charge = await createInterPixCharge({ txid, amountCents:payment.amount_cents || 0, description:`LESystems - ${project.name}` });
    await admin.from("payments").update({ provider:"banco_inter", provider_reference:charge.txid }).eq("id", payment.id);
    return Response.json({ pixCode:charge.pixCopiaECola, txid:charge.txid, expiresIn:charge.calendario?.expiracao || 86400 });
  } catch (error) {
    console.error("Inter Pix checkout failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error:"Não foi possível gerar o Pix agora. Tente novamente em alguns instantes." }, { status:502 });
  }
}
