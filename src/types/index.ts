/* Auth */
export interface User {
  id: string
  name: string
  email: string
  phone: string
  store_name: string
  store_link: string
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  phone: string
  store_name: string
  store_link: string
}

/* Plans */
export interface Plan {
  id: string
  user_id: string
  name: string
  slug: string
  description: string
  price: number
  billing_cycle: string
  image?: string // base64
  active: boolean
  created_at: string
  updated_at: string
}

export interface CreatePlanRequest {
  name: string
  slug: string
  description?: string
  price: number
  billing_cycle: string
  image?: string // base64
  active?: boolean
}

export interface UpdatePlanRequest {
  name?: string
  slug?: string
  description?: string
  price?: number
  billing_cycle?: string
  image?: string // base64 or null to keep existing, empty string to clear
  active?: boolean
}

/* Subscribers */
export interface Subscriber {
  id: string
  user_id: string
  name: string
  email?: string
  phone?: string
  created_at: string
}

export interface CreateSubscriberRequest {
  name: string
  email?: string
  phone?: string
}

export interface UpdateSubscriberRequest {
  name?: string
  email?: string
  phone?: string
}

/* Subscriptions */
export interface Subscription {
  id: string
  user_id: string
  subscriber_id: string
  plan_id: string
  start_date: string
  next_billing_date?: string
  cancelled_at?: string
  status: 'active' | 'cancelled' | 'pending'
  created_at: string
}

export interface CreateSubscriptionRequest {
  subscriber_id: string
  plan_id: string
  start_date: string
  next_billing_date?: string
}

export interface UpdateSubscriptionRequest {
  status?: string
}

export interface CancelSubscriptionRequest {
  reason?: string
}

/* Payments */
export interface Payment {
  id: string
  subscription_id: string
  amount: number
  status: 'paid' | 'pending' | 'failed' | 'refunded'
  gateway_transaction_id?: string
  paid_at?: string
  created_at: string
}

export interface CreatePaymentRequest {
  subscription_id: string
  amount: number
  gateway_transaction_id?: string
}

export interface UpdatePaymentRequest {
  status: 'paid' | 'pending' | 'failed' | 'refunded'
}

/* Store (Public) */
export interface StoreInfo {
  id: string
  name: string
  email: string
  phone?: string
  store_link: string
  store_name: string
  created_at: string
}

export interface StorePlan {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  billing_cycle: string
  image?: string // base64
}

export interface StorePlansResponse {
  store: string
  plans: StorePlan[]
}

/* API Responses */
export interface ErrorResponse {
  error: string
}

export interface ListResponse<T> {
  items: T[]
  total: number
}
