"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertTriangle, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/format";
import { legalTexts } from "@/data/legalTexts";

type Step = "dados" | "entrega" | "pagamento";

type PersonalData = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

type Address = {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

type PaymentMethod = "PIX" | "CREDIT_CARD" | "BOLETO" | "SIMULATED";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; hint: string }[] = [
  { value: "PIX", label: "Pix", hint: "Aprovação imediata (simulado)" },
  { value: "CREDIT_CARD", label: "Cartão de crédito", hint: "Até 12x (simulado)" },
  { value: "BOLETO", label: "Boleto bancário", hint: "Vence em 3 dias úteis (simulado)" },
  { value: "SIMULATED", label: "Pagamento de teste", hint: "Apenas para validação da loja" },
];

const SHIPPING_TABLE: Record<string, number> = {
  SP: 1500,
  MG: 2000, RJ: 2000, ES: 2000, PR: 2000, SC: 2000, RS: 2000,
  GO: 2500, MT: 2500, MS: 2500, DF: 2500,
  TO: 3500, RO: 3500, AC: 3500, AM: 3500, RR: 3500, PA: 3500, AP: 3500,
  MA: 3000, PI: 3000, CE: 3000, RN: 3000, PB: 3000,
  PE: 3000, AL: 3000, SE: 3000, BA: 3000,
};
const FREE_SHIPPING_THRESHOLD = 30000; // R$ 300

