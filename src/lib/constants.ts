export const STORE = {
  name: "Vitrini Prime",
  slogan:
    "Beleza, casa, fitness, pets, tech e moda — tudo em um só lugar.",
  description:
    "Produtos em alta no Brasil com preços competitivos e entrega para todo o país. Experiência de compra moderna, simples e confiável.",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  supportEmail:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "atendimento@primepocvoce.com.br",
  pixKey:
    process.env.NEXT_PUBLIC_PIX_KEY ?? "",
  pixHolder:
    process.env.NEXT_PUBLIC_PIX_HOLDER ?? "Prime por Você",
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
