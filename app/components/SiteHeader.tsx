import Image from "next/image";
import Link from "next/link";
import { email, whatsappLink } from "../data";

export default function SiteHeader() {
  return <header className="site-header">
    <div className="utility-bar"><div className="container utility-inner"><p><span className="status-dot" /> Projetos digitais sob medida para empresas</p><div><a href={`mailto:${email}`}>{email}</a><span>•</span><a href={whatsappLink("Olá, gostaria de falar com a LESystems.")} target="_blank" rel="noreferrer">(21) 97616-0256</a></div></div></div>
    <div className="container nav-row">
      <Link href="/" className="brand" aria-label="LESystems — início"><span className="brand-frame"><Image src="/logo-lesystems.png" alt="LESystems" width={300} height={110} priority /></span><span className="brand-copy"><strong>Engenharia de Software</strong><small>Soluções que impulsionam negócios</small></span></Link>
      <nav className="desktop-nav" aria-label="Navegação principal"><Link href="/">Início</Link><Link href="/servicos">Serviços</Link><Link href="/suporte">Suporte</Link><Link href="/contato">Contato</Link><Link className="button button-small" href="/contato">Iniciar um projeto <span>↗</span></Link></nav>
      <details className="mobile-menu"><summary aria-label="Abrir menu"><span /><span /><span /></summary><nav><Link href="/">Início</Link><Link href="/servicos">Serviços</Link><Link href="/suporte">Suporte</Link><Link href="/contato">Contato</Link></nav></details>
    </div>
  </header>;
}
