# Checklist geral — Vitrini Prime

## PARTE 1 — Base do projeto, arquitetura, banco e estrutura

- [x] Projeto Next.js criado (App Router + TypeScript + Tailwind + ESLint)
- [x] Dependências instaladas (Prisma, Zod, Lucide React, clsx, tailwind-merge, tsx)
- [x] Estrutura de pastas criada conforme especificação
- [x] `prisma/schema.prisma` criado com todos os modelos
- [x] `.env.example` criado (sem dados reais)
- [x] `src/lib/prisma.ts`, `format.ts`, `constants.ts`, `validations.ts`, `utils.ts`
- [x] `src/types/index.ts`
- [x] `src/data/departments.ts` e `legalTexts.ts`
- [x] Componentes UI básicos: Button, Badge, Card, Input
- [x] Header, Footer e MobileMenu
- [x] Layout global com fontes, metadata e idioma pt-BR
- [x] `globals.css` com paleta de marca (Tailwind v4 tokens)
- [x] Home provisória
- [x] Admin provisório
- [x] Documentação inicial de segurança
- [ ] `npx prisma generate` / `migrate` / `seed` — **bloqueado neste ambiente
      sandbox** por restrição de rede (ver RELATORIO_PARTE_1.md); deve ser
      executado no ambiente final do usuário.
- [x] `npm run lint`
- [x] `npm run build`

## PARTE 2 — Seed com 105 produtos, catálogo, home premium e páginas de produto

- [x] Seed completo escrito (`prisma/seed.ts`) — 6 departamentos, 22 categorias, 6 fornecedores, 105 produtos
- [x] Contagem de 105 produtos validada estaticamente
- [x] Home premium completa (Hero, TrustBar, Departamentos, Destaques, seções por departamento, FAQ)
- [x] Página `/departamentos`
- [x] Página `/produtos` (com busca)
- [x] Página `/produtos/[slug]`
- [x] Página `/categoria/[slug]` com resolução departamento/categoria
- [x] Componentes de home (Hero, TrustBar, DepartmentGrid, FeaturedProducts, HomeSection, FAQ)
- [x] Componentes de produto (ProductCard, ProductGallery, ProductDetails, ProductImagePlaceholder)
- [x] Placeholders visuais via gradiente (sem imagem externa)
- [x] `npm run lint` OK
- [x] `npx tsc --noEmit` OK (zero erros)
- [ ] `npx prisma db seed` / `npm run build` completo — **bloqueado neste
      sandbox** por restrição de rede; deve ser executado no ambiente final
      do usuário
- [x] `docs/RELATORIO_PARTE_2.md` criado
- [x] README atualizado com novas rotas

## PARTE 3 — Carrinho, checkout simulado, API, admin, políticas e atendimento

- [x] Carrinho de compras (Context + localStorage, SSR-safe)
- [x] CartButton com badge de contagem no Header
- [x] CartDrawer (gaveta lateral com overlay e suporte a Esc)
- [x] Página `/carrinho` completa com resumo e limpar carrinho
- [x] `AddToCartButton` e `BuyNowButton` (Client Components) integrados ao `ProductDetails`
- [x] Checkout simulado em 2 etapas (dados + método de pagamento)
- [x] Página de confirmação `/pedido-confirmado/[orderNumber]`
- [x] API `/api/checkout` — cria Customer, Order, OrderItems, TrackingEvent inicial
- [x] API `/api/orders` — lista com paginação e filtro por status
- [x] API `/api/orders/[id]` — detalhe e atualização de status (+ TrackingEvent automático)
- [x] API `/api/products` — lista com busca e filtro por departamento
- [x] API `/api/products/[id]` — detalhe e edição parcial
- [x] `ConditionalLayout` — admin sem Header/Footer da loja
- [x] Admin layout dedicado (sidebar escura, navegação própria)
- [x] `/admin` dashboard com KPIs reais (produtos, pedidos, receita, pendentes)
- [x] `/admin/produtos` — tabela com busca, filtro por depto. e paginação
- [x] `/admin/pedidos` — tabela com filtro por status e paginação
- [x] `/admin/pedidos/[id]` — detalhe completo + `AdminOrderActions` (alterar status)
- [x] `/admin/fornecedores` — cards dos 6 fornecedores
- [x] `/admin/pendencias` — lista de itens manuais com prioridade
- [x] Textos completos de políticas em `src/data/legalTexts.ts`
- [x] `/politicas/privacidade` (8 seções, LGPD)
- [x] `/politicas/frete-entrega` (6 seções, dropshipping)
- [x] `/politicas/trocas-devolucoes` (6 seções, CDC)
- [x] `/politicas/termos` (9 seções)
- [x] `/atendimento` — canais, FAQ 6 perguntas, formulário simulado
- [x] `/rastrear-pedido` — busca por orderNumber, timeline de eventos
- [x] `prisma/schema.prisma` — `Customer.email @unique`
- [x] `npm run lint` OK
- [x] `npx tsc --noEmit` OK (zero erros)
- [x] `docs/RELATORIO_PARTE_3.md` criado

## PARTE 4 — Ajustes finais, testes, build, relatório, manual e deploy

- [x] Autenticação do admin: `src/proxy.ts` + `/admin/login` + `/api/admin/login` + `/api/admin/logout`
- [x] Cookie `vp_admin_session` HttpOnly (8h), com fallback livre se ADMIN_PASSWORD não configurado
- [x] `AdminLogout` client component no sidebar
- [x] `middleware.ts` → `proxy.ts` (convenção Next.js 16, export `proxy`)
- [x] `ADMIN_PASSWORD` adicionado ao `.env.example` e `.env` (valor de demo)
- [x] Checkout expandido para 3 etapas: dados → endereço → pagamento
- [x] Lookup de CEP via ViaCEP (API pública, sem auth)
- [x] Cálculo de frete simulado por UF (SP R$15, Sul/Sudeste R$20, CO R$25, NE R$30, N R$35)
- [x] Frete grátis para pedidos ≥ R$ 300
- [x] Campo `shippingAddress` adicionado ao schema do `Order` + `prisma db push`
- [x] API `/api/checkout` atualizada para persistir `shippingAddress`
- [x] Página `/sobre` (missão, valores, departamentos, CTA)
- [x] `next.config.ts` com `images.remotePatterns` configurado
- [x] README completo (stack, instalação, variáveis, rotas, deploy na Vercel)
- [x] `useSearchParams` + `<Suspense>` corrigido em `/admin/login`
- [x] Aspas JSX escapadas (`&ldquo;`/`&rdquo;`) em `/sobre`
- [x] `npm run lint` OK (zero erros)
- [x] `npx tsc --noEmit` OK (zero erros)
- [x] `npm run build` OK — 30 rotas compiladas, Proxy ativo
- [x] `docs/RELATORIO_PARTE_4.md` criado
- [x] Revisão completa de todas as páginas/rotas: sem links quebrados, sem valores hardcoded, sem inconsistências visuais
- [x] Auditoria de segurança: `ADMIN_PASSWORD` ausente de qualquer arquivo de código (somente via env var)
- [x] `.env.example` com placeholder `PREENCHER_MANUALMENTE_NA_PLATAFORMA_OFICIAL` (sem valor real)
- [x] Footer: todos os 7 links verificados e funcionais (`/sobre`, `/atendimento`, `/rastrear-pedido`, 4 políticas)
- [x] `MANUAL_DE_USO.md` criado em português simples (rodar localmente, admin, senha, produtos, Vercel deploy)
