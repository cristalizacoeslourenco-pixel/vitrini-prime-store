import { prisma } from "@/lib/prisma";
import type { ProductCardView, ProductDetailView } from "@/types";

type ProductWithRelations = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  specifications: string;
  priceCents: number;
  compareAtCents: number | null;
  image: string | null;
  badge: string | null;
  sku: string;
  estimatedShipDays: number;
  department: { name: string; slug: string };
  category: { name: string };
  supplier: { name: string };
};

function toCardView(product: ProductWithRelations): ProductCardView {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    priceCents: product.priceCents,
    compareAtCents: product.compareAtCents,
    image: product.image,
    badge: product.badge,
    departmentSlug: product.department.slug,
  };
}

function toDetailView(product: ProductWithRelations): ProductDetailView {
  return {
    ...toCardView(product),
    description: product.description,
    specifications: product.specifications,
    estimatedShipDays: product.estimatedShipDays,
    sku: product.sku,
    departmentName: product.department.name,
    categoryName: product.category.name,
    supplierName: product.supplier.name,
  };
}

const includeRelations = {
  department: { select: { name: true, slug: true } },
  category: { select: { name: true } },
  supplier: { select: { name: true } },
} as const;

export async function getFeaturedProducts(
  limit = 8,
  departmentSlug?: string
): Promise<ProductCardView[]> {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(departmentSlug ? { department: { slug: departmentSlug } } : {}),
    },
    include: includeRelations,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return products.map(toCardView);
}

export async function getAllProducts(params?: {
  departmentSlug?: string;
  categorySlug?: string;
  search?: string;
}): Promise<ProductCardView[]> {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(params?.departmentSlug
        ? { department: { slug: params.departmentSlug } }
        : {}),
      ...(params?.categorySlug
        ? { category: { slug: params.categorySlug } }
        : {}),
      ...(params?.search
        ? { name: { contains: params.search } }
        : {}),
    },
    include: includeRelations,
    orderBy: { createdAt: "desc" },
  });

  return products.map(toCardView);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductDetailView | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: includeRelations,
  });

  if (!product) return null;
  return toDetailView(product);
}
