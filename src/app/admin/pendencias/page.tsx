import { AlertTriangle, ExternalLink } from "lucide-react";

const pendencias = [
  {
    title: "Gateway de pagamento",
    description:
      "Integrar com gateway real (Mercado Pago, PagSeguro, Stripe, etc.). Atualmente em modo simulado.",
    action: "Acessar painel do gateway e preencher credenciais em variáveis de ambiente.",
    priority: "alta",
  },
  {
    title: "WhatsApp Business",
    description:
      "Número de WhatsApp real para atendimento. Variável NEXT_PUBLIC_WHATSAPP_NUMBER.",
    action: "Preencher NEXT_PUBLIC_WHATSAPP_NUMBER na plataforma de deploy (Vercel, etc.).",
    priority: "alta",
  },
  {
    title: "E-mail de suporte",
    description:
      "E-mail real de atendimento. Variável NEXT_PUBLIC_SUPPORT_EMAIL.",
    action: "Preencher NEXT_PUBLIC_SUPPORT_EMAIL na plataforma de deploy.",
    priority: "alta",
  },
  {
    title: "Imagens dos produtos",
    description:
      "Produtos exibidos com placeholders de gradiente. Inserir fotos reais de cada produto.",
    action: "Fazer upload das imagens e atualizar campo `image` de cada produto no banco.",
    priority: "média",
  },
  {
    title: "Fretes e transportadoras",
    description:
      "Cálculo de frete está como R$ 0,00 no checkout. Integrar com Melhor Envio, Jadlog, Correios, etc.",
    action: "Implementar cálculo de CEP + transportadora após inserir credenciais.",
    priority: "média",
  },
  {
    title: "Imagens dos departamentos",
    description:
      "DepartmentGrid exibe gradientes. Inserir fotos reais por departamento.",
    action: "Atualizar campo `image` em cada Department no banco.",
    priority: "baixa",
  },
  {
    title: "CNPJ e dados fiscais",
    description:
      "Razão social, CNPJ e endereço comercial para nota fiscal e rodapé.",
    action: "Preencher manualmente no Footer e em eventuais integrações fiscais.",
    priority: "alta",
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  alta: "bg-red-400/10 text-red-400",
  média: "bg-yellow-400/10 text-yellow-400",
  baixa: "bg-ice/10 text-ice/40",
};

export default function AdminPendenciasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ice">
          Pendências manuais
        </h1>
        <p className="mt-1 text-sm text-ice/50">
          Itens que exigem preenchimento direto nas plataformas oficiais — nunca
          inserir dados reais neste repositório.
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
        <p className="text-sm text-ice/70">
          Nenhum dado sensível deve ser inserido no código ou no banco de
          demonstração. Preencha tudo via variáveis de ambiente ou painel de
          cada plataforma.
        </p>
      </div>

      <div className="space-y-3">
        {pendencias.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/5 bg-white/5 p-5 flex items-start gap-4"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-medium text-ice">{item.title}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    PRIORITY_COLORS[item.priority]
                  }`}
                >
                  {item.priority}
                </span>
              </div>
              <p className="text-sm text-ice/50">{item.description}</p>
              <p className="text-xs text-ice/30 flex items-center gap-1">
                <ExternalLink size={11} />
                {item.action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
