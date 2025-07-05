import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comick API Proxy",
  description: "CORS-enabled proxy for the Comick API",
  keywords: "comick, manga, api, proxy, cors, manhwa, manhua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
