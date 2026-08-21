"use client";

import Image from "next/image";
import { useState } from "react";

export type Role = "client" | "team";
type View = "inicio" | "projetos" | "entregas" | "suporte" | "agenda";

const clientNav: { id: View; label: string; icon: string }[] = [
  { id: "inicio", label: "Visão geral", icon: "⌂" },
  { id: "projetos", label: "Meu projeto", icon: "◇" },
  { id: "entregas", label: "Entregas", icon: "✓" },
  { id: "suporte", label: "Suporte", icon: "?" },
  { id: "agenda", label: "Agenda", icon: "○" },
];

const teamNav: { id: View; label: string; icon: string }[] = [
  { id: "inicio", label: "Operação", icon: "⌂" },
  { id: "projetos", label: "Projetos", icon: "◇" },
  { id: "entregas", label: "Aprovações", icon: "✓" },
  { id: "suporte", label: "Chamados", icon: "?" },
  { id: "agenda", label: "Agenda", icon: "○" },
];

const stages = [
  ["01", "Descoberta", "concluído"],
  ["02", "Estratégia", "concluído"],
  ["03", "Desenvolvimento", "em andamento"],
  ["04", "Publicação", "próximo"],
];

export default function HubApp({ initialRole, canSwitchRole }: { initialRole: Role; canSwitchRole: boolean }) {
  const [role, setRole] = useState<Role>(initialRole);
  const [view, setView] = useState<View>("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = role === "client" ? clientNav : teamNav;

  function changeRole(next: Role) {
    setRole(next);
    setView("inicio");
    setMenuOpen(false);
  }

  return <main className={`hub-app hub-${role}`}>
    <aside className={`hub-sidebar ${menuOpen ? "is-open" : ""}`}>
      <div className="hub-brand"><span className="hub-logo-crop"><Image src="/icon.png" alt="" width={256} height={256} priority /></span><div><strong>LESystems</strong><small>Hub</small></div></div>
      {canSwitchRole && <div className="role-switch" aria-label="Visualizar como"><button aria-pressed={role === "client"} className={role === "client" ? "active" : ""} onClick={() => changeRole("client")}>Cliente</button><button aria-pressed={role === "team"} className={role === "team" ? "active" : ""} onClick={() => changeRole("team")}>Equipe</button></div>}
      <nav id="hub-navigation" className="hub-nav" aria-label="Navegação do aplicativo">{nav.map(item => <button key={item.id} aria-current={view === item.id ? "page" : undefined} className={view === item.id ? "active" : ""} onClick={() => { setView(item.id); setMenuOpen(false); }}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}</nav>
      <div className="sidebar-help"><span>Precisa de ajuda?</span><p>Fale com o suporte LESystems.</p><button onClick={() => setView("suporte")}>Abrir chamado ↗</button></div>
      <div className="hub-user"><span>MS</span><div><strong>{role === "client" ? "Marina Souza" : "Lucas Esteves"}</strong><small>{role === "client" ? "Cliente · Aurora Clínica" : "Equipe · Administrador"}</small></div><button aria-label="Mais opções">•••</button></div>
    </aside>

    <section className="hub-main">
      <header className="hub-topbar"><button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="hub-navigation" onClick={() => setMenuOpen(!menuOpen)}>☰</button><div className="top-search"><span aria-hidden="true">⌕</span><input aria-label="Buscar" placeholder="Buscar projetos, arquivos ou chamados" /></div><div className="top-actions"><button aria-label="Notificações">♢<i /></button><div className="status-badge" role="status"><i /> Tudo funcionando</div></div></header>
      {view === "inicio" ? (role === "client" ? <ClientHome /> : <TeamHome />) : <SectionView view={view} role={role} />}
    </section>
    {menuOpen && <button className="hub-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
  </main>;
}

function ClientHome() {
  return <div className="hub-content">
    <div className="welcome-row"><div><p className="hub-eyebrow">Quarta-feira, 20 de agosto</p><h1>Olá, Marina. <em>Seu projeto está avançando.</em></h1><p>Acompanhe o que mudou, o que precisa da sua atenção e os próximos passos.</p></div><button className="hub-primary">Falar com a equipe <span>↗</span></button></div>
    <div className="attention-card"><div className="attention-icon">!</div><div><span>Sua atenção</span><h2>Nova entrega aguardando aprovação</h2><p>A versão inicial da página principal está pronta para sua revisão.</p></div><button>Revisar entrega <span>→</span></button></div>
    <div className="hub-grid">
      <section className="project-panel hub-panel"><div className="panel-head"><div><span>Projeto ativo</span><h2>Site institucional · Aurora Clínica</h2></div><span className="phase">Em desenvolvimento</span></div><div className="progress-head"><span>Progresso geral</span><strong>68%</strong></div><div className="progress-bar"><i /></div><div className="stage-list">{stages.map(([n,t,s], i) => <div className={i < 2 ? "done" : i === 2 ? "current" : ""} key={n}><span>{i < 2 ? "✓" : n}</span><p><strong>{t}</strong><small>{s}</small></p></div>)}</div><div className="next-step"><span>Próximo marco</span><strong>Revisão visual completa</strong><time>26 AGO</time></div></section>
      <aside className="activity-panel hub-panel"><div className="panel-head"><div><span>Atualizações</span><h2>Atividade recente</h2></div><button>Ver tudo</button></div><div className="activity-list"><Activity initials="LE" title="Nova entrega publicada" text="Página inicial · versão 01" time="há 2 horas"/><Activity initials="MS" title="Comentário adicionado" text="Você respondeu em Identidade visual" time="ontem"/><Activity initials="LE" title="Etapa concluída" text="Arquitetura de conteúdo" time="18 ago"/></div></aside>
    </div>
    <div className="quick-grid"><Quick icon="□" title="Arquivos" text="12 documentos compartilhados" action="Abrir arquivos"/><Quick icon="○" title="Próxima reunião" text="22 ago · 14:30 · Google Meet" action="Ver agenda"/><Quick icon="?" title="Suporte" text="Nenhum chamado em aberto" action="Pedir ajuda"/></div>
  </div>;
}

function TeamHome() {
  return <div className="hub-content">
    <div className="welcome-row"><div><p className="hub-eyebrow">Operação · 20 de agosto</p><h1>Bom dia, Lucas. <em>Três pontos precisam de atenção.</em></h1><p>Uma visão clara dos projetos, aprovações e atendimentos da equipe.</p></div><button className="hub-primary">Novo projeto <span>＋</span></button></div>
    <div className="metric-grid"><Metric value="08" label="Projetos ativos" note="2 entregas nesta semana"/><Metric value="03" label="Aguardando cliente" note="Aprovações pendentes" alert/><Metric value="05" label="Chamados abertos" note="1 com prioridade alta"/><Metric value="94%" label="No prazo" note="Últimos 30 dias"/></div>
    <div className="hub-grid team-grid">
      <section className="hub-panel operations"><div className="panel-head"><div><span>Portfólio ativo</span><h2>Projetos em andamento</h2></div><button>Ver todos</button></div><div className="project-table"><Project name="Aurora Clínica" type="Site institucional" progress="68" status="Desenvolvimento" initials="AC"/><Project name="Norte Logística" type="Sistema operacional" progress="42" status="Estratégia" initials="NL"/><Project name="Studio Alma" type="Automação comercial" progress="86" status="Validação" initials="SA"/></div></section>
      <aside className="hub-panel priorities"><div className="panel-head"><div><span>Hoje</span><h2>Prioridades</h2></div><strong>4 tarefas</strong></div><label><input type="checkbox"/><span><strong>Revisar feedback Aurora</strong><small>Projeto · até 11:00</small></span></label><label><input type="checkbox"/><span><strong>Enviar proposta Horizonte</strong><small>Comercial · até 14:00</small></span></label><label><input type="checkbox"/><span><strong>Publicar atualização Norte</strong><small>Projeto · até 16:30</small></span></label><button className="add-task">＋ Adicionar tarefa</button></aside>
    </div>
    <div className="quick-grid"><Quick icon="✓" title="Aprovações" text="3 entregas aguardando clientes" action="Ver fila"/><Quick icon="○" title="Agenda de hoje" text="3 reuniões · próxima às 10:30" action="Abrir agenda"/><Quick icon="?" title="Atendimento" text="5 chamados · 1 prioritário" action="Ver chamados"/></div>
  </div>;
}

function SectionView({ view, role }: { view: View; role: Role }) {
  const names = { projetos: role === "client" ? "Meu projeto" : "Projetos", entregas: role === "client" ? "Entregas e aprovações" : "Fila de aprovações", suporte: role === "client" ? "Central de suporte" : "Chamados de clientes", agenda: "Agenda", inicio: "Visão geral" };
  return <div className="hub-content"><div className="welcome-row"><div><p className="hub-eyebrow">LESystems Hub</p><h1>{names[view]}</h1><p>Este módulo fará parte da próxima etapa de desenvolvimento do aplicativo.</p></div><button className="hub-primary">Nova solicitação <span>＋</span></button></div><div className="empty-module hub-panel"><span>{view === "projetos" ? "◇" : view === "entregas" ? "✓" : view === "suporte" ? "?" : "○"}</span><h2>Módulo preparado</h2><p>O fluxo principal já está mapeado. Na próxima versão, conectaremos dados reais, filtros e ações deste espaço.</p><button>Voltar à visão geral</button></div></div>;
}

function Activity({ initials, title, text, time }: { initials:string; title:string; text:string; time:string }) { return <div className="activity"><span>{initials}</span><p><strong>{title}</strong><small>{text}</small><time>{time}</time></p></div>; }
function Quick({ icon, title, text, action }: { icon:string; title:string; text:string; action:string }) { return <article className="quick-card"><span>{icon}</span><div><h3>{title}</h3><p>{text}</p><button>{action} →</button></div></article>; }
function Metric({ value, label, note, alert }: { value:string; label:string; note:string; alert?:boolean }) { return <article className={`metric ${alert ? "alert" : ""}`}><span>{label}</span><strong>{value}</strong><p>{note}</p></article>; }
function Project({ name, type, progress, status, initials }: { name:string; type:string; progress:string; status:string; initials:string }) { return <div className="project-row"><span>{initials}</span><p><strong>{name}</strong><small>{type}</small></p><div><i style={{width:`${progress}%`}}/><small>{progress}%</small></div><b>{status}</b><button>•••</button></div>; }
