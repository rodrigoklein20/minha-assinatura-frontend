# Plataforma de Assinaturas de Serviços

## Visão Geral

A plataforma tem como objetivo permitir que profissionais autônomos comercializem serviços recorrentes através de assinaturas.

O foco é oferecer uma solução extremamente simples para profissionais que desejam cobrar mensalidades de seus clientes sem precisar utilizar plataformas complexas de e-commerce.

O sistema deve funcionar como uma combinação de:

* Página pública personalizada
* Gestão de assinaturas
* Controle de clientes
* Controle de pagamentos

---

# Público-Alvo

A primeira versão será focada em:

* Personal Trainers
* Professores particulares
* Mentores
* Consultores
* Nutricionistas
* Coaches
* Instrutores
* Prestadores de serviços recorrentes

---

# Exemplo de Uso

O profissional cria sua conta:

```text
Nome: Rodrigo Personal
```

A plataforma gera:

```text
https://app.com/rodrigo-personal
```

O cliente acessa:

```text
https://app.com/rodrigo-personal
```

Visualiza os planos disponíveis:

```text
Consultoria Mensal
R$99/mês

Consultoria Premium
R$199/mês
```

Seleciona um plano, realiza o pagamento e sua assinatura é criada.

---

# Estrutura Inicial do Banco

## Users

Representa o profissional dono da página.

Campos principais:

* id
* name
* email
* password_hash
* phone
* store_name
* store_link

Exemplo:

```text
store_link = rodrigo-personal
```

URL pública:

```text
https://app.com/rodrigo-personal
```

---

```text
Profissional
    ↓
Cria conta
    ↓
Cria plano
    ↓
Compartilha link da página
    ↓
Cliente acessa
    ↓
Seleciona plano
    ↓
Realiza pagamento
    ↓
Assinatura criada
    ↓
Pagamentos registrados
```

---

# MVP

A primeira versão deverá permitir:

* Cadastro de profissionais.
* Login de profissionais.
* Criação de planos.
* Edição de planos.
* Ativação e desativação de planos.
* Página pública da loja.
* Contratação de planos.
* Gestão de assinantes.
* Gestão de assinaturas.
* Registro de pagamentos.