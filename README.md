# Vitrini Prime — "Prime por Você"

Loja boutique multicategoria construída com Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 e Prisma + SQLite. Modelo de operação **dropshipping**.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS v4 |
| ORM | Prisma 6 + SQLite |
| Validação | Zod 4 |
| Ícones | Lucide React |
| Deploy | Vercel (recomendado) |

---

## Instalação e execução local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env e defina ADMIN_PASSWORD (mínimo 8 caracteres)

# 3. Gerar o Prisma Client e aplicar schema
npx prisma generate
npx prisma db push

# 4. Popular o banco com 105 produtos de demo
npx prisma db seed

# 5. Iniciar em desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**.

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | ✅ | URL do banco SQLite (ex.: `file:./dev.db`) |
| `ADMIN_PASSWORD` | ✅ | Senha de acesso ao painel `/admin` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | — | Número WhatsApp com DDI (ex.: `5511999990000`) |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | — | E-mail de suporte exibido no footer |
| `PAYMENT_PROVIDER` | — | `SIMULATED` (padrão) ou gateway real futuro |
| `MERCADO_PAGO_ACCESS_TOKEN` | — | Credencial do gateway (preencher na plataforma) |
| `MERCADO_PAGO_PUBLIC_KEY` | — | Chave pública do gateway (preencher na plataforma) |

> **Segurança:** nenhum dado sensível real deve ser inserido no repositório.
> Veja `docs/DADOS_SENSIVEIS_NAO_INSERIR.md`.

---

## Scripts disponíveis

```bash
npm run dev              # Desenvolvimento (Turbopack)
npm run build            # Build de produção
npm run start            # Inicia servidor de produção
npm run lint             # ESLint
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Aplica migrations (interativo)
npm run prisma:seed      # Popula banco com dados de demo
npm run prisma:studio    # Abre Prisma Studio (GUI do banco)
```

---

## Rotas da loja

| Rota | Descrição |
|---|---|
| `/` | Home premium com hero, destaques e FAQ |
| `/departamentos` | Grade dos 6 departamentos |
| `/produtos` | Catálogo completo com busca |
| `/produtos/[slug]` | Página individual de produto |
| `/categoria/[slug]` | Produtos por departamento ou categoria |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Checkout em 3 etapas (dados → entrega → pagamento) |
| `/pedido-confirmado/[orderNumber]` | Confirmação pós-compra |
| `/rastrear-pedido` | Busca de pedido por número |
| `/atendimento` | Canais, FAQ e formulário de contato |
| `/sobre` | Sobre a loja |
| `/politicas/privacidade` | Política de privacidade (LGPD) |
| `/politicas/frete-entrega` | Política de frete |
| `/politicas/trocas-devolucoes` | Trocas e devoluções (CDC) |
| `/politicas/termos` | Termos de uso |

## Rotas do admin

> Protegidas por senha via `ADMIN_PASSWORD`. Acesse `/admin/login` primeiro.

| Rota | Descrição |
|---|---|
| `/admin` | Dashboard com KPIs em tempo real |
| `/admin/produtos` | Tabela de produtos com busca e filtro |
| `/admin/pedidos` | Lista de pedidos com filtro por status |
| `/admin/pedidos/[id]` | Detalhe do pedido + alterar status |
| `/admin/fornecedores` | Cadastro dos 6 fornecedores |
| `/admin/pendencias` | Itens que exigem preenchimento manual |

## API Routes

| Endpoint | Método | Descrição |
|---|---|---|
| `/api/checkout` | POST | Cria pedido (customer + order + items) |
| `/api/orders` | GET | Lista pedidos (paginado, filtro por status) |
| `/api/orders/[id]` | GET / PATCH | Detalhe e atualização de status |
| `/api/products` | GET | Lista produtos (paginado, busca, filtro) |
| `/api/products/[id]` | GET / PATCH | Detalhe e edição de produto |
| `/api/admin/login` | POST | Autentica e gera cookie de sessão |
| `/api/admin/logout` | POST | Invalida cookie de sessão |

---

