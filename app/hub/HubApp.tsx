"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import { approveProposal, createProposal, signOut } from "./actions";

export type Role = "client" | "team";
type View = "inicio" | "projetos" | "entregas" | "suporte" | "agenda";
export type CommerceProject = { id:string; code:string; name:string; project_type:string; status:string; progress:number; created_at:string; proposal:null | { id:string; amountCents:number; status:string; description:string } };

const clientNav: { id: View; label: string; icon: IconName }[] = [
  { id: "inicio", label: "Visão geral", icon: "home" },
  { id: "projetos", label: "Meu projeto", icon: "project" },
  { id: "entregas", label: "Entregas", icon: "check" },
  { id: "suporte", label: "Suporte", icon: "support" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
];

const teamNav: { id: View; label: string; icon: IconName }[] = [
  { id: "inicio", label: "Painel operacional", icon: "home" },
  { id: "projetos", label: "Carteira de projetos", icon: "project" },
  { id: "entregas", label: "Revisões internas", icon: "check" },
  { id: "suporte", label: "Atendimento", icon: "support" },
  { id: "agenda", label: "Agenda da equipe", icon: "calendar" },
];

const stages = [
  ["01", "Descoberta", "concluído"],
  ["02", "Estratégia", "concluído"],
  ["03", "Desenvolvimento", "em andamento"],
  ["04", "Publicação", "próximo"],
];

export default function HubApp({ initialRole, canSwitchRole, userName, projects }: { initialRole: Role; canSwitchRole: boolean; userName: string; projects: CommerceProject[] }) {
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
      <nav id="hub-navigation" className="hub-nav" aria-label="Navegação do aplicativo">{nav.map(item => <button key={item.id} aria-current={view === item.id ? "page" : undefined} className={view === item.id ? "active" : ""} onClick={() => { setView(item.id); setMenuOpen(false); }}><span aria-hidden="true"><HubIcon name={item.icon} /></span>{item.label}</button>)}</nav>
      <div className="sidebar-help"><span>Precisa de ajuda?</span><p>Fale com o suporte LESystems.</p><button onClick={() => setView("suporte")}>Abrir chamado <ArrowIcon diagonal /></button></div>
      <div className="hub-user"><span>{initials(userName)}</span><div><strong>{userName}</strong><small>{role === "client" ? "Cliente" : "Equipe · Administrador"}</small></div><form action={signOut}><button type="submit" aria-label="Sair do Hub" title="Sair"><HubIcon name="logout" /></button></form></div>
    </aside>

    <section className="hub-main">
      <header className="hub-topbar"><button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="hub-navigation" onClick={() => setMenuOpen(!menuOpen)}><HubIcon name={menuOpen ? "close" : "menu"} /></button><div className="top-search"><span aria-hidden="true"><HubIcon name="search" /></span><input aria-label="Buscar" placeholder="Buscar projetos, arquivos ou chamados" /></div><div className="top-actions"><button aria-label="Notificações"><HubIcon name="bell" /><i /></button><div className="status-badge" role="status"><i /> Tudo funcionando</div></div></header>
      {view === "inicio" ? (role === "client" ? <ClientHome onNavigate={setView} /> : <TeamHome onNavigate={setView} />) : <SectionView view={view} role={role} projects={projects} onBack={() => setView("inicio")} />}
    </section>
    {menuOpen && <button className="hub-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}
  </main>;
}

function ClientHome({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <div className="hub-content">
    <div className="welcome-row"><div><p className="hub-eyebrow">Área do cliente</p><h1>Seu projeto, <em>com acompanhamento claro.</em></h1><p>Acompanhe o que mudou, o que precisa da sua atenção e os próximos passos.</p></div><button className="hub-primary" onClick={() => onNavigate("suporte")}>Falar com a equipe <ArrowIcon diagonal /></button></div>
    <div className="attention-card"><div className="attention-icon">!</div><div><span>Sua atenção</span><h2>Nova entrega aguardando aprovação</h2><p>A versão inicial da página principal está pronta para sua revisão.</p></div><button onClick={() => onNavigate("entregas")}>Revisar entrega <ArrowIcon /></button></div>
    <div className="hub-grid">
      <section className="project-panel hub-panel"><div className="panel-head"><div><span>Projeto ativo</span><h2>Site institucional · Aurora Clínica</h2></div><span className="phase">Em desenvolvimento</span></div><div className="progress-head"><span>Progresso geral</span><strong>68%</strong></div><div className="progress-bar"><i /></div><div className="stage-list">{stages.map(([n,t,s], i) => <div className={i < 2 ? "done" : i === 2 ? "current" : ""} key={n}><span>{i < 2 ? "✓" : n}</span><p><strong>{t}</strong><small>{s}</small></p></div>)}</div><div className="next-step"><span>Próximo marco</span><strong>Revisão visual completa</strong><time>26 AGO</time></div></section>
      <aside className="activity-panel hub-panel"><div className="panel-head"><div><span>Atualizações</span><h2>Atividade recente</h2></div><button>Ver tudo</button></div><div className="activity-list"><Activity initials="LE" title="Nova entrega publicada" text="Página inicial · versão 01" time="há 2 horas"/><Activity initials="MS" title="Comentário adicionado" text="Você respondeu em Identidade visual" time="ontem"/><Activity initials="LE" title="Etapa concluída" text="Arquitetura de conteúdo" time="18 ago"/></div></aside>
    </div>
    <div className="quick-grid"><Quick icon="project" title="Arquivos" text="12 documentos compartilhados" action="Abrir arquivos" onClick={() => onNavigate("entregas")}/><Quick icon="calendar" title="Próxima reunião" text="22 ago · 14:30 · Google Meet" action="Ver agenda" onClick={() => onNavigate("agenda")}/><Quick icon="support" title="Suporte" text="Nenhum chamado em aberto" action="Pedir ajuda" onClick={() => onNavigate("suporte")}/></div>
  </div>;
}

function TeamHome({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <div className="hub-content">
    <div className="welcome-row"><div><p className="hub-eyebrow">Operação LESystems</p><h1>Olá, Luis e Julia. <em>Três pontos precisam de atenção.</em></h1><p>Uma visão clara dos projetos, aprovações e atendimentos da equipe.</p></div><Link href="/hub/equipe/projetos/novo" className="hub-primary">Cadastrar projeto <HubIcon name="plus" /></Link></div>
    <div className="metric-grid"><Metric value="08" label="Projetos ativos" note="2 entregas nesta semana"/><Metric value="03" label="Aguardando cliente" note="Aprovações pendentes" alert/><Metric value="05" label="Chamados abertos" note="1 com prioridade alta"/><Metric value="94%" label="No prazo" note="Últimos 30 dias"/></div>
    <div className="hub-grid team-grid">
      <section className="hub-panel operations"><div className="panel-head"><div><span>Portfólio ativo</span><h2>Projetos em andamento</h2></div><button onClick={() => onNavigate("projetos")}>Ver todos</button></div><div className="project-table"><Project name="Aurora Clínica" type="Site institucional" progress="68" status="Desenvolvimento" initials="AC"/><Project name="Norte Logística" type="Sistema operacional" progress="42" status="Estratégia" initials="NL"/><Project name="Studio Alma" type="Automação comercial" progress="86" status="Validação" initials="SA"/></div></section>
      <aside className="hub-panel priorities"><div className="panel-head"><div><span>Hoje</span><h2>Prioridades</h2></div><strong>3 tarefas</strong></div><label><input type="checkbox"/><span><strong>Revisar feedback Aurora</strong><small>Projeto · até 11:00</small></span></label><label><input type="checkbox"/><span><strong>Enviar proposta Horizonte</strong><small>Comercial · até 14:00</small></span></label><label><input type="checkbox"/><span><strong>Publicar atualização Norte</strong><small>Projeto · até 16:30</small></span></label><button className="add-task"><HubIcon name="plus" /> Adicionar tarefa</button></aside>
    </div>
    <div className="quick-grid"><Quick icon="check" title="Aprovações" text="3 entregas aguardando clientes" action="Ver fila" onClick={() => onNavigate("entregas")}/><Quick icon="calendar" title="Agenda de hoje" text="3 reuniões · próxima às 10:30" action="Abrir agenda" onClick={() => onNavigate("agenda")}/><Quick icon="support" title="Atendimento" text="5 chamados · 1 prioritário" action="Ver chamados" onClick={() => onNavigate("suporte")}/></div>
  </div>;
}

function SectionView({ view, role, projects, onBack }: { view: View; role: Role; projects: CommerceProject[]; onBack: () => void }) {
  const names = { projetos: role === "client" ? "Meu projeto" : "Carteira de projetos", entregas: role === "client" ? "Entregas e aprovações" : "Revisões internas", suporte: role === "client" ? "Central de suporte" : "Atendimento de clientes", agenda: role === "client" ? "Agenda" : "Agenda da equipe", inicio: "Visão geral" };
  const action = view === "projetos" ? { href: role === "team" ? "/hub/equipe/projetos/novo" : "/criar-projeto", label: role === "team" ? "Cadastrar projeto" : "Novo projeto" } : view === "suporte" ? { href: "/suporte", label: role === "team" ? "Central de atendimento" : "Abrir chamado" } : view === "agenda" ? { href: "/agendamento", label: "Agendar reunião" } : null;
  return <div className="hub-content"><div className="welcome-row"><div><p className="hub-eyebrow">LESystems Hub</p><h1>{names[view]}</h1><p>Consulte e organize as informações desta área.</p></div>{action && <Link href={action.href} className="hub-primary">{action.label} <ArrowIcon diagonal={view !== "projetos"} /></Link>}</div>{view === "projetos" ? <CommerceProjects role={role} projects={projects} /> : <div className="empty-module hub-panel"><span><HubIcon name={view === "entregas" ? "check" : view === "suporte" ? "support" : "calendar"} /></span><h2>Módulo preparado</h2><p>O fluxo principal já está mapeado. Na próxima versão, conectaremos dados reais, filtros e ações deste espaço.</p><button onClick={onBack}>Voltar à visão geral</button></div>}</div>;
}

function CommerceProjects({ role, projects }: { role: Role; projects: CommerceProject[] }) {
  if (!projects.length) return <div className="empty-module hub-panel"><span><HubIcon name="project" /></span><h2>Nenhum projeto ainda</h2><p>Assim que uma solicitação for registrada, ela aparecerá aqui.</p></div>;
  return <div className="commerce-list">{projects.map(project => <article className="commerce-project hub-panel" key={project.id}><header><div><small>{project.code} · {project.project_type}</small><h2>{project.name}</h2></div><span>{statusLabel(project.status)}</span></header><div className="commerce-progress"><i style={{ width: `${project.progress}%` }} /></div>{project.proposal ? <div className="proposal-box"><div><small>Proposta comercial</small><strong>{money(project.proposal.amountCents)}</strong><p>{project.proposal.description}</p></div><ProposalAction role={role} project={project} /></div> : role === "team" ? <form className="proposal-form" action={createProposal}><input type="hidden" name="projectId" value={project.id}/><label>Valor da proposta (R$)<input name="amount" type="number" min="1" step="0.01" required placeholder="Ex.: 4500,00"/></label><label>Escopo e condições<textarea name="description" minLength={10} required rows={3} placeholder="Descreva o que será entregue, prazo e condições."/></label><button className="hub-primary">Enviar proposta ao cliente <ArrowIcon /></button></form> : <p className="proposal-waiting">A equipe está analisando o briefing e preparando sua proposta.</p>}</article>)}</div>;
}

function ProposalAction({ role, project }: { role:Role; project:CommerceProject }) {
  const proposal = project.proposal!;
  if (role === "team") return <span className="proposal-state">{proposal.status === "proposal" ? "Aguardando aceite" : proposal.status === "confirmed" ? "Pagamento confirmado" : "Aguardando pagamento"}</span>;
  if (proposal.status === "proposal") return <form action={approveProposal}><input type="hidden" name="paymentId" value={proposal.id}/><button className="hub-primary">Aprovar proposta <ArrowIcon /></button></form>;
  if (proposal.status === "pending") return <button className="hub-primary" onClick={async () => { const response = await fetch("/api/payments/checkout", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ paymentId:proposal.id }) }); const data = await response.json(); if (data.url) window.location.href = data.url; else window.alert(data.error || "Pagamento indisponível."); }}>Pagar com Pix ou cartão <ArrowIcon diagonal /></button>;
  return <span className="proposal-state paid">Pagamento confirmado</span>;
}

function money(cents:number){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100)}
function statusLabel(status:string){return ({new_request:"Nova solicitação",brief_received:"Briefing recebido",under_analysis:"Em análise",awaiting_approval:"Aguardando aprovação",awaiting_payment:"Aguardando pagamento",payment_confirmed:"Pagamento confirmado",in_development:"Em desenvolvimento",published:"Publicado",delivered:"Entregue"} as Record<string,string>)[status] || status.replaceAll("_"," ")}

