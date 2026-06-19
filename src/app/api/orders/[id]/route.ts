import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  status: z
    .enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"])
    .optional(),
  trackingCode: z.string().optional(),
  supplierNotes: z.string().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            product: { select: { name: true, slug: true, sku: true } },
          },
        },
        trackingEvents: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error("[orders/id] GET error:", err);
    return NextResponse.json({ error: "Erro ao buscar pedido." }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 422 });
  }

  try {
    const updated = await prisma.order.update({
      where: { id },
      data: parsed.data,
    });

    if (parsed.data.status) {
      const statusMessages: Record<string, string> = {
        CONFIRMED: "Pedido confirmado pelo lojista.",
        SHIPPED: "Pedido enviado ao fornecedor parceiro.",
        DELIVERED: "Pedido entregue ao cliente.",
        CANCELLED: "Pedido cancelado.",
      };
      const msg = statusMessages[parsed.data.status];
      if (msg) {
        await prisma.trackingEvent.create({
          data: { orderId: id, status: parsed.data.status, description: msg },
        });
      }
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[orders/id] PATCH error:", err);
    return NextResponse.json({ error: "Erro ao atualizar pedido." }, { status: 500 });
  }
}
