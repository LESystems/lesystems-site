"use client";

import { useActionState } from "react";
import { createInternalProject, type InternalProjectState } from "./actions";

export default function InternalProjectForm() {
  const [state, action, pending] = useActionState(createInternalProject, {} as InternalProjectState);
  return <form className="internal-project-form" action={action} aria-busy={pending}>
    <section><div className="internal-section-title"><span>01</span><div><h2>Cliente</h2><p>Identifique a empresa responsável pelo projeto.</p></div></div><div className="internal-fields two"><label>Nome do cliente ou empresa<input name="customerName" required /></label><label>Segmento<input name="segment" /></label></div></section>
    <section><div className="internal-section-title"><span>02</span><div><h2>Projeto</h2><p>Cadastre as informações iniciais da operação.</p></div></div><div className="internal-fields two"><label>Nome interno do projeto<input name="projectName" required /></label><label>Tipo<select name="projectType" required defaultValue=""><option value="" disabled>Selecione</option><option>Site institucional</option><option>Landing page</option><option>Site empresarial</option><option>Portal simples</option><option>Sistema personalizado</option><option>Automação</option><option>Aplicativo</option></select></label></div><label>Descrição<textarea name="description" rows={4} /></label></section>
    <section><div className="internal-section-title"><span>03</span><div><h2>Operação inicial</h2><p>Defina de onde a equipe começará.</p></div></div><div className="internal-fields two"><label>Status<select name="status" defaultValue="under_analysis"><option value="new_request">Nova solicitação</option><option value="brief_received">Briefing recebido</option><option value="under_analysis">Em análise</option><option value="in_development">Em desenvolvimento</option><option value="internal_review">Revisão LESystems</option></select></label><label>Progresso inicial<input name="progress" type="number" min="0" max="100" defaultValue="0" /></label></div></section>
    <footer><p className="form-error" role="alert">{state.error}</p><button className="hub-primary" disabled={pending}>{pending ? "Cadastrando…" : "Cadastrar projeto"}</button></footer>
  </form>;
}
