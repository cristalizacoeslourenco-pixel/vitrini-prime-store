import { ProductCard } from "@/components/product/ProductCard";
import type { ProductCardView } from "@/types";

export function FeaturedProducts({ products }: { products: ProductCardView[] }) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-text-gray">
        Nenhum produto disponível nesta seção por enquanto.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
