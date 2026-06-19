# Relatório — PARTE 3

## Resumo

Carrinho de compras com estado persistente, checkout simulado, rotas de API,
painel admin completo, páginas de políticas e fluxo de atendimento ao cliente
implementados sobre a base das PARTES 1 e 2.

## Carrinho de compras

**Implementação:** `src/context/CartContext.tsx` — React Context + `useReducer`
com persistência automática em `localStorage` (SSR-safe: hidratação apenas após
montagem no cliente, sem flash de conteúdo divergente).

**Ações suportadas:** `ADD` (com incremento se item já existe), `REMOVE`,
`SET_QTY` (remove se qty ≤ 0), `CLEAR`, `HYDRATE` (restaura do localStorage).

**Componentes:**
- `src/components/cart/CartButton.tsx` — botão no Header com badge de contagem,
  abre o drawer lateral.
- `src/components/cart/CartDrawer.tsx` — gaveta slide-in com overlay, suporte a
  Esc, bloqueio de scroll, lista de itens, subtotal e CTA para checkout.
- `src/components/cart/CartItem.tsx` — linha com controles +/– de quantidade e
  remoção.
- `src/app/carrinho/page.tsx` — página de carrinho completa com resumo de pedido
  e botão "limpar carrinho".

**Integração na página de produto:**
- `src/components/product/AddToCartButton.tsx` — Client Component, feedback
  visual de "Adicionado!" por 2 segundos.
- `src/components/product/BuyNowButton.tsx` — adiciona ao carrinho e redireciona
  direto para o checkout.
- `ProductDetails.tsx` atualizado para usar os dois botões.

**Layout:** `CartProvider` envolve toda a árvore via `src/app/layout.tsx`. O
admin não usa carrinho (excluído pelo `ConditionalLayout`).

## Checkout simulado

**`src/app/checkout/page.tsx`** — formulário em 2 etapas (Client Component):
1. **Dados pessoais:** nome, e-mail, telefone, observações — com validação
   inline (sem biblioteca externa, usando regex e comprimento mínimo).
2. **Pagamento simulado:** seleção de método (Pix, Cartão, Boleto, Simulado).

Ao confirmar, faz `POST /api/checkout` com os dados do cliente e itens do
carrinho. Em caso de sucesso, limpa o carrinho e redireciona para a página de
confirmação.

**`src/app/pedido-confirmado/[orderNumber]/page.tsx`** — exibe o número do
pedido, orienta o cliente a rastrear e a entrar em contato com o atendimento.

## Rotas de API

| Rota | Métodos | Descrição |
|---|---|---|
| `/api/checkout` | POST | Cria Customer (findFirst+create) + Order + OrderItems + TrackingEvent inicial |
| `/api/orders` | GET | Lista pedidos com paginação e filtro por status |
| `/api/orders/[id]` | GET, PATCH | Detalhe do pedido; PATCH atualiza status e grava TrackingEvent automático |
| `/api/products` | GET | Lista produtos com busca e filtro por departamento |
| `/api/products/[id]` | GET, PATCH | Detalhe e edição parcial de produto |

Todas as rotas validam entrada com Zod e retornam JSON com código HTTP adequado.
Nenhuma autenticação foi implementada nesta fase (prevista para PARTE 4).

## Schema — ajuste

`Customer.email` recebeu `@unique` no `prisma/schema.prisma`. **Requer
`prisma migrate dev`** antes da primeira execução em banco novo ou limpo (ver
seção "Como testar" abaixo). A API usa `findFirst + create/update` para
compatibilidade com o client gerado antes dessa migration.

## Painel Admin completo

**Layout dedicado:** `src/app/admin/layout.tsx` — sidebar escura com navegação
própria, sem Header/Footer da loja. O isolamento é feito pelo
`ConditionalLayout` em `src/app/layout.tsx`, que detecta `pathname.startsWith('/admin')`
e omite Header/Footer para as rotas de admin.

**Páginas:**
- `/admin` — Dashboard com KPIs reais (produtos ativos, pedidos, receita
  simulada, pendentes) e tabela de pedidos recentes.
- `/admin/produtos` — Tabela de 105+ produtos com busca por nome/SKU, filtro
  por departamento e paginação (25/página).
- `/admin/pedidos` — Tabela de pedidos com filtro por status e paginação.
- `/admin/pedidos/[id]` — Detalhe completo: cliente, pagamento, rastreio, itens
  com custo e margem, histórico de TrackingEvents, e `AdminOrderActions`
  (Client Component) para atualizar status via PATCH na API.
- `/admin/fornecedores` — Cards dos 6 fornecedores com rating, país, prazo
  médio e nível de risco.
