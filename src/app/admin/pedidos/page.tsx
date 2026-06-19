import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";

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

export default async function AdminPedidosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const limit = 20;

  const where = status ? { status } : undefined;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        customer: { select: { name: true, email: true } },
        items: { select: { quantity: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const statuses = Object.keys(STATUS_LABELS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ice">Pedidos</h1>
        <p className="mt-1 text-sm text-ice/50">
          {total} pedido{total !== 1 ? "s" : ""}
          {status ? ` · ${STATUS_LABELS[status] ?? status}` : ""}
        </p>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/pedidos"
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !status
              ? "bg-champagne text-graphite"
              : "border border-white/10 text-ice/50 hover:text-ice"
          }`}
        >
          Todos
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/pedidos?status=${s}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              status === s
                ? "bg-champagne text-graphite"
                : "border border-white/10 text-ice/50 hover:text-ice"
            }`}
          >
            {STATUS_LABELS[s]}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-4 py-3 text-left font-medium text-ice/50">Nº Pedido</th>
                <th className="px-4 py-3 text-left font-medium text-ice/50">Cliente</th>
                <th className="px-4 py-3 text-center font-medium text-ice/50 hidden md:table-cell">Itens</th>
                <th className="px-4 py-3 text-right font-medium text-ice/50">Total</th>
                <th className="px-4 py-3 text-center font-medium text-ice/50">Status</th>
                <th className="px-4 py-3 text-right font-medium text-ice/50 hidden lg:table-cell">Data</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ice/30">
                    <ShoppingCart size={32} className="mx-auto mb-3 opacity-30" />
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
              {orders.map((order) => {
                const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
                return (
                  <tr key={order.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-ice">
                      {order.orderNumber}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ice">{order.customer.name}</p>
                      <p className="text-xs text-ice/40">{order.customer.email}</p>
                    </td>
                    <td className="px-4 py-3 text-center text-ice/50 hidden md:table-cell">
                      {itemCount}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-ice">
                      {formatCurrency(order.totalCents)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          STATUS_COLORS[order.status] ?? "bg-white/5 text-ice/50"
                        }`}
                      >
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-ice/40 hidden lg:table-cell">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/pedidos/${order.id}`}
                        className="text-xs text-ice/30 hover:text-champagne transition-colors"
                      >
                        Ver →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-ice/40">
            Página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/pedidos?page=${page - 1}${status ? `&status=${status}` : ""}`}
                className="rounded-xl border border-white/10 px-4 py-2 text-ice/50 hover:text-ice transition-colors"
              >
                ← Anterior
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/pedidos?page=${page + 1}${status ? `&status=${status}` : ""}`}
                className="rounded-xl border border-white/10 px-4 py-2 text-ice/50 hover:text-ice transition-colors"
              >
                Próxima →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
