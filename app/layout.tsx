import type { Metadata } from "next";
import { DM_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import AiAssistant from "./components/AiAssistant";
import ScrollAtmosphere from "./components/ScrollAtmosphere";
import SiteAnalytics from "./components/SiteAnalytics";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const serif = Newsreader({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"] });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lesystems-site.vercel.app"),
  title: { default: "LESystems | Engenharia de Software", template: "%s | LESystems" },
  description: "Sites, sistemas personalizados e automações para transformar desafios de negócio em soluções digitais.",
  openGraph: { title: "LESystems | Engenharia de Software", description: "Soluções digitais úteis, humanas e preparadas para crescer.", images: ["/technology-landscape.webp"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="pt-BR" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body><SiteAnalytics /><ScrollAtmosphere />{children}<AiAssistant /></body></html>;
}
