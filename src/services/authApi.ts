import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import type { LoginRequest, LoginResponse, SignupRequest, User } from '../types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<{ data: LoginResponse }, LoginRequest>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<{ data: LoginResponse }, SignupRequest>({
      query: (data) => ({
        url: '/api/v1/users',
        method: 'POST',
        body: data,
      }),
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/api/v1/users/${id}`,
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/api/v1/users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi
