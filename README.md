# PedroviskCareerPath

Site pessoal de **PDI (Plano de Desenvolvimento Individual)**, com back-end em **ASP.NET Core Web API (.NET 9)** e front-end em **React + Vite + TypeScript + Tailwind CSS**, para acompanhar publicamente metas de carreira, roadmap de tecnologias, contribuições e soft skills em desenvolvimento.

> 🌐 **Monorepo:** API (`PedroviskCareerPath.API/`) e front-end (`client/`) no mesmo repositório.
> Projeto inspirado nos repositórios `julia-career-path` e `pdi-template`.

---

## Sumário

- [Apresentação](#apresentação)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Observações Importantes](#observações-importantes)

---

## Apresentação

O **PedroviskCareerPath** é uma página pública que centraliza o meu Plano de Desenvolvimento Individual: quem eu sou e minha stack atual, as metas de carreira em andamento (com prioridade, categoria e progresso), um roadmap de tecnologias a estudar, o histórico de contribuições (projetos, artigos, código aberto) e as soft skills que estou praticando ou desenvolvendo.

O front-end consome a API via React Query, com tema claro/escuro persistido e uma área administrativa protegida por login (JWT) para manter os dados atualizados sem precisar mexer direto no banco.

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Back-end | ASP.NET Core Web API (.NET 9) |
| ORM | Entity Framework Core 9 (Code First + Migrations) |
| Banco de dados | SQL Server (LocalDB em dev, Azure SQL em produção) |
| Autenticação | JWT Bearer + hash de senha (`BCrypt.Net-Next`) |
| Rate limiting | Fixed Window Limiter (login: 5 tentativas/min) |
| Documentação da API | Swagger / OpenAPI (ambiente de desenvolvimento) |
| Front-end | React 19 + Vite + TypeScript |
| Estilos | Tailwind CSS 4 |
| Data fetching | TanStack Query (React Query) |
| Roteamento | React Router 7 |
| Ícones | lucide-react + react-icons |
| Notificações (UI) | Sonner |
| Datas | date-fns (locale pt-BR) |
| Hospedagem planejada | Azure App Service (API) + Cloudflare Pages ou Vercel (front) |

---

## Estrutura do Projeto

```
PedroviskCareerPath/
├── PedroviskCareerPath.API/          # Back-end — ASP.NET Core Web API
│   ├── Controllers/
│   │   ├── AuthController.cs          # Login da área admin (JWT)
│   │   ├── ProfileController.cs       # Dados de perfil (leitura pública, update autenticado)
│   │   ├── GoalsController.cs         # CRUD de metas de carreira
│   │   ├── RoadmapController.cs       # CRUD do roadmap de tecnologias
│   │   ├── ContributionsController.cs # CRUD de contribuições
│   │   └── SoftSkillsController.cs    # CRUD de soft skills
│   ├── Models/
│   │   ├── Profile.cs                 # Nome, cargo, empresa, redes sociais, stack, período do PDI, bio
│   │   ├── Goal.cs                    # Título, categoria, prioridade, status, progresso, prazo
│   │   ├── RoadmapItem.cs             # Tecnologia, categoria, status, ordem
│   │   ├── Contribution.cs            # Título, categoria, status, tags, impactos, data
│   │   ├── SoftSkill.cs               # Nome, descrição, status (praticando/desenvolvendo), ordem
│   │   ├── AdminAuthOptions.cs        # Configuração de hash de senha e segredo JWT
│   │   ├── LoginRequest.cs / LoginResponse.cs
│   ├── Dtos/                          # DTOs de entrada para cada recurso (Profile, Goal, Roadmap, Contribution, SoftSkill)
│   ├── Data/
│   │   └── CareerPathDbContext.cs     # DbContext (EF Core)
│   ├── Migrations/                    # Histórico de migrations do banco
│   └── Program.cs                     # Bootstrap, JWT, CORS, rate limiting, Swagger
└── client/                            # Front-end — React + Vite
    ├── src/
    │   ├── components/
    │   │   ├── ProfileHeader.tsx       # Header com avatar, bio, stack, links e "cartão de código" animado
    │   │   ├── GoalsList.tsx           # Lista de metas com filtro por status
    │   │   ├── RoadmapList.tsx         # Lista do roadmap de tecnologias
    │   │   ├── ContributionsList.tsx   # Lista de contribuições com filtro por status
    │   │   ├── SoftSkillsList.tsx      # Lista de soft skills
    │   │   ├── Navbar.tsx              # Navegação + toggle de tema
    │   │   └── Footer.tsx              # Rodapé com links sociais
    │   ├── context/
    │   │   └── ThemeContext.tsx        # Contexto de tema claro/escuro (persistido em localStorage)
    │   ├── services/                   # Camada de acesso à API (profile, goals, roadmap, contributions, softSkills, auth)
    │   ├── libs/                       # Constantes e utilitários
    │   ├── types/                      # Tipos TypeScript compartilhados
    │   └── index.css                   # Variáveis de tema (light/dark) e estilos globais
    └── index.html
```

---

## Endpoints da API

Todos os recursos seguem o mesmo padrão: **leitura pública** (`GET`) e **escrita protegida** (`POST`/`PUT`/`DELETE` exigem JWT via `[Authorize]`).

| Recurso | Rota base | Leitura | Escrita |
|---------|-----------|---------|---------|
| Perfil | `/api/profile` | `GET`, `GET /{id}` | `PUT /{id}` 🔒 |
| Metas | `/api/goals` | `GET`, `GET /{id}` | `POST` · `PUT /{id}` · `DELETE /{id}` 🔒 |
| Roadmap | `/api/roadmap` | `GET`, `GET /{id}` | `POST` · `PUT /{id}` · `DELETE /{id}` 🔒 |
| Contribuições | `/api/contributions` | `GET`, `GET /{id}` | `POST` · `PUT /{id}` · `DELETE /{id}` 🔒 |
| Soft skills | `/api/softskills` | `GET`, `GET /{id}` | `POST` · `PUT /{id}` · `DELETE /{id}` 🔒 |
| Autenticação | `/api/auth/login` | — | `POST` (rate limit: 5/min) |

🔒 = requer token JWT (`Authorization: Bearer <token>`), obtido via `/api/auth/login`.

---

## Funcionalidades

**Perfil**
- Header com avatar, nome, cargo, subtítulo, bio e badge do período do PDI
- Tags de stack técnica atual
- Links para GitHub e LinkedIn
- Painel com empresa, área, tempo decorrido e tempo restante do PDI, com barra de progresso
- "Cartão de código" ilustrativo (estilo editor) exibindo os dados do perfil como uma classe C#

**Metas de Carreira**
- Listagem com filtro por status (planejado, em progresso, concluído)
- Categoria, prioridade e barra de progresso por meta
- Prazo alvo opcional

**Roadmap de Tecnologias**
- Tecnologias organizadas por categoria e status (planejado, em progresso, concluído)
- Ordenação customizável

**Contribuições**
- Listagem com filtro por status (em progresso, concluído)
- Categoria, tags, impactos e link externo opcional por contribuição

**Soft Skills**
- Listagem com status (praticando ou desenvolvendo)
- Ordenação customizável

**Tema**
- Alternância entre modo claro e escuro, persistida entre sessões

**Área Administrativa**
- Login protegido por senha (hash BCrypt) com emissão de JWT válido por 8 horas
- Rate limiting no login (5 tentativas por minuto) contra força bruta
- Gestão de dados via Swagger enquanto o painel admin no front não é implementado

---

## Pré-requisitos

- **.NET 9 SDK** — [download](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Node.js** 20+ e npm
- **SQL Server** ou **SQL Server Express LocalDB**
- Variável de ambiente do front (`client/.env`): `VITE_API_URL` apontando para a URL da API

---

## Observações Importantes

- **Banco de dados:** o schema é criado/atualizado via `dotnet ef database update` a partir das migrations em `PedroviskCareerPath.API/Migrations`.
- **Autenticação:** apenas rotas de escrita (`POST`/`PUT`/`DELETE`) exigem token; toda leitura é pública, já que o objetivo do site é ser uma vitrine pública do PDI.
- **CORS:** liberado apenas para a origem do front em desenvolvimento (`http://localhost:5173`); ajustar a policy em `Program.cs` ao publicar em produção.
- **Painel admin no front:** ainda não implementado — a gestão de conteúdo (metas, roadmap, contribuições, soft skills) é feita via Swagger com o token JWT obtido no login.
- **Hospedagem:** API pensada para Azure App Service e front para Cloudflare Pages ou Vercel; ainda não publicado.
- **Projeto pessoal:** desenvolvido para acompanhar meu próprio plano de desenvolvimento como Software Engineer .NET, com novas implementações contínuas.
