import Link from "next/link";
import { ShieldCheck, Truck, Star, MessageCircle } from "lucide-react";
import { STORE } from "@/lib/constants";

export const metadata = { title: "Sobre a Vitrini Prime | Prime por Você" };

const values = [
  {
    icon: Star,
    title: "Curadoria premium",
    description:
      "Cada produto do nosso catálogo passa por uma seleção criteriosa de qualidade e custo-benefício antes de chegar até você.",
  },
  {
    icon: Truck,
    title: "Entrega nacional",
    description:
      "Atendemos todo o Brasil através de fornecedores parceiros com rastreamento em tempo real.",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description:
      "Seus dados protegidos, política clara de trocas e devolução e suporte ativo em todos os canais.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento humano",
    description:
      "Time disponível de segunda a sábado via WhatsApp e e-mail para tirar dúvidas e resolver problemas.",
  },
];

const departments = [
  { name: "Informática e Tecnologia", emoji: "💻" },
  { name: "Música e Instrumentos", emoji: "🎸" },
  { name: "Casa e Utilidades", emoji: "🏠" },
  { name: "Barbearia", emoji: "💈" },
  { name: "Manicure", emoji: "💅" },
  { name: "Salão Feminino", emoji: "💇" },
];

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="font-display text-4xl font-semibold text-graphite">
          Sobre a{" "}
          <span className="text-champagne">Vitrini Prime</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-text-gray max-w-2xl mx-auto">
          Somos uma loja boutique que reúne produtos selecionados de tecnologia,
          música, casa e beleza profissional em uma vitrine única — com a
          conveniência do e-commerce e o cuidado de uma loja de bairro.
        </p>
      </div>

      {/* Mission */}
      <div className="rounded-3xl bg-graphite text-ice p-8 mb-12">
        <h2 className="font-display text-2xl font-semibold mb-3">
          Nossa missão
        </h2>
        <p className="text-ice/80 leading-relaxed text-lg">
          &ldquo;Tornar acessível o que há de melhor em cada categoria —
          tecnologia, som, lar e beleza — com honestidade, agilidade e o
          toque{" "}
          <span className="text-champagne font-medium">prime</span> que você
          merece.&rdquo;
        </p>
      </div>

      {/* Values */}
      <div className="mb-14">
        <h2 className="font-display text-2xl font-semibold text-graphite mb-6 text-center">
          Nossos valores
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-light-gray bg-white/90 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-champagne/10">
                <Icon size={20} className="text-champagne" />
              </div>
              <div>
                <h3 className="font-semibold text-graphite">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-gray">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="mb-14">
        <h2 className="font-display text-2xl font-semibold text-graphite mb-2 text-center">
          O que você encontra aqui
        </h2>
        <p className="text-center text-text-gray mb-6">
          Mais de 100 produtos em 6 departamentos
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {departments.map((d) => (
            <Link
              key={d.name}
              href="/departamentos"
              className="flex items-center gap-3 rounded-2xl border border-light-gray bg-white/90 px-4 py-3 text-sm font-medium text-graphite hover:border-champagne hover:bg-champagne/5 transition-colors"
            >
              <span className="text-xl">{d.emoji}</span>
              {d.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Model */}
      <div className="rounded-2xl border border-light-gray bg-ice p-6 mb-14">
        <h2 className="font-display text-xl font-semibold text-graphite mb-3">
          Como funcionamos
        </h2>
        <p className="text-text-gray leading-relaxed">
          Operamos no modelo <strong className="text-graphite">dropshipping</strong>:{" "}
          os produtos são enviados diretamente pelos nossos fornecedores
          parceiros. Isso nos permite manter o catálogo atualizado, preços
          competitivos e foco total na experiência do cliente — sem os custos
          de um estoque próprio.
        </p>
        <p className="mt-3 text-sm text-text-gray/60">
          {STORE.slogan}
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/produtos"
          className="inline-block rounded-full bg-champagne px-8 py-3.5 text-sm font-medium text-graphite transition-colors hover:bg-[#b8975a]"
        >
          Explorar o catálogo
        </Link>
        <p className="mt-4 text-sm text-text-gray/60">
          Dúvidas?{" "}
          <Link href="/atendimento" className="text-champagne hover:underline">
            Fale com a gente
          </Link>
        </p>
      </div>
    </div>
  );
}
