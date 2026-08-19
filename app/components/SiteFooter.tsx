import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return <footer><div className="container footer-grid"><Link href="/" className="footer-brand"><Image src="/logo-lesystems.png" alt="LESystems" width={220} height={80} /></Link><p>Engenharia de Software para transformar ideias em soluções digitais.</p><div><Link href="/servicos">Serviços</Link><Link href="/suporte">Suporte</Link><Link href="/contato">Contato</Link><Link href="/privacidade">Privacidade</Link></div></div><div className="container footer-bottom"><span>© 2026 LESystems. Todos os direitos reservados.</span><Link href="/">Voltar ao início ↑</Link></div></footer>;
}
