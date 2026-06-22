import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/format";

const prisma = new PrismaClient();

const BASE = "https://images.unsplash.com/photo-";
const Q = "?w=600&h=600&q=80&fit=crop&auto=format";

const musicImages = [
  `${BASE}1510915361894-db8b60106cb1${Q}`,
  `${BASE}1493225457124-a3eb161ffa5f${Q}`,
  `${BASE}1525201548942-d8732f6617a0${Q}`,
  `${BASE}1558618666-fcd25c85cd64${Q}`,
  `${BASE}1511379938547-c1f69419868d${Q}`,
  `${BASE}1477233134895-51dfe1aaddf5${Q}`,
  `${BASE}1506905925346-21bda4d32df4${Q}`,
  `${BASE}1514320291840-2e0a9bf2a9ae${Q}`,
];

const categories = [
  "Cordas de Guitarra",
  "Cordas de Violão",
  "Cordas de Baixo",
  "Correias e Straps",
  "Cabos e Palhetas",
  "Acessórios",
];

const products: {
  name: string;
  category: string;
  costCents: number;
  priceCents: number;
  badge?: string;
}[] = [
  // Cordas de Guitarra
  { name: "Cordas Guitarra Elétrica 009 Light Aço", category: "Cordas de Guitarra", costCents: 900, priceCents: 2990, badge: "Mais vendido" },
  { name: "Cordas Guitarra Elétrica 010 Regular Light", category: "Cordas de Guitarra", costCents: 1000, priceCents: 3290 },
  { name: "Cordas Guitarra Elétrica 010 Níquel Vintage", category: "Cordas de Guitarra", costCents: 1200, priceCents: 3990, badge: "Oferta" },
  { name: "Cordas Guitarra Elétrica 011 Medium", category: "Cordas de Guitarra", costCents: 1000, priceCents: 3290 },
  { name: "Cordas Guitarra 009 Coated Longa Duração", category: "Cordas de Guitarra", costCents: 2200, priceCents: 6990, badge: "Novidade" },
  { name: "Cordas Guitarra 010 Premium Anti-Ferrugem", category: "Cordas de Guitarra", costCents: 2500, priceCents: 7990 },
  { name: "Kit 3 Jogos Cordas Guitarra 010", category: "Cordas de Guitarra", costCents: 2800, priceCents: 8990, badge: "Oferta" },
  { name: "Cordas Guitarra Acústica Aço 011 Folk", category: "Cordas de Guitarra", costCents: 1300, priceCents: 4290 },

  // Cordas de Violão
  { name: "Cordas Violão Aço 011 Folk Light", category: "Cordas de Violão", costCents: 1200, priceCents: 3990, badge: "Mais vendido" },
  { name: "Cordas Violão Aço 012 Medium Brilhante", category: "Cordas de Violão", costCents: 1300, priceCents: 4290 },
  { name: "Cordas Violão Nylon Tensão Normal", category: "Cordas de Violão", costCents: 1000, priceCents: 3490, badge: "Oferta" },
  { name: "Cordas Violão Nylon Tensão Alta", category: "Cordas de Violão", costCents: 1100, priceCents: 3790 },
  { name: "Cordas Violão Nylon Premium Concerto", category: "Cordas de Violão", costCents: 2800, priceCents: 8490 },
  { name: "Kit 3 Jogos Cordas Violão Nylon", category: "Cordas de Violão", costCents: 2600, priceCents: 7990, badge: "Oferta" },

  // Cordas de Baixo
  { name: "Cordas Baixo 4 Cordas 045-105 Níquel", category: "Cordas de Baixo", costCents: 2500, priceCents: 7990, badge: "Mais vendido" },
  { name: "Cordas Baixo 4 Cordas 040-095 Light", category: "Cordas de Baixo", costCents: 2200, priceCents: 6990 },
  { name: "Cordas Baixo 5 Cordas 045-130 Níquel", category: "Cordas de Baixo", costCents: 3500, priceCents: 10990, badge: "Novidade" },
  { name: "Cordas Baixo Roundwound 045-105 Aço Inox", category: "Cordas de Baixo", costCents: 3000, priceCents: 8990 },

  // Correias e Straps
  { name: "Correia Guitarra Nylon Regulável Universal", category: "Correias e Straps", costCents: 1500, priceCents: 4990, badge: "Mais vendido" },
  { name: "Correia Guitarra Couro Sintético 5cm", category: "Correias e Straps", costCents: 2500, priceCents: 7990 },
  { name: "Correia Guitarra Couro Legítimo Vintage", category: "Correias e Straps", costCents: 4500, priceCents: 13990, badge: "Premium" },
  { name: "Correia Tecido Sublimada Estampada", category: "Correias e Straps", costCents: 1800, priceCents: 5990, badge: "Oferta" },
  { name: "Correia Acolchoada 6cm Alívio Ombro", category: "Correias e Straps", costCents: 3000, priceCents: 8990 },
  { name: "Strap Lock Segurança Anti-Queda Par", category: "Correias e Straps", costCents: 1200, priceCents: 3990, badge: "Novidade" },
  { name: "Correia Violão Clássico Nylon Ajustável", category: "Correias e Straps", costCents: 1300, priceCents: 4290 },

  // Cabos e Palhetas
  { name: "Cabo P10 para Instrumento 3m Blindado", category: "Cabos e Palhetas", costCents: 1500, priceCents: 4990, badge: "Mais vendido" },
  { name: "Cabo P10 para Instrumento 5m Profissional", category: "Cabos e Palhetas", costCents: 2000, priceCents: 6490 },
  { name: "Cabo P10-P10 Stereo 3m Mesa de Som", category: "Cabos e Palhetas", costCents: 1800, priceCents: 5990 },
  { name: "Kit Palhetas Sortidas 12 Unidades", category: "Cabos e Palhetas", costCents: 600, priceCents: 1990, badge: "Oferta" },
  { name: "Palhetas 0.73mm Médias Pack 12", category: "Cabos e Palhetas", costCents: 700, priceCents: 2490 },
  { name: "Palhetas Heavy 1.0mm Pack 12", category: "Cabos e Palhetas", costCents: 700, priceCents: 2490 },
  { name: "Cabo P10 Angulado 3m Silenciado", category: "Cabos e Palhetas", costCents: 2200, priceCents: 6990, badge: "Novidade" },

  // Acessórios
  { name: "Capotraste Metal para Violão e Guitarra", category: "Acessórios", costCents: 1200, priceCents: 3990, badge: "Mais vendido" },
  { name: "Afinador Clip Digital Cromático", category: "Acessórios", costCents: 1000, priceCents: 3290 },
  { name: "Suporte de Chão para Guitarra Dobrável", category: "Acessórios", costCents: 1800, priceCents: 5990, badge: "Oferta" },
  { name: "Suporte de Parede para Guitarra Violão", category: "Acessórios", costCents: 2000, priceCents: 6490 },
  { name: "Limpador de Cordas com Pano Microfibra", category: "Acessórios", costCents: 800, priceCents: 2790 },
  { name: "Bag Capa Violão Simples Acolchoada", category: "Acessórios", costCents: 3500, priceCents: 9990, badge: "Novidade" },
  { name: "Óleo Lemon Limpa Braço Guitarra", category: "Acessórios", costCents: 900, priceCents: 2990 },
  { name: "Suporte Mesa para Violão Guitarra", category: "Acessórios", costCents: 1500, priceCents: 4790, badge: "Oferta" },
];

