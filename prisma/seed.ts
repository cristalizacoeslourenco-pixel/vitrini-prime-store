import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/format";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Fornecedores placeholder (nenhum dado real, nenhuma credencial)
// ---------------------------------------------------------------------------

const suppliersData = [
  {
    key: "tech_prime",
    name: "Fornecedor Tech Prime",
    website: "https://fornecedor-placeholder.local/tech-prime",
    country: "Brasil",
    averageShipDays: 12,
    rating: 4.6,
    riskLevel: "LOW",
    notes: "Fornecedor parceiro para itens de informática e tecnologia.",
  },
  {
    key: "music_parts",
    name: "Fornecedor Music Parts",
    website: "https://fornecedor-placeholder.local/music-parts",
    country: "Brasil",
    averageShipDays: 14,
    rating: 4.5,
    riskLevel: "LOW",
    notes: "Fornecedor parceiro para cordas, cabos e acessórios musicais.",
  },
  {
    key: "casa_util",
    name: "Fornecedor Casa Útil",
    website: "https://fornecedor-placeholder.local/casa-util",
    country: "Brasil",
    averageShipDays: 10,
    rating: 4.4,
    riskLevel: "LOW",
    notes: "Fornecedor parceiro para organização e utilidades domésticas.",
  },
  {
    key: "beleza_pro",
    name: "Fornecedor Beleza Pro",
    website: "https://fornecedor-placeholder.local/beleza-pro",
    country: "Brasil",
    averageShipDays: 11,
    rating: 4.3,
    riskLevel: "MEDIUM",
    notes: "Fornecedor parceiro para barbearia, manicure e salão feminino.",
  },
  {
    key: "mix_nacional",
    name: "Fornecedor Mix Nacional",
    website: "https://fornecedor-placeholder.local/mix-nacional",
    country: "Brasil",
    averageShipDays: 16,
    rating: 4.1,
    riskLevel: "MEDIUM",
    notes: "Fornecedor parceiro de catálogo amplo e variado.",
  },
  {
    key: "internacional_validar",
    name: "Fornecedor Internacional Validar",
    website: "https://fornecedor-placeholder.local/internacional-validar",
    country: "A validar",
    averageShipDays: 22,
    rating: 3.9,
    riskLevel: "HIGH",
    notes:
      "Fornecedor internacional ainda em processo de validação. Confirmar documentação e prazos antes de operar em volume.",
  },
] as const;

// ---------------------------------------------------------------------------
// Departamentos e categorias
// ---------------------------------------------------------------------------

