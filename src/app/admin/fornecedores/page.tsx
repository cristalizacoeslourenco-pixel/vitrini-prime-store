import { prisma } from "@/lib/prisma";
import { Globe, Star } from "lucide-react";

const RISK_COLORS: Record<string, string> = {
  LOW: "bg-green-400/10 text-green-400",
  MEDIUM: "bg-yellow-400/10 text-yellow-400",
  HIGH: "bg-red-400/10 text-red-400",
};

export default async function AdminFornecedoresPage() {
  const suppliers = await prisma.supplier.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ice">
          Fornecedores
        </h1>
        <p className="mt-1 text-sm text-ice/50">
          {suppliers.length} fornecedores cadastrados
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-white/5 bg-white/5 p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-medium text-ice">{s.name}</h2>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  RISK_COLORS[s.riskLevel] ?? "bg-white/5 text-ice/50"
                }`}
              >
                Risco {s.riskLevel === "LOW" ? "baixo" : s.riskLevel === "HIGH" ? "alto" : "médio"}
              </span>
            </div>

            <div className="space-y-1.5 text-sm text-ice/50">
              <p className="flex items-center gap-2">
                <Globe size={13} />
                {s.country} · {s.averageShipDays} dias avg.
              </p>
              {s.rating && (
                <p className="flex items-center gap-2">
                  <Star size={13} />
                  {s.rating.toFixed(1)} / 5
                </p>
              )}
              <p className="text-xs text-ice/30">{s._count.products} produto{s._count.products !== 1 ? "s" : ""}</p>
            </div>

            {s.notes && (
              <p className="text-xs text-ice/30 leading-relaxed">{s.notes}</p>
            )}

            <p className="text-xs text-ice/20">
              Website: <span className="text-ice/30">{s.website}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
