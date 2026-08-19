"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

type Source = { url: string; title: string };
type Message = { role: "assistant" | "user"; text: string; sources?: Source[] };

const suggestions = ["Qual serviço combina comigo?", "Como funciona um projeto?", "Quero solicitar orçamento"];

function localAnswer(question: string) {
  const value = question.toLowerCase();
  if (value.includes("orçamento") || value.includes("preço")) return "O valor depende do objetivo e do escopo. Posso encaminhar você ao formulário para receber uma avaliação inicial sem compromisso.";
  if (value.includes("autom")) return "Automação é indicada quando sua equipe repete tarefas, transfere dados manualmente ou precisa integrar ferramentas. A LESystems começa mapeando o processo atual.";
  if (value.includes("site")) return "Para apresentar serviços, captar contatos ou lançar uma oferta, Sites & Experiências Web costuma ser o melhor ponto de partida.";
  if (value.includes("sistema")) return "Um sistema personalizado é ideal quando planilhas e ferramentas separadas já não acompanham a operação da empresa.";
  if (value.includes("como funciona") || value.includes("projeto")) return "O projeto passa por descoberta, estratégia, desenvolvimento e evolução. Você acompanha cada etapa e valida as decisões importantes.";
  return "Posso orientar sobre sites, sistemas, automações, prazos e próximos passos. Se a dúvida for específica, a equipe pode continuar o atendimento pelo formulário.";
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: "Olá! Sou o assistente da LESystems. Conte o que sua empresa precisa e eu ajudo a encontrar o melhor caminho." }]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading, open]);

  async function ask(text: string) {
    const clean = text.trim(); if (!clean || loading) return;
    setMessages((items) => [...items, { role: "user", text: clean }]); setInput(""); setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 25000);
      const response = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: clean }), signal: controller.signal });
      window.clearTimeout(timeout);
      if (!response.ok) throw new Error("Falha ao consultar o assistente");
      const data = await response.json();
      setMessages((items) => [...items, { role: "assistant", text: data.answer || localAnswer(clean), sources: data.sources || [] }]);
    } catch { setMessages((items) => [...items, { role: "assistant", text: localAnswer(clean) }]); }
    finally { setLoading(false); }
  }

  function submit(event: FormEvent) { event.preventDefault(); void ask(input); }

  return <div className={`assistant ${open ? "is-open" : ""}`}>
    {open && <section className="assistant-panel" aria-label="Assistente LESystems"><header><span className="assistant-avatar">LE</span><div><strong>Assistente LESystems</strong><small><i /> disponível agora</small></div><button onClick={() => setOpen(false)} aria-label="Fechar assistente">×</button></header><div className="assistant-messages" aria-live="polite" aria-busy={loading}>{messages.map((message, index) => <div className={`message-bubble message-${message.role}`} key={`${message.role}-${index}`}><p>{message.text}</p>{message.sources && message.sources.length > 0 && <span className="assistant-sources"><b>Fontes</b>{message.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.title}</a>)}</span>}</div>)}{loading && <div className="message-bubble message-assistant typing"><p>Pesquisando e analisando sua dúvida…</p></div>}<div ref={messagesEndRef} className="assistant-messages-end" /></div><div className="assistant-suggestions">{suggestions.map((item) => <button key={item} onClick={() => void ask(item)} disabled={loading}>{item}</button>)}</div><form onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Digite sua dúvida…" aria-label="Sua dúvida" disabled={loading} /><button aria-label="Enviar pergunta" disabled={loading}><ArrowIcon direction="up" /></button></form><Link href="/contato">Prefere falar com uma pessoa? Enviar contato <ArrowIcon /></Link></section>}
    <button className="assistant-toggle" onClick={() => setOpen(!open)} aria-expanded={open}><span>✦</span><b>{open ? "Fechar" : "Posso ajudar?"}</b></button>
  </div>;
}
