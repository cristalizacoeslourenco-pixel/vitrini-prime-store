"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface PixPanelProps {
  pixKey: string;
  pixHolder: string;
  totalCents: number;
  orderNumber: string;
  whatsapp: string;
}

export function PixPanel({ pixKey, pixHolder, totalCents, orderNumber, whatsapp }: PixPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixKey)}&bgcolor=ffffff&color=111111&margin=10`;

  const waMessage = encodeURIComponent(
    `Olá! Acabei de pagar o pedido ${orderNumber} no valor de ${formatCurrency(totalCents)} via Pix. Segue o comprovante.`
  );

  return (
    <div className="mt-6 rounded-2xl border border-petrol/20 bg-white/90 p-6 text-left space-y-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-petrol/10">
          <svg viewBox="0 0 512 512" className="h-5 w-5 fill-petrol" xmlns="http://www.w3.org/2000/svg">
            <path d="M389.3 333.9c-19.5 0-37.9-7.6-51.7-21.4l-80.7-80.7a6.3 6.3 0 0 0-8.8 0l-81 81c-13.8 13.8-32.2 21.4-51.7 21.4H98.6l102.5 102.5c30.8 30.8 80.7 30.8 111.4 0L415 333.9h-25.7zM115.4 178.1c19.5 0 37.9 7.6 51.7 21.4l81 81a6.2 6.2 0 0 0 8.8 0l80.7-80.7c13.8-13.8 32.2-21.4 51.7-21.4H415L312.5 75.6c-30.8-30.8-80.7-30.8-111.4 0L98.6 178.1h16.8z"/>
          </svg>
        </div>
        <div>
          <p className="font-semibold text-graphite">Pague via Pix</p>
          <p className="text-sm text-text-gray">Beneficiário: <strong>{pixHolder}</strong></p>
        </div>
      </div>

      {/* Valor */}
      <div className="rounded-xl bg-petrol/5 border border-petrol/10 px-4 py-3 text-center">
        <p className="text-xs text-text-gray uppercase tracking-wide mb-0.5">Valor a pagar</p>
        <p className="font-display text-2xl font-semibold text-graphite">{formatCurrency(totalCents)}</p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="rounded-xl border border-light-gray p-3 bg-white inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="QR Code Pix" width={160} height={160} />
        </div>
      </div>

      {/* Chave Pix */}
      <div>
        <p className="text-xs text-text-gray/60 mb-1.5">Chave Pix (copie e cole no seu banco)</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl border border-light-gray bg-ice px-3 py-2.5 font-mono text-xs text-graphite break-all">
            {pixKey}
          </div>
          <button
            onClick={handleCopy}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-light-gray bg-white hover:border-champagne hover:text-champagne transition-colors"
            aria-label="Copiar chave Pix"
          >
            {copied ? <Check size={16} className="text-petrol" /> : <Copy size={16} />}
          </button>
        </div>
        {copied && <p className="mt-1 text-xs text-petrol font-medium">Chave copiada!</p>}
      </div>

      {/* Instruções */}
      <ol className="space-y-1.5 text-sm text-text-gray list-decimal list-inside">
        <li>Abra o app do seu banco</li>
        <li>Vá em <strong>Pix → Pagar</strong> e escaneie o QR Code ou cole a chave</li>
        <li>Confirme o valor de <strong>{formatCurrency(totalCents)}</strong></li>
        <li>Envie o comprovante pelo WhatsApp abaixo</li>
      </ol>

      {/* WhatsApp */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1da851] transition-colors"
        >
          <MessageCircle size={16} />
          Enviar comprovante pelo WhatsApp
        </a>
      )}

      <p className="text-center text-xs text-text-gray/50">
        Após confirmar o pagamento, processamos seu pedido em até 1 dia útil.
      </p>
    </div>
  );
}
