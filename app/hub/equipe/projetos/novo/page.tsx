import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import InternalProjectForm from "./InternalProjectForm";
import "../../../hub.css";
import "../../../refine.css";
import "../../../fix.css";
import "./new-project.css";

export default async function NewTeamProjectPage({ searchParams }: PageProps<"/hub/equipe/projetos/novo">) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/hub");
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();
  if (!profile || !["team", "admin"].includes(profile.role)) redirect("/hub");
  const { criado } = await searchParams;
  return <main className="internal-project-page"><header><Link href="/hub" className="internal-brand"><Image src="/icon.png" width={40} height={40} alt="" /><div><strong>LESystems</strong><small>Operação interna</small></div></Link><div><span>{profile.full_name}</span><Link href="/hub">Voltar ao painel</Link></div></header><div className="internal-project-shell"><div className="internal-heading"><div><p>Equipe · Projetos</p><h1>Cadastrar novo projeto</h1><span>Este fluxo é interno e separado da solicitação enviada pelo cliente.</span></div><Link href="/criar-projeto">Ver formulário do cliente ↗</Link></div>{criado && <div className="internal-success" role="status"><strong>Projeto {criado} cadastrado.</strong><span>O registro já está disponível no banco operacional da LESystems.</span></div>}<InternalProjectForm /></div></main>;
}
