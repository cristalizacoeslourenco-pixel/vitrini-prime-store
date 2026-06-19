import { Package, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, formatCurrency } from "@/lib/format";
import { TrackingTimeline } from "@/components/ui/TrackingTimeline";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Aguardando confirmação",
  CONFIRMED: "Confirmado",
  SHIPPED: "Em trânsito",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

export const metadata = { title: "Rastrear pedido | Vitrini Prime" };

export default async function RastrearPedidoPage({
  searchParams,
}: {
  searchParams: Promise<{ numero?: string }>;
}) {
  const { numero } = await searchParams;

  const order = numero
    ? await prisma.order.findUnique({
        where: { orderNumber: numero },
        include: {
          customer: { select: { name: true } },
          items: {
            include: {
              product: { select: { name: true, sku: true } },
            },
          },
          trackingEvents: { orderBy: { createdAt: "asc" } },
        },
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol/10">
          <Package size={20} className="text-petrol" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-graphite">
            Rastrear pedido
          </h1>
          <p className="text-sm text-text-gray">
            Informe o número do pedido para ver o status.
          </p>
        </div>
      </div>

      {/* Search form */}
      <form method="get" className="flex gap-2">
        <input
          name="numero"
          defaultValue={numero}
          placeholder="VP-XXXXX-XXXX"
          className="flex-1 rounded-xl border border-light-gray bg-white px-4 py-2.5 text-sm text-graphite placeholder:text-text-gray/40 focus:border-champagne focus:outline-none font-mono"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-graphite px-5 py-2.5 text-sm font-medium text-ice hover:bg-[#262626] transition-colors"
        >
          <Search size={16} />
          Buscar
        </button>
      </form>

      {/* Results */}
      {numero && (
        <div className="mt-8">
          {!order ? (
            <div className="rounded-2xl border border-light-gray bg-white/90 px-6 py-10 text-center">
              <Package size={40} className="mx-auto mb-3 text-light-gray" />
              <p className="font-medium text-graphite">Pedido não encontrado</p>
              <p className="mt-1 text-sm text-text-gray">
                Verifique se o número está correto:{" "}
                <span className="font-mono font-semibold">{numero}</span>
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order summary */}
              <div className="rounded-2xl border border-light-gray bg-white/90 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-text-gray/60">
                      Pedido
                    </p>
                    <p className="mt-0.5 font-mono text-lg font-semibold text-graphite">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-text-gray">{order.customer.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-petrol/10 px-3 py-1 text-xs font-medium text-petrol">
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-graphite">
                      {formatCurrency(order.totalCents)}
                    </p>
                  </div>
                </div>

                {order.trackingCode && (
                  <div className="mt-4 rounded-xl bg-ice px-4 py-3 text-sm">
                    <span className="text-text-gray">Código de rastreio: </span>
                    <span className="font-mono font-semibold text-graphite">
                      {order.trackingCode}
                    </span>
                  </div>
                )}
              </div>

              {/* Timeline */}
              {order.trackingEvents.length > 0 && (
                <div className="rounded-2xl border border-light-gray bg-white/90 p-5">
                  <h2 className="mb-5 font-display text-base font-semibold text-graphite">
                    Histórico
                  </h2>
                  <TrackingTimeline events={order.trackingEvents} />
                </div>
              )}

              {/* Items */}
              <div className="rounded-2xl border border-light-gray bg-white/90 p-5">
                <h2 className="mb-4 font-display text-base font-semibold text-graphite">
                  Itens
                </h2>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium text-graphite">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-text-gray/60">
                          SKU: {item.product.sku} · Qtd: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-graphite">
                        {formatCurrency(item.totalCents)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-sm text-text-gray/50">
                Data do pedido: {formatDate(order.createdAt)}
              </p>
            </div>
          )}
        </div>
      )}

      {!numero && (
        <p className="mt-6 text-sm text-text-gray/50 text-center">
          O número do pedido foi enviado para o seu e-mail na confirmação da
          compra.
        </p>
      )}
    </div>
  );
}
