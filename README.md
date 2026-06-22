# SalesInsight Dashboard

Dashboard de analise de vendas com dados reais do banco Northwind, construido com React, TypeScript, Fastify e Drizzle ORM. A aplicacao consome um banco PostgreSQL hospedado no Neon, oferece filtros por periodo sincronizados com a URL e graficos interativos.

## Demonstracao

- Frontend: https://salesinsight.vercel.app
- Backend: https://salesinsight-api.onrender.com/api

## Tecnologias

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Recharts, TanStack Query  
**Backend:** Fastify, Drizzle ORM, PostgreSQL (Neon)  
**Infraestrutura:** Render, Vercel, GitHub

## Funcionalidades

- Indicadores principais: receita total, total de pedidos e ticket medio.
- Filtro de periodo com os parametros persistidos na URL.
- Grafico de linha com a receita mensal.
- Grafico de barras duplas com receita e quantidade vendida por categoria.
- Grafico de barras horizontais com os dez clientes que mais geraram receita.
- Treemap com efeito de calor para as vendas por pais.
- Modo escuro automatico conforme a preferencia do sistema.
- Layout responsivo para desktop, tablet e mobile.

## Como rodar localmente

### Backend

```bash
cd server
npm install
npm run dev
