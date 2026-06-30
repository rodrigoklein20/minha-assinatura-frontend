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
      providesTags: ['Payments'],
    }),
    getPayment: builder.query<Payment, string>({
      query: (id) => `/api/v1/payments/${id}`,
      providesTags: ['Payments'],
    }),
    createPayment: builder.mutation<Payment, CreatePaymentRequest>({
      query: (data) => ({
        url: '/api/v1/payments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payments'],
    }),
    updatePayment: builder.mutation<Payment, { id: string; data: UpdatePaymentRequest }>({
      query: ({ id, data }) => ({
        url: `/api/v1/payments/${id}`,
        method: 'PUT',
        body: data,
      }),
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
