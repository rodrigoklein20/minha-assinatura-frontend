import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import type { Payment, CreatePaymentRequest, UpdatePaymentRequest } from '../types'

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    getPayments: builder.query<Payment[], string>({
      query: (subscriptionId) => `/api/v1/subscriptions/${subscriptionId}/payments`,
      transformResponse: (response: { data: Payment[] }) => response.data,
      providesTags: ['Payments'],
    }),
    getPayment: builder.query<Payment, string>({
      query: (id) => `/api/v1/payments/${id}`,
      transformResponse: (response: { data: Payment }) => response.data,
      providesTags: ['Payments'],
    }),
    createPayment: builder.mutation<Payment, CreatePaymentRequest>({
      query: (data) => ({
        url: '/api/v1/payments',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: Payment }) => response.data,
      invalidatesTags: ['Payments'],
    }),
    updatePayment: builder.mutation<Payment, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/api/v1/payments/${id}?status=${status}`,
        method: 'PUT',
      }),
      transformResponse: (response: { data: Payment }) => response.data,
      invalidatesTags: ['Payments'],
    }),
  }),
})

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
} = paymentsApi
