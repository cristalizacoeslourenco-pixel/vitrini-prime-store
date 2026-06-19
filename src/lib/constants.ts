export const STORE = {
  name: "Vitrini Prime",
  slogan:
    "Sua vitrine premium de tecnologia, música, casa e beleza profissional.",
  description:
    "Produtos selecionados de tecnologia, música, casa e beleza profissional em uma experiência de compra moderna, simples e confiável.",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    "PREENCHER_MANUALMENTE_NA_PLATAFORMA_OFICIAL",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "atendimento@exemplo.com",
};

export const BRAND_COLORS = {
  graphite: "#111111",
  ice: "#F8F7F3",
  champagne: "#C8A96A",
  petrol: "#0F3D3E",
  lightGray: "#E7E3DA",
  textGray: "#4B4B4B",
};

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Departamentos", href: "/departamentos" },
  { label: "Produtos", href: "/produtos" },
  { label: "Rastrear pedido", href: "/rastrear-pedido" },
  { label: "Atendimento", href: "/atendimento" },
] as const;
