# 🚀 Explorer NASA

Explorer NASA é uma aplicação frontend desenvolvida em **React + TypeScript** que consome a **NASA Open API (APOD – Astronomy Picture of the Day)** para exibir uma galeria de imagens e vídeos astronômicos. O projeto foi construído com foco em **arquitetura escalável**, **performance**, **boas práticas de engenharia frontend** e organização de código orientada a domínio.

Este projeto também serve como **case de portfólio profissional**.

---

## 🎯 Objetivo do Projeto

- Consumir uma API pública real (NASA Open API)
- Aplicar arquitetura **feature-based / domain-driven**
- Organizar o código de forma escalável e sustentável
- Utilizar **React Query** para gerenciamento de estado assíncrono
- Implementar **lazy loading** para melhorar performance
- Criar um projeto sólido para portfólio frontend

---

## 🛠️ Tecnologias Utilizadas

- React  
- TypeScript  
- Vite  
- React Router DOM  
- @tanstack/react-query  
- Axios  
- Tailwind CSS  
- Lucide React  

---

## 🔑 Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo(Você consegue apikey através do site: https://api.nasa.gov):
```txt
VITE_NASA_API_KEY=YOUR_API_KEY_HERE
```

## 🧩 Organização por Camadas
- app: Contém configurações globais da aplicação, como layout principal, providers, configuração de rotas e lazy loading.

- domains: Cada domínio representa uma feature isolada da aplicação.
O domínio apod concentra toda a lógica relacionada ao Astronomy Picture of the Day, incluindo componentes, hooks, serviços, páginas e tipagens.

- shared: Contém recursos reutilizáveis entre diferentes domínios, como componentes genéricos e serviços globais.

## 📂 Estrutura do Projeto
A aplicação segue uma arquitetura orientada a domínios, separando responsabilidades de forma clara e facilitando manutenção, testes e escalabilidade.

```txt
src/
├── app/
│   ├── layout/
│   │   └── DefaultLayout.tsx
│   ├── providers/
│   │   └── QueryProvider.tsx
│   └── router/
│       ├── index.tsx
│       ├── routes.tsx
│       └── lazyRoutes.ts
│
├── domains/
│   └── apod/
│       ├── components/
│       │   ├── ApodGallery.tsx
│       │   ├── ApodModal.tsx
│       │   └── DateFilter.tsx
│       ├── hooks/
│       │   └── useApod.ts
│       ├── pages/
│       │   └── ApodGalleryPage
│       ├── services/
│       │   └── apodService.ts
│       └── types.ts
│
├── shared/
│   ├── components/
│   │   ├── Hero
│   │   ├── Footer
│   │   ├── Loading
│   │   └── ErrorSection
│   └── services/
│       └── httpClient.ts
│
├── App.tsx
├── main.tsx
└── index.css
```
## 🔄 Fluxo de Dados

- Componentes consomem hooks
- Hooks encapsulam regras de negócio
- Hooks chamam services
- Services utilizam o httpClient
- React Query gerencia cache, loading, erros e revalidação

## ▶️ Como Rodar o Projeto

Instale as dependências e execute o projeto em ambiente de desenvolvimento através dos seguintes comandos:
```txt
npm install
npm run dev
```
A aplicação estará disponível em:
```txt
http://localhost:5173
```

## 🚧 Melhorias Futuras

- Página 404
- Error Boundary global
- Filtros avançados de data
- Testes automatizados
