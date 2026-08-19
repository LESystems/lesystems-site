import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import BudgetForm from "../components/BudgetForm";
export const metadata = { title:"Orçamento inteligente", description:"Organize sua necessidade e solicite uma avaliação personalizada." };
export default function BudgetPage(){return <main className="site-shell"><SiteHeader/><section className="inner-hero form-hero"><div className="mesh-bg"/><div className="container form-page-grid"><div><p className="eyebrow"><span/> Orçamento inteligente</p><h1>Comece com clareza.<br/><em>Nós organizamos o caminho.</em></h1><p>Responda três etapas rápidas. A equipe recebe um resumo mais completo e pode orientar a solução adequada.</p><div className="guided-benefits"><span>✓ Sem compromisso</span><span>✓ Resposta personalizada</span><span>✓ Seus dados protegidos</span></div></div><BudgetForm/></div></section><SiteFooter/></main>}
