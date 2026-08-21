"use client";

import Image from "next/image";
import Link from "next/link";
import SupabaseLoginForm from "./SupabaseLoginForm";
import InviteSetup from "./InviteSetup";

export default function HubLogin() {
  return <main className="hub-login">
    <section className="login-intro" aria-label="Apresentação do LESystems Hub">
      <Link href="/" className="login-brand" aria-label="Voltar ao site LESystems"><span><Image src="/icon.png" alt="" width={256} height={256} priority /></span><div><strong>LESystems</strong><small>Hub</small></div></Link>
      <div className="login-copy"><p>Projetos · atendimento · operação</p><h1>Tudo o que move o projeto, <em>em um só lugar.</em></h1><div className="login-points"><span><i>01</i>Acompanhe cada etapa</span><span><i>02</i>Aprove entregas com clareza</span><span><i>03</i>Converse com a equipe</span></div></div>
      <small className="login-foot">LESystems · Engenharia de software</small>
    </section>
    <section className="login-form-side" aria-labelledby="hub-login-title">
      <div className="login-box"><InviteSetup /><div className="regular-login"><p className="hub-eyebrow">Acesso seguro</p><h2 id="hub-login-title">Bem-vindo ao Hub.</h2><p>Entre com sua conta individual. Seu perfil e seus projetos serão identificados automaticamente.</p>
        <SupabaseLoginForm />
        <div className="login-security"><span aria-hidden="true">✓</span><p><strong>Ambiente protegido</strong><small>Sua sessão expira automaticamente após 8 horas.</small></p></div>
        <Link className="back-site" href="/">← Voltar ao site da LESystems</Link>
      </div></div>
    </section>
  </main>;
}