- `/admin/pendencias` — Lista de itens que exigem preenchimento manual na
  plataforma oficial (gateway, WhatsApp, e-mail, imagens, CNPJ), com
  prioridade (alta/média/baixa) e aviso sobre `DADOS_SENSIVEIS`.

## Páginas de políticas

**Componente reutilizável:** `src/components/ui/PolicyPage.tsx` — recebe um
objeto `{ title, lastUpdated, sections[] }` e renderiza a página completa.

**Textos completos** adicionados a `src/data/legalTexts.ts` (expandido de 3
para ~120 linhas):
- `privacyPolicy` — 8 seções cobrindo LGPD, coleta, compartilhamento, retenção.
- `shippingPolicy` — 6 seções sobre dropshipping, prazos, rastreio, frete.
- `returnPolicy` — 6 seções com CDC (Art. 49), defeitos, processo, reembolso.
- `termsOfUse` — 9 seções cobrindo aceitação, operação, preços, limitações.

**Rotas** (seguindo os links do Footer existente):
- `/politicas/privacidade`
- `/politicas/frete-entrega`
- `/politicas/trocas-devolucoes`
- `/politicas/termos`

## Atendimento ao cliente

**`/atendimento`** — canais de contato (WhatsApp condicional, e-mail, horário),
FAQ com 6 perguntas usando `<details>/<summary>` nativo (sem JS), e formulário
de contato simulado (`ContactForm` Client Component com validação e feedback de
sucesso).

**`/rastrear-pedido`** — formulário de busca por `orderNumber` via GET (Server
Component, sem JS necessário). Exibe: resumo do pedido, código de rastreio,
timeline de eventos (`TrackingTimeline`), lista de itens. Suporta parâmetro
`?numero=VP-...` diretamente (usado pela página de confirmação de pedido).

## Status do lint e tsc

`npm run lint` → **OK**, sem erros ou avisos.
`npx tsc --noEmit` → **OK, zero erros** (incluindo todos os componentes e
rotas de API da PARTE 3).

## Como testar (no seu ambiente)

```bash
# Se ainda não rodou as migrations:
npx prisma generate
npx prisma migrate dev --name add-customer-email-unique
npx prisma db seed

npm run dev
```

Rotas novas:
- `http://localhost:3000/carrinho`
- `http://localhost:3000/checkout`
- `http://localhost:3000/pedido-confirmado/VP-XXXXX-XXXX`
- `http://localhost:3000/rastrear-pedido`
- `http://localhost:3000/atendimento`
- `http://localhost:3000/politicas/privacidade`
- `http://localhost:3000/politicas/frete-entrega`
- `http://localhost:3000/politicas/trocas-devolucoes`
- `http://localhost:3000/politicas/termos`
- `http://localhost:3000/admin` (dashboard com dados reais)
- `http://localhost:3000/admin/produtos`
- `http://localhost:3000/admin/pedidos`
- `http://localhost:3000/admin/fornecedores`
- `http://localhost:3000/admin/pendencias`

## Arquivos novos criados

```
src/
  context/CartContext.tsx
  components/
    cart/{CartButton,CartDrawer,CartItem}.tsx
    product/{AddToCartButton,BuyNowButton}.tsx
    admin/AdminOrderActions.tsx
    layout/ConditionalLayout.tsx
    ui/{PolicyPage,ContactForm,TrackingTimeline}.tsx
  app/
    carrinho/page.tsx
    checkout/page.tsx
    pedido-confirmado/[orderNumber]/page.tsx
    rastrear-pedido/page.tsx
    atendimento/page.tsx
    politicas/{privacidade,frete-entrega,trocas-devolucoes,termos}/page.tsx
    api/checkout/route.ts
    api/orders/route.ts
    api/orders/[id]/route.ts
    api/products/route.ts
    api/products/[id]/route.ts
    admin/layout.tsx
    admin/produtos/page.tsx
    admin/pedidos/page.tsx
    admin/pedidos/[id]/page.tsx
    admin/fornecedores/page.tsx
    admin/pendencias/page.tsx
```

## Arquivos modificados

```
src/app/layout.tsx            — CartProvider + ConditionalLayout
src/app/admin/page.tsx        — Dashboard completo com métricas reais
src/components/layout/Header.tsx   — CartButton substituindo link estático
src/components/product/ProductDetails.tsx — AddToCartButton + BuyNowButton
src/data/legalTexts.ts        — textos completos de políticas
prisma/schema.prisma          — Customer.email @unique
```

## Pendências para PARTE 4

- Autenticação no painel admin (NextAuth ou middleware simples).
- Cálculo de frete real (Melhor Envio / CEP).
- Upload de imagens de produtos.
- Build de produção completo e deploy (Vercel).
- README atualizado com instruções de deploy.
