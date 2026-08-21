import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import "../../preview/[token]/preview.css";

type Snapshot = { type:string; company:string; segment:string; description:string; objective:string; features:string[] };

async function getPublishedProduct(code:string) {
  const match = /^LE-(\d{6,})$/.exec(code.toUpperCase());
  if (!match) return null;
  const admin = createSupabaseAdminClient();
  const { data:project } = await admin.from("projects").select("id,name,status").eq("public_id", Number(match[1])).in("status", ["published","delivered"]).maybeSingle();
  if (!project) return null;
  const { data:version } = await admin.from("project_versions").select("snapshot").eq("project_id", project.id).like("version", "preview-automatico-%").order("created_at", { ascending:false }).limit(1).maybeSingle();
  return version?.snapshot as Snapshot | null;
}

export async function generateMetadata({ params }: { params:Promise<{code:string}> }):Promise<Metadata> {
  const { code } = await params; const product = await getPublishedProduct(code);
  return product ? { title:product.company, description:product.description || product.objective, robots:{index:true,follow:true}, openGraph:{title:product.company,description:product.description || product.objective,images:[]}, twitter:{title:product.company,description:product.description || product.objective,images:[]} } : { title:"Produto não encontrado", robots:{index:false,follow:false} };
}

export default async function PublishedProductPage({ params }: { params:Promise<{code:string}> }) {
  const { code } = await params; const site = await getPublishedProduct(code); if (!site) notFound();
  const system = site.type === "system-prototype";
  const features = site.features?.length ? site.features : ["Apresentação da empresa","Serviços e diferenciais","Contato e conversão"];
  return <main className={`automatic-preview published-product ${system ? "system-preview" : "site-preview"}`}><header><b>{site.company}</b><nav><a href="#inicio">Início</a><a href="#solucoes">{system ? "Módulos" : "Soluções"}</a><a href="#contato">Contato</a></nav><a className="generated-button" href="#contato">{system ? "Acessar" : "Fale conosco"}</a></header><section className="generated-hero" id="inicio"><div><small>{site.segment || "Solução digital"}</small><h1>{system ? "Sua operação em um só lugar." : `${site.company}, preparada para crescer.`}</h1><p>{site.description || site.objective}</p><a className="generated-button" href="#solucoes">Conhecer soluções</a></div><aside><small>Nosso compromisso</small><strong>{site.objective}</strong><span>Estratégia · Tecnologia · Resultado</span></aside></section><section className="generated-features" id="solucoes"><small>{system ? "Módulos" : "Soluções"}</small><h2>Feito para suas necessidades</h2><div>{features.slice(0,6).map((feature,index)=><article key={feature}><span>0{index+1}</span><h3>{feature}</h3><p>Uma solução organizada para simplificar processos e criar uma experiência clara.</p></article>)}</div></section><section className="generated-contact" id="contato"><small>Próximo passo</small><h2>Vamos conversar?</h2><p>Entre em contato com {site.company} para saber mais.</p></section><footer><strong>{site.company}</strong><span>Produto digital desenvolvido com LESystems</span></footer></main>;
}
