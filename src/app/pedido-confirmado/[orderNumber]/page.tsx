import Link from "next/link";
import { CheckCircle, Package, MessageCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STORE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { PixPanel } from "@/components/checkout/PixPanel";

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    select: { paymentMethod: true, totalCents: true },
  });

  const isPix = order?.paymentMethod === "PIX";
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY ?? "";
  const pixHolder = process.env.NEXT_PUBLIC_PIX_HOLDER ?? STORE.name;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-petrol/10">
          <CheckCircle size={40} className="text-petrol" />
        </div>
      </div>

      <h1 className="font-display text-3xl font-semibold text-graphite">
        Pedido registrado!
      </h1>
      <p className="mt-3 text-text-gray">
        Obrigado por comprar na{" "}
        <span className="font-medium text-graphite">{STORE.name}</span>.
      </p>

      <div className="mt-6 rounded-2xl border border-light-gray bg-white/90 p-5 text-left space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Package size={16} className="text-petrol shrink-0" />
          <span className="text-text-gray">Número do pedido:</span>
          <span className="font-mono font-semibold text-graphite">{orderNumber}</span>
        </div>
        {order?.totalCents && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-gray pl-6">Total:</span>
            <span className="font-semibold text-graphite">{formatCurrency(order.totalCents)}</span>
          </div>
        )}
      </div>

      {isPix && pixKey ? (
        <PixPanel
          pixKey={pixKey}
          pixHolder={pixHolder}
          totalCents={order?.totalCents ?? 0}
          orderNumber={orderNumber}
          whatsapp={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}
        />
      ) : (
        <div className="mt-6 rounded-2xl border border-champagne/30 bg-champagne/5 p-5 text-left">
          <p className="text-sm text-text-gray">
            Em breve entraremos em contato pelo WhatsApp ou e-mail para confirmar os
            próximos passos do seu pedido.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href={`/rastrear-pedido?numero=${orderNumber}`}>
          <Button variant="outline">
            <Package size={16} />
            Rastrear pedido
          </Button>
        </Link>
        <Link
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=${encodeURIComponent(`Olá! Fiz um pedido na ${STORE.name}. Número: ${orderNumber}`)}`}
          target="_blank"
        >
          <Button variant="ghost">
            <MessageCircle size={16} />
            Falar no WhatsApp
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
