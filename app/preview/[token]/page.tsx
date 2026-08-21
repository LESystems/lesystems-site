import { createHash } from "node:crypto";
import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import "./preview.css";

type Snapshot = { type:string; company:string; segment:string; description:string; audience:string; objective:string; features:string[]; colors:string; style:string };

export default async function AutomaticPreviewPage({ params }: { params:Promise<{token:string}> }) {
  const { token } = await params;
  if (!/^[a-f0-9]{48}$/.test(token)) notFound();
  const hash = createHash("sha256").update(token).digest("hex");
  const admin = createSupabaseAdminClient();
  const { data:preview } = await admin.from("project_previews").select("expires_at,project_versions!inner(snapshot)").eq("access_token_hash", hash).maybeSingle();
  if (!preview || (preview.expires_at && new Date(preview.expires_at) < new Date())) notFound();
  const version = preview.project_versions as unknown as { snapshot:Snapshot };
  const site = version.snapshot;
  const system = site.type === "system-prototype";
  return <main className={`automatic-preview ${system ? "system-preview" : "site-preview"}`}><div className="preview-notice"><strong>Protótipo automático LESystems</strong><span>Versão inicial privada · conteúdo sujeito à revisão</span></div><header><b>{site.company}</b><nav><span>Início</span><span>{system ? "Painel" : "Soluções"}</span><span>Sobre</span><span>Contato</span></nav><button>{system ? "Acessar" : "Fale conosco"}</button></header><section className="generated-hero"><div><small>{site.segment || "Solução digital"}</small><h1>{system ? `Sua operação em um só lugar.` : `${site.company}, preparada para crescer.`}</h1><p>{site.description || site.objective}</p><button>{system ? "Explorar o sistema" : "Conhecer soluções"}</button></div><aside>{system ? <><div className="mock-bar"><i/><span/><span/></div><strong>Visão geral</strong><div className="mock-metrics"><i/><i/><i/></div><div className="mock-chart"/></> : <><small>O que entregamos</small><strong>{site.objective}</strong><span>Estratégia · Tecnologia · Resultado</span></>}</aside></section><section className="generated-features"><small>{system ? "Módulos sugeridos" : "Soluções pensadas para você"}</small><h2>Estrutura inicial do projeto</h2><div>{(site.features.length ? site.features : ["Apresentação da empresa","Serviços e diferenciais","Contato e conversão"]).slice(0,6).map((feature,index)=><article key={feature}><span>0{index+1}</span><h3>{feature}</h3><p>Estrutura organizada automaticamente a partir das informações do briefing.</p></article>)}</div></section><footer><strong>{site.company}</strong><span>Protótipo gerado pela LESystems</span></footer></main>;
}
