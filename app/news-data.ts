export type NewsItem = { title: string; link: string; source: string; date: string; category: string; summary: string; image: string };

export const newsSources = [
  { name: "TechCrunch", url: "https://techcrunch.com/", feed: "https://techcrunch.com/feed/", category: "Negócios & inovação" },
  { name: "Ars Technica", url: "https://arstechnica.com/", feed: "https://feeds.arstechnica.com/arstechnica/index", category: "Ciência & tecnologia" },
  { name: "The Verge", url: "https://www.theverge.com/", feed: "https://www.theverge.com/rss/index.xml", category: "Produtos & cultura digital" },
  { name: "WIRED", url: "https://www.wired.com/", feed: "https://www.wired.com/feed/rss", category: "Tecnologia mundial" },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/", feed: "https://www.technologyreview.com/feed/", category: "Pesquisa & futuro" },
  { name: "NASA Technology", url: "https://www.nasa.gov/technology/", feed: "https://www.nasa.gov/technology/feed/", category: "Espaço & engenharia" },
] as const;

export const fallbackNews: NewsItem[] = newsSources.map((source) => ({
  title: `Acompanhe os destaques de ${source.name}`,
  link: source.url,
  source: source.name,
  date: "",
  category: source.category,
  summary: "Notícias, análises e descobertas selecionadas diretamente da publicação original.",
  image: "",
}));

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8211;|&#x2013;/gi, "–")
    .replace(/&#8212;|&#x2014;/gi, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function field(xml: string, name: string) {
  return decode(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1] ?? "");
}

function rawField(xml: string, name: string) {
  return xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1] ?? "";
}

function itemLink(xml: string) {
  const direct = field(xml, "link");
  if (/^https?:\/\//i.test(direct)) return direct;
  return decode(xml.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/?>(?:<\/link>)?/i)?.[1] ?? "");
}

function itemImage(xml: string) {
  const tagged = xml.match(/<(?:media:content|media:thumbnail|enclosure)[^>]+url=["']([^"']+)["'][^>]*>/i)?.[1];
  const embedded = `${rawField(xml, "description")} ${rawField(xml, "content:encoded")} ${rawField(xml, "content")}`.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const value = decode(tagged || embedded || "");
  return /^https?:\/\//i.test(value) ? value : "";
}

function parseFeed(xml: string, source: typeof newsSources[number]): NewsItem[] {
  const blocks = [...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)];
  return blocks.slice(0, 5).map((match) => ({
    title: field(match[2], "title"),
    link: itemLink(match[2]),
    source: source.name,
    date: field(match[2], "pubDate") || field(match[2], "published") || field(match[2], "updated"),
    category: source.category,
    summary: (field(match[2], "description") || field(match[2], "summary") || field(match[2], "content")).slice(0, 240),
    image: itemImage(match[2]),
  })).filter((item) => item.title && /^https?:\/\//i.test(item.link));
}

export async function loadNews(limit = 12): Promise<NewsItem[]> {
  const groups = await Promise.all(newsSources.map(async (source) => {
    try {
      const response = await fetch(source.feed, {
        headers: { "User-Agent": "LESystems-News-Radar/1.0" },
        next: { revalidate: 1800 },
        signal: AbortSignal.timeout(6500),
      });
      if (!response.ok) return [];
      return parseFeed(await response.text(), source);
    } catch {
      return [];
    }
  }));

  const mixed: NewsItem[] = [];
  for (let row = 0; mixed.length < limit && groups.some((group) => group[row]); row += 1) {
    for (const group of groups) {
      if (group[row]) mixed.push(group[row]);
      if (mixed.length === limit) break;
    }
  }

  const seen = new Set<string>();
  return mixed.filter((item) => {
    const key = item.link.replace(/[?#].*$/, "") || item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function formatNewsDate(date: string) {
  const value = date ? new Date(date) : null;
  return value && !Number.isNaN(value.getTime()) ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(value) : "Agora";
}
