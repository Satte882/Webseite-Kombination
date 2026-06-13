import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import "./flow.css";
import "./site-one.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dppfor.eu"),
  title: "DPPFOR – 0Admin macht aus Leistung zuverlässig Zahlung",
  description:
    "0Admin zeigt deutschen Handwerksbetrieben, was bezahlt ist, wo Geld offensteht und welcher Schritt als Nächstes erforderlich ist.",
  applicationName: "0Admin von DPPFOR",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "DPPFOR – 0Admin macht aus Leistung zuverlässig Zahlung",
    description:
      "Vom Rechnungsdokument über Fälligkeit und Freigabe bis zur Zahlung oder Klärung.",
    type: "website",
    locale: "de_DE",
    siteName: "DPPFOR",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
