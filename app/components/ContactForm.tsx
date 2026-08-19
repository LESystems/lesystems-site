"use client";

import { FormEvent, useState } from "react";

export default function ContactForm({ support = false }: { support?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [links, setLinks] = useState<{ whatsapp?: string; mailto?: string }>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, type: support ? "Suporte" : "Novo contato" }) });
      const data = await response.json();
      if (!response.ok) throw new Error();
      setLinks(data); setStatus("success");
    } catch { setStatus("error"); }
  }
  return <form className="lead-form" onSubmit={submit}>
    <div className="form-grid"><label>Nome completo<input name="name" required autoComplete="name" /></label><label>Empresa<input name="company" autoComplete="organization" /></label><label>E-mail<input name="email" type="email" required autoComplete="email" /></label><label>WhatsApp<input name="phone" type="tel" required autoComplete="tel" /></label></div>
    <label>{support ? "Assunto do suporte" : "Solução de interesse"}<select name="interest" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Sites & experiências web</option><option>Sistemas personalizados</option><option>Automação de processos</option><option>Suporte de projeto</option><option>Ainda não tenho certeza</option></select></label>
    <label>Como podemos ajudar?<textarea name="message" rows={5} required placeholder="Conte brevemente sua necessidade, objetivo ou dificuldade." /></label>
    <label className="consent"><input type="checkbox" name="consent" required /> <span>Autorizo o contato da LESystems sobre esta solicitação e li a política de privacidade.</span></label>
    <button className="button" disabled={status === "loading"}>{status === "loading" ? "Enviando…" : support ? "Enviar solicitação" : "Enviar para a LESystems"} <span>↗</span></button>
    {status === "success" && <div className="form-result"><strong>Solicitação preparada com sucesso.</strong><p>Se o envio automático estiver ativo, a equipe já recebeu seus dados. Você também pode continuar por um destes canais:</p><div>{links.whatsapp && <a href={links.whatsapp} target="_blank" rel="noreferrer">Abrir WhatsApp</a>}{links.mailto && <a href={links.mailto}>Enviar por e-mail</a>}</div></div>}
    {status === "error" && <p className="form-error">Não foi possível concluir agora. Tente novamente ou fale pelo WhatsApp.</p>}
  </form>;
}
