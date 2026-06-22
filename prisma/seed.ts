import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/format";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Fornecedores dropshipping Brasil
// ---------------------------------------------------------------------------

const suppliersData = [
  {
    key: "dropi_brasil",
    name: "Dropi Brasil",
    website: "https://dropi.com.br",
    country: "Brasil",
    averageShipDays: 7,
    rating: 4.8,
    riskLevel: "LOW",
    notes: "Plataforma dropshipping nacional, catálogo premium, entrega rápida.",
  },
  {
    key: "empreender_plus",
    name: "Empreender Plus",
    website: "https://empreender.com.br",
    country: "Brasil",
    averageShipDays: 8,
    rating: 4.7,
    riskLevel: "LOW",
    notes: "Fornecedor parceiro Empreender, produtos em alta para dropshipping.",
  },
  {
    key: "shopee_fornecedores",
    name: "Shopee Fornecedores",
    website: "https://shopee.com.br",
    country: "Brasil",
    averageShipDays: 10,
    rating: 4.5,
    riskLevel: "LOW",
    notes: "Fornecedores nacionais via Shopee com envio de armazém local.",
  },
  {
    key: "bling_atacado",
    name: "Bling Atacado",
    website: "https://bling.com.br",
    country: "Brasil",
    averageShipDays: 9,
    rating: 4.6,
    riskLevel: "LOW",
    notes: "Atacado integrado, estoque nacional, boa cobertura de categorias.",
  },
  {
    key: "nacional_fast",
    name: "Nacional Fast Delivery",
    website: "https://fornecedor-placeholder.local/nacional-fast",
    country: "Brasil",
    averageShipDays: 5,
    rating: 4.9,
    riskLevel: "LOW",
    notes: "Entrega expressa, parceiro prioritário para itens de alta demanda.",
  },
  {
    key: "aliexpress_premium",
    name: "AliExpress Premium",
    website: "https://aliexpress.com",
    country: "China",
    averageShipDays: 20,
    rating: 4.2,
    riskLevel: "MEDIUM",
    notes: "Fornecedor internacional para gadgets e tech. Validar frete e taxas.",
  },
] as const;

// ---------------------------------------------------------------------------
// Departamentos com 105 produtos reais em alta no Brasil
// ---------------------------------------------------------------------------

