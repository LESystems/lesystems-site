import Image from "next/image";

const whatsapp = "https://wa.me/5521976160256";

const services = [
  { icon: "01", title: "Sites & experiências web", text: "Sites institucionais, landing pages e aplicações rápidas, responsivas e preparadas para converter.", tags: ["Next.js", "UX/UI", "Performance"] },
  { icon: "02", title: "Sistemas personalizados", text: "Soluções sob medida para organizar dados, simplificar operações e acompanhar o crescimento do negócio.", tags: ["Sob medida", "Escalável", "Seguro"] },
  { icon: "03", title: "Automação de processos", text: "Integrações e fluxos inteligentes que reduzem tarefas repetitivas, erros e tempo operacional.", tags: ["Integrações", "Eficiência", "Agilidade"] },
];

const steps = [
  ["01", "Descoberta", "Entendemos o cenário, os objetivos e as prioridades do seu negócio."],
  ["02", "Estratégia", "Desenhamos a solução, o escopo e um caminho claro para a entrega."],
  ["03", "Desenvolvimento", "Construímos com acompanhamento próximo, qualidade e transparência."],
  ["04", "Evolução", "Publicamos, acompanhamos resultados e preparamos os próximos passos."],
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="utility-bar">
          <div className="container utility-inner">
            <p><span className="status-dot" /> Projetos digitais sob medida para empresas</p>
            <div><a href="mailto:contato.lesystems@gmail.com">contato.lesystems@gmail.com</a><span>•</span><a href={whatsapp} target="_blank" rel="noreferrer">(21) 97616-0256</a></div>
          </div>
        </div>
        <div className="container nav-row">
          <a href="#inicio" className="brand" aria-label="LESystems — início">
            <span className="brand-frame"><Image src="/logo-lesystems.png" alt="LESystems" width={300} height={110} priority /></span>
            <span className="brand-copy"><strong>Engenharia de Software</strong><small>Soluções que impulsionam negócios</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a><a href="#servicos">Serviços</a><a href="#processo">Como trabalhamos</a><a href="#sobre">Sobre</a>
            <a className="button button-small" href="#contato">Iniciar um projeto <span>↗</span></a>
          </nav>
          <details className="mobile-menu">
            <summary aria-label="Abrir menu"><span /><span /><span /></summary>
            <nav><a href="#inicio">Início</a><a href="#servicos">Serviços</a><a href="#processo">Como trabalhamos</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></nav>
          </details>
        </div>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Tecnologia, estratégia e desenvolvimento</p>
            <h1>Transformamos desafios em <em>soluções digitais.</em></h1>
            <p className="hero-lead">Criamos sites, sistemas e automações sob medida para tornar sua empresa mais eficiente, conectada e preparada para crescer.</p>
            <div className="hero-actions"><a href={whatsapp} target="_blank" rel="noreferrer" className="button">Falar sobre meu projeto <span>↗</span></a><a href="#servicos" className="text-link">Explorar soluções <span>↓</span></a></div>
            <div className="trust-row"><div><strong>Estratégia</strong><span>antes do código</span></div><div><strong>Sob medida</strong><span>para sua operação</span></div><div><strong>Evolução</strong><span>para crescer junto</span></div></div>
          </div>

          <div className="solution-stage reveal delay-one" aria-label="Visão das soluções LESystems">
            <div className="float-pill pill-top"><span>✓</span> Projeto acompanhado de perto</div>
            <div className="solution-card">
              <div className="card-top"><div><span className="mini-label">LESystems / Soluções</span><h2>Da ideia à solução.</h2></div><span className="live-dot">● online</span></div>
              <div className="dashboard">
                <div className="dash-main"><span className="dash-label">Eficiência digital</span><strong>+ clareza</strong><div className="chart-bars"><i /><i /><i /><i /><i /><i /></div><p>Processos mais simples. Decisões mais rápidas.</p></div>
                <div className="dash-stack"><div><span className="feature-icon">⌘</span><p><strong>Sistemas</strong><small>Operação organizada</small></p></div><div><span className="feature-icon">↗</span><p><strong>Web</strong><small>Presença que converte</small></p></div><div><span className="feature-icon">⚡</span><p><strong>Automação</strong><small>Mais produtividade</small></p></div></div>
              </div>
              <div className="card-footer"><span><i /> Soluções construídas para evoluir</span><span>2026</span></div>
            </div>
            <div className="float-pill pill-bottom"><strong>3 frentes</strong><span>uma visão integrada</span></div>
          </div>
        </div>
        <div className="container client-strip"><span>Construímos tecnologia para</span><p>NEGÓCIOS LOCAIS</p><i /> <p>EMPRESAS EM CRESCIMENTO</p><i /> <p>PROFISSIONAIS</p></div>
      </section>

      <section id="servicos" className="section services-section">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow"><span /> O que fazemos</p><h2>Tecnologia que resolve.<br /><em>Experiências que conectam.</em></h2></div><p>Unimos visão de negócio e engenharia de software para entregar soluções úteis, bonitas e fáceis de usar.</p></div>
          <div className="services-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-number">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p><div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contato" aria-label={`Saber mais sobre ${service.title}`}>Descobrir solução <span>→</span></a></article>)}</div>
        </div>
      </section>

      <section id="processo" className="section process-section">
        <div className="container process-grid">
          <div className="process-intro"><p className="eyebrow light"><span /> Nosso processo</p><h2>Simples de entender.<br /><em>Sólido para entregar.</em></h2><p>Você acompanha cada etapa e sabe exatamente onde o projeto está. Comunicação clara, decisões conscientes e foco no que gera valor.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="button button-light">Conversar com a LESystems <span>↗</span></a></div>
          <div className="steps">{steps.map(([number,title,text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section id="sobre" className="section about-section">
        <div className="container about-grid">
          <div className="about-visual"><div className="code-window"><div className="window-head"><span /><span /><span /><small>lesystems / projeto</small></div><pre><code><b>const</b> solução = {'{'}{"\n  "}<span>estratégia</span>: true,{"\n  "}<span>tecnologia</span>: &quot;moderna&quot;,{"\n  "}<span>objetivo</span>: &quot;resultado&quot;{"\n"}{'}'};</code></pre><div className="window-result"><span>✓</span><p><strong>Pronto para evoluir</strong><small>Solução validada com o negócio</small></p></div></div></div>
          <div className="about-copy"><p className="eyebrow"><span /> Sobre a LESystems</p><h2>Engenharia de software com <em>propósito.</em></h2><p>A LESystems nasceu para aproximar empresas da tecnologia de forma simples, estratégica e humana. Transformamos necessidades reais em produtos digitais eficientes e preparados para o futuro.</p><div className="values"><div><span>01</span><p><strong>Clareza em cada etapa</strong><small>Sem complicação ou linguagem desnecessária.</small></p></div><div><span>02</span><p><strong>Qualidade com intenção</strong><small>Cada escolha serve ao objetivo do projeto.</small></p></div><div><span>03</span><p><strong>Parceria de verdade</strong><small>Proximidade para construir a solução certa.</small></p></div></div></div>
        </div>
      </section>

      <section id="contato" className="section contact-section">
        <div className="container contact-card"><div><p className="eyebrow light"><span /> Vamos tirar sua ideia do papel?</p><h2>Seu próximo projeto pode começar <em>agora.</em></h2><p>Conte brevemente o que sua empresa precisa. Vamos conversar sem compromisso e pensar no melhor caminho.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="button button-light">Chamar no WhatsApp <span>↗</span></a></div><aside><p>Outros canais</p><a href="mailto:contato.lesystems@gmail.com"><span>E-mail</span><strong>contato.lesystems@gmail.com</strong></a><a href="https://instagram.com/lesystems" target="_blank" rel="noreferrer"><span>Instagram</span><strong>@lesystems</strong></a><a href={whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>(21) 97616-0256</strong></a></aside></div>
      </section>

      <footer><div className="container footer-grid"><a href="#inicio" className="footer-brand"><Image src="/logo-lesystems.png" alt="LESystems" width={220} height={80} /></a><p>Engenharia de Software para transformar ideias em soluções digitais.</p><div><a href="#servicos">Serviços</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></div></div><div className="container footer-bottom"><span>© 2026 LESystems. Todos os direitos reservados.</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
    </main>
  );
}
