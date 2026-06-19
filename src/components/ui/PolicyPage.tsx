import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PolicyDoc = {
  title: string;
  lastUpdated: string;
  sections: { heading: string; content: string }[];
};

export function PolicyPage({ doc }: { doc: PolicyDoc }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 flex items-center gap-1 text-sm text-text-gray hover:text-champagne transition-colors"
      >
        <ArrowLeft size={14} />
        Início
      </Link>

      <h1 className="font-display text-3xl font-semibold text-graphite">
        {doc.title}
      </h1>
      <p className="mt-2 text-sm text-text-gray/60">
        Última atualização: {doc.lastUpdated}
      </p>

      <div className="mt-10 space-y-8">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-lg font-semibold text-graphite">
              {section.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-text-gray">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-light-gray pt-6 text-sm text-text-gray/50">
        Dúvidas?{" "}
        <Link href="/atendimento" className="text-champagne hover:underline">
          Fale com nosso atendimento
        </Link>
        .
      </div>
    </div>
  );
}
