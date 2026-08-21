"use client";

import { useActionState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import { signIn, type LoginState } from "./actions";

export default function SupabaseLoginForm() {
  const [state, action, pending] = useActionState(signIn, {} as LoginState);
  return <form className="access-form" action={action} aria-busy={pending}>
    <label htmlFor="hub-email">E-mail<input id="hub-email" name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br" /></label>
    <label htmlFor="hub-password">Senha<input id="hub-password" name="password" type="password" required minLength={8} autoComplete="current-password" placeholder="Sua senha" /></label>
    <button className="button" disabled={pending}>{pending ? "Entrando…" : "Entrar no Hub"}<ArrowIcon /></button>
    <p className="form-error" role="alert" aria-live="assertive">{state.error}</p>
  </form>;
}
