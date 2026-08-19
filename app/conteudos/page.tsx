import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const channels = [
  { symbol: "in", name: "LinkedIn", text: "Competências, experiência profissional e conteúdo técnico.", href: "https://www.linkedin.com/in/luiseduardosilvasantos" },
  { symbol: "◎", name: "Instagram", text: "Bastidores, projetos, ideias e conteúdos visuais." },
  { symbol: "f", name: "Facebook", text: "Atualizações, soluções e relacionamento com a comunidade.", href: "https://www.facebook.com/profile.php?id=61593485909652" },
];

export const metadata = { title: "Conteúdos e redes", description: "Acompanhe conteúdos, novidades e redes sociais da LESystems em um só lugar." };

export default function ConteudosPage() {
  const facebookPage = encodeURIComponent("https://www.facebook.com/profile.php?id=61593485909652");
  return <main className="site-shell"><SiteHeader />
    <section className="inner-hero social-hero"><div className="mesh-bg" /><div className="container inner-centered"><p className="eyebrow"><span /> Conteúdos LESystems</p><h1>Tudo o que compartilhamos,<br /><em>em um só lugar.</em></h1><p>Novidades, conhecimento e publicações da empresa reunidos sem interromper a navegação no site.</p></div></section>
    <section className="section social-section"><div className="container">
      <div className="social-channels">{channels.map((channel) => <article key={channel.name}><span>{channel.symbol}</span><div><h2>{channel.name}</h2><p>{channel.text}</p></div>{channel.href ? <a href={channel.href} target="_blank" rel="noreferrer">Ver perfil oficial →</a> : <small>Use o QR abaixo para acessar</small>}</article>)}</div>
      <div className="social-feed-shell"><div className="feed-heading"><div><p className="eyebrow"><span /> Facebook integrado</p><h2>Publicações recentes</h2></div><span className="feed-status connected">Página oficial</span></div><div className="facebook-feed"><iframe title="Publicações da LESystems no Facebook" src={`https://www.facebook.com/plugins/page.php?href=${facebookPage}&tabs=timeline&width=500&height=680&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`} width="500" height="680" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" /></div><p className="integration-note">O conteúdo é carregado diretamente do Facebook. Caso a rede solicite login ou bloqueie a visualização, use o botão “Ver perfil oficial”.</p></div>
    </div></section>
    <section className="section social-cta"><div className="container contact-card light-card"><div><p className="eyebrow"><span /> Continue a conversa</p><h2>Viu algo interessante?<br /><em>Fale com a equipe.</em></h2></div><Link className="button" href="/contato">Entrar em contato <span>↗</span></Link></div></section><SiteFooter /></main>;
}
