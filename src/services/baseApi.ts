import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query'
import type { RootState } from '@app/store'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState
    const hasToken = !!state.auth.token

    // Se há token e recebe 401, significa que o token expirou
    // Se NÃO há token, é erro durante login (INVALID_CREDENTIAL) - não deve redirecionar
    if (hasToken) {
      // Token expirado ou inválido
      localStorage.removeItem('auth_token')
      window.location.href = '/auth/login'
    }
  }

  return result
}
