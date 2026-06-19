# Dados sensíveis que NUNCA devem ser inseridos neste projeto

Este projeto é uma loja de demonstração (Vitrini Prime) e não deve conter, em
nenhuma hipótese, os seguintes dados reais:

- CPF
- RG
- CNH
- Endereço residencial real
- Número de conta bancária
- Chave Pix real
- Senha real
- Token real
- API key real
- Dados de cartão de crédito/débito
- Documentos pessoais (fotos ou números)
- Dados fiscais sensíveis (CNPJ real vinculado, inscrição estadual, etc.)

## O que fazer quando um dado sensível for necessário

Sempre que a aplicação precisar de um dado sensível para funcionar em
produção (ex.: token de gateway de pagamento, número de WhatsApp real,
e-mail de suporte real), o valor deve ser representado no código e nos
arquivos de configuração apenas como:

```
PREENCHER_MANUALMENTE_NA_PLATAFORMA_OFICIAL
```

Esse valor deve ser preenchido futuramente pelo responsável do negócio,
diretamente na plataforma oficial correspondente (painel do gateway de
pagamento, painel da Vercel, etc.), nunca dentro do repositório de código.

## Regras práticas

- `.env` nunca deve ser commitado nem conter dados reais — use `.env.example`
  como referência de variáveis necessárias.
- Nenhuma senha, token ou chave deve aparecer em comentários de código.
- O seed do banco (`prisma/seed.ts`) deve usar apenas dados fictícios de
  demonstração (fornecedores placeholder, produtos genéricos).
- O README não deve conter segredos.
- Antes de cada entrega, revisar o projeto em busca de dados sensíveis reais
  esquecidos (ver checklist em `docs/CHECKLIST_GERAL.md`).
