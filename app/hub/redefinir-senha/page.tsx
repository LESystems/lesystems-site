import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import PasswordForm from "./PasswordForm";
import "../hub.css";
import "../login.css";
import "../refine.css";
import "../fix.css";

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/hub?erro=link-expirado");
  return <main className="hub-login"><section className="login-intro" aria-label="Segurança do LESystems Hub"><Link href="/" className="login-brand" aria-label="Voltar ao site LESystems"><span><Image src="/icon.png" alt="" width={256} height={256} priority /></span><div><strong>LESystems</strong><small>Hub</small></div></Link><div className="login-copy"><p>Acesso individual</p><h1>Ative sua conta com uma <em>senha segura.</em></h1><div className="login-points"><span><i>01</i>Mínimo de 8 caracteres</span><span><i>02</i>Uso pessoal e intransferível</span><span><i>03</i>Proteção dos seus projetos</span></div></div><small className="login-foot">LESystems · Engenharia de software</small></section><section className="login-form-side" aria-labelledby="password-title"><div className="login-box"><p className="hub-eyebrow">Primeiro acesso</p><h2 id="password-title">Defina sua senha.</h2><p>Depois de salvar, você será direcionado automaticamente para o Hub.</p><PasswordForm /><Link className="back-site" href="/hub">← Voltar ao acesso</Link></div></section></main>;
}
