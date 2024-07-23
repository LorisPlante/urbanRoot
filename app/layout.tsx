import "./globals.css";

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
        {/* ------ FONTS ------ */}
        <link rel="preload" href="/fonts/TANKER/Tanker-Regular.otf" as="Tanker" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/fonts/TANKER/Tanker-Regular.ttf" as="Tanker" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/fonts/TANKER/Tanker-Regular.eot" as="Tanker" type="font/eot" crossOrigin="" />
        <link rel="preload" href="/fonts/TANKER/Tanker-Regular.woff" as="Tanker" type="font/woff" crossOrigin="" />
        <link rel="preload" href="/fonts/TANKER/Tanker-Regular.woff2" as="Tanker" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/Satochi/Satochi-Variable.ttf" as="Satochi" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/fonts/Satochi/Satochi-Variable.eot" as="Satochi" type="font/eot" crossOrigin="" />
        <link rel="preload" href="/fonts/Satochi/Satochi-Variable.woff" as="Satochi" type="font/woff" crossOrigin="" />
        <link rel="preload" href="/fonts/Satochi/Satochi-Variable.woff2" as="Satochi" type="font/woff2" crossOrigin="" />
      </head>
      <body className="font-satochi bg-secondary text-primary">{children}</body>
    </html>
  );
}
