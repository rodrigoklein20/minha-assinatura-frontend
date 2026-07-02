# API Contract Skill

## Objetivo

Esta skill define os padrões para consumo das APIs do backend neste projeto frontend.

O arquivo `openapi.json` contém o contrato oficial da API.

Sempre consulte o arquivo openapi.json antes de:

- Criar novos services/hooks
- Implementar chamadas HTTP
- Criar tipos/interfaces
- Tratar respostas de erro
- Ajustar integrações existentes

## Regras gerais

### Requests

- Utilize os endpoints exatamente como definidos no OpenAPI.
- Respeite:
  - método HTTP
  - path
  - query params
  - path params
  - headers
  - body

### Responses

Nunca invente estruturas de resposta.

Utilize os schemas definidos no OpenAPI.

### Erros

Todas as APIs retornam erros seguindo o contrato:

{
  "errors": [
    {
      "code": "USER_NOT_FOUND",
      "message": "Usuário não encontrado",
      "field": "id"
    }
  ]
}

## Importante

Nunca trate erro como string simples.
Sempre utilize o array errors.
Mostre mensagens vindas do backend quando apropriado.

Sempre criar tipos baseados no schema OpenAPI.

## Ao revisar código 

Compare chamadas atuais com openapi.json.
Corrija endpoints incorretos.
Ajuste payloads.
Ajuste tipos.
Ajuste tratamento de erros.