# Manual de Uso — Vitrini Prime

> Guia completo em português simples para quem não é programador.  
> Leia do começo ao fim antes de publicar o site.

---

## Índice

1. [Requisitos antes de começar](#1-requisitos-antes-de-começar)
2. [Como rodar o site no seu computador](#2-como-rodar-o-site-no-seu-computador)
3. [Como acessar e usar o painel admin](#3-como-acessar-e-usar-o-painel-admin)
4. [Como trocar a senha do admin](#4-como-trocar-a-senha-do-admin)
5. [Como adicionar ou editar produtos](#5-como-adicionar-ou-editar-produtos)
6. [Como publicar o site na Vercel (deploy)](#6-como-publicar-o-site-na-vercel-deploy)
7. [Perguntas frequentes](#7-perguntas-frequentes)

---

## 1. Requisitos antes de começar

Você precisará ter instalado no computador:

| O que instalar | Por que precisar | Onde baixar |
|---|---|---|
| **Node.js 20 ou superior** | O site é feito em Node.js | [nodejs.org](https://nodejs.org) — clique em "LTS" |
| **Git** | Para baixar e versionar o código | [git-scm.com](https://git-scm.com) |
| Um editor de texto (opcional) | Para editar arquivos de configuração | [VS Code](https://code.visualstudio.com) é gratuito |

**Como saber se já estão instalados?**

Abra o **Prompt de Comando** (Windows) ou o **Terminal** (Mac/Linux) e rode:

```
node --version
```

Se aparecer algo como `v20.11.0`, está instalado. Se aparecer erro, instale pelo link acima.

---

## 2. Como rodar o site no seu computador

### Passo 1 — Abrir a pasta do projeto no terminal

No Windows, abra o **Prompt de Comando** e navegue até a pasta do projeto:

```
cd E:\Projetos\VitriniPrime\vitrini-prime-store
```

> **Dica:** você também pode abrir a pasta no Explorer, clicar com botão direito em um espaço vazio e escolher "Abrir no Terminal" ou "Git Bash aqui".

### Passo 2 — Instalar as dependências (só na primeira vez)

```
npm install
```

Aguarde terminar — pode demorar alguns minutos. Você verá mensagens rolando na tela; isso é normal.

### Passo 3 — Configurar as variáveis de ambiente (só na primeira vez)

O arquivo `.env` guarda configurações privadas do site. Crie uma cópia do modelo:

```
copy .env.example .env
```

Agora abra o arquivo `.env` com qualquer editor de texto (Bloco de Notas serve) e preencha:

```
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="escolha-uma-senha-aqui"
NEXT_PUBLIC_STORE_NAME="Prime por Você"
NEXT_PUBLIC_WHATSAPP_NUMBER=""
NEXT_PUBLIC_SUPPORT_EMAIL=""
```

> **Importante:** nunca compartilhe o arquivo `.env` com ninguém. Ele contém informações sensíveis.

### Passo 4 — Criar o banco de dados e popular com os produtos (só na primeira vez)

```
npx prisma db push
npx prisma db seed
```

O primeiro comando cria o banco de dados. O segundo insere os 105 produtos de exemplo.

### Passo 5 — Iniciar o servidor local

```
npm run dev
```

Quando aparecer a mensagem `▲ Next.js ... ready`, abra o navegador e acesse:

**http://localhost:3000**

O site estará funcionando localmente. Para parar, pressione `Ctrl + C` no terminal.

---

## 3. Como acessar e usar o painel admin

### Acessando o painel

1. Com o site rodando, acesse **http://localhost:3000/admin**
2. Você será redirecionado para a tela de login
3. Digite a senha que você configurou no arquivo `.env` (campo `ADMIN_PASSWORD`)
4. Clique em **Entrar**

### O que você pode fazer no painel

#### Dashboard (página inicial do admin)
- Ver o número total de produtos cadastrados
- Ver o total de pedidos recebidos
- Ver a receita acumulada
- Ver quantos pedidos estão aguardando processamento
- Acessar rapidamente os pedidos mais recentes

#### Produtos (`/admin/produtos`)
- Listar todos os 105 produtos com SKU, nome, departamento, preço e margem
- Buscar produtos por nome
- Filtrar por departamento (Tecnologia, Música, Lar, etc.)
- Editar nome, preço e status de cada produto

#### Pedidos (`/admin/pedidos`)
- Ver todos os pedidos recebidos com nome do cliente, itens, valor e status
- Filtrar por status: Pendente, Em preparo, Enviado, Entregue, Cancelado
- Abrir o detalhe de cada pedido

#### Detalhe do pedido (`/admin/pedidos/[número]`)
- Ver dados completos: cliente, endereço, método de pagamento, itens comprados
- Ver o histórico de rastreamento do pedido
- **Atualizar o status** do pedido (ex.: de "Pendente" para "Enviado")
- Adicionar código de rastreamento e anotações internas para o fornecedor

#### Fornecedores (`/admin/fornecedores`)
- Ver os 6 fornecedores parceiros com nome, departamentos atendidos e contato

#### Pendências (`/admin/pendencias`)
- Lista de itens que precisam de ação manual antes do lançamento real (gateway de pagamento, imagens reais, frete real, etc.)

### Saindo do painel

Clique em **Sair** no canto inferior esquerdo da barra lateral. Sua sessão tem duração de 8 horas e expira automaticamente.

---

## 4. Como trocar a senha do admin

**Antes de publicar o site para o público, troque a senha!**

### No ambiente local (seu computador)

1. Abra o arquivo `.env` na pasta do projeto
2. Encontre a linha `ADMIN_PASSWORD=`
3. Troque o valor por uma senha forte:
   ```
   ADMIN_PASSWORD="MinhaS3nh@Forte2025!"
   ```
4. Salve o arquivo
5. Reinicie o servidor (`Ctrl + C` e `npm run dev` novamente)

### Na Vercel (produção — após o deploy)

1. Acesse [vercel.com](https://vercel.com) e entre na sua conta
2. Clique no seu projeto **vitrini-prime-store**
3. Vá em **Settings** → **Environment Variables**
4. Encontre `ADMIN_PASSWORD` e clique em **Edit**
5. Digite a nova senha forte e salve
6. Vá em **Deployments** e clique em **Redeploy** (ou faça um novo deploy) para aplicar

> **Dica de senha forte:** use letras maiúsculas, minúsculas, números e símbolos. Exemplo: `VP@Admin!2025#`. Guarde em um gerenciador de senhas (ex.: Bitwarden, 1Password).

---

## 5. Como adicionar ou editar produtos

### Editando um produto pelo painel admin

1. Acesse `/admin/produtos`
2. Clique no produto que deseja editar
3. Altere os campos disponíveis: **nome**, **preço de venda**, **preço original** (riscado) e **status**
4. Clique em **Salvar**

Os campos editáveis no painel são:
| Campo | O que significa |
|---|---|
| Nome | Nome exibido na loja |
| Preço de venda | Preço cobrado do cliente |
| Preço original | Preço riscado (mostra desconto) |
| Status | `ACTIVE` = visível na loja / `INACTIVE` = oculto |

### Adicionando um produto novo (via arquivo de seed)

> Este processo requer editar um arquivo de código. Se não se sentir confortável, peça ajuda a um desenvolvedor.

1. Abra o arquivo `prisma/seed.ts` em um editor de texto
2. Encontre o array de produtos do departamento desejado
3. Copie um produto existente e ajuste os dados:
   ```typescript
   {
     name: "Nome do Produto",
     slug: "nome-do-produto",           // sem espaços, só letras minúsculas e hífen
     sku: "DEP-CAT-XXX",               // código único
     description: "Descrição do produto...",
     priceCents: 15990,                 // preço em centavos (R$ 159,90 = 15990)
     compareAtCents: 19990,             // preço original riscado (opcional)
     costCents: 8000,                   // custo do fornecedor
     status: "ACTIVE",
     badge: "NOVO",                     // ou "OFERTA", "DESTAQUE", null
     categorySlug: "slug-da-categoria",
     departmentSlug: "slug-do-departamento",
     supplierSlug: "slug-do-fornecedor",
   }
   ```
4. Salve o arquivo
5. No terminal, rode:
   ```
   npx prisma db seed
   ```
   > **Atenção:** o seed adiciona apenas itens que ainda não existem (verifica pelo SKU). Produtos existentes não são duplicados.

---

## 6. Como publicar o site na Vercel (deploy)

A Vercel é o serviço de hospedagem recomendado para este site. É gratuito para começar.

### Etapa 1 — Criar conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Sign Up**
3. Escolha **Continue with GitHub** (recomendado) — crie uma conta GitHub se ainda não tiver

### Etapa 2 — Enviar o código para o GitHub

> Se já tiver o projeto no GitHub, pule para a Etapa 3.

1. Acesse [github.com](https://github.com) e crie um repositório novo (clique no "+" no canto superior direito → "New repository")
2. Nome sugerido: `vitrini-prime-store`
3. Deixe como **privado** (Private) — mais seguro
4. Não marque nenhuma opção de inicialização
5. No terminal, dentro da pasta do projeto, rode os comandos abaixo **um por um**:

```
git init
git add .
git commit -m "Primeiro commit — Vitrini Prime"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/vitrini-prime-store.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### Etapa 3 — Criar o banco de dados de produção

O banco de dados local (SQLite) não funciona na Vercel. Você precisará de um banco online. A opção mais simples e gratuita é o **Vercel Postgres** ou o **Turso** (SQLite na nuvem).

**Opção recomendada — Vercel Postgres:**

1. No painel da Vercel, acesse **Storage** → **Create Database** → **Postgres**
2. Siga o assistente — escolha a região mais próxima de você (ex.: São Paulo)
3. A Vercel criará automaticamente a variável `POSTGRES_URL` no seu projeto

Após criar, você precisa adaptar o projeto para PostgreSQL:

1. Abra `prisma/schema.prisma`
2. Troque as linhas do datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Salve e faça commit do arquivo alterado

> Peça ajuda a um desenvolvedor se não se sentir confortável nesta etapa.

### Etapa 4 — Importar o projeto na Vercel

1. No painel da Vercel, clique em **Add New Project**
2. Escolha o repositório `vitrini-prime-store` do GitHub
3. A Vercel detectará automaticamente que é um projeto Next.js
4. **Não clique em Deploy ainda** — primeiro configure as variáveis de ambiente

### Etapa 5 — Configurar as variáveis de ambiente na Vercel

Na tela de importação, role até **Environment Variables** e adicione:

| Nome da variável | Valor |
|---|---|
| `DATABASE_URL` | Cole a URL do banco Vercel Postgres (gerada automaticamente) |
| `ADMIN_PASSWORD` | Sua senha forte (ex.: `VP@Admin!2025#`) |
| `NEXT_PUBLIC_STORE_NAME` | `Prime por Você` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Seu número com DDI, ex.: `5511999999999` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Seu e-mail de suporte |

> **Nunca use a senha `vitrini2025` em produção.** Ela é apenas para testes locais.

### Etapa 6 — Fazer o deploy

1. Clique em **Deploy**
2. Aguarde 1–3 minutos enquanto a Vercel compila o site
3. Quando aparecer o confete e "Congratulations!", seu site está no ar!
4. A Vercel fornecerá uma URL como `vitrini-prime-store.vercel.app`

### Etapa 7 — Popular o banco de produção com os produtos

Após o primeiro deploy:

1. No painel da Vercel, acesse o projeto → **Settings** → **Functions**
2. Clique em **Connect to Git** se ainda não estiver conectado
3. Abra um terminal local e rode (substituindo pela URL da Vercel):

```
npx vercel env pull .env.production.local
```

Depois rode o seed apontando para o banco de produção:

```
DATABASE_URL="cole_aqui_a_url_postgres" npx prisma db push
DATABASE_URL="cole_aqui_a_url_postgres" npx prisma db seed
```

> A URL do banco fica disponível no painel Vercel → Storage → seu banco → Credentials.

### Etapa 8 — Configurar domínio próprio (opcional)

1. No painel da Vercel, vá em **Settings** → **Domains**
2. Digite seu domínio (ex.: `primepocvoce.com.br`)
3. Siga as instruções para apontar o DNS no seu registrador (GoDaddy, Registro.br, etc.)
4. A Vercel configura HTTPS automaticamente

---

## 7. Perguntas frequentes

**O site não abre em http://localhost:3000 — o que faço?**
> Verifique se o terminal mostra `ready` sem erros. Se houver erro em vermelho, cole o texto do erro e peça ajuda a um desenvolvedor.

**Esqueci a senha do admin — o que faço?**
> Abra o arquivo `.env`, veja o valor de `ADMIN_PASSWORD` e use ele para entrar. Em produção, acesse o painel da Vercel → Environment Variables para ver ou trocar.

**Como faço para o site aceitar pagamentos reais?**
> O site atual simula os pagamentos. Para aceitar pagamentos de verdade, é necessário integrar com um gateway como Mercado Pago, Stripe ou PagSeguro. Isso requer desenvolvimento adicional — contrate um programador para essa etapa.

**Posso trocar as fotos dos produtos?**
> Atualmente o site usa gradientes coloridos no lugar das fotos. Para adicionar imagens reais, é necessário hospedar as fotos em algum serviço (ex.: Vercel Blob, Cloudinary) e atualizar o campo de imagem em cada produto. Requer desenvolvimento adicional.

**O frete calculado é real?**
> Não. O frete atual é simulado com valores fixos por região do Brasil. Para frete real com cálculo dos Correios ou Melhor Envio, é necessário integração adicional com as APIs desses serviços.

**Como cancelar um pedido pelo painel?**
> Acesse `/admin/pedidos` → clique no pedido → no campo de status, selecione "Cancelado" → clique em Salvar. O cliente não é notificado automaticamente — você precisará entrar em contato manualmente.

**Onde ficam os dados dos clientes?**
> No banco de dados local (`prisma/dev.db`) ou, após o deploy, no banco de dados da Vercel. Siga a política de privacidade do site e a LGPD para tratar esses dados adequadamente.

---

> Dúvidas adicionais? Consulte o arquivo `README.md` na raiz do projeto para detalhes técnicos completos, ou entre em contato com o desenvolvedor responsável pelo projeto.
