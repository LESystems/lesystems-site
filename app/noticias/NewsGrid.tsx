"use client";

import { useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import type { NewsItem } from "../news-data";

export default function NewsGrid({ items, live }: { items: NewsItem[]; live: boolean }) {
  const [language, setLanguage] = useState<"pt" | "original">("pt");
  return <>
    <div className="news-language" aria-label="Idioma das notícias"><span>Idioma</span><div><button className={language === "pt" ? "active" : ""} aria-pressed={language === "pt"} onClick={() => setLanguage("pt")}>Português</button><button className={language === "original" ? "active" : ""} aria-pressed={language === "original"} onClick={() => setLanguage("original")}>Original</button></div></div>
    <div className="news-grid">{items.map((item, index) => {
      const title = language === "original" ? item.originalTitle || item.title : item.title;
      const summary = language === "original" ? item.originalSummary || item.summary : item.summary;
      return <article className={index === 0 ? "news-featured" : ""} key={`${item.link}-${index}`}><a className={`news-cover ${item.image ? "has-image" : ""}`} href={item.link} target="_blank" rel="noreferrer" style={item.image ? { backgroundImage: `linear-gradient(180deg,transparent 35%,rgba(3,28,45,.55)),url(${JSON.stringify(item.image).slice(1,-1)})` } : undefined} aria-label={`Abrir: ${title}`}><span>{item.source}</span></a><div className="news-card-body"><div className="news-meta"><span>{item.category}</span><time>{item.date && !Number.isNaN(new Date(item.date).getTime()) ? new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"short", year:"numeric" }).format(new Date(item.date)) : "Seleção atual"}</time></div><h2>{title}</h2><p>{summary || "Leia os detalhes e a análise completa na publicação original."}</p><div className="news-card-footer"><small>Fonte: {item.source} · {language === "pt" ? "Tradução automática" : "Texto original"}</small><a href={item.link} target="_blank" rel="noreferrer">{live ? "Ler notícia completa" : "Visitar publicação"} <ArrowIcon diagonal /></a></div></div></article>;
    })}</div>
  </>;
}