function Activity({ initials, title, text, time }: { initials:string; title:string; text:string; time:string }) { return <div className="activity"><span>{initials}</span><p><strong>{title}</strong><small>{text}</small><time>{time}</time></p></div>; }
function Quick({ icon, title, text, action, onClick }: { icon:IconName; title:string; text:string; action:string; onClick: () => void }) { return <article className="quick-card"><span><HubIcon name={icon} /></span><div><h3>{title}</h3><p>{text}</p><button onClick={onClick}>{action} <ArrowIcon /></button></div></article>; }
function Metric({ value, label, note, alert }: { value:string; label:string; note:string; alert?:boolean }) { return <article className={`metric ${alert ? "alert" : ""}`}><span>{label}</span><strong>{value}</strong><p>{note}</p></article>; }
function Project({ name, type, progress, status, initials }: { name:string; type:string; progress:string; status:string; initials:string }) { return <div className="project-row"><span>{initials}</span><p><strong>{name}</strong><small>{type}</small></p><div><i style={{width:`${progress}%`}}/><small>{progress}%</small></div><b>{status}</b><button>•••</button></div>; }

type IconName = "home" | "project" | "check" | "support" | "calendar" | "search" | "bell" | "menu" | "close" | "logout" | "plus";
function HubIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="M3.5 10.5 12 3l8.5 7.5"/><path d="M5.5 9v11h13V9M9 20v-6h6v6"/></>,
    project: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4V2m8 2V2M3 9h18M8 14h3m2 0h3"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16.5 9"/></>,
    support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13v4a2 2 0 0 0 2 2h2v-7H6a2 2 0 0 0-2 1Zm16 0v4a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 1Z"/><path d="M16 19c0 1.1-.9 2-2 2h-2"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>, close: <path d="m6 6 12 12M18 6 6 18"/>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4m-6-4h10"/></>, plus: <path d="M12 5v14M5 12h14"/>,
  };
  return <svg className="hub-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
function initials(name: string) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase(); }
