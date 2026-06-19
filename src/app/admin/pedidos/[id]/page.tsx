import Link from "next/link";
import { notFound } from "next/navigation";
import { Package, MapPin, CreditCard, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { AdminOrderActions } from "@/components/admin/AdminOrderActions";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-400/10 text-yellow-400",
  CONFIRMED: "bg-blue-400/10 text-blue-400",
  SHIPPED: "bg-petrol/20 text-petrol",
  DELIVERED: "bg-green-400/10 text-green-400",
  CANCELLED: "bg-red-400/10 text-red-400",
};

const PAYMENT_LABELS: Record<string, string> = {
  PIX: "Pix",
  CREDIT_CARD: "Cartão de crédito",
  BOLETO: "Boleto",
  SIMULATED: "Simulado",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  if (!order) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/pedidos"
            className="text-xs text-ice/40 hover:text-champagne transition-colors"
          >
            ← Pedidos
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ice">
            {order.orderNumber}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                STATUS_COLORS[order.status] ?? "bg-white/5 text-ice/50"
              }`}
            >
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
            <span className="flex items-center gap-1 text-xs text-ice/40">
              <Calendar size={12} />
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>
        <AdminOrderActions orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Cliente */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-ice/40">
            Cliente
          </h2>
          <p className="font-medium text-ice">{order.customer.name}</p>
          <p className="text-sm text-ice/50">{order.customer.email}</p>
          {order.customer.phone && (
            <p className="text-sm text-ice/50">{order.customer.phone}</p>
          )}
        </div>

        {/* Pagamento */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ice/40">
            <CreditCard size={12} />
            Pagamento
          </h2>
          <p className="font-medium text-ice">
            {PAYMENT_LABELS[order.paymentMethod ?? ""] ?? order.paymentMethod ?? "—"}
          </p>
          <p className="text-sm text-ice/50">Status: {order.paymentStatus}</p>
        </div>

        {/* Rastreio */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ice/40">
            <MapPin size={12} />
            Rastreio
          </h2>
          {order.trackingCode ? (
            <p className="font-mono text-sm text-ice">{order.trackingCode}</p>
          ) : (
            <p className="text-sm text-ice/30">Código ainda não informado</p>
          )}
        </div>
      </div>

      {/* Itens */}
      <div className="rounded-2xl border border-white/5 bg-white/5">
        <h2 className="flex items-center gap-2 border-b border-white/5 px-5 py-4 text-sm font-medium text-ice">
          <Package size={16} className="text-ice/40" />
          Itens do pedido
        </h2>
        <div className="divide-y divide-white/5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-ice">{item.product.name}</p>
                <p className="text-xs text-ice/40">
                  SKU: {item.product.sku} · Qtd: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-ice">
                  {formatCurrency(item.totalCents)}
                </p>
                <p className="text-xs text-ice/40">
                  Custo: {formatCurrency(item.supplierCostCents)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 px-5 py-4">
          <div className="flex justify-between text-sm text-ice/50">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between text-sm text-ice/50">
            <span>Frete</span>
            <span>{formatCurrency(order.shippingCents)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-white/5 pt-2 font-display text-base font-semibold text-ice">
            <span>Total</span>
            <span>{formatCurrency(order.totalCents)}</span>
          </div>
        </div>
      </div>

      {/* Histórico */}
      {order.trackingEvents.length > 0 && (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <h2 className="mb-4 text-sm font-medium text-ice">
            Histórico de status
          </h2>
          <ol className="space-y-3">
            {order.trackingEvents.map((ev, i) => (
              <li key={ev.id} className="flex items-start gap-3">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full mt-1 ${
                      i === order.trackingEvents.length - 1
                        ? "bg-champagne"
                        : "bg-white/20"
                    }`}
                  />
                  {i < order.trackingEvents.length - 1 && (
                    <div className="w-px flex-1 bg-white/10 mt-1 min-h-[20px]" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-ice">{ev.description}</p>
                  <p className="text-xs text-ice/30">{formatDate(ev.createdAt)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {order.supplierNotes && (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-ice/40">
            Observações do cliente
          </h2>
          <p className="text-sm text-ice/70">{order.supplierNotes}</p>
        </div>
      )}
    </div>
  );
}
