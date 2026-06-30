# Minha Assinatura - Frontend

Frontend React + TypeScript para a plataforma de gerenciamento de assinaturas de serviços.

## 🚀 Início Rápido

### Requisitos
- Node.js >= 16
- npm ou yarn

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação será aberta em `http://localhost:5173`

### Build

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Redux store e configuração
├── components/             # Componentes comuns (Header, Modal, etc.)
├── features/               # Features por domínio
│   ├── auth/              # Autenticação (Login, Signup)
│   ├── dashboard/         # Dashboard do profissional
│   ├── store/             # Loja pública (vitrine e checkout)
│   └── common/            # Páginas comuns (404, etc.)
├── hooks/                  # Custom hooks (useAuth, useNotification)
├── services/               # RTK Query slices (APIs)
├── types/                  # TypeScript types globais
├── utils/                  # Utilitários (constantes, validators)
├── App.tsx                 # Router principal
└── main.tsx                # Entry point
```

## 🔧 Variáveis de Ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

E configure a URL da API backend:

```
VITE_API_URL=http://localhost:3000
```

## 🎯 Features Implementadas

### Autenticação
- ✅ Login com email e senha
- ✅ Cadastro de novo profissional
- ✅ Persistência de token JWT
- ✅ Redirecionamento automático para login se token expirar

### Dashboard (Protegido)
- ✅ Home com resumo de métricas
- ✅ Gestão de Planos (CRUD com imagens base64)
- ✅ Gestão de Assinantes (CRUD)
- ✅ Gestão de Assinaturas (criar, listar, cancelar)
- ✅ Gestão de Pagamentos (registrar, atualizar status)

### Loja Pública
- ✅ Vitrine de planos (listagem pública sem autenticação)
- ✅ Checkout com formulário de assinante
- ✅ Criação automática de subscriber + subscription

### UX
- ✅ Notificações toast (sucesso, erro, info)
- ✅ Loading spinners
- ✅ Modals para formulários
- ✅ Tratamento de erros com feedback do usuário

## 🏗️ Stack Tecnológico

- **Build**: Vite
- **Framework**: React 18
- **Linguagem**: TypeScript
- **State Management**: Redux Toolkit
- **Data Fetching**: RTK Query
- **Routing**: React Router v6
- **Styling**: Tailwind CSS

## 📋 Fluxos Principais

### Fluxo de Autenticação
1. Usuário acessa `/auth/login` ou `/auth/signup`
2. Credenciais são validadas contra o backend
3. Token JWT é armazenado em localStorage
4. Usuário é redirecionado para `/dashboard`
5. Header mostra informações do profissional com opção de logout

### Fluxo de Gerenciamento de Planos
1. Profissional acessa `/dashboard/plans`
2. Lista de planos é carregada via RTK Query
3. Pode criar novo plano (form em modal)
4. Pode editar plano (pre-preenchido)
5. Pode deletar plano
6. Pode toggle ativo/inativo

### Fluxo de Checkout
1. Cliente acessa `/store/{store_link}`
2. Vê lista de planos ativos (publicamente)
3. Clica em "Contratar" e vai para `/store/{store_link}/checkout/{plan_id}`
4. Preenche dados pessoais (name, email, phone)
5. Sistema cria subscriber + subscription automaticamente
6. Cliente retorna para vitrine com sucesso

## 🔗 Integração com Backend

### Endpoints Utilizados

**Auth**
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/users` - Signup

**Planos**
- `GET /api/v1/plans` - Listar planos do profissional
- `POST /api/v1/plans` - Criar plano
- `PUT /api/v1/plans/{id}` - Editar plano
- `DELETE /api/v1/plans/{id}` - Deletar plano

**Assinantes**
- `GET /api/v1/subscribers` - Listar assinantes
- `POST /api/v1/subscribers` - Criar assinante
- `PUT /api/v1/subscribers/{id}` - Editar assinante
- `DELETE /api/v1/subscribers/{id}` - Deletar assinante

**Assinaturas**
- `GET /api/v1/subscriptions` - Listar assinaturas
- `POST /api/v1/subscriptions` - Criar assinatura
- `POST /api/v1/subscriptions/{id}/cancel` - Cancelar assinatura

**Pagamentos**
- `GET /api/v1/subscriptions/{id}/payments` - Listar pagamentos
- `POST /api/v1/payments` - Registrar pagamento
- `PUT /api/v1/payments/{id}` - Atualizar status pagamento

**Store (Público)**
- `GET /api/v1/store/{store_link}` - Info loja
- `GET /api/v1/store/{store_link}/plans` - Planos públicos

## 🧪 Testing

Para testar o fluxo completo localmente:

1. Certifique-se de que o backend está rodando em `http://localhost:3000`
2. Execute `npm run dev`
3. Crie uma conta em `/auth/signup`
4. Crie alguns planos em `/dashboard/plans`
5. Crie assinantes em `/dashboard/subscribers`
6. Crie assinaturas em `/dashboard/subscriptions`
7. Registre pagamentos em `/dashboard/payments`
8. Acesse `/store/{seu-store-link}` para ver a vitrine pública

## 📝 Notas de Desenvolvimento

- RTK Query gerencia cache e invalidação de tags automaticamente
- Tokens JWT são automaticamente adicionados em headers via `baseQueryWithReauth`
- Erro 401 redireciona para login automaticamente
- localStorage é usado para persistência de token e user
- Imagens são convertidas para base64 para upload

## 🚀 Deploy

Para produção:

```bash
npm run build
```

Isso gera arquivos otimizados em `dist/`. Faça deploy dessa pasta para seu servidor web.

## 📄 Licença

Este projeto é propriedade de Minha Assinatura.
