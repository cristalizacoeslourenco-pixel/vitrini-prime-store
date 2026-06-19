const faqItems = [
  {
    question: "A loja trabalha com estoque próprio?",
    answer:
      "Trabalhamos com fornecedores parceiros selecionados, o que nos permite oferecer uma variedade maior de produtos com preços competitivos.",
  },
  {
    question: "Como funciona a entrega?",
    answer:
      "O prazo de entrega pode variar conforme o produto, o fornecedor e a região. Você recebe atualizações sobre o andamento do pedido.",
  },
  {
    question: "Posso pagar por Pix ou cartão?",
    answer:
      "Sim. O checkout aceita Pix, cartão e boleto. No momento, o ambiente está em modo simulado para validação da loja.",
  },
  {
    question: "Como falo com o atendimento?",
    answer:
      "Você pode entrar em contato pelo WhatsApp ou pela página de atendimento, com horário de segunda a sábado, das 9h às 18h.",
  },
];

export function FAQ() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {faqItems.map((item) => (
        <div
          key={item.question}
          className="rounded-2xl border border-light-gray bg-white p-5"
        >
          <h3 className="font-display text-base font-semibold text-graphite">
            {item.question}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-gray">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
