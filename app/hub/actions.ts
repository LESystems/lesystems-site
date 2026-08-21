"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type LoginState = { error?: string };
const credentials = z.object({ email: z.string().email("Informe um e-mail válido."), password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.") });

export async function signIn(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured()) return { error: "O acesso individual está sendo configurado pela LESystems." };
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "E-mail ou senha incorretos." };
  redirect("/hub");
}

export async function signOut() {
  if (isSupabaseConfigured()) await (await createSupabaseServerClient()).auth.signOut();
  redirect("/hub");
}

