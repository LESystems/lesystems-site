"use client";

import { FormEvent, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function InviteSetup() {
  const [invited, setInvited] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.location.hash.includes("access_token")) return;
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => setInvited(Boolean(data.session)));
  }, []);

  async function definePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("newPassword") || "");
    const confirmation = String(form.get("confirmPassword") || "");
    if (password.length < 8) { setMessage("Use pelo menos 8 caracteres."); setLoading(false); return; }
    if (password !== confirmation) { setMessage("As senhas não coincidem."); setLoading(false); return; }
    const { error } = await createSupabaseBrowserClient().auth.updateUser({ password });
    if (error) { setMessage("O convite expirou. Solicite um novo acesso à LESystems."); setLoading(false); return; }
    window.location.replace("/hub");
  }

  if (!invited) return null;
  return <div className="invite-setup"><p className="hub-eyebrow">Primeiro acesso</p><h2>Defina sua senha.</h2><p>Crie uma senha pessoal para concluir a ativação da sua conta.</p><form className="access-form" onSubmit={definePassword} aria-busy={loading}><label htmlFor="new-password">Nova senha<input id="new-password" name="newPassword" type="password" minLength={8} required autoComplete="new-password" /></label><label htmlFor="confirm-password">Confirmar senha<input id="confirm-password" name="confirmPassword" type="password" minLength={8} required autoComplete="new-password" /></label><button className="button" disabled={loading}>{loading ? "Ativando…" : "Ativar minha conta"}</button><p className="form-error" role="alert">{message}</p></form></div>;
}

