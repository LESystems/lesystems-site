"use client";

import { FormEvent, useId, useState } from "react";
import ArrowIcon from "./ArrowIcon";

export default function AccessForm({ area }: { area: "client" | "admin" }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputId = useId();
  const errorId = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const code = new FormData(event.currentTarget).get("code");
    const response = await fetch("/api/access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ area, code }) });
    if (response.ok) { location.reload(); return; }
    const data = await response.json();
    setError(data.error || "Não foi possível acessar.");
    setLoading(false);
  }

  return <form className="access-form" onSubmit={submit} aria-busy={loading}>
    <label htmlFor={inputId}>Código de acesso</label>
    <input id={inputId} name="code" type="password" required autoComplete="current-password" placeholder="Digite seu código" aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
    <button className="button" disabled={loading}>{loading ? "Verificando…" : "Acessar área segura"}<ArrowIcon /></button>
    <p id={errorId} className="form-error" role="alert" aria-live="assertive">{error}</p>
  </form>;
}
