"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type InternalProjectState = { error?: string };
const schema = z.object({
  customerName: z.string().trim().min(2, "Informe o cliente.").max(120),
  segment: z.string().trim().max(100),
  projectName: z.string().trim().min(3, "Informe o nome do projeto.").max(160),
  projectType: z.string().trim().min(2).max(100),
  description: z.string().trim().max(3000),
  status: z.enum(["new_request", "brief_received", "under_analysis", "in_development", "internal_review"]),
  progress: z.coerce.number().int().min(0).max(100),
  contactName: z.string().trim().max(120), contactEmail: z.union([z.literal(""), z.string().email()]), contactPhone: z.string().trim().max(30),
  priority: z.enum(["low", "normal", "high", "urgent"]), objective: z.string().trim().min(10, "Descreva o objetivo do projeto.").max(3000),
  features: z.string().trim().max(6000), dueDate: z.string().trim().max(10), ownerName: z.string().trim().max(120), internalNotes: z.string().trim().max(3000),
});

export async function createInternalProject(_: InternalProjectState, formData: FormData): Promise<InternalProjectState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Revise os campos." };
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sua sessão expirou." };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["team", "admin"].includes(profile.role)) return { error: "Acesso restrito à equipe LESystems." };
  const input = parsed.data;
  const { data: customer, error: customerError } = await supabase.from("customers").insert({ name: input.customerName, segment: input.segment || null }).select("id").single();
  if (customerError) return { error: "Não foi possível cadastrar o cliente." };
  const { data: project, error: projectError } = await supabase.from("projects").insert({ customer_id: customer.id, name: input.projectName, project_type: input.projectType, description: input.description || null, status: input.status, progress: input.progress, created_by: user.id }).select("id, public_id").single();
  if (projectError) return { error: "Não foi possível cadastrar o projeto." };
  const requirements = input.features.split("\n").map(item => item.trim()).filter(Boolean);
  const { error: briefError } = await supabase.from("project_briefs").insert({ project_id: project.id, company: { name: input.customerName, segment: input.segment }, project: { type: input.projectType, objective: input.objective, features: requirements, priority: input.priority, due_date: input.dueDate || null, owner_name: input.ownerName }, contact: { name: input.contactName, email: input.contactEmail, phone: input.contactPhone }, additional_notes: input.internalNotes });
  if (briefError) return { error: "Projeto criado, mas o briefing interno não pôde ser salvo." };
  if (requirements.length) await supabase.from("project_requirements").insert({ project_id: project.id, executive_summary: input.objective, requirements, generated_by: "team_assisted_intake" });
  await supabase.from("audit_logs").insert({ project_id: project.id, actor_id: user.id, action: "project_created_by_team", metadata: { source: "team_hub", priority: input.priority, due_date: input.dueDate || null, requirements_count: requirements.length } });
  redirect(`/hub/equipe/projetos/novo?criado=LE-${String(project.public_id).padStart(6, "0")}`);
}
