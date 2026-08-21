import type { Metadata } from "next";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import HubApp, { type CommerceProject } from "./HubApp";
import HubLogin from "./HubLogin";
import { redirect } from "next/navigation";
import "./hub.css";
import "./login.css";
import "./refine.css";
import "./fix.css";
import "./commerce.css";

export const metadata: Metadata = {
  title: "LESystems Hub",
  description: "Projetos, atendimento e operação LESystems em um só lugar.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "LESystems Hub",
    description: "Projetos, atendimento e operação LESystems em um só lugar.",
    images: [],
  },
  twitter: {
    title: "LESystems Hub",
    description: "Projetos, atendimento e operação LESystems em um só lugar.",
    images: [],
  },
};

export default async function HubPage() {
  if (!isSupabaseConfigured()) return <HubLogin />;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <HubLogin />;
  if (user.user_metadata?.must_change_password === true) redirect("/hub/redefinir-senha");
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle();
  const teamAllowed = profile?.role === "admin" || profile?.role === "team";
  const { data: projects } = await supabase.from("projects").select("id,public_id,name,project_type,status,progress,created_at").order("created_at", { ascending: false });
  const ids = (projects || []).map(project => project.id);
  const { data: payments } = ids.length ? await supabase.from("payments").select("id,project_id,version_id,amount_cents,status,provider_reference").in("project_id", ids).order("created_at", { ascending: false }) : { data: [] };
  const versionIds = (payments || []).map(payment => payment.version_id);
  const { data: versions } = versionIds.length ? await supabase.from("project_versions").select("id,snapshot").in("id", versionIds) : { data: [] };
  const commerceProjects: CommerceProject[] = (projects || []).map(project => {
    const payment = (payments || []).find(item => item.project_id === project.id);
    const version = payment ? (versions || []).find(item => item.id === payment.version_id) : undefined;
    const snapshot = version?.snapshot as { description?: string } | null;
    return { ...project, code: `LE-${String(project.public_id).padStart(6, "0")}`, proposal: payment ? { id: payment.id, amountCents: payment.amount_cents || 0, status: payment.status, description: snapshot?.description || "Proposta comercial LESystems" } : null };
  });
  return <HubApp initialRole={teamAllowed ? "team" : "client"} canSwitchRole={teamAllowed} userName={profile?.full_name || user.email || "Usuário LESystems"} projects={commerceProjects} />;
}
