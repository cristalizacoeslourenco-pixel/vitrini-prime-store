import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { STORE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${STORE.name} — ${STORE.slogan}`,
    template: `%s | ${STORE.name}`,
  },
  description: STORE.description,
  keywords: [
    "loja online", "dropshipping", "skincare", "beleza", "fitness", "pet shop",
    "gadgets", "moda", "organização", "casa", "compra online brasil",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: STORE.name,
    title: `${STORE.name} — ${STORE.slogan}`,
    description: STORE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-ice text-graphite">
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}
