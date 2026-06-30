import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '@features/auth/authSlice'
import { authApi } from '@services/authApi'
import { plansApi } from '@services/plansApi'
import { subscribersApi } from '@services/subscribersApi'
import { subscriptionsApi } from '@services/subscriptionsApi'
import { paymentsApi } from '@services/paymentsApi'
import { storeApi } from '@services/storeApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [subscribersApi.reducerPath]: subscribersApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(plansApi.middleware)
      .concat(subscribersApi.middleware)
      .concat(subscriptionsApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(storeApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
