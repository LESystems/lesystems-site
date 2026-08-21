import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ArrowIcon from "../components/ArrowIcon";
import NewsGrid from "./NewsGrid";
import { fallbackNews, loadNews, newsSources } from "../news-data";

export const metadata = { title: "Notícias mundiais", description: "Notícias mundiais sobre tecnologia, sistemas, inteligência artificial, inovação e segurança digital." };
export const revalidate = 1800;

export default async function NoticiasPage() {
  const news = await loadNews();
  const items = news.length ? news : fallbackNews;
  return <main className="site-shell"><SiteHeader />
    <section className="inner-hero news-hero"><div className="mesh-bg" /><div className="container inner-centered"><p className="eyebrow"><span /> Radar mundial</p><h1>O que está mudando<br /><em>o mundo digital.</em></h1><p>Uma seleção atualizada de notícias sobre tecnologia, inteligência artificial, novos sistemas, inovação e segurança — sempre com acesso à publicação original.</p></div></section>
    <section className="section news-section"><div className="container"><div className="news-toolbar"><div><span className="news-live"><i /> Atualização automática</span><p>Conteúdo renovado aproximadamente a cada 30 minutos, diretamente de diferentes publicações.</p></div><span className="news-source-count">{newsSources.length} fontes internacionais</span></div>
      <div className="news-source-list" aria-label="Fontes do radar">{newsSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.name}>{source.name}</a>)}</div>
      <NewsGrid items={items} live={Boolean(news.length)} />
    </div></section>
    <section className="section news-context"><div className="container contact-card light-card"><div><p className="eyebrow"><span /> Informação com propósito</p><h2>Quer entender como uma tendência <em>afeta seu negócio?</em></h2><p>A LESystems ajuda a transformar novidades em decisões e soluções práticas.</p></div><Link className="button" href="/contato">Conversar com a equipe <ArrowIcon /></Link></div></section><SiteFooter /></main>;
}
