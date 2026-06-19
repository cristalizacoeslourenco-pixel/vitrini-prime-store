import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";
import { formatCurrency } from "@/lib/format";
import type { ProductCardView } from "@/types";

export function ProductCard({ product }: { product: ProductCardView }) {
  const hasDiscount =
    typeof product.compareAtCents === "number" &&
    product.compareAtCents > product.priceCents;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-light-gray bg-white transition-shadow hover:shadow-[0_12px_32px_-12px_rgba(17,17,17,0.18)]">
      <Link
        href={`/produtos/${product.slug}`}
        className="relative block aspect-square overflow-hidden"
      >
        <ProductImagePlaceholder
          departmentSlug={product.departmentSlug}
          className="h-full w-full"
        />
        {product.badge && (
          <Badge
            tone={product.badge === "Oferta" ? "champagne" : "petrol"}
            className="absolute left-3 top-3"
          >
            {product.badge}
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-graphite">
          <Link href={`/produtos/${product.slug}`} className="hover:text-champagne">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-text-gray">
          {product.shortDescription}
        </p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-graphite">
            {formatCurrency(product.priceCents)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-text-gray/70 line-through">
              {formatCurrency(product.compareAtCents as number)}
            </span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <Link href={`/produtos/${product.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Ver detalhes
            </Button>
          </Link>
          <Link href={`/produtos/${product.slug}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Comprar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
