# Relatório — PARTE 4

## Resumo

Ajustes finais de segurança, UX e qualidade: autenticação no admin, checkout
completo com endereço e cálculo de frete simulado via ViaCEP, página /sobre,
README de produção, next.config atualizado e build limpo de 30 rotas.

## Autenticação no admin

**Mecanismo:** cookie `vp_admin_session` httpOnly com validade de 8 horas.
A senha é armazenada na variável de ambiente `ADMIN_PASSWORD` e nunca no
código ou banco de dados. Se a variável não estiver configurada, o acesso
ao admin é livre (facilita o primeiro deploy sem bloquear o desenvolvedor).

**Arquivos:**
- `src/proxy.ts` — intercepta todas as rotas `/admin/*` (exceto `/admin/login`)
  e redireciona para `/admin/login?from=<rota>` se o cookie estiver ausente
  ou inválido. Usa a nova convenção do Next.js 16 (`proxy.ts` + export `proxy`).
- `/api/admin/login` POST — verifica senha, grava cookie HttpOnly.
- `/api/admin/logout` POST — invalida cookie (maxAge=0).
- `/admin/login` — formulário escuro com toggle de visibilidade de senha,
  tratamento de erro e redirecionamento pós-login para a rota original.
- `AdminLogout` — botão client no sidebar que chama `/api/admin/logout` e
  redireciona para `/admin/login`.

**Next.js 16 — `middleware` → `proxy`:** o Next.js 16 renomeou o arquivo
de convenção de `middleware.ts` para `proxy.ts` e o export de `middleware`
para `proxy`. O antigo `middleware.ts` foi removido para evitar conflito de
detecção (Next.js recusa o build se ambos existirem).

**.env atualizado:** `ADMIN_PASSWORD` adicionado ao `.env.example` e ao
`.env` local com valor de demo (`vitrini2025`). Deve ser trocado antes do
deploy de produção.

## Checkout com endereço e frete

O checkout foi expandido de 2 para **3 etapas**:

1. **Dados pessoais** — nome, e-mail, telefone, observações
2. **Endereço de entrega** — CEP com lookup automático via ViaCEP
   (API pública, gratuita, sem auth), campos de logradouro/número/
   complemento/bairro/cidade/UF auto-preenchidos após busca.
3. **Pagamento** — seleção de método simulado

**Cálculo de frete simulado** por UF:
- SP: R$ 15,00
- Sul + Sudeste (MG, RJ, ES, PR, SC, RS): R$ 20,00
- Centro-Oeste (GO, MT, MS, DF): R$ 25,00
- Nordeste (BA, SE, AL, PE, PB, RN, CE, PI, MA): R$ 30,00
- Norte (TO, RO, AC, AM, RR, PA, AP): R$ 35,00
- **Frete grátis** para pedidos ≥ R$ 300,00

O frete estimado é exibido em tempo real na etapa de endereço assim que o
estado (UF) é preenchido.

**Schema:** campo `shippingAddress String?` adicionado ao modelo `Order`
(JSON com cep, street, number, complement, neighborhood, city, state).
Aplicado via `prisma db push`.

**API de checkout atualizada:** aceita e persiste `shippingAddress` no pedido.

## Página /sobre

`/sobre` — apresenta a loja com seção de missão, 4 cards de valores
(Curadoria, Entrega nacional, Compra segura, Atendimento humano), grade dos
6 departamentos com emoji e CTA para o catálogo. Vinculada ao Footer existente.

## next.config.ts

`images.remotePatterns` configurado (array vazio com comentário orientando
onde adicionar o CDN real quando disponível).

## README de produção

Reescrito completamente com:
- Tabela de stack
- Instruções passo a passo de instalação local
- Tabela de variáveis de ambiente com indicação de obrigatoriedade
- Todos os scripts disponíveis
- Tabela completa de rotas (loja + admin + API)
- Guia de deploy na Vercel com nota sobre troca de banco para produção
- Árvore de estrutura do projeto

## Correções técnicas

- **`middleware` → `proxy`** (Next.js 16): renomeado e refatorado conforme
  nova convenção; `middleware.ts` removido para evitar conflito.
