"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart, type CartItem as CartItemType } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export function CartItem({ item }: { item: CartItemType }) {
  const { remove, setQty } = useCart();

  return (
    <div className="flex items-start gap-4 py-4">
      <Link
        href={`/produtos/${item.slug}`}
        className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-light-gray"
      >
        <div className="flex h-full w-full items-center justify-center text-text-gray/30 text-xs">
          img
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link
          href={`/produtos/${item.slug}`}
          className="truncate text-sm font-medium text-graphite hover:text-champagne transition-colors"
        >
          {item.name}
        </Link>
        <span className="text-sm font-semibold text-graphite">
          {formatCurrency(item.priceCents)}
        </span>

        <div className="mt-1 flex items-center gap-2">
          <button
            onClick={() => setQty(item.id, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-light-gray text-text-gray hover:border-champagne hover:text-champagne transition-colors"
            aria-label="Diminuir quantidade"
          >
            <Minus size={12} />
          </button>
          <span className="w-6 text-center text-sm font-medium text-graphite">
            {item.quantity}
          </span>
          <button
            onClick={() => setQty(item.id, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-light-gray text-text-gray hover:border-champagne hover:text-champagne transition-colors"
            aria-label="Aumentar quantidade"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-semibold text-graphite">
          {formatCurrency(item.priceCents * item.quantity)}
        </span>
        <button
          onClick={() => remove(item.id)}
          className="text-text-gray/50 hover:text-red-500 transition-colors"
          aria-label="Remover item"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
