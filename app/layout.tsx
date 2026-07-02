import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { TAXI_INFO } from "../src/config/info";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(TAXI_INFO.websiteUrl),
  title: `${TAXI_INFO.brandName} | ${TAXI_INFO.tagline}`,
  description: `Viajes seguros, cómodos y de confianza en ${TAXI_INFO.coverage}. El mejor servicio.`,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/foto_perfil.jpeg",
  },
  openGraph: {
    title: `${TAXI_INFO.brandName} | Tarjeta Digital`,
    description: `Viajes seguros, cómodos y de absoluta confianza en ${TAXI_INFO.coverage}. Pide tu viaje por WhatsApp.`,
    url: TAXI_INFO.websiteUrl,
    siteName: TAXI_INFO.brandName,
    images: [
      {
        url: "/foto_perfil.jpeg",
        width: 800,
        height: 600,
        alt: `Perfil de ${TAXI_INFO.brandName}`,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
