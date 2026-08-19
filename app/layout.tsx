import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LESystems | Engenharia de Software",
  description: "Sites, sistemas personalizados e automações para transformar desafios de negócio em soluções digitais.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
