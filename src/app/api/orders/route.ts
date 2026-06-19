import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20", 10));
  const status = searchParams.get("status") ?? undefined;

  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: status ? { status } : undefined,
        include: {
          customer: { select: { name: true, email: true } },
          items: { select: { quantity: true, totalCents: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where: status ? { status } : undefined }),
    ]);

    return NextResponse.json({ orders, total, page, limit });
  } catch (err) {
    console.error("[orders] error:", err);
    return NextResponse.json({ error: "Erro ao listar pedidos." }, { status: 500 });
  }
}
