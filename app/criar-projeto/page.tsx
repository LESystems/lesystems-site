import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ProjectBriefForm from "./ProjectBriefForm";
import "./project.css";
import "./selection.css";

export const metadata: Metadata = { title: "Criar meu projeto", description: "Conte o que sua empresa precisa e inicie seu projeto com a LESystems." };

export default async function CreateProjectPage({ searchParams }: { searchParams:Promise<{pacote?:string;adicionais?:string}> }) {
  const params=await searchParams;
  return <main className="site-shell"><SiteHeader /><section className="express-page"><div className="container express-layout"><aside><p className="eyebrow"><span /> LESystems Express</p><h1>Da sua necessidade a uma <em>solução digital real.</em></h1><p>Um briefing guiado para nossa equipe entender, organizar e desenvolver seu projeto com supervisão profissional.</p><ol><li><b>01</b>Você descreve a necessidade</li><li><b>02</b>A LESystems organiza e desenvolve</li><li><b>03</b>Você testa o preview</li><li><b>04</b>Aprova, paga e recebe</li></ol></aside><ProjectBriefForm packageId={params.pacote} addonIds={params.adicionais?.split(",").filter(Boolean)} /></div></section><SiteFooter /></main>;
}
