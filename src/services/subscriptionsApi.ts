import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import type {
  Subscription,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  CancelSubscriptionRequest,
} from '../types'

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Subscriptions'],
  endpoints: (builder) => ({
    getSubscriptions: builder.query<Subscription[], void>({
      query: () => '/api/v1/subscriptions',
      providesTags: ['Subscriptions'],
    }),
    getSubscription: builder.query<Subscription, string>({
      query: (id) => `/api/v1/subscriptions/${id}`,
      providesTags: ['Subscriptions'],
    }),
    createSubscription: builder.mutation<Subscription, CreateSubscriptionRequest>({
      query: (data) => ({
        url: '/api/v1/subscriptions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Subscriptions'],
    }),
    updateSubscription: builder.mutation<Subscription, { id: string; data: UpdateSubscriptionRequest }>({
      query: ({ id, data }) => ({
        url: `/api/v1/subscriptions/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Subscriptions'],
    }),
    cancelSubscription: builder.mutation<Subscription, { id: string; data: CancelSubscriptionRequest }>({
      query: ({ id, data }) => ({
        url: `/api/v1/subscriptions/${id}/cancel`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Subscriptions'],
    }),
  }),
})

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useCancelSubscriptionMutation,
} = subscriptionsApi
