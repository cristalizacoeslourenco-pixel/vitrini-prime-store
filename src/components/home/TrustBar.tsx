import { ShieldCheck, Sparkles, MessageCircle, Truck } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Pagamento seguro",
    description:
      "Checkout pensado para proteger seus dados em todas as etapas da compra.",
  },
  {
    icon: Sparkles,
    title: "Produtos selecionados",
    description:
      "Curadoria por categoria, sem itens genéricos ou de qualidade duvidosa.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento via WhatsApp",
    description: "Fale diretamente com a equipe para tirar dúvidas do pedido.",
  },
  {
    icon: Truck,
    title: "Rastreamento do pedido",
    description: "Acompanhe cada etapa da entrega com o código de rastreio.",
  },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-champagne/15 text-champagne">
              <Icon size={20} />
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </Card>
        ))}
      </div>
    </section>
  );
}
