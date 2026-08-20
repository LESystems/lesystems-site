import Image from "next/image";
import "./editorial.css";

const whatsapp = "https://wa.me/5521976160256";

const scenarios = [
  { n: "01", type: "Presença digital", title: "Seu negócio precisa ser entendido antes de ser escolhido.", text: "Sites institucionais e landing pages que transformam sua proposta de valor em uma experiência clara, rápida e convincente.", items: ["Estratégia de conteúdo", "UX/UI", "Next.js & performance"], result: "Mais clareza. Mais conversas certas." },
  { n: "02", type: "Operação organizada", title: "Quando a planilha vira gargalo, o sistema vira caminho.", text: "Sistemas sob medida para reunir dados, organizar rotinas e dar visibilidade ao que realmente acontece na operação.", items: ["Fluxos personalizados", "Painéis e dados", "Arquitetura escalável"], result: "Menos improviso. Mais controle." },
  { n: "03", type: "Tempo recuperado", title: "Trabalho repetitivo não deveria depender de pessoas.", text: "Automações e integrações que conectam ferramentas, reduzem erros e devolvem tempo para o seu time pensar no negócio.", items: ["Mapeamento de processos", "Integrações", "Rotinas inteligentes"], result: "Menos tarefas. Mais evolução." },
];

const cases = [
  { n: "A", type: "Operação / conceito", title: "Central de operações", text: "Pedidos, clientes e indicadores reunidos em uma visão única para uma empresa em crescimento.", stat: "1 painel", note: "em vez de 7 planilhas" },
  { n: "B", type: "Automação / conceito", title: "Fluxo comercial conectado", text: "Da entrada do contato ao acompanhamento da proposta, com menos tarefas manuais e mais contexto.", stat: "4 etapas", note: "automatizadas" },
];

