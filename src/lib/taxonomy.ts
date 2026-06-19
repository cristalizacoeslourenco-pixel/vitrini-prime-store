import { prisma } from "@/lib/prisma";

export async function findDepartmentBySlug(slug: string) {
  return prisma.department.findUnique({
    where: { slug },
    include: { categories: { select: { name: true, slug: true } } },
  });
}

export async function findCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { department: { select: { name: true, slug: true } } },
  });
}
