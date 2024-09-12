import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { fridgeApi } from './Services/fridge'
import { recipeApi } from './Services/recipes'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [fridgeApi.reducerPath]: fridgeApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fridgeApi.middleware, recipeApi.middleware])
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
