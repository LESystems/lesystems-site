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
    short: "Integrações e fluxos inteligentes que reduzem o trabalho repetitivo, os erros e o tempo operacional.",
    tags: ["Integrações", "Eficiência", "Agilidade"],
    outcome: "Mais tempo para decisões importantes e menos esforço em tarefas que podem acontecer automaticamente.",
    includes: ["Diagnóstico de tarefas repetitivas", "Integração entre sistemas e canais", "Notificações e documentos automáticos", "Fluxos assistidos por inteligência artificial", "Monitoramento e melhoria contínua"],
    idealFor: "Equipes que repetem tarefas manuais, copiam dados entre ferramentas ou dependem de controles dispersos.",
  },
  {
    slug: "inteligencia-artificial",
    number: "04",
    title: "Inteligência artificial aplicada",
    short: "Assistentes e recursos inteligentes conectados à rotina real da empresa, com orientação e controle.",
    tags: ["IA", "Assistentes", "Produtividade"],
    outcome: "Atendimento mais ágil, conhecimento acessível e apoio inteligente para equipes e clientes.",
    includes: ["Mapeamento de oportunidades para IA", "Assistentes treinados para o negócio", "Bases de conhecimento organizadas", "Integração com atendimento e sistemas", "Acompanhamento de qualidade e evolução"],
    idealFor: "Empresas que querem usar inteligência artificial com um objetivo claro, sem perder segurança ou proximidade humana.",
  },
  {
    slug: "integracoes-dados",
    number: "05",
    title: "Integrações & dados",
    short: "Conexão entre ferramentas, organização de informações e painéis para decisões mais seguras.",
    tags: ["APIs", "Dados", "Dashboards"],
    outcome: "Informações reunidas e confiáveis para evitar retrabalho e ampliar a visão da operação.",
    includes: ["Diagnóstico das fontes de informação", "Integração por APIs e conectores", "Organização e tratamento de dados", "Painéis e indicadores personalizados", "Alertas e rotinas de atualização"],
    idealFor: "Operações com informações espalhadas ou que precisam enxergar resultados e indicadores com mais clareza.",
  },
  {
    slug: "consultoria-evolucao-digital",
    number: "06",
    title: "Consultoria & evolução digital",
    short: "Planejamento técnico e acompanhamento contínuo para escolher prioridades e evoluir com segurança.",
    tags: ["Estratégia", "Auditoria", "Evolução"],
    outcome: "Um plano tecnológico realista, priorizado e conectado aos objetivos do negócio.",
    includes: ["Diagnóstico de presença e operação digital", "Revisão de sistemas e experiência", "Plano de prioridades e investimentos", "Orientação técnica independente", "Acompanhamento da evolução"],
    idealFor: "Empresas que precisam organizar decisões de tecnologia antes de investir, refazer ou ampliar suas soluções.",
  },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
