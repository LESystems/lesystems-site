"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PasswordState = { error?: string };
const passwordSchema = z.string().min(8, "Use pelo menos 8 caracteres.").max(128);

export async function updatePassword(_: PasswordState, formData: FormData): Promise<PasswordState> {
  const password = String(formData.get("password") || "");
  const confirmation = String(formData.get("confirmation") || "");
  const parsed = passwordSchema.safeParse(password);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (password !== confirmation) return { error: "As senhas não coincidem." };
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Este link expirou. Solicite um novo e-mail de acesso." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "Não foi possível salvar a senha. Solicite um novo link." };
  redirect("/hub");
}

