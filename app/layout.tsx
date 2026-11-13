import type { Metadata } from "next";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Rise Exports | Handcrafted Brass Products & Artware Export House",
  description:
    "Global Rise Exports - Premier Indian manufacturer & international exporter of handcrafted brassware, architectural vessels, decorative urlis, bowls, sculptures, and luxury metal home decor from Moradabad, India.",
  keywords: [
    "Global Rise Exports",
    "brass exports india",
    "moradabad brass manufacturer",
    "handcrafted brass urlis",
    "brass home decor export",
    "architectural brass vessels",
    "indian handicraft exporter",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F6F2EA] text-[#1F1A16] font-body selection:bg-brand-accent selection:text-white no-horizontal-overflow relative">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
