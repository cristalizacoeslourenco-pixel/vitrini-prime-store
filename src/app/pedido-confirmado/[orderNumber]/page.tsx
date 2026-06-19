import Link from "next/link";
import { CheckCircle, Package, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STORE } from "@/lib/constants";

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-petrol/10">
          <CheckCircle size={40} className="text-petrol" />
        </div>
      </div>

      <h1 className="font-display text-3xl font-semibold text-graphite">
        Pedido confirmado!
      </h1>
      <p className="mt-3 text-text-gray">
        Obrigado pela sua compra na{" "}
        <span className="font-medium text-graphite">{STORE.name}</span>.
        Seu pedido foi registrado com sucesso.
      </p>

      <div className="mt-8 rounded-2xl border border-light-gray bg-white/90 p-6 text-left space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Package size={16} className="text-petrol shrink-0" />
          <span className="text-text-gray">Número do pedido:</span>
          <span className="font-mono font-semibold text-graphite">
            {orderNumber}
          </span>
        </div>
        <p className="text-sm text-text-gray">
          Guarde este número para rastrear seu pedido. Em breve entraremos em
          contato pelo e-mail informado para confirmar os próximos passos.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href={`/rastrear-pedido?numero=${orderNumber}`}>
          <Button variant="outline">
            <Package size={16} />
            Rastrear pedido
          </Button>
        </Link>
        <Link href="/atendimento">
          <Button variant="ghost">
            <MessageCircle size={16} />
            Falar com atendimento
          </Button>
        </Link>
      </div>

      <Link
        href="/produtos"
        className="mt-8 block text-sm text-text-gray hover:text-champagne transition-colors"
      >
        Continuar comprando →
      </Link>
    </div>
  );
}
