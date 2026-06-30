import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import type { Subscriber, CreateSubscriberRequest, UpdateSubscriberRequest } from '../types'

export const subscribersApi = createApi({
  reducerPath: 'subscribersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Subscribers'],
  endpoints: (builder) => ({
    getSubscribers: builder.query<Subscriber[], void>({
      query: () => '/api/v1/subscribers',
      providesTags: ['Subscribers'],
    }),
    getSubscriber: builder.query<Subscriber, string>({
      query: (id) => `/api/v1/subscribers/${id}`,
      providesTags: ['Subscribers'],
    }),
    createSubscriber: builder.mutation<Subscriber, CreateSubscriberRequest>({
      query: (data) => ({
        url: '/api/v1/subscribers',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Subscribers'],
    }),
    updateSubscriber: builder.mutation<Subscriber, { id: string; data: UpdateSubscriberRequest }>({
      query: ({ id, data }) => ({
        url: `/api/v1/subscribers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Subscribers'],
    }),
    deleteSubscriber: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/subscribers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscribers'],
    }),
  }),
})

export const {
  useGetSubscribersQuery,
  useGetSubscriberQuery,
  useCreateSubscriberMutation,
  useUpdateSubscriberMutation,
  useDeleteSubscriberMutation,
} = subscribersApi
