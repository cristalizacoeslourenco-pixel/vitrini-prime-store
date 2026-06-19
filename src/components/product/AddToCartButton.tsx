"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import type { ProductDetailView } from "@/types";

export function AddToCartButton({ product }: { product: ProductDetailView }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      slug: product.slug,
      priceCents: product.priceCents,
      departmentSlug: product.departmentSlug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleAdd}
      className={added ? "border-petrol text-petrol" : ""}
    >
      {added ? (
        <>
          <Check size={18} />
          Adicionado!
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
          Adicionar ao carrinho
        </>
      )}
    </Button>
  );
}
