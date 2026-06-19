import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Truck, Settings } from "lucide-react";
import { STORE } from "@/lib/constants";
import { AdminLogout } from "@/components/admin/AdminLogout";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/fornecedores", label: "Fornecedores", icon: Truck },
  { href: "/admin/pendencias", label: "Pendências", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-ice">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-white/5 lg:flex lg:flex-col">
        <Link
          href="/admin"
          className="flex items-center gap-2 px-6 py-5 border-b border-white/5"
        >
          <span className="font-display text-base font-semibold">
            Vitrini <span className="text-champagne">Admin</span>
          </span>
        </Link>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {adminNav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ice/60 transition-colors hover:bg-white/5 hover:text-ice"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/5 px-6 py-4 space-y-2">
          <p className="text-xs text-ice/30">{STORE.name}</p>
          <Link
            href="/"
            className="block text-xs text-ice/40 hover:text-champagne transition-colors"
          >
            ← Ver loja
          </Link>
          <AdminLogout />
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 lg:hidden">
          <Link href="/admin" className="font-display text-base font-semibold">
            Vitrini <span className="text-champagne">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            {adminNav.slice(0, 4).map(({ href, icon: Icon }) => (
              <Link key={href} href={href} className="text-ice/60 hover:text-ice">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
