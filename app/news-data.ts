export type NewsItem = { title: string; link: string; source: string; date: string; category: string };

export const fallbackNews: NewsItem[] = [
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

export async function loadNews(limit = 10): Promise<NewsItem[]> {
  const groups = await Promise.all(feeds.map(async ([category, url]) => {
    try {
      const response = await fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(5000) });
      if (!response.ok) return [];
      const xml = await response.text();
      return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 6).map((match) => ({ title: field(match[1], "title").replace(/\s+-\s+[^-]+$/, ""), link: field(match[1], "link"), source: field(match[1], "source") || "Google Notícias", date: field(match[1], "pubDate"), category }));
    } catch { return []; }
  }));
  return groups.flat().filter((item) => item.title && item.link).slice(0, limit);
}

export function formatNewsDate(date: string) {
  return date ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(date)) : "Agora";
}
