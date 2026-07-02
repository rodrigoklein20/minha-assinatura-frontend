import { translations } from '@i18n/translations'

/**
 * Mapeia erros da API para mensagens amigáveis em português
 * Leva em conta tanto o HTTP status code quanto o code específico da API
 *
 * @example
 * try {
 *   await login({ email, password })
 * } catch (err) {
 *   const friendlyMessage = mapApiError(err)
 *   console.log(friendlyMessage) // "Email ou senha inválidos."
 * }
 */
export function mapApiError(error: any): string {
  // Se não há erro, retorna mensagem padrão
  if (!error) return translations.errors.DEFAULT

  // Extrai informações do erro - segue padrão: { errors: [{ code, message, field }] }
  const status = error.status
  const errors = error?.data?.errors
  const errorCode = errors?.[0]?.code
  const errorMessage = errors?.[0]?.message

  // Prioridade 1: Se há um code de erro específico da API, usa o mapeamento
  if (errorCode) {
    const mapped = (translations.errors as any)[errorCode]
    if (mapped) return mapped
  }

  // Prioridade 2: Se há uma mensagem em português do backend, retorna como está
  if (errorMessage) {
    return errorMessage
  }

  // Prioridade 3: Mapeia por status HTTP (converte para string)
  if (status) {
    const mapped = (translations.errors as any)[status.toString()]
    if (mapped) return mapped
  }

  // Fallback: mensagem genérica
  return translations.errors.DEFAULT
}
