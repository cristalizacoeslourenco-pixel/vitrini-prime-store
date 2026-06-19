import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { NAV_LINKS, STORE } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";
import { CartButton } from "@/components/cart/CartButton";

export function Header() {
  const whatsappHref =
    STORE.whatsapp && !STORE.whatsapp.startsWith("PREENCHER")
      ? `https://wa.me/${STORE.whatsapp.replace(/\D/g, "")}`
      : "/atendimento";

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-graphite text-ice">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-semibold tracking-tight">
            Vitrini <span className="text-champagne">Prime</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ice/80 transition-colors hover:text-champagne"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="text-sm text-ice/50 transition-colors hover:text-champagne"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-champagne px-4 py-2 text-sm font-medium text-graphite transition-colors hover:bg-[#b8975a] sm:flex"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <CartButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
