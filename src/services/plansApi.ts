import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseApi'
import type { Plan, CreatePlanRequest, UpdatePlanRequest } from '../types'

export const plansApi = createApi({
  reducerPath: 'plansApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Plans'],
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], void>({
      query: () => '/api/v1/plans',
      transformResponse: (response: { data: Plan[] }) => response.data,
      providesTags: ['Plans'],
    }),
    getPlan: builder.query<Plan, string>({
      query: (id) => `/api/v1/plans/${id}`,
      transformResponse: (response: { data: Plan }) => response.data,
      providesTags: ['Plans'],
    }),
    createPlan: builder.mutation<Plan, CreatePlanRequest>({
      query: (data) => ({
        url: '/api/v1/plans',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: { data: Plan }) => response.data,
      invalidatesTags: ['Plans'],
    }),
    updatePlan: builder.mutation<Plan, { id: string; data: UpdatePlanRequest }>({
      query: ({ id, data }) => ({
        url: `/api/v1/plans/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { data: Plan }) => response.data,
      invalidatesTags: ['Plans'],
    }),
    deletePlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plans'],
    }),
  }),
})

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApi
