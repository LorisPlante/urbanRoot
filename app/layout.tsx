import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Roots",
  description: "Urban Roots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/medias/img/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/medias/img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/medias/img/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/medias/img/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/medias/img/favicon/safari-pinned-tab.svg" color="#00a481" />
        <link rel="shortcut icon" href="/medias/img/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/medias/img/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
