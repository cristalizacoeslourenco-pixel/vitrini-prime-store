import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-graphite text-ice">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-champagne">
            Vitrini Prime
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Beleza, casa, fitness, pets, tech e moda — tudo em um só lugar.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ice/75 sm:text-lg">
            Produtos selecionados, preços competitivos e experiência de compra
            simples e segura.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/departamentos">
              <Button variant="primary" size="lg">
                Ver departamentos
              </Button>
            </Link>
            <Link href="/produtos">
              <Button
                variant="outline"
                size="lg"
                className="border-ice/30 text-ice hover:border-champagne hover:bg-white/5"
              >
                Conferir produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-petrol/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-champagne/10 blur-3xl"
      />
    </section>
  );
}
