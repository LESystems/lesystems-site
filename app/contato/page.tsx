import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ContactForm from "../components/ContactForm";
import { email, whatsappLink } from "../data";
export const metadata: Metadata = { title: "Contato e orçamento", description: "Conte sua necessidade e receba uma orientação da LESystems." };
export default function ContactPage() { return <main className="site-shell"><SiteHeader /><section className="inner-hero form-hero"><div className="mesh-bg" /><div className="container form-page-grid"><div><p className="eyebrow"><span /> Cadastro de contato</p><h1>Conte sua ideia.<br /><em>Nós organizamos o próximo passo.</em></h1><p>Preencha as informações essenciais. Sua solicitação fica pronta para a equipe e você pode continuar por e-mail ou WhatsApp.</p><div className="contact-options"><a href={`mailto:${email}`}><span>E-mail</span><strong>{email}</strong></a><a href={whatsappLink("Olá, gostaria de falar sobre um projeto.")} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>(21) 97616-0256</strong></a></div></div><ContactForm /></div></section><SiteFooter /></main>; }
