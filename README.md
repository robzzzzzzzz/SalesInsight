# SalesInsight Dashboard

Dashboard de análise de vendas com dados reais do banco Northwind, construído com React, TypeScript, Fastify e Drizzle ORM. A aplicação consome um banco PostgreSQL hospedado no Neon, oferece filtros por período sincronizados com a URL e gráficos interativos.

## Demonstração

- Frontend: https://salesinsight-one.vercel.app/
- Backend: https://salesinsight-api.onrender.com/api

## Tecnologias

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Recharts, TanStack Query  
**Backend:** Fastify, Drizzle ORM, PostgreSQL (Neon)  
**Infraestrutura:** Render, Vercel, GitHub

## Funcionalidades

- Indicadores principais: receita total, total de pedidos e ticket médio.
- Filtro de período com os parâmetros persistidos na URL.
- Gráfico de linha com a receita mensal.
- Gráfico de barras duplas com receita e quantidade vendida por categoria.
- Gráfico de barras horizontais com os dez clientes que mais geraram receita.
- Treemap com efeito de calor para as vendas por país.
- Modo escuro automático conforme a preferência do sistema.
- Layout responsivo para desktop, tablet e mobile.

## Como rodar localmente

### Backend

```bash
cd server
npm install
npm run dev
