/**
 * Validadores de formato de dados
 */

export const validators = {
  /**
   * Valida email com regex básico
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Valida telefone brasileiro (aceita vários formatos)
   * Aceita: 11999999999, (11) 99999-9999, +55 11 99999-9999, etc
   */
  isValidPhone: (phone: string): boolean => {
    if (!phone) return true // phone é opcional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/ // apenas dígitos, espaços, hífen, +, parênteses
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  },

  /**
   * Valida store_link: apenas letras, números, hífen e underscore
   */
  isValidStoreLink: (storeLink: string): boolean => {
    const storeLinkRegex = /^[a-zA-Z0-9_-]+$/
    return storeLinkRegex.test(storeLink)
  },

  /**
   * Valida força de senha (mínimo 6 caracteres)
   */
  isValidPassword: (password: string): boolean => {
    return password.length >= 6
  },
}

export default validators
