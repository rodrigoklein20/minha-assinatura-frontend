import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { StoreInfo, StorePlansResponse } from '../types'

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    getStore: builder.query<StoreInfo, string>({
      query: (storeLink) => `/api/v1/store/${storeLink}`,
    }),
    getStorePlans: builder.query<StorePlansResponse, string>({
      query: (storeLink) => `/api/v1/store/${storeLink}/plans`,
    }),
  }),
})

export const { useGetStoreQuery, useGetStorePlansQuery } = storeApi