const usedSlugs = new Set<string>();

function uniqueSlug(base: string): string {
  let slug = slugify(base);
  let attempt = 1;
  while (usedSlugs.has(slug)) {
    attempt += 1;
    slug = `${slugify(base)}-${attempt}`;
  }
  usedSlugs.add(slug);
  return slug;
}

async function main() {
  // Carregar slugs existentes para não colidir
  const existing = await prisma.product.findMany({ select: { slug: true } });
  existing.forEach((p) => usedSlugs.add(p.slug));
  const existingDepts = await prisma.department.findMany({ select: { slug: true } });
  existingDepts.forEach((d) => usedSlugs.add(d.slug));
  const existingCats = await prisma.category.findMany({ select: { slug: true } });
  existingCats.forEach((c) => usedSlugs.add(c.slug));

  console.log("Criando fornecedor Musical...");
  const supplier = await prisma.supplier.create({
    data: {
      name: "Music Parts Brasil",
      website: "https://fornecedor-placeholder.local/music-parts",
      country: "Brasil",
      averageShipDays: 8,
      rating: 4.7,
      riskLevel: "LOW",
      notes: "Fornecedor parceiro para cordas, correias, cabos e acessórios musicais. Dropshipping nacional.",
    },
  });

  console.log("Criando departamento Música & Instrumentos...");
  const department = await prisma.department.create({
    data: {
      name: "Música & Instrumentos",
      slug: "musica-instrumentos",
      description: "Cordas de guitarra, violão e baixo, correias, cabos, palhetas e acessórios para músicos de todos os níveis.",
    },
  });

  console.log("Criando categorias...");
  const categoryMap = new Map<string, string>();
  for (const catName of categories) {
    const cat = await prisma.category.create({
      data: {
        name: catName,
        slug: uniqueSlug(`musica-${catName}`),
        description: `${catName} — seleção completa para guitarristas, violonistas e baixistas.`,
        departmentId: department.id,
      },
    });
    categoryMap.set(catName, cat.id);
  }

  console.log(`Criando ${products.length} produtos musicais...`);
  let count = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const catId = categoryMap.get(p.category);
    if (!catId) throw new Error(`Categoria não encontrada: ${p.category}`);

    const marginCents = p.priceCents - p.costCents;
    const hasDiscount = p.badge === "Oferta";
    const compareAtCents = hasDiscount ? Math.round(p.priceCents * 1.25) : null;
    const image = musicImages[i % musicImages.length];

    await prisma.product.create({
      data: {
        name: p.name,
        slug: uniqueSlug(p.name),
        shortDescription: `${p.name} com ótimo custo-benefício. Entrega para todo o Brasil.`,
        description: `${p.name} — produto selecionado para músicos que buscam qualidade e durabilidade. Ideal para guitarristas, violonistas e baixistas de todos os níveis. Entrega via parceiro dropshipping com rastreamento disponível.`,
        specifications: [
          "Conteúdo: 1 unidade conforme descrição.",
          "Compatibilidade: verificar na descrição do produto.",
          `Prazo estimado: ${8 + (i % 4)} dias úteis após confirmação do pagamento.`,
          "Garantia: 30 dias contra defeitos de fabricação conforme CDC.",
          "Rastreamento: código enviado por e-mail após postagem.",
        ].join("\n"),
        priceCents: p.priceCents,
        compareAtCents,
        supplierCostCents: p.costCents,
        marginCents,
        sku: `MUS-${String(i + 1).padStart(3, "0")}`,
        image,
        gallery: "[]",
        status: "ACTIVE",
        badge: p.badge ?? null,
        stockStatus: "DROPSHIPPING",
        estimatedShipDays: 8 + (i % 4),
        departmentId: department.id,
        categoryId: catId,
        supplierId: supplier.id,
      },
    });
    count++;
  }

  console.log(`\nDepartamento: ${department.name}`);
  console.log(`Categorias: ${categories.length}`);
  console.log(`Produtos criados: ${count}`);
  console.log("\nMúsica & Instrumentos adicionado com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
