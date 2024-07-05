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
      <body>{children}</body>
    </html>
  );
}
