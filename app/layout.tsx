import type { Metadata } from "next";
import { Playfair_Display, Inter, Bebas_Neue, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://friendsofstcarloacutis.com"),
  title: {
    default: "Friends of St. Carlo Acutis Foundation",
    template: "%s | Friends of St. Carlo Acutis Foundation",
  },
  description:
    "Inspiring a new generation to use technology, faith, and service to transform the world through the example of St. Carlo Acutis.",
  keywords: ["Carlo Acutis", "Catholic", "foundation", "digital evangelization", "Eucharistic miracles", "faith"],
  openGraph: {
    title: "Friends of St. Carlo Acutis Foundation",
    description:
      "Inspiring a new generation to use technology, faith, and service to transform the world through the example of St. Carlo Acutis.",
    url: "https://friendsofstcarloacutis.com",
    siteName: "Friends of St. Carlo Acutis Foundation",
    images: [{ url: "/foc-logo-halo.png", width: 2000, height: 2000 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Friends of St. Carlo Acutis Foundation",
    description:
      "Inspiring a new generation to use technology, faith, and service to transform the world through the example of St. Carlo Acutis.",
    images: ["/foc-logo-halo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${bebasNeue.variable} ${caveat.variable}`}>
      <body className="font-sans bg-cream text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