function calcShipping(state: string, subtotalCents: number): number {
  if (subtotalCents >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_TABLE[state.toUpperCase()] ?? 3500;
}

type ViaCepResponse = {
  erro?: boolean;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalCents, clear } = useCart();

  const [step, setStep] = useState<Step>("dados");
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("SIMULATED");

  const [personal, setPersonal] = useState<PersonalData>({
    name: "", email: "", phone: "", notes: "",
  });
  const [address, setAddress] = useState<Address>({
    cep: "", street: "", number: "", complement: "",
    neighborhood: "", city: "", state: "",
  });
  const [personalErrors, setPersonalErrors] = useState<Partial<PersonalData>>({});
  const [addressErrors, setAddressErrors] = useState<Partial<Address>>({});

  const shippingCents = address.state ? calcShipping(address.state, subtotalCents) : 0;
  const totalCents = subtotalCents + shippingCents;

  const setP = (k: keyof PersonalData, v: string) => {
    setPersonal((f) => ({ ...f, [k]: v }));
    setPersonalErrors((e) => ({ ...e, [k]: undefined }));
  };
  const setA = (k: keyof Address, v: string) => {
    setAddress((f) => ({ ...f, [k]: v }));
    setAddressErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validatePersonal = () => {
    const errs: Partial<PersonalData> = {};
    if (personal.name.trim().length < 3) errs.name = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) errs.email = "E-mail inválido.";
    if (personal.phone.replace(/\D/g, "").length < 8) errs.phone = "Telefone inválido.";
    setPersonalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddress = () => {
    const errs: Partial<Address> = {};
    if (address.cep.replace(/\D/g, "").length !== 8) errs.cep = "CEP inválido.";
    if (!address.street.trim()) errs.street = "Informe o logradouro.";
    if (!address.number.trim()) errs.number = "Informe o número.";
    if (!address.city.trim()) errs.city = "Cidade obrigatória.";
    if (!address.state.trim()) errs.state = "Estado obrigatório.";
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const lookupCep = useCallback(async () => {
    const digits = address.cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data: ViaCepResponse = await res.json();
      if (data.erro) {
        setAddressErrors((e) => ({ ...e, cep: "CEP não encontrado." }));
        return;
      }
      setAddress((a) => ({
        ...a,
        street: data.logradouro ?? a.street,
        neighborhood: data.bairro ?? a.neighborhood,
        city: data.localidade ?? a.city,
        state: data.uf ?? a.state,
      }));
    } catch {
      // ViaCEP offline — usuário preenche manualmente
    } finally {
      setCepLoading(false);
    }
  }, [address.cep]);

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    const addressStr = JSON.stringify(address);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: personal.name,
            email: personal.email,
            phone: personal.phone,
          },
          paymentMethod,
          notes: personal.notes,
          shippingAddress: addressStr,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            unitPriceCents: i.priceCents,
          })),
          subtotalCents,
          shippingCents,
          totalCents,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Erro ao processar pedido.");
      }

      const data = await res.json() as { orderNumber: string };
      clear();
      router.push(`/pedido-confirmado/${data.orderNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-lg font-medium text-graphite">Seu carrinho está vazio.</p>
        <p className="mt-2 text-sm text-text-gray">Adicione produtos antes de finalizar.</p>
        <Button variant="primary" className="mt-6" onClick={() => router.push("/produtos")}>
          Ver produtos
        </Button>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "dados", label: "1. Seus dados" },
    { id: "entrega", label: "2. Entrega" },
    { id: "pagamento", label: "3. Pagamento" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-graphite mb-2">Checkout</h1>

      <div className="mb-6 flex items-start gap-2 rounded-xl bg-champagne/10 border border-champagne/30 p-4 text-sm text-text-gray">
        <AlertTriangle size={16} className="mt-0.5 shrink-0 text-champagne" />
        <span>{legalTexts.checkoutSimulated}</span>
      </div>

      {/* Step indicators */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        {steps.map((s, i) => (
          <span key={s.id} className="flex items-center gap-2">
            <span className={`font-medium ${step === s.id ? "text-graphite" : "text-text-gray/40"}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && <span className="text-light-gray">›</span>}
          </span>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Formulário */}
        <div className="lg:col-span-2 space-y-5">

          {/* STEP 1 — Dados pessoais */}
          {step === "dados" && (
            <div className="rounded-2xl border border-light-gray bg-white/90 p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-graphite">Seus dados</h2>
              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">Nome completo *</label>
                <Input value={personal.name} onChange={(e) => setP("name", e.target.value)} placeholder="Maria da Silva" />
                {personalErrors.name && <p className="mt-1 text-xs text-red-500">{personalErrors.name}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">E-mail *</label>
                <Input type="email" value={personal.email} onChange={(e) => setP("email", e.target.value)} placeholder="maria@email.com" />
                {personalErrors.email && <p className="mt-1 text-xs text-red-500">{personalErrors.email}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">Telefone / WhatsApp *</label>
                <Input type="tel" value={personal.phone} onChange={(e) => setP("phone", e.target.value)} placeholder="(11) 91234-5678" />
                {personalErrors.phone && <p className="mt-1 text-xs text-red-500">{personalErrors.phone}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">Observações (opcional)</label>
                <textarea
                  value={personal.notes}
                  onChange={(e) => setP("notes", e.target.value)}
                  rows={3}
                  placeholder="Alguma observação sobre o pedido?"
                  className="w-full rounded-xl border border-light-gray bg-white px-4 py-2.5 text-sm text-graphite placeholder:text-text-gray/50 focus:border-champagne focus:outline-none resize-none"
                />
              </div>
              <Button variant="primary" size="lg" className="w-full"
                onClick={() => { if (validatePersonal()) setStep("entrega"); }}>
                Continuar para entrega
              </Button>
            </div>
          )}

          {/* STEP 2 — Endereço */}
          {step === "entrega" && (
            <div className="rounded-2xl border border-light-gray bg-white/90 p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-graphite">Endereço de entrega</h2>

              {/* CEP */}
              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">CEP *</label>
                <div className="flex gap-2">
                  <Input
                    value={address.cep}
                    onChange={(e) => setA("cep", e.target.value)}
                    onBlur={lookupCep}
                    placeholder="00000-000"
                    maxLength={9}
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={lookupCep}
                    disabled={cepLoading}
                    className="flex items-center gap-1.5 rounded-xl border border-light-gray px-4 py-2 text-sm text-text-gray hover:border-champagne hover:text-champagne transition-colors disabled:opacity-50"
                  >
                    <Search size={14} />
                    {cepLoading ? "…" : "Buscar"}
                  </button>
                </div>
                {addressErrors.cep && <p className="mt-1 text-xs text-red-500">{addressErrors.cep}</p>}
                <p className="mt-1 text-xs text-text-gray/50">
                  O CEP preenche o endereço automaticamente.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">Logradouro *</label>
                <Input value={address.street} onChange={(e) => setA("street", e.target.value)} placeholder="Rua, Avenida…" />
                {addressErrors.street && <p className="mt-1 text-xs text-red-500">{addressErrors.street}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-graphite">Número *</label>
                  <Input value={address.number} onChange={(e) => setA("number", e.target.value)} placeholder="123" />
                  {addressErrors.number && <p className="mt-1 text-xs text-red-500">{addressErrors.number}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-graphite">Complemento</label>
                  <Input value={address.complement} onChange={(e) => setA("complement", e.target.value)} placeholder="Apto, Sala…" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-graphite">Bairro</label>
                <Input value={address.neighborhood} onChange={(e) => setA("neighborhood", e.target.value)} placeholder="Centro" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-graphite">Cidade *</label>
                  <Input value={address.city} onChange={(e) => setA("city", e.target.value)} placeholder="São Paulo" />
                  {addressErrors.city && <p className="mt-1 text-xs text-red-500">{addressErrors.city}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-graphite">Estado *</label>
                  <Input value={address.state} onChange={(e) => setA("state", e.target.value.toUpperCase())} placeholder="SP" maxLength={2} />
                  {addressErrors.state && <p className="mt-1 text-xs text-red-500">{addressErrors.state}</p>}
                </div>
              </div>

              {address.state && (
                <div className="rounded-xl bg-petrol/5 border border-petrol/10 px-4 py-3 text-sm">
                  <span className="text-text-gray">Frete estimado para {address.city || address.state}: </span>
                  <span className="font-semibold text-graphite">
                    {shippingCents === 0
                      ? "Grátis 🎉"
                      : formatCurrency(shippingCents)}
                  </span>
                  {subtotalCents < FREE_SHIPPING_THRESHOLD && shippingCents > 0 && (
                    <p className="mt-1 text-xs text-text-gray/60">
                      Frete grátis em pedidos acima de {formatCurrency(FREE_SHIPPING_THRESHOLD)}.
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" size="md" onClick={() => setStep("dados")} className="shrink-0">
                  Voltar
                </Button>
                <Button variant="primary" size="lg" className="flex-1"
                  onClick={() => { if (validateAddress()) setStep("pagamento"); }}>
                  Continuar para pagamento
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3 — Pagamento */}
          {step === "pagamento" && (
            <div className="rounded-2xl border border-light-gray bg-white/90 p-6 space-y-4">
              <h2 className="font-display text-lg font-semibold text-graphite">Forma de pagamento</h2>
              <div className="space-y-2">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-light-gray px-4 py-3 hover:border-champagne transition-colors has-[:checked]:border-champagne has-[:checked]:bg-champagne/5"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.value}
                      checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value)}
                      className="mt-0.5 accent-champagne"
                    />
                    <div>
                      <span className="text-sm font-medium text-graphite">{opt.label}</span>
                      <p className="text-xs text-text-gray/60">{opt.hint}</p>
                    </div>
                  </label>
                ))}
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
              )}

              <div className="flex gap-3">
                <Button variant="outline" size="md" onClick={() => setStep("entrega")} disabled={loading} className="shrink-0">
                  Voltar
                </Button>
                <Button variant="primary" size="lg" onClick={handleSubmit} disabled={loading} className="flex-1">
                  {loading ? "Processando…" : "Confirmar pedido"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Resumo lateral */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-light-gray bg-white/90 p-6 sticky top-20 space-y-4">
            <h2 className="font-display text-base font-semibold text-graphite">Resumo</h2>
            <div className="space-y-3 text-sm divide-y divide-light-gray">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between pt-3 first:pt-0">
                  <span className="text-text-gray pr-2 truncate max-w-[150px]">
                    {item.name} <span className="text-text-gray/50">x{item.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-graphite">
                    {formatCurrency(item.priceCents * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5 text-sm border-t border-light-gray pt-3">
              <div className="flex justify-between text-text-gray">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotalCents)}</span>
              </div>
              <div className="flex justify-between text-text-gray">
                <span>Frete</span>
                <span className={shippingCents === 0 && address.state ? "text-petrol font-medium" : ""}>
                  {address.state
                    ? shippingCents === 0 ? "Grátis" : formatCurrency(shippingCents)
                    : "—"}
                </span>
              </div>
            </div>
            <div className="border-t border-light-gray pt-3 flex justify-between">
              <span className="font-semibold text-graphite">Total</span>
              <span className="font-display text-xl font-semibold text-graphite">
                {formatCurrency(totalCents)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-gray/60">
              <ShieldCheck size={14} className="text-petrol shrink-0" />
              Compra simulada — dados fictícios
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