const departmentsData = [
  {
    name: "Informática e Tecnologia",
    slug: "informatica-tecnologia",
    description:
      "Acessórios para setup, escritório, conectividade, produtividade e rotina digital.",
    code: "INF",
    suppliers: ["tech_prime", "internacional_validar"],
    categories: [
      "Periféricos",
      "Cabos e Adaptadores",
      "Setup e Escritório",
      "Áudio e Vídeo",
    ],
    products: [
      "Mouse Sem Fio Compacto",
      "Teclado Slim USB",
      "Mousepad Grande Antiderrapante",
      "Suporte Ajustável para Notebook",
      "Hub USB 4 Portas",
      "Cabo USB-C Reforçado",
      "Adaptador HDMI Full HD",
      "Webcam HD para Reuniões",
      "Fone com Microfone para Home Office",
      "Suporte de Mesa para Celular",
      "Luminária LED para Setup",
      "Organizador de Cabos",
      "Carregador Rápido USB",
      "Base Refrigerada para Notebook",
      "Mini Teclado Sem Fio",
      "Microfone USB de Mesa",
      "Ring Light Compacto",
      "Suporte Articulado para Celular",
      "Case para HD/SSD",
      "Extensão USB Reforçada",
    ],
  },
  {
    name: "Música e Instrumentos",
    slug: "musica-instrumentos",
    description:
      "Cordas, palhetas, cabos, suportes e acessórios para músicos, igrejas e estúdios.",
    code: "MUS",
    suppliers: ["music_parts"],
    categories: ["Cordas", "Cabos e Acessórios", "Suportes", "Bateria", "Áudio"],
    products: [
      "Cordas para Guitarra Linha Essencial 010",
      "Cordas para Guitarra Linha Intermediária 010",
      "Cordas para Guitarra Linha Premium 010",
      "Cordas para Violão Aço",
      "Cordas para Violão Nylon",
      "Cordas para Baixo 4 Cordas",
      "Kit de Palhetas Sortidas",
      "Cabo P10 para Instrumento",
      "Correia Strap para Guitarra",
      "Capotraste para Violão e Guitarra",
      "Afinador Digital Clip",
      "Suporte de Chão para Guitarra",
      "Suporte de Parede para Instrumento",
      "Baquetas para Bateria",
      "Pele de Bateria Estudo",
      "Chave de Afinação para Bateria",
      "Suporte para Microfone",
      "Pop Filter para Microfone",
      "Espuma Protetora para Microfone",
      "Bag Simples para Violão",
    ],
  },
  {
    name: "Casa e Utilidades",
    slug: "casa-utilidades",
    description:
      "Soluções práticas para organização, cozinha, lavanderia, decoração e rotina doméstica.",
    code: "CAS",
    suppliers: ["casa_util", "mix_nacional"],
    categories: ["Organização", "Cozinha", "Banheiro", "Iluminação", "Lavanderia"],
    products: [
      "Organizador de Gaveta Modular",
      "Suporte para Temperos",
      "Luz LED para Armário",
      "Suporte Multiuso para Banheiro",
      "Organizador de Pia",
      "Escorredor Compacto",
      "Caixa Organizadora Multiuso",
      "Suporte para Tomada",
      "Vedação de Porta",
      "Gancho Adesivo Reforçado",
      "Cabide Organizador",
      "Organizador para Lavanderia",
      "Kit Ferramenta Doméstica",
      "Suporte Adesivo Multiuso",
      "Gancho de Parede",
      "Dispenser Organizador",
      "Organizador de Geladeira",
      "Tapete Funcional Antiderrapante",
      "Suporte para Controle Remoto",
      "Iluminação Decorativa LED",
    ],
  },
  {
    name: "Barbearia",
    slug: "barbearia",
    description:
      "Itens selecionados para barbearias, bancadas, corte, acabamento e atendimento profissional.",
    code: "BAR",
    suppliers: ["beleza_pro"],
    categories: ["Bancada", "Corte e Acabamento", "Higiene Profissional", "Acessórios"],
    products: [
      "Capa de Corte Profissional",
      "Escova de Limpeza para Máquina",
      "Pente Profissional para Corte",
      "Borrifador de Água",
      "Organizador de Bancada",
      "Avental para Barbeiro",
      "Espelho de Mão",
      "Suporte para Máquina de Corte",
      "Escova para Barba",
      "Navalhete Profissional Validar",
      "Lâminas Compatíveis Validar",
      "Toalha Profissional",
      "Faixa de Pescoço",
      "Espanador de Barbeiro",
      "Maleta para Acessórios",
    ],
  },
  {
    name: "Manicure",
    slug: "manicure",
    description:
      "Acessórios para organização, atendimento, nail art e rotina profissional de manicure.",
    code: "MAN",
    suppliers: ["beleza_pro", "mix_nacional"],
    categories: ["Organização", "Nail Art", "Atendimento", "Ferramentas Validar"],
    products: [
      "Kit de Lixas para Unha",
      "Organizador de Esmaltes",
      "Suporte de Mão para Manicure",
      "Kit de Pincéis para Nail Art",
      "Separador de Dedos",
      "Display para Unhas",
      "Maleta para Manicure",
      "Adesivos Decorativos para Unhas",
      "Algodão Prensado para Manicure",
      "Suporte para Alicate",
      "Cabine LED UV Validar Fornecedor",
      "Kit de Brocas Validar Segurança",
      "Potes Organizadores",
      "Luvas Descartáveis",
      "Acessórios para Unha",
    ],
  },
  {
    name: "Salão Feminino",
    slug: "salao-feminino",
    description:
      "Itens para cabelo, atendimento, organização e rotina de salão de beleza feminino.",
    code: "SAL",
    suppliers: ["beleza_pro"],
    categories: ["Cabelo", "Organização", "Atendimento", "Ferramentas Validar"],
    products: [
      "Escova Profissional para Cabelo",
      "Pente de Corte",
      "Kit de Presilhas",
      "Capa para Corte",
      "Touca para Procedimentos",
      "Borrifador Profissional",
      "Organizador de Bancada para Salão",
      "Suporte para Secador",
      "Escova Modeladora Validar Fornecedor",
      "Prancha de Cabelo Validar Fornecedor",
      "Espelho de Mão para Salão",
      "Luva Térmica",
      "Faixa para Cabelo",
      "Kit de Rolos para Cabelo",
      "Maleta Profissional",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Tier = "BARATO" | "MEDIO" | "CARO";

function tierForIndex(index: number): Tier {
  const mod = index % 3;
  if (mod === 0) return "BARATO";
  if (mod === 1) return "MEDIO";
  return "CARO";
}

function randomInRange(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

function pricingForTier(tier: Tier): { supplierCostCents: number; priceCents: number } {
  let costRange: [number, number];
  let multiplierRange: [number, number];

  switch (tier) {
    case "BARATO":
      costRange = [1500, 4000];
      multiplierRange = [2.5, 3];
      break;
    case "MEDIO":
      costRange = [4000, 9000];
      multiplierRange = [2, 2.4];
      break;
    case "CARO":
      costRange = [9000, 25000];
      multiplierRange = [1.6, 2];
      break;
  }

  const supplierCostCents = randomInRange(costRange[0], costRange[1]);
  const multiplier =
    multiplierRange[0] + Math.random() * (multiplierRange[1] - multiplierRange[0]);
  const priceCents = Math.max(
    supplierCostCents + 100,
    Math.round(supplierCostCents * multiplier)
  );

  return { supplierCostCents, priceCents };
}

function buildDescription(name: string, departmentName: string, categoryName: string): string {
  return `${name} selecionado para quem busca praticidade, organização e bom acabamento no dia a dia. Ideal para uso doméstico, profissional ou rotina de trabalho dentro de ${departmentName.toLowerCase()}, especialmente na categoria de ${categoryName.toLowerCase()}.`;
}

function buildShortDescription(categoryName: string): string {
  return `Produto prático com bom acabamento, pensado para a rotina de ${categoryName.toLowerCase()}.`;
}

function buildSpecifications(estimatedShipDays: number): string {
  return [
    "Uso recomendado: rotina diária ou profissional.",
    "Conteúdo da embalagem: 1 unidade conforme variação do produto.",
    "Observação: produto operado por fornecedor parceiro.",
    `Prazo estimado: aproximadamente ${estimatedShipDays} dias, podendo variar conforme região e fornecedor.`,
    "Garantia: conforme política do fornecedor parceiro.",
  ].join("\n");
}

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

// ---------------------------------------------------------------------------
// Seed principal
// ---------------------------------------------------------------------------

async function main() {
  console.log("Limpando dados anteriores...");

  await prisma.trackingEvent.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.department.deleteMany();

  console.log("Criando fornecedores...");

  const supplierIdByKey = new Map<string, string>();

  for (const supplier of suppliersData) {
    const created = await prisma.supplier.create({
      data: {
        name: supplier.name,
        website: supplier.website,
        country: supplier.country,
        averageShipDays: supplier.averageShipDays,
        rating: supplier.rating,
        riskLevel: supplier.riskLevel,
        notes: supplier.notes,
      },
    });
    supplierIdByKey.set(supplier.key, created.id);
  }

  console.log("Criando departamentos, categorias e produtos...");

  let totalProducts = 0;
  let totalCategories = 0;

  for (const dept of departmentsData) {
    const department = await prisma.department.create({
      data: {
        name: dept.name,
        slug: dept.slug,
        description: dept.description,
      },
    });

    const categoryIds: string[] = [];

    for (const categoryName of dept.categories) {
      const category = await prisma.category.create({
        data: {
          name: categoryName,
          slug: uniqueSlug(`${dept.slug}-${categoryName}`),
          description: `Categoria ${categoryName} dentro de ${dept.name}.`,
          departmentId: department.id,
        },
      });
      categoryIds.push(category.id);
      totalCategories += 1;
    }

    for (let i = 0; i < dept.products.length; i += 1) {
      const name = dept.products[i];
      const category = categoryIds[i % categoryIds.length];
      const categoryName = dept.categories[i % dept.categories.length];

      const supplierKey = dept.suppliers[i % dept.suppliers.length];
      const supplierId = supplierIdByKey.get(supplierKey);
      if (!supplierId) {
        throw new Error(`Fornecedor não encontrado para a chave: ${supplierKey}`);
      }
      const supplierData = suppliersData.find((s) => s.key === supplierKey)!;

      const tier = tierForIndex(i);
      const { supplierCostCents, priceCents } = pricingForTier(tier);
      const marginCents = priceCents - supplierCostCents;

      const hasDiscount = i % 3 === 0;
      const compareAtCents = hasDiscount ? Math.round(priceCents * 1.18) : null;

      const badge = hasDiscount
        ? "Oferta"
        : i % 7 === 0
          ? "Mais vendido"
          : i % 11 === 0
            ? "Novidade"
            : null;

      const estimatedShipDays = supplierData.averageShipDays + (i % 3);

      await prisma.product.create({
        data: {
          name,
          slug: uniqueSlug(name),
          shortDescription: buildShortDescription(categoryName),
          description: buildDescription(name, dept.name, categoryName),
          specifications: buildSpecifications(estimatedShipDays),
          priceCents,
          compareAtCents,
          supplierCostCents,
          marginCents,
          sku: `${dept.code}-${String(i + 1).padStart(3, "0")}`,
          image: null,
          gallery: "[]",
          status: "ACTIVE",
          badge,
          stockStatus: "DROPSHIPPING",
          estimatedShipDays,
          departmentId: department.id,
          categoryId: category,
          supplierId,
        },
      });

      totalProducts += 1;
    }
  }

  console.log(`Departamentos criados: ${departmentsData.length}`);
  console.log(`Categorias criadas: ${totalCategories}`);
  console.log(`Fornecedores criados: ${suppliersData.length}`);
  console.log(`Produtos criados: ${totalProducts}`);
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
