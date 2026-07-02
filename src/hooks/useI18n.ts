import { translations } from '@i18n/translations'

/**
 * Hook para acessar traduções com type-safety
 * @example
 * const t = useI18n()
 * t('auth.login.title') // "Minha Assinatura"
 */
export function useI18n() {
  const t = (key: string): string => {
    // Percorre a estrutura aninhada usando a chave com pontos
    // Ex: "auth.login.title" → translations.auth.login.title
    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      value = value?.[k]
    }

    // Se não encontrar a chave, retorna a chave mesmo como fallback
    return typeof value === 'string' ? value : key
  }

  return t
}
