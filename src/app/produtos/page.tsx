import type { Metadata } from "next";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produtos | Vitrini Prime",
};

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string }>;
}) {
  const { busca } = await searchParams;
  const products = await getAllProducts({ search: busca });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-graphite">
        Produtos
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-text-gray">
        {busca
          ? `Resultados para "${busca}" (${products.length} produto${
              products.length === 1 ? "" : "s"
            }).`
          : `Catálogo completo com ${products.length} produtos selecionados.`}
      </p>

      <form action="/produtos" className="mt-6 flex max-w-md gap-2">
        <input
          type="text"
          name="busca"
          defaultValue={busca ?? ""}
          placeholder="Buscar produto..."
          className="h-11 flex-1 rounded-lg border border-light-gray bg-white px-4 text-sm text-graphite placeholder:text-text-gray/60 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/30"
        />
        <button
          type="submit"
          className="h-11 rounded-lg bg-graphite px-5 text-sm font-medium text-ice transition-colors hover:bg-[#262626]"
        >
          Buscar
        </button>
      </form>

      <div className="mt-8">
        <FeaturedProducts products={products} />
      </div>
    </div>
  );
}
