"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";
import { legalTexts } from "@/data/legalTexts";

export default function CartPage() {
  const { items, subtotalCents, clear } = useCart();

  const shippingCents = 0;
  const totalCents = subtotalCents + shippingCents;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/produtos"
          className="flex items-center gap-1 text-sm text-text-gray hover:text-champagne transition-colors"
        >
          <ArrowLeft size={16} />
          Continuar comprando
        </Link>
      </div>

      <h1 className="font-display text-3xl font-semibold text-graphite mb-8">
        Carrinho de compras
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
          <ShoppingBag size={64} className="text-light-gray" />
          <div>
            <p className="text-lg font-medium text-graphite">
              Seu carrinho está vazio
            </p>
            <p className="mt-1 text-sm text-text-gray">
              Explore nosso catálogo e encontre algo especial.
            </p>
          </div>
          <Link href="/produtos">
            <Button variant="primary">Ver produtos</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Lista de itens */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-light-gray bg-white/90 px-6 divide-y divide-light-gray">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <button
              onClick={clear}
              className="mt-4 text-xs text-text-gray/60 hover:text-red-500 transition-colors underline-offset-2 hover:underline"
            >
              Limpar carrinho
            </button>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-light-gray bg-white/90 p-6 sticky top-20 space-y-4">
              <h2 className="font-display text-lg font-semibold text-graphite">
                Resumo do pedido
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-gray">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-text-gray">
                  <span>Frete</span>
                  <span className="text-petrol font-medium">
                    {shippingCents === 0 ? "Calculado no checkout" : formatCurrency(shippingCents)}
                  </span>
                </div>
              </div>

              <div className="border-t border-light-gray pt-3 flex justify-between">
                <span className="font-semibold text-graphite">Total</span>
                <span className="font-display text-xl font-semibold text-graphite">
                  {formatCurrency(totalCents)}
                </span>
              </div>

              <Link href="/checkout" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  Finalizar pedido
                </Button>
              </Link>

              <p className="text-xs leading-relaxed text-text-gray/60 text-center">
                {legalTexts.checkoutSimulated}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
