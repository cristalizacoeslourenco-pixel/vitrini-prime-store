import Link from "next/link";
import { STORE } from "@/lib/constants";
import { legalTexts } from "@/data/legalTexts";

const policyLinks = [
  { label: "Privacidade", href: "/politicas/privacidade" },
  { label: "Frete e entrega", href: "/politicas/frete-entrega" },
  { label: "Trocas e devoluções", href: "/politicas/trocas-devolucoes" },
  { label: "Termos de uso", href: "/politicas/termos" },
];

const usefulLinks = [
  { label: "Sobre a Vitrini Prime", href: "/sobre" },
  { label: "Atendimento", href: "/atendimento" },
  { label: "Rastrear pedido", href: "/rastrear-pedido" },
];

export function Footer() {
  return (
    <footer className="border-t border-light-gray bg-ice">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-lg font-semibold text-graphite">
              Vitrini <span className="text-champagne">Prime</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-text-gray">
              {STORE.slogan}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-graphite">Links úteis</h4>
            <ul className="mt-3 space-y-2">
              {usefulLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-gray transition-colors hover:text-champagne"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-graphite">Políticas</h4>
            <ul className="mt-3 space-y-2">
              {policyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-gray transition-colors hover:text-champagne"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-graphite">Atendimento</h4>
            <p className="mt-3 text-sm text-text-gray">{STORE.supportEmail}</p>
            <p className="mt-1 text-sm text-text-gray">
              Segunda a sábado, 9h às 18h
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-light-gray pt-6 text-xs leading-relaxed text-text-gray/80">
          {legalTexts.supplierDisclaimer}
        </p>

        <p className="mt-4 text-xs text-text-gray/60">
          © {new Date().getFullYear()} {STORE.name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
