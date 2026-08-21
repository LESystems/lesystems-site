"use client";

import { useActionState } from "react";
import { updatePassword, type PasswordState } from "./actions";

export default function PasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, {} as PasswordState);
  return <form className="access-form" action={action} aria-busy={pending}>
    <label htmlFor="new-password">Nova senha<input id="new-password" name="password" type="password" required minLength={8} maxLength={128} autoComplete="new-password" /></label>
    <label htmlFor="password-confirmation">Confirmar nova senha<input id="password-confirmation" name="confirmation" type="password" required minLength={8} maxLength={128} autoComplete="new-password" /></label>
    <button className="button" disabled={pending}>{pending ? "Salvando…" : "Definir minha senha"}</button>
    <p className="form-error" role="alert" aria-live="assertive">{state.error}</p>
  </form>;
}

