import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20", 10));
  const search = searchParams.get("search") ?? undefined;
  const departmentId = searchParams.get("departmentId") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const where = {
    ...(status ? { status } : {}),
    ...(departmentId ? { departmentId } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search } },
            { sku: { contains: search } },
          ],
        }
      : {}),
  };

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          sku: true,
          priceCents: true,
          supplierCostCents: true,
          marginCents: true,
          status: true,
          badge: true,
          stockStatus: true,
          department: { select: { name: true } },
          category: { select: { name: true } },
        },
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, limit });
  } catch (err) {
    console.error("[products] error:", err);
    return NextResponse.json({ error: "Erro ao listar produtos." }, { status: 500 });
  }
}