## Deploy na Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login e deploy
vercel login
vercel
```

**Configurações obrigatórias na Vercel:**

1. Em **Settings → Environment Variables**, adicione:
   - `DATABASE_URL` — use Vercel Postgres ou Turso (SQLite remoto)
   - `ADMIN_PASSWORD` — senha forte (mín. 12 caracteres)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — número real
   - `NEXT_PUBLIC_SUPPORT_EMAIL` — e-mail real

2. Em **Settings → Functions**, defina a região mais próxima do banco.

> **Nota sobre banco de dados:** SQLite local (`file:./dev.db`) funciona apenas
> em desenvolvimento. Para produção na Vercel, use
> [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres),
> [Turso](https://turso.tech/) ou [PlanetScale](https://planetscale.com/).
> Basta trocar o `provider` em `prisma/schema.prisma` e atualizar a
> `DATABASE_URL`.

---

## Estrutura do projeto

```
vitrini-prime-store/
├── prisma/
│   ├── schema.prisma          # Modelos: Department, Category, Supplier, Product,
│   │                          #          Customer, Order, OrderItem, TrackingEvent
│   └── seed.ts                # 6 departamentos · 22 categorias · 6 fornecedores · 105 produtos
├── src/
│   ├── app/
│   │   ├── (loja)/            # Páginas públicas
│   │   ├── admin/             # Painel admin (protegido)
│   │   └── api/               # API Routes
│   ├── components/
│   │   ├── cart/              # CartButton, CartDrawer, CartItem
│   │   ├── admin/             # AdminOrderActions, AdminLogout
│   │   ├── home/              # Hero, TrustBar, DepartmentGrid, FeaturedProducts, FAQ
│   │   ├── layout/            # Header, Footer, MobileMenu, ConditionalLayout
│   │   ├── product/           # ProductCard, ProductGallery, ProductDetails, AddToCartButton
│   │   └── ui/                # Button, Badge, Card, Input, PolicyPage, ContactForm…
│   ├── context/
│   │   └── CartContext.tsx    # Carrinho (useReducer + localStorage)
│   ├── data/
│   │   ├── departments.ts     # Dados estáticos dos departamentos
│   │   └── legalTexts.ts      # Textos de políticas (privacidade, frete, trocas, termos)
│   ├── lib/
│   │   ├── constants.ts       # STORE, BRAND_COLORS, NAV_LINKS
│   │   ├── format.ts          # formatCurrency, formatDate, slugify
│   │   ├── prisma.ts          # Singleton do PrismaClient
│   │   ├── products.ts        # Queries de produtos
│   │   ├── taxonomy.ts        # Resolução de departamento/categoria
│   │   ├── utils.ts           # cn()
│   │   └── validations.ts     # Zod schemas
│   ├── middleware.ts           # Proteção das rotas /admin/*
│   └── types/
│       └── index.ts           # ProductCardView, ProductDetailView…
├── docs/
│   ├── CHECKLIST_GERAL.md
│   ├── DADOS_SENSIVEIS_NAO_INSERIR.md
│   ├── RELATORIO_PARTE_1.md … RELATORIO_PARTE_4.md
├── .env.example               # Variáveis necessárias (sem valores reais)
└── next.config.ts
```

---

## Documentação interna

- [`docs/DADOS_SENSIVEIS_NAO_INSERIR.md`](docs/DADOS_SENSIVEIS_NAO_INSERIR.md) — regras de segurança
- [`docs/CHECKLIST_GERAL.md`](docs/CHECKLIST_GERAL.md) — progresso do projeto
- [`docs/RELATORIO_PARTE_1.md`](docs/RELATORIO_PARTE_1.md) — base e arquitetura
- [`docs/RELATORIO_PARTE_2.md`](docs/RELATORIO_PARTE_2.md) — catálogo e home
- [`docs/RELATORIO_PARTE_3.md`](docs/RELATORIO_PARTE_3.md) — carrinho, checkout e admin
- [`docs/RELATORIO_PARTE_4.md`](docs/RELATORIO_PARTE_4.md) — ajustes finais e deploy
