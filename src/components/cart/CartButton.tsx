"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Carrinho — ${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-ice transition-colors hover:bg-white/10"
      >
        <ShoppingBag size={20} />
        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[10px] font-bold text-graphite">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
