import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ProductStudio from "./ProductStudio";
import "./studio.css";
export const metadata:Metadata={title:"Estúdio de criação",description:"Monte seu site, veja o investimento e gere seu primeiro protótipo com a LESystems."};
export default function StudioPage(){return <main className="site-shell"><SiteHeader/><section className="studio-hero"><div className="container"><p className="eyebrow"><span/> Estúdio LESystems</p><h1>Monte seu site.<br/><em>Veja o valor na hora.</em></h1><p>Escolha um formato, adicione o que precisa e avance para um protótipo automático sem compromisso.</p></div></section><ProductStudio/><SiteFooter/></main>}
