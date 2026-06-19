import { Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { BuyNowButton } from "./BuyNowButton";
import type { ProductDetailView } from "@/types";

export function ProductDetails({ product }: { product: ProductDetailView }) {
  const hasDiscount =
    typeof product.compareAtCents === "number" &&
    product.compareAtCents > product.priceCents;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-text-gray">
          {product.departmentName} · {product.categoryName}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-graphite">
          {product.name}
        </h1>
        {product.badge && (
          <Badge
            tone={product.badge === "Oferta" ? "champagne" : "petrol"}
            className="mt-3"
          >
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-semibold text-graphite">
          {formatCurrency(product.priceCents)}
        </span>
        {hasDiscount && (
          <span className="text-base text-text-gray/70 line-through">
            {formatCurrency(product.compareAtCents as number)}
          </span>
        )}
      </div>

      <p className="leading-relaxed text-text-gray">{product.description}</p>

      <div className="rounded-2xl border border-light-gray bg-ice p-4">
        <h2 className="text-sm font-semibold text-graphite">Especificações</h2>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text-gray">
          {product.specifications}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-text-gray">
        <Truck size={18} className="text-petrol" />
        Prazo estimado de envio: aproximadamente {product.estimatedShipDays} dias
      </div>

      <div className="flex flex-wrap gap-3">
        <BuyNowButton product={product} />
        <AddToCartButton product={product} />
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-petrol/5 p-4 text-xs leading-relaxed text-text-gray">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-petrol" />
        <span>
          Este produto é comercializado por um fornecedor parceiro selecionado.
          Prazos e disponibilidade podem variar conforme o produto e a região.
        </span>
      </div>

      <a
        href="/atendimento"
        className="flex items-center gap-2 text-sm text-text-gray transition-colors hover:text-champagne"
      >
        <MessageCircle size={16} />
        Dúvidas sobre este produto? Fale com o atendimento.
      </a>
    </div>
  );
}
