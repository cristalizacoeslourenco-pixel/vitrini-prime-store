import Link from "next/link";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";

async function getStats() {
  const [totalProducts, totalOrders, revenueResult, pendingOrders] =
    await Promise.all([
      prisma.product.count({ where: { status: "ACTIVE" } }),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalCents: true } }),
      prisma.order.count({ where: { status: "PENDING" } }),
    ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { name: true } } },
  });

  return {
    totalProducts,
    totalOrders,
    totalRevenueCents: revenueResult._sum.totalCents ?? 0,
    pendingOrders,
    recentOrders,
  };
}

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

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Produtos ativos",
      value: stats.totalProducts.toString(),
      icon: Package,
      href: "/admin/produtos",
      color: "text-petrol",
      bg: "bg-petrol/10",
    },
    {
      label: "Pedidos totais",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      href: "/admin/pedidos",
      color: "text-champagne",
      bg: "bg-champagne/10",
    },
    {
      label: "Receita simulada",
      value: formatCurrency(stats.totalRevenueCents),
      icon: DollarSign,
      href: "/admin/pedidos",
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Pedidos pendentes",
      value: stats.pendingOrders.toString(),
      icon: AlertCircle,
      href: "/admin/pedidos?status=PENDING",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ice">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-ice/50">
          Visão geral da Vitrini Prime
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:border-white/10 hover:bg-white/8"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <p className="mt-4 font-display text-2xl font-semibold text-ice">
              {value}
            </p>
            <p className="mt-1 text-sm text-ice/50">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-white/5 bg-white/5">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-display text-base font-semibold text-ice">
            Pedidos recentes
          </h2>
          <Link
            href="/admin/pedidos"
            className="flex items-center gap-1 text-xs text-ice/40 hover:text-champagne transition-colors"
          >
            Ver todos <ArrowRight size={12} />
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-ice/30">
            Nenhum pedido ainda. Quando clientes finalizarem compras, aparecerão aqui.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {stats.recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/pedidos/${order.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-ice">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-ice/40">{order.customer.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-ice">
                    {formatCurrency(order.totalCents)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      STATUS_COLORS[order.status] ?? "bg-white/5 text-ice/50"
                    }`}
                  >
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/produtos"
          className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-4 hover:border-white/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Package size={20} className="text-petrol" />
            <div>
              <p className="text-sm font-medium text-ice">Gerenciar produtos</p>
              <p className="text-xs text-ice/40">Ver, filtrar e editar catálogo</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-ice/30 group-hover:text-champagne transition-colors" />
        </Link>
        <Link
          href="/admin/pedidos"
          className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-6 py-4 hover:border-white/10 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-champagne" />
            <div>
              <p className="text-sm font-medium text-ice">Acompanhar pedidos</p>
              <p className="text-xs text-ice/40">Status, rastreio e histórico</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-ice/30 group-hover:text-champagne transition-colors" />
        </Link>
      </div>
    </div>
  );
}