const steps = [
  ["01", "Entender", "O negócio, o contexto e o que precisa mudar."],
  ["02", "Desenhar", "A solução, as prioridades e o caminho de entrega."],
  ["03", "Construir", "Com ciclos curtos, decisões visíveis e qualidade."],
  ["04", "Evoluir", "Medindo o resultado e preparando o próximo passo."],
];

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return <main className="editorial-site">
    <header className="header">
      <a className="brand-symbol" href="/" aria-label="LESystems — início"><Image src="/logo-lesystems.png" alt="" width={1280} height={1280} priority /></a>
      <nav className="main-nav" aria-label="Navegação principal"><a href="/servicos">Soluções</a><a href="/portfolio">Portfólio</a><a href="/conteudos">Conteúdos</a><a href="/empresa">Empresa</a></nav>
      <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">Iniciar conversa <Arrow /></a>
    </header>

    <section className="hero" id="inicio">
      <div className="hero-intro">
        <p className="kicker"><span>Estúdio de engenharia de software</span><span>Rio de Janeiro · Brasil</span></p>
        <h1>Software pensado para o negócio <em>funcionar melhor.</em></h1>
        <div className="hero-bottom"><p>Criamos sites, sistemas e automações que organizam operações, esclarecem decisões e abrem espaço para crescer.</p><a className="primary-link" href={whatsapp} target="_blank" rel="noreferrer">Conte o seu desafio <Arrow /></a></div>
      </div>
      <div className="system-map" aria-label="Do desafio à evolução do negócio">
        <div className="map-meta"><span>Mapa de solução / 001</span><span className="map-status"><i /> projeto ativo</span></div>
        <div className="map-grid">
          <div className="map-input"><span className="map-label">Entrada</span><strong>Um desafio real.</strong><ul><li>Processos manuais</li><li>Dados dispersos</li><li>Presença que não converte</li></ul></div>
          <div className="map-core"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div><small>LE / engenharia</small><strong>Estratégia<br />+ código</strong></div></div>
          <div className="map-output"><span className="map-label">Resultado</span><strong>Uma solução útil.</strong><div className="output-list"><span>clareza</span><span>eficiência</span><span>crescimento</span></div></div>
        </div>
        <div className="map-footer"><span>Entender</span><i /><span>Desenhar</span><i /><span>Construir</span><i /><span>Evoluir</span></div>
      </div>
    </section>

    <div className="statement-band"><p>Estratégia antes do código</p><span>✦</span><p>Tecnologia com intenção</p><span>✦</span><p>Parceria de verdade</p></div>

    <section className="manifesto section-shell"><div className="section-index">01 — Ponto de vista</div><div className="manifesto-copy"><p className="display-copy">Tecnologia não precisa parecer complicada para ser <em>poderosa.</em></p><div className="manifesto-note"><span>Nosso princípio</span><p>A melhor solução é aquela que as pessoas entendem, usam e percebem funcionando.</p></div></div></section>

    <section className="solutions section-shell" id="solucoes">
      <div className="section-index">02 — Onde atuamos</div>
      <div className="section-heading"><h2>Três frentes.<br />Uma visão integrada.</h2><p>Partimos do problema, não de uma tecnologia pronta. Cada projeto combina o que faz sentido para o seu momento.</p></div>
      <div className="scenario-list">{scenarios.map((item) => <article className="scenario" key={item.n}><div className="scenario-top"><span>{item.n}</span><p>{item.type}</p><Arrow /></div><div className="scenario-content"><h3>{item.title}</h3><div className="scenario-details"><p>{item.text}</p><ul>{item.items.map(x => <li key={x}>{x}</li>)}</ul><strong>{item.result}</strong></div></div></article>)}</div>
    </section>

    <section className="work section-shell" id="trabalhos">
      <div className="section-index">03 — Estudos de possibilidade</div>
      <div className="section-heading"><h2>Antes e depois,<br />sem maquiagem.</h2><p>Dois cenários conceituais para mostrar como transformamos uma operação confusa em uma experiência simples.</p></div>
      <div className="case-grid">{cases.map((item) => <article className="case-card" key={item.n}><div className="case-head"><span>{item.n}</span><span>{item.type}</span></div><div className="case-screen"><div className="screen-bar"><i/><i/><i/></div><div className="screen-content"><div className="screen-nav"/><div className="screen-main"><span/><span/><span/><div/></div></div></div><h3>{item.title}</h3><p>{item.text}</p><div className="case-stat"><strong>{item.stat}</strong><span>{item.note}</span></div></article>)}</div>
      <p className="concept-note">* Estudos conceituais. Projetos reais serão incorporados conforme autorização dos clientes.</p>
    </section>

    <section className="process" id="processo"><div className="section-shell process-inner"><div className="section-index light">04 — Como trabalhamos</div><div className="process-layout"><div className="process-intro"><p className="kicker light-kicker">Do primeiro diagnóstico à evolução</p><h2>Um processo claro para decisões melhores.</h2><p>Você acompanha o raciocínio, as escolhas e cada etapa da construção. Sem caixa-preta, sem excesso de linguagem técnica.</p><div className="tech-line"><span>Next.js</span><span>TypeScript</span><span>APIs</span><span>Automação</span></div></div><div className="process-steps">{steps.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></div></section>

    <section className="studio section-shell" id="estudio"><div className="section-index">05 — O estúdio</div><div className="studio-layout"><div className="studio-title"><p className="kicker">LESystems / Engenharia de software</p><h2>Próximos o bastante para entender. Técnicos o bastante para resolver.</h2></div><div className="studio-copy"><p>A LESystems aproxima empresas da tecnologia de forma simples, estratégica e humana. Traduzimos necessidades reais em produtos digitais sólidos — feitos para o presente e preparados para evoluir.</p><div className="principles"><div><span>01</span><strong>Clareza</strong><p>Você entende cada escolha e sabe onde o projeto está.</p></div><div><span>02</span><strong>Intenção</strong><p>Cada recurso existe para servir a um objetivo do negócio.</p></div><div><span>03</span><strong>Continuidade</strong><p>A entrega é um ponto de partida para a próxima evolução.</p></div></div></div></div></section>

    <section className="contact section-shell" id="contato"><div className="contact-label"><span>06</span><span>Próximo projeto</span></div><h2>Tem um desafio que a tecnologia poderia resolver?</h2><div className="contact-bottom"><p>Conte brevemente o cenário. A primeira conversa é para entender — sem compromisso e sem complicação.</p><a href={whatsapp} target="_blank" rel="noreferrer">Vamos conversar <Arrow /></a></div></section>

    <footer><div className="footer-main"><a className="brand-symbol footer-symbol" href="#inicio" aria-label="LESystems — início"><Image src="/logo-lesystems.png" alt="" width={1280} height={1280} /></a><p>Engenharia de software<br />para negócios em evolução.</p><div className="footer-links"><a href="mailto:contato.lesystems@gmail.com">contato.lesystems@gmail.com</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="https://instagram.com/lesystems" target="_blank" rel="noreferrer">Instagram ↗</a></div></div><div className="footer-bottom"><span>© 2026 LESystems</span><span>Rio de Janeiro · Brasil</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
  </main>;
}
