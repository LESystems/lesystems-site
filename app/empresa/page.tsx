import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ArrowIcon from "../components/ArrowIcon";

const capabilities = [
  ["01", "Estratégia digital", "Traduzimos objetivos de negócio em prioridades digitais claras e viáveis."],
  ["02", "Engenharia de software", "Desenvolvemos experiências web e sistemas seguros, rápidos e preparados para evoluir."],
  ["03", "Automação inteligente", "Conectamos processos, ferramentas e inteligência artificial para reduzir esforço operacional."],
  ["04", "Experiência e acessibilidade", "Criamos jornadas simples, responsivas e confortáveis para diferentes pessoas e dispositivos."],
  ["05", "Integrações e dados", "Organizamos informações e construímos conexões que ampliam a visão sobre o negócio."],
  ["06", "Suporte e evolução", "Acompanhamos a solução depois da entrega para manter qualidade e gerar novos resultados."],
];

export const metadata = { title: "Conheça a empresa", description: "Conheça a atuação, as competências e a forma de trabalhar da LESystems." };

export default function EmpresaPage() {
  return <main className="site-shell"><SiteHeader />
    <section className="company-hero"><Image src="/company-capabilities.webp" alt="Representação de sistemas, dados, automação e colaboração" fill priority sizes="100vw" /><div className="company-veil" /><div className="container company-hero-copy"><p className="eyebrow"><span /> Conheça a LESystems</p><h1>Tecnologia próxima,<br /><em>clara e útil.</em></h1><p>Unimos estratégia, engenharia de software e acompanhamento humano para transformar necessidades reais em soluções digitais que fazem sentido.</p><Link className="button" href="/contato">Apresente seu desafio <ArrowIcon diagonal /></Link></div></section>
    <section className="section company-story"><div className="container story-grid"><div><p className="eyebrow"><span /> Nossa atuação</p><h2>Do entendimento à <em>evolução contínua.</em></h2></div><div><p>A LESystems aproxima empresas da tecnologia sem complicação. Cada projeto começa pela escuta, avança com decisões transparentes e continua com suporte próximo.</p><p>Em vez de soluções genéricas, construímos caminhos adequados ao momento, à operação e aos objetivos de cada cliente.</p></div></div></section>
    <section className="section competencies-section"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span /> Competências</p><h2>Conhecimento conectado<br /><em>aos seus resultados.</em></h2></div><p>Competências complementares para planejar, criar, integrar e aprimorar toda a experiência digital.</p></div><div className="competency-grid">{capabilities.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="section company-principles"><div className="container"><p className="eyebrow"><span /> Como trabalhamos</p><div className="principle-grid"><article><strong>Clareza</strong><p>Você entende as escolhas, as etapas e as prioridades do projeto.</p></article><article><strong>Intenção</strong><p>Cada recurso existe para resolver uma necessidade real.</p></article><article><strong>Parceria</strong><p>Tecnologia e atendimento humano permanecem próximos durante toda a jornada.</p></article></div><div className="center-action"><Link href="/servicos" className="button">Conhecer todas as soluções <ArrowIcon /></Link></div></div></section><SiteFooter />
  </main>;
}
