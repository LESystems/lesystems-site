import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = { title: "Notícias mundiais", description: "Notícias mundiais sobre tecnologia, sistemas, inteligência artificial, inovação e segurança digital." };
export const revalidate = 1800;

type NewsItem = { title: string; link: string; source: string; date: string; category: string };

const fallbackNews: NewsItem[] = [
  { title: "Acompanhe as principais novidades sobre inteligência artificial", link: "https://news.google.com/search?q=intelig%C3%AAncia%20artificial&hl=pt-BR&gl=BR&ceid=BR%3Apt-419", source: "Google Notícias", date: "", category: "Inteligência artificial" },
  { title: "Veja os destaques mundiais sobre tecnologia e novos sistemas", link: "https://news.google.com/search?q=tecnologia%20software&hl=pt-BR&gl=BR&ceid=BR%3Apt-419", source: "Google Notícias", date: "", category: "Tecnologia" },
  { title: "Confira alertas e tendências de segurança digital", link: "https://news.google.com/search?q=ciberseguran%C3%A7a&hl=pt-BR&gl=BR&ceid=BR%3Apt-419", source: "Google Notícias", date: "", category: "Segurança digital" },
];

const feeds = [
  ["Tecnologia & IA", "https://news.google.com/rss/search?q=tecnologia%20OR%20intelig%C3%AAncia%20artificial%20OR%20software&hl=pt-BR&gl=BR&ceid=BR:pt-419"],
  ["Segurança digital", "https://news.google.com/rss/search?q=ciberseguran%C3%A7a%20OR%20seguran%C3%A7a%20digital&hl=pt-BR&gl=BR&ceid=BR:pt-419"],
] as const;

function decode(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

function field(xml: string, name: string) {
  return decode(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1] ?? "");
}

async function loadNews(): Promise<NewsItem[]> {
  const groups = await Promise.all(feeds.map(async ([category, url]) => {
    try {
      const response = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(7000) });
      if (!response.ok) return [];
      const xml = await response.text();
      return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 6).map((match) => ({ title: field(match[1], "title").replace(/\s+-\s+[^-]+$/, ""), link: field(match[1], "link"), source: field(match[1], "source") || "Google Notícias", date: field(match[1], "pubDate"), category }));
    } catch { return []; }
  }));
  return groups.flat().filter((item) => item.title && item.link).slice(0, 10);
}

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
