import type { Metadata } from "next";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import HubApp from "./HubApp";
import HubLogin from "./HubLogin";
import { redirect } from "next/navigation";
import "./hub.css";
import "./login.css";
import "./refine.css";
import "./fix.css";

export const metadata: Metadata = {
  title: "LESystems Hub",
  description: "Projetos, atendimento e operação LESystems em um só lugar.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "LESystems Hub",
    description: "Projetos, atendimento e operação LESystems em um só lugar.",
    images: [],
  },
  twitter: {
    title: "LESystems Hub",
    description: "Projetos, atendimento e operação LESystems em um só lugar.",
    images: [],
  },
};

export default async function HubPage() {
  if (!isSupabaseConfigured()) return <HubLogin />;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <HubLogin />;
  if (user.user_metadata?.must_change_password === true) redirect("/hub/redefinir-senha");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const teamAllowed = profile?.role === "admin" || profile?.role === "team";
  return <HubApp initialRole={teamAllowed ? "team" : "client"} canSwitchRole={teamAllowed} />;
}
