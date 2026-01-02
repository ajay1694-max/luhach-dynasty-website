import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "लुहाच परिवार (Luhach Parivar) - Official Website",
  description: "लुहाच वंश मेहनतकश जाट समुदाय का एक गोत्र है। Luhach Vansh is a gotra of the hardworking Jat community. Official heritage website with genealogy, history, and community information.",
  keywords: ["Luhach", "Luhach Vansh", "Jat", "Genealogy", "Heritage", "लुहाच", "जाट", "वंशावली"],
  authors: [{ name: "Luhach Family" }],
  openGraph: {
    title: "लुहाच परिवार (Luhach Parivar)",
    description: "Official heritage website of the Luhach family with genealogy, history, and community information.",
    locale: "hi_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${notoSansDevanagari.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
