import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediRisk AI — Skrining Risiko Diabetes & Kardiovaskular",
  description:
    "Platform skrining preventif berbasis AI untuk membantu memahami faktor risiko diabetes dan penyakit kardiovaskular. Dukung SDG 3 – Kehidupan Sehat & Sejahtera.",
  keywords: "skrining diabetes, risiko kardiovaskular, AI kesehatan, preventif, SDG 3",
  openGraph: {
    title: "MediRisk AI — Skrining Risiko Kesehatan",
    description: "Skrining preventif berbasis AI untuk risiko diabetes & kardiovaskular.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
