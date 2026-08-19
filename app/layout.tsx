import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AiAssistant from "./components/AiAssistant";
import ScrollAtmosphere from "./components/ScrollAtmosphere";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lesystems-site.vercel.app"),
  title: { default: "LESystems | Engenharia de Software", template: "%s | LESystems" },
  description: "Sites, sistemas personalizados e automações para transformar desafios de negócio em soluções digitais.",
  openGraph: { title: "LESystems | Engenharia de Software", description: "Soluções digitais úteis, humanas e preparadas para crescer.", images: ["/technology-landscape.webp"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}><body><ScrollAtmosphere />{children}<AiAssistant /></body></html>;
}
