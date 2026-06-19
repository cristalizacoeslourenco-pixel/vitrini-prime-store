import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { STORE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: `${STORE.name} | ${STORE.slogan}`,
  description: STORE.description,
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
