"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import type { ProductDetailView } from "@/types";

export function BuyNowButton({ product }: { product: ProductDetailView }) {
  const { add } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    add({
      id: product.id,
      name: product.name,
      slug: product.slug,
      priceCents: product.priceCents,
      departmentSlug: product.departmentSlug,
    });
    router.push("/checkout");
  };

  return (
    <Button variant="primary" size="lg" onClick={handleBuyNow}>
      Comprar agora
    </Button>
  );
}
