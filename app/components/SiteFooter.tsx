import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import NewsletterForm from "./NewsletterForm";

export default function SiteFooter() {
  return <footer><div className="container footer-grid"><Link href="/" className="footer-brand"><Image src="/logo-lesystems.png" alt="LESystems" width={220} height={80} /></Link><p>Engenharia de Software para transformar ideias em soluções digitais.</p><div><Link href="/portfolio">Portfólio</Link><Link href="/servicos">Serviços</Link><Link href="/noticias">Notícias</Link><Link href="/suporte">Suporte</Link><Link href="/contato">Contato</Link></div></div><div className="container footer-newsletter"><NewsletterForm/><div><Link href="/cliente">Área do cliente</Link><Link href="/privacidade">Privacidade</Link></div></div><div className="container footer-bottom"><span>© 2026 LESystems. Todos os direitos reservados.</span><Link className="inline-action" href="/">Voltar ao início <ArrowIcon direction="up" /></Link></div></footer>;
}
