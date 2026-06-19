import Link from "next/link";
import { Package, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";

export default async function AdminProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; department?: string; page?: string }>;
}) {
  const { search, department, page: pageStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? "1", 10));
  const limit = 25;

  const where = {
    ...(search
      ? {
          OR: [
            { name: { contains: search } },
            { sku: { contains: search } },
          ],
        }
      : {}),
    ...(department ? { departmentId: department } : {}),
  };

  const [products, total, departments] = await Promise.all([
    prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
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
    prisma.department.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  const STATUS_COLORS: Record<string, string> = {
    ACTIVE: "bg-green-400/10 text-green-400",
    INACTIVE: "bg-red-400/10 text-red-400",
    DRAFT: "bg-yellow-400/10 text-yellow-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ice">Produtos</h1>
          <p className="mt-1 text-sm text-ice/50">
            {total} produto{total !== 1 ? "s" : ""} no catálogo
          </p>
        </div>
      </div>

      {/* Filters */}
      <form method="get" className="flex flex-wrap gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="Buscar por nome ou SKU…"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ice placeholder:text-ice/30 focus:border-champagne focus:outline-none"
        />
        <select
          name="department"
          defaultValue={department ?? ""}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ice focus:border-champagne focus:outline-none"
        >
          <option value="">Todos os departamentos</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-champagne/10 border border-champagne/20 px-4 py-2 text-sm text-champagne hover:bg-champagne/20 transition-colors"
        >
          Filtrar
        </button>
        {(search ?? department) && (
          <Link
            href="/admin/produtos"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-ice/40 hover:text-ice transition-colors"
          >
            Limpar
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-4 py-3 text-left font-medium text-ice/50">SKU</th>
                <th className="px-4 py-3 text-left font-medium text-ice/50">Nome</th>
                <th className="px-4 py-3 text-left font-medium text-ice/50 hidden md:table-cell">Depto.</th>
                <th className="px-4 py-3 text-right font-medium text-ice/50">Preço</th>
                <th className="px-4 py-3 text-right font-medium text-ice/50 hidden lg:table-cell">Margem</th>
                <th className="px-4 py-3 text-center font-medium text-ice/50">Status</th>
                <th className="px-4 py-3 text-right font-medium text-ice/50"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-ice/30">
                    <Package size={32} className="mx-auto mb-3 opacity-30" />
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-ice/50">{p.sku}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ice truncate max-w-[200px]">{p.name}</p>
                    {p.badge && (
                      <span className="text-xs text-champagne">{p.badge}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ice/50 hidden md:table-cell">
                    {p.department.name}
                    <span className="block text-xs text-ice/30">{p.category.name}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-ice">
                    {formatCurrency(p.priceCents)}
                  </td>
                  <td className="px-4 py-3 text-right text-ice/50 hidden lg:table-cell">
                    {formatCurrency(p.marginCents)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_COLORS[p.status] ?? "bg-white/5 text-ice/50"
                      }`}
                    >
                      {p.status === "ACTIVE" ? "Ativo" : p.status === "INACTIVE" ? "Inativo" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/produtos/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs text-ice/30 hover:text-champagne transition-colors"
                    >
                      <ExternalLink size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
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
                href={`/admin/produtos?page=${page - 1}${search ? `&search=${search}` : ""}${department ? `&department=${department}` : ""}`}
                className="rounded-xl border border-white/10 px-4 py-2 text-ice/50 hover:text-ice transition-colors"
              >
                ← Anterior
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/produtos?page=${page + 1}${search ? `&search=${search}` : ""}${department ? `&department=${department}` : ""}`}
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
