import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { fallbackNews, loadNews } from "../news-data";

export const metadata = { title: "Notícias mundiais", description: "Notícias mundiais sobre tecnologia, sistemas, inteligência artificial, inovação e segurança digital." };
export const revalidate = 1800;

export default async function NoticiasPage() {
  const news = await loadNews();
  const items = news.length ? news : fallbackNews;
  return <main className="site-shell"><SiteHeader />
    <section className="inner-hero news-hero"><div className="mesh-bg" /><div className="container inner-centered"><p className="eyebrow"><span /> Radar mundial</p><h1>O que está mudando<br /><em>o mundo digital.</em></h1><p>Uma seleção atualizada de notícias sobre tecnologia, inteligência artificial, novos sistemas, inovação e segurança — sempre com acesso à publicação original.</p></div></section>
    <section className="section news-section"><div className="container"><div className="news-toolbar"><div><span className="news-live"><i /> Atualização automática</span><p>Conteúdo renovado aproximadamente a cada 30 minutos.</p></div><a href="https://news.google.com/" target="_blank" rel="noreferrer">Ver central de notícias ↗</a></div>
      <div className="news-grid">{items.map((item, index) => <article className={index === 0 ? "news-featured" : ""} key={`${item.link}-${index}`}><div className="news-meta"><span>{item.category}</span><time>{item.date ? new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"short", year:"numeric" }).format(new Date(item.date)) : "Seleção atual"}</time></div><h2>{item.title}</h2><p>Fonte: {item.source}</p><a href={item.link} target="_blank" rel="noreferrer">{news.length ? "Ler notícia completa" : "Ver notícias desta categoria"} <span>↗</span></a></article>)}</div>
    </div></section>
    <section className="section news-context"><div className="container contact-card light-card"><div><p className="eyebrow"><span /> Informação com propósito</p><h2>Quer entender como uma tendência <em>afeta seu negócio?</em></h2><p>A LESystems ajuda a transformar novidades em decisões e soluções práticas.</p></div><Link className="button" href="/contato">Conversar com a equipe <span>→</span></Link></div></section><SiteFooter /></main>;
}
