import { MessageCircle, Mail, Clock, ChevronDown } from "lucide-react";
import { STORE } from "@/lib/constants";
import { ContactForm } from "@/components/ui/ContactForm";

const faqs = [
  {
    q: "Como rastreio meu pedido?",
    a: "Acesse a página Rastrear Pedido no menu e insira o número do seu pedido. Você também receberá atualizações por e-mail.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "O prazo varia por produto e está exibido em cada página de produto. Trabalhamos com fornecedores parceiros e o prazo médio é de 10 a 30 dias úteis.",
  },
  {
    q: "Posso cancelar meu pedido?",
    a: "Sim, pedidos podem ser cancelados em até 24 horas após a confirmação. Entre em contato conosco o quanto antes pelo canal de atendimento.",
  },
  {
    q: "Como funciona a troca ou devolução?",
    a: "Você tem até 7 dias corridos após o recebimento para desistir da compra. Para produtos com defeito, o prazo é de 30 a 90 dias. Veja nossa política completa de trocas e devoluções.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Sim. Utilizamos gateways de pagamento certificados pelo PCI-DSS. Nenhum dado de cartão é armazenado em nossos servidores.",
  },
  {
    q: "Posso alterar o endereço de entrega?",
    a: "Alterações de endereço são possíveis apenas enquanto o pedido não foi enviado ao fornecedor. Entre em contato o mais rápido possível.",
  },
];

export const metadata = { title: "Atendimento | Vitrini Prime" };

export default function AtendimentoPage() {
  const whatsappHref =
    STORE.whatsapp && !STORE.whatsapp.startsWith("PREENCHER")
      ? `https://wa.me/${STORE.whatsapp.replace(/\D/g, "")}`
      : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-graphite">
        Atendimento ao cliente
      </h1>
      <p className="mt-3 text-text-gray">
        Estamos aqui para ajudar. Escolha o canal mais conveniente ou consulte
        as perguntas frequentes abaixo.
      </p>

      {/* Canais */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-3 rounded-2xl border border-light-gray bg-white/90 p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <MessageCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-graphite">WhatsApp</p>
              <p className="mt-1 text-sm text-text-gray">
                Resposta rápida em horário comercial.
              </p>
            </div>
          </a>
        ) : (
          <div className="flex flex-col gap-3 rounded-2xl border border-light-gray bg-white/90 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <MessageCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-graphite">WhatsApp</p>
              <p className="mt-1 text-sm text-text-gray/50">
                Número a ser configurado.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 rounded-2xl border border-light-gray bg-white/90 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol/10">
            <Mail size={20} className="text-petrol" />
          </div>
          <div>
            <p className="font-semibold text-graphite">E-mail</p>
            <p className="mt-1 text-sm text-text-gray">{STORE.supportEmail}</p>
            <p className="text-xs text-text-gray/50">
              Resposta em até 1 dia útil.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-light-gray bg-white/90 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/10">
            <Clock size={20} className="text-champagne" />
          </div>
          <div>
            <p className="font-semibold text-graphite">Horário</p>
            <p className="mt-1 text-sm text-text-gray">Segunda a sábado</p>
            <p className="text-sm text-text-gray">9h às 18h</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-graphite">
          Perguntas frequentes
        </h2>
        <div className="mt-6 space-y-2">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-light-gray bg-white/90 overflow-hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-graphite list-none">
                {faq.q}
                <ChevronDown
                  size={16}
                  className="shrink-0 text-text-gray/50 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="border-t border-light-gray px-5 py-4 text-sm leading-relaxed text-text-gray">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Formulário de contato */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-graphite">
          Envie uma mensagem
        </h2>
        <p className="mt-2 text-sm text-text-gray">
          Preencha o formulário e entraremos em contato em até 1 dia útil.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
