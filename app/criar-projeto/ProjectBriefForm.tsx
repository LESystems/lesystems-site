"use client";

import { FormEvent, useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import { formatPrice, quoteProduct } from "../product-catalog";

const steps = ["Empresa", "Projeto", "Identidade", "Contato"];

export default function ProjectBriefForm({ packageId="", addonIds=[] }: { packageId?:string; addonIds?:string[] }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const quote = quoteProduct(packageId, addonIds);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) { setStep(step + 1); return; }
    setLoading(true); setMessage(""); setPreviewUrl("");
    const form = event.currentTarget;
    const response = await fetch("/api/projects", { method: "POST", body: new FormData(form) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) { setMessage(data.error || "Não foi possível enviar sua solicitação."); return; }
    setMessage(`Projeto ${data.projectId} criado. Seu primeiro protótipo automático já está disponível.`);
    setPreviewUrl(data.previewUrl || "");
    form.reset(); setStep(0);
  }

  return <form className="express-form" onSubmit={submit} aria-busy={loading}><input type="hidden" name="packageId" value={packageId}/><input type="hidden" name="addons" value={addonIds.join(",")}/>{quote && <div className="selected-package"><span>Produto selecionado</span><strong>{quote.product.name} · {formatPrice(quote.totalCents)}</strong><a href="/estudio">Alterar</a></div>}
    <div className="express-progress"><div><span>Etapa {step + 1} de {steps.length}</span><strong>{steps[step]}</strong></div><i><b style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></i></div>
    <fieldset hidden={step !== 0}><legend>Conte sobre sua empresa</legend><div className="field-grid"><label>Nome da empresa<input name="companyName" required={step === 0} /></label><label>Segmento<input name="segment" required={step === 0} /></label></div><label>O que sua empresa faz?<textarea name="companyDescription" rows={4} required={step === 0} /></label><label>Público-alvo<input name="audience" placeholder="Quem você deseja alcançar?" /></label></fieldset>
    <fieldset hidden={step !== 1}><legend>Qual solução você precisa?</legend><label>Tipo do projeto<select name="projectType" required={step === 1} defaultValue={packageId==="landing"?"Landing page":packageId==="portal"?"Portal simples":packageId==="institucional"?"Site institucional":""}><option value="" disabled>Selecione</option><option>Site institucional</option><option>Landing page</option><option>Site empresarial</option><option>Página profissional</option><option>Portal simples</option><option>Sistema personalizado</option></select></label><label>Objetivo principal<textarea name="objective" rows={3} required={step === 1} /></label><label>Funcionalidades, páginas ou módulos<textarea name="features" rows={4} placeholder="Ex.: formulário, catálogo, área do cliente..." /></label><label>Conte com suas palavras o que gostaria que a LESystems desenvolvesse<textarea name="additionalNotes" rows={5} required={step === 1} /></label></fieldset>
    <fieldset hidden={step !== 2}><legend>Identidade e referências</legend><div className="field-grid"><label>Cores preferidas<input name="colors" /></label><label>Estilo desejado<select name="style" defaultValue=""><option value="">Selecione</option><option>Moderno e tecnológico</option><option>Elegante e premium</option><option>Minimalista</option><option>Corporativo</option><option>Outro</option></select></label></div><label>Links de referência<textarea name="references" rows={4} placeholder="Um link por linha" /></label><label>Logo ou materiais<input name="files" type="file" multiple accept="image/*,.pdf,.doc,.docx" /></label><small>Os arquivos serão enviados para uma área privada após a confirmação da solicitação.</small></fieldset>
    <fieldset hidden={step !== 3}><legend>Como podemos falar com você?</legend><div className="field-grid"><label>Nome do responsável<input name="contactName" required={step === 3} autoComplete="name" /></label><label>E-mail<input name="email" type="email" required={step === 3} autoComplete="email" /></label></div><label>Telefone / WhatsApp<input name="phone" required={step === 3} autoComplete="tel" /></label><div className="express-rule"><strong>Você não paga para ver o projeto.</strong><p>Primeiro organizamos a solicitação, desenvolvemos e validamos o preview. O pagamento só acontece depois da sua aprovação.</p></div></fieldset>
    <div className="form-navigation">{step > 0 && <button type="button" className="button-secondary" onClick={() => setStep(step - 1)}>Voltar</button>}<button className="button" disabled={loading}>{step === steps.length - 1 ? (loading ? "Enviando…" : "Enviar solicitação") : "Continuar"}<ArrowIcon /></button></div>
    <p className="express-message" role="status" aria-live="polite">{message}{previewUrl && <> <a href={previewUrl} target="_blank" rel="noreferrer">Abrir protótipo</a></>}</p>
  </form>;
}
