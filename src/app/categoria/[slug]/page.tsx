import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { findDepartmentBySlug, findCategoryBySlug } from "@/lib/taxonomy";
import { getAllProducts } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const department = await findDepartmentBySlug(slug);
  if (department) {
    return { title: `${department.name} | Vitrini Prime` };
  }

  const category = await findCategoryBySlug(slug);
  if (category) {
    return { title: `${category.name} | Vitrini Prime` };
  }

  return { title: "Categoria não encontrada | Vitrini Prime" };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Resolução limpa de conflito: departamento tem prioridade sobre categoria,
  // já que slugs de categoria são sempre prefixados pelo slug do departamento
  // no momento da criação (ver prisma/seed.ts).
  const department = await findDepartmentBySlug(slug);

  if (department) {
    const products = await getAllProducts({ departmentSlug: slug });

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-graphite">
          {department.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-text-gray">
          {department.description}
        </p>

        {department.categories.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {department.categories.map((cat: { name: string; slug: string }) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="rounded-full border border-light-gray px-3 py-1 text-xs font-medium text-text-gray transition-colors hover:border-champagne hover:text-champagne"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          <FeaturedProducts products={products} />
        </div>
      </div>
    );
  }

  const category = await findCategoryBySlug(slug);

  if (category) {
    const products = await getAllProducts({ categorySlug: slug });

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-wider text-text-gray">
          <Link
            href={`/categoria/${category.department.slug}`}
            className="hover:text-champagne"
          >
            {category.department.name}
          </Link>
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-graphite">
          {category.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-text-gray">
          {category.description}
        </p>

        <div className="mt-8">
          <FeaturedProducts products={products} />
        </div>
      </div>
    );
  }

  notFound();
}
