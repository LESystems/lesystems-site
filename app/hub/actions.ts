"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type LoginState = { error?: string };
const credentials = z.object({ email: z.string().email("Informe um e-mail válido."), password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.") });

export async function signIn(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured()) return { error: "O acesso individual está sendo configurado pela LESystems." };
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "E-mail ou senha incorretos." };
  redirect("/hub");
}

export async function signOut() {
  if (isSupabaseConfigured()) await (await createSupabaseServerClient()).auth.signOut();
  redirect("/hub");
}

const proposalSchema = z.object({ projectId: z.string().uuid(), amount: z.coerce.number().positive().max(10000000), description: z.string().trim().min(10).max(2000) });

export async function createProposal(formData: FormData) {
  const parsed = proposalSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const session = await createSupabaseServerClient();
  const { data: { user } } = await session.auth.getUser();
  if (!user) return;
  const { data: profile } = await session.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["team", "admin"].includes(profile.role)) return;
  const admin = createSupabaseAdminClient();
  const { data: version } = await admin.from("project_versions").insert({ project_id: parsed.data.projectId, version: `proposta-${Date.now()}`, snapshot: { type: "commercial_proposal", description: parsed.data.description }, created_by: user.id }).select("id").single();
  if (!version) return;
  await admin.from("payments").insert({ project_id: parsed.data.projectId, version_id: version.id, amount_cents: Math.round(parsed.data.amount * 100), status: "proposal" });
  await admin.from("projects").update({ status: "awaiting_approval" }).eq("id", parsed.data.projectId);
  await admin.from("audit_logs").insert({ project_id: parsed.data.projectId, actor_id: user.id, action: "commercial_proposal_created", metadata: { amount_cents: Math.round(parsed.data.amount * 100) } });
  revalidatePath("/hub");
}

export async function approveProposal(formData: FormData) {
  const paymentId = z.string().uuid().safeParse(formData.get("paymentId"));
  if (!paymentId.success) return;
  const session = await createSupabaseServerClient();
  const { data: { user } } = await session.auth.getUser();
  if (!user) return;
  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin.from("profiles").select("customer_id").eq("id", user.id).single();
  const { data: payment } = await admin.from("payments").select("id,project_id,version_id,status,projects!inner(customer_id)").eq("id", paymentId.data).single();
  const project = payment?.projects as unknown as { customer_id: string } | null;
  if (!payment || payment.status !== "proposal" || !profile?.customer_id || project?.customer_id !== profile.customer_id) return;
  await admin.from("project_approvals").upsert({ project_id: payment.project_id, version_id: payment.version_id, approved_by: user.id }, { onConflict: "project_id,version_id" });
  await admin.from("payments").update({ status: "pending" }).eq("id", payment.id);
  await admin.from("projects").update({ status: "awaiting_payment" }).eq("id", payment.project_id);
  revalidatePath("/hub");
}

export async function confirmPixAndPublish(formData: FormData) {
  const paymentId = z.string().uuid().safeParse(formData.get("paymentId"));
  if (!paymentId.success) return;
  const session = await createSupabaseServerClient();
  const { data:{ user } } = await session.auth.getUser();
  if (!user) return;
  const { data:profile } = await session.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["team", "admin"].includes(profile.role)) return;
  const admin = createSupabaseAdminClient();
  const { data:payment } = await admin.from("payments").select("id,project_id,status,provider,projects!inner(public_id,project_type)").eq("id", paymentId.data).single();
  if (!payment || payment.status !== "pending" || payment.provider !== "inter_manual") return;
  const project = payment.projects as unknown as { public_id:number; project_type:string };
  const code = `LE-${String(project.public_id).padStart(6, "0")}`;
  await admin.from("payments").update({ status:"confirmed", confirmed_at:new Date().toISOString() }).eq("id", payment.id);
  const automaticallyPublishable = project.project_type !== "Sistema personalizado";
  await admin.from("projects").update(automaticallyPublishable ? { status:"published", progress:100, final_url:`/sites/${code}` } : { status:"payment_confirmed", progress:70 }).eq("id", payment.project_id);
  await admin.from("audit_logs").insert({ project_id:payment.project_id, actor_id:user.id, action:automaticallyPublishable ? "manual_pix_confirmed_and_product_published" : "manual_pix_confirmed", metadata:{ provider:"inter_manual", final_url:automaticallyPublishable ? `/sites/${code}` : null } });
  revalidatePath("/hub");
  revalidatePath(`/sites/${code}`);
}
