"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, subtotalCents, totalItems } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-graphite/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ice shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-light-gray px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-graphite" />
            <span className="font-display text-lg font-semibold text-graphite">
              Carrinho
            </span>
            {totalItems > 0 && (
              <span className="ml-1 rounded-full bg-champagne px-2 py-0.5 text-xs font-medium text-graphite">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-gray hover:bg-light-gray transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag size={48} className="text-light-gray" />
              <p className="text-sm text-text-gray">Seu carrinho está vazio.</p>
              <Button variant="outline" size="sm" onClick={onClose}>
                Continuar comprando
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-light-gray">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-light-gray px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-gray">Subtotal</span>
              <span className="font-display text-xl font-semibold text-graphite">
                {formatCurrency(subtotalCents)}
              </span>
            </div>
            <p className="text-xs text-text-gray/60">
              Frete calculado no checkout.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/checkout" onClick={onClose}>
                <Button variant="primary" size="lg" className="w-full">
                  Finalizar pedido
                </Button>
              </Link>
              <Link href="/carrinho" onClick={onClose}>
                <Button variant="outline" size="md" className="w-full">
                  Ver carrinho completo
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
