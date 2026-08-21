"use client";

import { type MouseEvent, useActionState, useState } from "react";
import { createInternalProject, type InternalProjectState } from "./actions";

const templates = {
  "Site institucional": ["Página inicial", "Empresa", "Serviços", "Contato", "SEO básico", "Responsividade"],
  "Landing page": ["Página de campanha", "Formulário de conversão", "Integração com WhatsApp", "Métricas", "Responsividade"],
  "Sistema personalizado": ["Acesso por usuário", "Painel administrativo", "Cadastros", "Relatórios", "Auditoria", "Permissões"],
};

export default function InternalProjectForm() {
  const [state, action, pending] = useActionState(createInternalProject, {} as InternalProjectState);
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [features, setFeatures] = useState("");
  const [status, setStatus] = useState("under_analysis");
  const suggested = templates[projectType as keyof typeof templates] || [];
  function chooseTemplate(type: keyof typeof templates) { setProjectType(type); setFeatures(templates[type].join("\n")); }
  function next(event: MouseEvent<HTMLButtonElement>) {
    const section = event.currentTarget.form?.querySelector<HTMLElement>("section:not([hidden])");
    const fields = section?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input,select,textarea");
    if (fields && !Array.from(fields).every(field => field.reportValidity())) return;
    setStep(value => Math.min(3, value + 1)); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return <form className="internal-project-form" action={action} aria-busy={pending}>
    <div className="internal-stepper">{["Cliente", "Escopo", "Operação", "Revisão"].map((label, index) => <button type="button" key={label} className={index === step ? "active" : index < step ? "done" : ""} onClick={() => index < step && setStep(index)}><i>{index < step ? "✓" : index + 1}</i><span>{label}</span></button>)}</div>
    <section hidden={step !== 0}><Title number="01" title="Cliente e contato" text="Dados usados pela equipe para organizar a comunicação."/><div className="internal-fields two"><label>Nome do cliente ou empresa<input name="customerName" required /></label><label>Segmento<input name="segment" placeholder="Ex.: saúde, varejo, serviços" /></label><label>Responsável<input name="contactName" /></label><label>E-mail<input name="contactEmail" type="email" /></label><label>Telefone / WhatsApp<input name="contactPhone" autoComplete="tel" /></label><label>Prioridade<select name="priority" defaultValue="normal"><option value="low">Baixa</option><option value="normal">Normal</option><option value="high">Alta</option><option value="urgent">Urgente</option></select></label></div></section>
    <section hidden={step !== 1}><Title number="02" title="Escopo assistido" text="Escolha um ponto de partida e ajuste conforme a necessidade."/><div className="project-templates">{(Object.keys(templates) as Array<keyof typeof templates>).map(type => <button type="button" className={projectType === type ? "active" : ""} key={type} onClick={() => chooseTemplate(type)}><strong>{type}</strong><small>{templates[type].length} itens sugeridos</small></button>)}</div><div className="internal-fields two"><label>Nome interno do projeto<input name="projectName" value={projectName} onChange={event => setProjectName(event.target.value)} required /></label><label>Tipo<select name="projectType" value={projectType} onChange={event => setProjectType(event.target.value)} required><option value="" disabled>Selecione</option><option>Site institucional</option><option>Landing page</option><option>Site empresarial</option><option>Portal simples</option><option>Sistema personalizado</option><option>Automação</option><option>Aplicativo</option></select></label></div><label>Objetivo principal<textarea name="objective" rows={3} required placeholder="Qual resultado este projeto deve produzir?" /></label><label>Funcionalidades ou entregáveis <small>um item por linha</small><textarea name="features" rows={7} value={features} onChange={event => setFeatures(event.target.value)} placeholder={'Página inicial\nFormulário de contato\nPainel administrativo'} /></label>{suggested.length > 0 && <div className="scope-hint"><strong>Escopo sugerido aplicado</strong><span>Você pode editar, remover ou adicionar itens antes de continuar.</span></div>}</section>
    <section hidden={step !== 2}><Title number="03" title="Planejamento operacional" text="Defina como o projeto entra na rotina da equipe."/><div className="internal-fields two"><label>Status<select name="status" value={status} onChange={event => setStatus(event.target.value)}><option value="new_request">Nova solicitação</option><option value="brief_received">Briefing recebido</option><option value="under_analysis">Em análise</option><option value="in_development">Em desenvolvimento</option><option value="internal_review">Revisão LESystems</option></select></label><label>Progresso inicial<input name="progress" type="number" min="0" max="100" defaultValue={status === "in_development" ? 20 : status === "internal_review" ? 70 : 0} key={status} /></label><label>Prazo estimado<input name="dueDate" type="date" /></label><label>Responsável interno<input name="ownerName" placeholder="Luis, Julia ou colaborador" /></label></div><label>Observações internas<textarea name="internalNotes" rows={4} placeholder="Riscos, dependências, decisões ou próximos passos" /></label></section>
    <section hidden={step !== 3}><Title number="04" title="Revisão e criação" text="Confira a estrutura que será registrada na operação."/><div className="project-summary"><article><span>Projeto</span><strong>{projectName || "Nome ainda não informado"}</strong><small>{projectType || "Tipo não selecionado"}</small></article><article><span>Escopo inicial</span><strong>{features.split("\n").filter(Boolean).length} itens</strong><small>Salvos como requisitos preliminares</small></article><article><span>Status</span><strong>{statusLabel(status)}</strong><small>Alterável no painel da equipe</small></article></div><div className="automation-note"><b>Criação automática</b><p>Ao confirmar, o sistema cria cliente, projeto, briefing, requisitos preliminares, identificador LESystems e registro de auditoria.</p></div></section>
    <footer><p className="form-error" role="alert">{state.error}</p><div>{step > 0 && <button type="button" className="internal-secondary" onClick={() => setStep(step - 1)}>Voltar</button>}{step < 3 ? <button type="button" className="hub-primary" onClick={next}>Continuar</button> : <button className="hub-primary" disabled={pending}>{pending ? "Criando estrutura…" : "Criar projeto completo"}</button>}</div></footer>
  </form>;
}

function Title({ number, title, text }: { number:string; title:string; text:string }) { return <div className="internal-section-title"><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></div>; }
function statusLabel(status: string) { return ({ new_request: "Nova solicitação", brief_received: "Briefing recebido", under_analysis: "Em análise", in_development: "Em desenvolvimento", internal_review: "Revisão LESystems" } as Record<string,string>)[status]; }
