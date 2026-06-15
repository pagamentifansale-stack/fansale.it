import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fanSALE — Biglietti da fan a fan",
  description:
    "Compra e vendi biglietti in modo sicuro tra fan. Venditori verificati, pagamenti sicuri, consegna garantita.",
  keywords:
    "biglietti, rivendita fan, biglietti concerti, biglietti sport, mercato sicuro",
  openGraph: {
    title: "fanSALE — Biglietti da fan a fan",
    description: "Compra e vendi biglietti in modo sicuro tra fan.",
    type: "website",
  },
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