const departmentsData = [
  {
    name: "Beleza & Skincare",
    slug: "beleza-skincare",
    description:
      "Skincare, maquiagem, cuidados com cabelo e rotina de beleza com produtos em alta nas redes sociais.",
    code: "BEL",
    suppliers: ["dropi_brasil", "empreender_plus"],
    categories: ["Skincare", "Maquiagem", "Cabelo", "Corpo"],
    products: [
      "Sérum Vitamina C 30ml Clareador",
      "Ácido Hialurônico Hidratante Facial",
      "Protetor Solar FPS50+ Toque Seco",
      "Máscara Argila Purificante Poros",
      "Água Micelar 400ml Limpeza Profunda",
      "Base Líquida HD Alta Cobertura",
      "Paleta de Sombras 18 Cores Nudes",
      "Batom Matte Longa Duração",
      "Máscara de Cílios Volume Extremo",
      "Contorno + Iluminador Duo Compacto",
      "Óleo Rosa Mosqueta 30ml Regenerador",
      "Creme Hidratante Facial Noturno",
      "Esfoliante Corporal Café e Açúcar",
      "Sabonete Vitamina C Uniformizador",
      "Shampoo Antiqueda Biotina 300ml",
      "Condicionador Restaurador Queratina",
      "Máscara Capilar Hidratação Intensa",
      "Kit Esmaltação Gel LED Completo",
      "Rolo de Quartzo Rosa Facial",
      "Sérum Retinol Anti-Idade Noturno",
    ],
  },
  {
    name: "Casa & Organização",
    slug: "casa-organizacao",
    description:
      "Produtos virais para organizar, decorar e facilitar a rotina doméstica com estilo.",
    code: "CAS",
    suppliers: ["empreender_plus", "shopee_fornecedores"],
    categories: ["Organização", "Cozinha", "Decoração", "Iluminação"],
    products: [
      "Organizador de Gaveta Modular 6 Peças",
      "Suporte Giratório para Temperos 360°",
      "Caixa Organizadora Empilhável com Tampa",
      "Porta-Objetos Bambu Bancada Cozinha",
      "Kit Organizador Geladeira 4 Peças Clear",
      "Cabide Slim Veludo Antideslizante 50un",
      "Gancho Adesivo Inox Sem Furo 5kg",
      "Tapete Antiderrapante PVC para Pia",
      "Difusor de Aromas Elétrico USB",
      "Porta-Temperos Magnético Parede",
      "Cesto Dobrável Oxford Grande",
      "Suporte Vertical para Panelas e Tampas",
      "Saco a Vácuo para Roupas Grande",
      "Lâmpada LED WiFi RGB Controle App",
      "Toalha Microfibra Secagem Rápida",
      "Dispenser Inox Sabão Líquido 500ml",
      "Rack Organizador de Sapatos Dobrável",
      "Quadro Decorativo Frase Motivacional",
      "Almofada Decorativa Veludo 45x45cm",
      "Luminária LED de Mesa USB Flexível",
    ],
  },
  {
    name: "Fitness & Saúde",
    slug: "fitness-saude",
    description:
      "Equipamentos de treino em casa, acessórios fitness e produtos de saúde e bem-estar.",
    code: "FIT",
    suppliers: ["dropi_brasil", "nacional_fast"],
    categories: ["Treino em Casa", "Acessórios Fitness", "Saúde", "Recuperação"],
    products: [
      "Kit Faixas Elásticas Resistência 5 Níveis",
      "Rolo Miofascial Massagem Muscular",
      "Tapete Yoga Antiderrapante 6mm",
      "Pula Corda Digital com Contador",
      "Garrafa Squeeze 1 Litro com Marcação",
      "Luvas de Musculação com Suporte Pulso",
      "Bola de Pilates 65cm com Bomba",
      "Massageador Elétrico Percussão Portátil",
      "Termômetro Digital Infravermelho",
      "Monitor de Pressão Arterial de Pulso",
      "Colchonete Dobrável para Academia",
      "Corda Naval Treino Funcional 9m",
      "Mini Stepper com Monitor Digital",
      "Suporte de Bicicleta Ergométrico Roletes",
      "Coqueteleira 600ml com Misturador",
      "Joelheira de Compressão Esportiva",
      "Almofada Ortopédica Lombar para Cadeira",
      "Óculos de Natação Anti-Embaçamento",
      "Bola de Massagem Lacrosse Pack 2un",
      "Suporte Abdominal Roda Exercício Core",
    ],
  },
  {
    name: "Pet Shop",
    slug: "pet-shop",
    description:
      "Tudo para cães e gatos: alimentação, conforto, higiene e entretenimento dos seus pets.",
    code: "PET",
    suppliers: ["empreender_plus", "shopee_fornecedores"],
    categories: ["Alimentação Pet", "Conforto", "Higiene Pet", "Acessórios"],
    products: [
      "Bebedouro Fonte Filtrante para Gatos 2L",
      "Cama Pet Lavável com Bordas Elevadas",
      "Comedouro Automático Duplo Inox",
      "Coleira Refletiva Led Segurança Noturna",
      "Brinquedo Interativo Laser Automático Gatos",
      "Tapete Higiênico Super Absorvente 30un",
      "Cortador de Unhas Pet com Proteção",
      "Shampoo Natural Pet Antialérgico",
      "Mochila Transportadora Pet Janela",
      "Osso Mastigável Natural para Cães",
      "Caminha Suspensa Janela para Gatos",
      "Kit Higiene Dental Pet Escova + Pasta",
      "Tigela Antiformiga com Moat",
      "Guia Retrátil 5m para Cães até 25kg",
      "Arranhador Sisal Torre com Plataforma",
    ],
  },
  {
    name: "Tech & Gadgets",
    slug: "tech-gadgets",
    description:
      "Gadgets inovadores, acessórios para celular, computador e os lançamentos tech mais vendidos.",
    code: "TEC",
    suppliers: ["dropi_brasil", "aliexpress_premium"],
    categories: ["Áudio", "Carregadores", "Acessórios Celular", "Informática"],
    products: [
      "Fone TWS Bluetooth 5.3 com ANC",
      "Fone com Fio Tipo C Microfone Embutido",
      "Carregador Wireless 15W MagSafe Compatível",
      "Carregador Turbo GaN 65W 3 Portas",
      "Cabo USB-C Nylon 2m Carga Rápida",
      "Suporte Magnético Veicular Painel",
      "Capa Antichoque com Suporte para Anel",
      "Película Vidro Temperado 9H Anti-Spy",
      "Power Bank 10000mAh Carga Rápida PD",
      "Teclado Mecânico TKL RGB Switch Blue",
      "Mouse Sem Fio Silencioso Recarregável",
      "Webcam Full HD 1080p com Microfone",
      "Hub USB-C 7 em 1 HDMI 4K",
      "Suporte Ergonômico Notebook Alumínio",
      "Caneta Stylus Universal para Tablet",
      "Caixa de Som Bluetooth 20W à Prova d'Água",
      "Smartwatch Monitor Cardíaco SpO2",
      "Pulseira Fitness com GPS Integrado",
      "Mini Câmera WiFi 1080p Visão Noturna",
      "Leitor de Cartão USB-C Multi-Formato",
    ],
  },
  {
    name: "Moda & Acessórios",
    slug: "moda-acessorios",
    description:
      "Bolsas, carteiras, óculos, bijuterias e acessórios de moda com ótimo custo-benefício.",
    code: "MOD",
    suppliers: ["bling_atacado", "shopee_fornecedores"],
    categories: ["Bolsas e Carteiras", "Óculos", "Bijuterias", "Acessórios Viagem"],
    products: [
      "Mochila Impermeável 30L USB Antifurto",
      "Carteira Masculina Slim Couro Vegano",
      "Óculos de Sol Polarizado UV400",
      "Cinto Masculino Couro Trabalhado",
      "Bolsa Feminina Transversal Mini",
      "Nécessaire de Viagem Impermeável",
      "Relógio Analógico Minimalista Couro",
      "Brincos Geométricos Banhados a Ouro",
      "Colar Folheado Ouro 18k Delicado",
      "Kit Meias Invisíveis Antiderrapante 6 Pares",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Preços realistas por departamento (centavos)
// ---------------------------------------------------------------------------

type DeptCode = "BEL" | "CAS" | "FIT" | "PET" | "TEC" | "MOD";

const pricingRanges: Record<
  DeptCode,
  Array<{ cost: [number, number]; sell: [number, number] }>
> = {
  BEL: [
    { cost: [1000, 1800], sell: [3100, 5900] },  // BARATO
    { cost: [1900, 3500], sell: [6200, 9900] },  // MEDIO
    { cost: [3600, 8500], sell: [11900, 18900] }, // CARO
  ],
  CAS: [
    { cost: [1000, 2000], sell: [3100, 5900] },
    { cost: [2100, 4000], sell: [6200, 9900] },
    { cost: [4100, 9000], sell: [12900, 21900] },
  ],
  FIT: [
    { cost: [1500, 3000], sell: [4700, 8900] },
    { cost: [3100, 6500], sell: [9900, 16900] },
    { cost: [6600, 14000], sell: [19900, 35900] },
  ],
  PET: [
    { cost: [1200, 2500], sell: [3700, 6900] },
    { cost: [2600, 5500], sell: [7900, 14900] },
    { cost: [5600, 12000], sell: [16900, 27900] },
  ],
  TEC: [
    { cost: [800, 2000], sell: [2700, 5900] },
    { cost: [2100, 6500], sell: [6900, 14900] },
    { cost: [6600, 18000], sell: [19900, 47900] },
  ],
  MOD: [
    { cost: [1200, 2500], sell: [3700, 6900] },
    { cost: [2600, 5500], sell: [7900, 12900] },
    { cost: [5600, 11000], sell: [13900, 24900] },
  ],
};

function randomInRange(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

function pricingForProduct(
  deptCode: string,
  index: number
): { supplierCostCents: number; priceCents: number } {
  const ranges = pricingRanges[deptCode as DeptCode];
  const tier = ranges[index % 3];
  const supplierCostCents = randomInRange(tier.cost[0], tier.cost[1]);
  const priceCents = randomInRange(tier.sell[0], tier.sell[1]);
  return { supplierCostCents, priceCents };
}

function buildDescription(name: string, departmentName: string, categoryName: string): string {
  return `${name} — produto em alta demanda no mercado brasileiro de ${departmentName.toLowerCase()}. Qualidade selecionada na categoria ${categoryName.toLowerCase()}, com excelente custo-benefício para o consumidor. Entrega via parceiro dropshipping com rastreamento disponível.`;
}

function buildShortDescription(name: string): string {
  return `${name} com ótimo custo-benefício. Entrega para todo o Brasil.`;
}

function buildSpecifications(estimatedShipDays: number): string {
  return [
    "Conteúdo: 1 unidade conforme descrição e variação selecionada.",
    "Origem: produto nacional ou importado via parceiro dropshipping certificado.",
    `Prazo estimado de entrega: ${estimatedShipDays} dias úteis após confirmação do pagamento.`,
    "Garantia: 30 dias contra defeitos de fabricação conforme CDC.",
    "Devolução: aceita em até 7 dias conforme política da loja.",
    "Rastreamento: código enviado por e-mail após postagem.",
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
          description: `${categoryName} — produtos selecionados dentro de ${dept.name}.`,
          departmentId: department.id,
        },
      });
      categoryIds.push(category.id);
      totalCategories += 1;
    }

    for (let i = 0; i < dept.products.length; i += 1) {
      const name = dept.products[i];
      const categoryId = categoryIds[i % categoryIds.length];
      const categoryName = dept.categories[i % dept.categories.length];

      const supplierKey = dept.suppliers[i % dept.suppliers.length];
      const supplierId = supplierIdByKey.get(supplierKey);
      if (!supplierId) {
        throw new Error(`Fornecedor não encontrado: ${supplierKey}`);
      }
      const supplierInfo = suppliersData.find((s) => s.key === supplierKey)!;

      const { supplierCostCents, priceCents } = pricingForProduct(dept.code, i);
      const marginCents = priceCents - supplierCostCents;

      const hasDiscount = i % 4 === 0;
      const compareAtCents = hasDiscount ? Math.round(priceCents * 1.2) : null;

      const badge =
        hasDiscount
          ? "Oferta"
          : i % 5 === 0
            ? "Mais vendido"
            : i % 9 === 0
              ? "Novidade"
              : null;

      const estimatedShipDays = supplierInfo.averageShipDays + (i % 4);

      await prisma.product.create({
        data: {
          name,
          slug: uniqueSlug(name),
          shortDescription: buildShortDescription(name),
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
          categoryId,
          supplierId,
        },
      });

      totalProducts += 1;
    }
  }

  console.log(`\nFornecedores criados: ${suppliersData.length}`);
  console.log(`Departamentos criados: ${departmentsData.length}`);
  console.log(`Categorias criadas: ${totalCategories}`);
  console.log(`Produtos criados: ${totalProducts}`);
  console.log("\nSeed concluído com sucesso!");
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
