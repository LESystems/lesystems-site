export const whatsappNumber = "5521976160256";
export const email = "contato.lesystems@gmail.com";

export const services = [
  {
    slug: "sites-experiencias-web",
    number: "01",
    title: "Sites & experiências web",
    short: "Sites institucionais, landing pages e aplicações rápidas, responsivas e preparadas para converter.",
    tags: ["Next.js", "UX/UI", "Performance"],
    outcome: "Uma presença digital clara, rápida e pronta para transformar visitas em oportunidades.",
    includes: ["Estratégia e arquitetura de conteúdo", "Design responsivo e acessível", "Desenvolvimento de alta performance", "SEO técnico e integração com analytics", "Publicação, domínio e acompanhamento"],
    idealFor: "Empresas que precisam apresentar melhor seus serviços, captar contatos ou lançar uma nova oferta.",
  },
  {
    slug: "sistemas-personalizados",
    number: "02",
    title: "Sistemas personalizados",
    short: "Soluções sob medida para organizar dados, simplificar operações e acompanhar o crescimento do negócio.",
    tags: ["Sob medida", "Escalável", "Seguro"],
    outcome: "Uma operação centralizada, com informações confiáveis e processos mais fáceis de acompanhar.",
    includes: ["Mapeamento dos processos atuais", "Painéis e áreas administrativas", "Cadastros, permissões e relatórios", "Integração com ferramentas existentes", "Evolução contínua por etapas"],
    idealFor: "Negócios que cresceram além das planilhas ou precisam conectar equipes, clientes e informações.",
  },
  {
    slug: "automacao-processos",
    number: "03",
    title: "Automação de processos",
    short: "Integrações e fluxos inteligentes que reduzem tarefas repetitivas, erros e tempo operacional.",
    tags: ["Integrações", "Eficiência", "Agilidade"],
    outcome: "Mais tempo para decisões importantes e menos esforço em tarefas que podem acontecer automaticamente.",
    includes: ["Diagnóstico de tarefas repetitivas", "Integração entre sistemas e canais", "Notificações e documentos automáticos", "Fluxos assistidos por inteligência artificial", "Monitoramento e melhoria contínua"],
    idealFor: "Equipes que repetem tarefas manuais, copiam dados entre ferramentas ou dependem de controles dispersos.",
  },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
