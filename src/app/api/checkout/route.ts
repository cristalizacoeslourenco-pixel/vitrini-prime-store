import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  unitPriceCents: z.number().int().positive(),
});

const checkoutBodySchema = z.object({
  customer: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  paymentMethod: z.enum(["PIX", "CREDIT_CARD", "BOLETO", "SIMULATED"]),
  notes: z.string().optional(),
  shippingAddress: z.string().optional(),
  items: z.array(itemSchema).min(1),
  subtotalCents: z.number().int().nonnegative(),
  shippingCents: z.number().int().nonnegative(),
  totalCents: z.number().int().positive(),
});

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VP-${ts}-${rand}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = checkoutBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { customer, paymentMethod, notes, shippingAddress, items, subtotalCents, shippingCents, totalCents } =
    parsed.data;

  try {
    // Verificar se todos os produtos existem e buscar custo do fornecedor
    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, supplierCostCents: true },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "Um ou mais produtos não encontrados." },
        { status: 404 }
      );
    }

    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    // Encontrar ou criar cliente pelo e-mail
    let customerRecord = await prisma.customer.findFirst({
      where: { email: customer.email },
    });
    if (customerRecord) {
      customerRecord = await prisma.customer.update({
        where: { id: customerRecord.id },
        data: { name: customer.name, phone: customer.phone ?? null },
      });
    } else {
      customerRecord = await prisma.customer.create({
        data: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone ?? null,
        },
      });
    }

    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customerRecord.id,
        paymentMethod,
        paymentStatus: "SIMULATED",
        status: "PENDING",
        subtotalCents,
        shippingCents,
        totalCents,
        supplierNotes: notes ?? null,
        shippingAddress: shippingAddress ?? null,
        items: {
          create: items.map((item) => {
            const product = productMap[item.productId];
            const supplierCost = product?.supplierCostCents ?? 0;
            return {
              productId: item.productId,
              quantity: item.quantity,
              unitPriceCents: item.unitPriceCents,
              totalCents: item.unitPriceCents * item.quantity,
              supplierCostCents: supplierCost * item.quantity,
              estimatedProfitCents:
                (item.unitPriceCents - supplierCost) * item.quantity,
            };
          }),
        },
        trackingEvents: {
          create: {
            status: "PENDING",
            description: "Pedido recebido e aguardando confirmação.",
          },
        },
      },
    });

    return NextResponse.json({ orderNumber: order.orderNumber }, { status: 201 });
  } catch (err) {
    console.error("[checkout] error:", err);
    return NextResponse.json(
      { error: "Erro interno ao criar pedido." },
      { status: 500 }
    );
  }
}