- **`useSearchParams` + Suspense:** separado em `AdminLoginForm` (client,
  usa `useSearchParams`) e `AdminLoginPage` (wrapper com `<Suspense>`),
  padrão obrigatório no Next.js para prerenderização de páginas estáticas.
- **Aspas literais em JSX:** escapadas com `&ldquo;`/`&rdquo;` na página
  `/sobre` para satisfazer a regra ESLint `react/no-unescaped-entities`.

## Revisão completa de rotas e segurança

### Páginas verificadas
Todas as 22 rotas de loja + 8 rotas de admin revisadas. Nenhum link quebrado
encontrado. Footer com 7 links externos todos apontando para rotas existentes:
`/sobre`, `/atendimento`, `/rastrear-pedido`, `/politicas/privacidade`,
`/politicas/frete-entrega`, `/politicas/trocas-devolucoes`, `/politicas/termos`.

### Auditoria de segurança
Busca em `src/` por strings suspeitas (`vitrini2025`, `ADMIN_PASSWORD=`,
hardcoded password): **nenhuma ocorrência encontrada** no código-fonte.
A senha transita exclusivamente via `process.env.ADMIN_PASSWORD`.

O arquivo `.env.example` contém apenas o placeholder
`PREENCHER_MANUALMENTE_NA_PLATAFORMA_OFICIAL` — sem valor real.

### MANUAL_DE_USO.md
Criado em `MANUAL_DE_USO.md` na raiz do projeto. Cobre:
1. Requisitos de instalação (Node.js, Git)
2. Passo a passo para rodar localmente (npm install → .env → prisma seed → npm run dev)
3. Uso completo do painel admin (dashboard, produtos, pedidos, fornecedores, pendências)
4. Como trocar a senha do admin (local e na Vercel)
5. Como adicionar/editar produtos (pelo admin e pelo seed)
6. Deploy completo na Vercel (8 etapas, sem pressupor conhecimento técnico)
7. FAQ de 8 perguntas frequentes

## Status final

| Verificação | Resultado |
|---|---|
| `npm run lint` | ✅ zero erros |
| `npx tsc --noEmit` | ✅ zero erros |
| `npm run build` | ✅ 30 rotas compiladas |
| Prisma schema | ✅ sincronizado (`shippingAddress` adicionado) |
| Auth admin | ✅ `/admin/login` + cookie + proxy |
| Checkout 3 etapas | ✅ dados → endereço (ViaCEP) → pagamento |
| Frete simulado | ✅ por UF, grátis ≥ R$ 300 |
| `/sobre` | ✅ |
| README | ✅ completo com deploy |
| Revisão de links | ✅ todos os 7 links do Footer verificados |
| Auditoria de segurança | ✅ sem hardcoded passwords no código |
| `.env.example` | ✅ apenas placeholders, sem valores reais |
| `MANUAL_DE_USO.md` | ✅ criado em português simples |

## Como rodar após esta entrega

```bash
# Servidor de desenvolvimento
npm run dev

# Build e preview de produção
npm run build
npm run start
```

Senha do admin (demo): `vitrini2025`  
→ Acesse `/admin/login` e troque `ADMIN_PASSWORD` antes do deploy.

## Deploy na Vercel (checklist mínimo)

1. `vercel` na raiz do projeto
2. Configurar variáveis de ambiente no painel da Vercel:
   - `DATABASE_URL` — Vercel Postgres / Turso (não SQLite local)
   - `ADMIN_PASSWORD` — senha forte
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SUPPORT_EMAIL`
3. Trocar `provider = "sqlite"` por `provider = "postgresql"` em
   `prisma/schema.prisma` (ou usar Turso com `provider = "sqlite"` +
   driver `@libsql/client`)
4. `npx prisma migrate deploy` no ambiente de produção
5. `npx prisma db seed` para popular com os 105 produtos

## Pendências pós-entrega (backlog)

- Gateway de pagamento real (Mercado Pago, Stripe, PagSeguro)
- Upload real de imagens dos produtos via Vercel Blob ou similar
- Frete real com Melhor Envio / Correios (requer CNPJ e credenciais)
- Autenticação mais robusta no admin (NextAuth com provedor OAuth)
- Testes automatizados (Playwright E2E, Vitest unitário)
