export type NavItem = {
  label: string;
  href: string;
};

export type DepartmentView = {
  name: string;
  slug: string;
  description: string;
  image?: string;
};

export type ProductCardView = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  priceCents: number;
  compareAtCents?: number | null;
  image?: string | null;
  badge?: string | null;
  departmentSlug?: string;
};

export type ProductDetailView = ProductCardView & {
  description: string;
  specifications: string;
  estimatedShipDays: number;
  sku: string;
  departmentName: string;
  categoryName: string;
  supplierName: string;
};
