export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const BILLING_CYCLES = {
  monthly: 'Mensal',
  quarterly: 'Trimestral',
  semi_annual: 'Semestral',
  annual: 'Anual',
}

export const SUBSCRIPTION_STATUS = {
  active: 'Ativa',
  cancelled: 'Cancelada',
  pending: 'Pendente',
}

export const PAYMENT_STATUS = {
  paid: 'Pago',
  pending: 'Pendente',
  failed: 'Falhou',
  refunded: 'Reembolsado',
}

export const AUTH_TOKEN_KEY = 'auth_token'
export const AUTH_USER_KEY = 'auth_user'
