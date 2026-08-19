"use client";

import { FormEvent, MouseEvent, useState } from "react";
import ArrowIcon from "./ArrowIcon";

export default function BudgetForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [links, setLinks] = useState<{ whatsapp?: string; mailto?: string }>({});
  function advance(event: MouseEvent<HTMLButtonElement>) { const fields = event.currentTarget.form?.querySelectorAll<HTMLElement>(`fieldset:not([hidden]) input, fieldset:not([hidden]) select, fieldset:not([hidden]) textarea`); if ([...(fields || [])].every((field) => "reportValidity" in field && (field as HTMLInputElement).reportValidity())) setStep(step + 1); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/contact", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ ...payload, type:"Orçamento guiado", message:`Objetivo: ${payload.objective}\nPrazo: ${payload.timeline}\nFaixa: ${payload.budget}\nDetalhes: ${payload.details}` }) });
    if (!response.ok) { setStatus("error"); return; }
    setLinks(await response.json()); setStatus("success");
  }
  return <form className="guided-form" onSubmit={submit}>
    <div className="form-progress"><span>Etapa {step} de 3</span><i><b style={{ width:`${step * 33.34}%` }} /></i></div>
    <fieldset hidden={step !== 1}><legend>O que você deseja desenvolver?</legend><label>Tipo de solução<select name="interest" required defaultValue=""><option value="" disabled>Selecione</option><option>Site ou experiência web</option><option>Sistema personalizado</option><option>Automação de processos</option><option>Inteligência artificial</option><option>Integrações e dados</option><option>Consultoria digital</option></select></label><label>Principal objetivo<textarea name="objective" required rows={4} placeholder="Ex.: captar novos clientes, organizar a operação ou automatizar uma tarefa." /></label></fieldset>
    <fieldset hidden={step !== 2}><legend>Contexto do projeto</legend><label>Prazo desejado<select name="timeline" required defaultValue=""><option value="" disabled>Selecione</option><option>Até 30 dias</option><option>De 1 a 3 meses</option><option>De 3 a 6 meses</option><option>Sem prazo definido</option></select></label><label>Faixa de planejamento<select name="budget" required defaultValue=""><option value="" disabled>Selecione</option><option>Preciso de orientação</option><option>Até R$ 5 mil</option><option>De R$ 5 mil a R$ 15 mil</option><option>Acima de R$ 15 mil</option></select></label><label>Detalhes adicionais<textarea name="details" rows={4} placeholder="Conte o que já existe e o que precisa melhorar." /></label></fieldset>
    <fieldset hidden={step !== 3}><legend>Como podemos retornar?</legend><div className="form-grid"><label>Nome<input name="name" required autoComplete="name" /></label><label>Empresa<input name="company" autoComplete="organization" /></label><label>E-mail<input type="email" name="email" required autoComplete="email" /></label><label>WhatsApp<input name="phone" required autoComplete="tel" /></label></div><label className="consent"><input type="checkbox" required /><span>Autorizo o contato sobre esta solicitação.</span></label></fieldset>
    <div className="form-navigation">{step > 1 && <button type="button" className="button-secondary" onClick={() => setStep(step - 1)}>Voltar</button>}{step < 3 ? <button type="button" className="button" onClick={advance}>Continuar <ArrowIcon /></button> : <button className="button" disabled={status === "loading"}>{status === "loading" ? "Preparando…" : "Solicitar avaliação"} <ArrowIcon diagonal /></button>}</div>
    {status === "success" && <div className="form-result"><strong>Solicitação preparada.</strong><p>Continue pelo canal que preferir.</p><div>{links.whatsapp && <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}{links.mailto && <a href={links.mailto}>E-mail</a>}</div></div>}{status === "error" && <p className="form-error">Não foi possível concluir agora. Tente novamente.</p>}
  </form>;
}
