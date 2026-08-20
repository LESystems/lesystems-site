import type { Metadata } from "next";
import { cookies } from "next/headers";
import { validToken } from "../access";
import HubApp from "./HubApp";
import HubLogin from "./HubLogin";
import "./hub.css";
import "./login.css";
import "./refine.css";

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
  const jar = await cookies();
  const teamAllowed = validToken("admin", jar.get("lesystems_admin")?.value);
  const clientAllowed = validToken("client", jar.get("lesystems_client")?.value);
  if (!teamAllowed && !clientAllowed) return <HubLogin />;
  return <HubApp initialRole={teamAllowed ? "team" : "client"} canSwitchRole={teamAllowed} />;
}
