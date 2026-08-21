import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const briefSchema = z.object({
  companyName: z.string().trim().min(2).max(120), segment: z.string().trim().min(2).max(100),
  companyDescription: z.string().trim().min(10).max(3000), audience: z.string().trim().max(1000),
  projectType: z.enum(["Site institucional","Landing page","Site empresarial","Página profissional","Portal simples","Sistema personalizado"]),
  objective: z.string().trim().min(10).max(3000), features: z.string().trim().max(5000),
  additionalNotes: z.string().trim().min(10).max(5000), colors: z.string().trim().max(500),
  style: z.string().trim().max(100), references: z.string().trim().max(3000),
  contactName: z.string().trim().min(2).max(120), email: z.string().email().max(200), phone: z.string().trim().min(8).max(30),
});

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const parsed = briefSchema.safeParse(Object.fromEntries([...form.entries()].filter(([, value]) => typeof value === "string")));
    if (!parsed.success) return Response.json({ error: "Revise os campos obrigatórios e tente novamente." }, { status: 400 });
    const input = parsed.data;
    const supabase = createSupabaseAdminClient();
    const { data: customer, error: customerError } = await supabase.from("customers").insert({ name: input.companyName, segment: input.segment }).select("id").single();
    if (customerError) throw customerError;
    const { data: project, error: projectError } = await supabase.from("projects").insert({ customer_id: customer.id, name: `${input.projectType} · ${input.companyName}`, project_type: input.projectType, description: input.objective }).select("id, public_id").single();
    if (projectError) throw projectError;
    const { error: briefError } = await supabase.from("project_briefs").insert({ project_id: project.id, company: { name: input.companyName, segment: input.segment, description: input.companyDescription, audience: input.audience }, project: { type: input.projectType, objective: input.objective, features: input.features }, identity: { colors: input.colors, style: input.style, references: input.references }, contact: { name: input.contactName, email: input.email.toLowerCase(), phone: input.phone }, additional_notes: input.additionalNotes });
    if (briefError) throw briefError;
    await supabase.from("audit_logs").insert({ project_id: project.id, action: "project_request_created", metadata: { source: "lesystems_express" } });
    return Response.json({ ok: true, projectId: `LE-${String(project.public_id).padStart(6, "0")}` }, { status: 201 });
  } catch (error) {
    console.error("Project intake failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "A plataforma ainda está sendo conectada. Fale com a LESystems para registrar sua solicitação." }, { status: 503 });
  }
}
