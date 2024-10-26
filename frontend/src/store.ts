import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { fridgeApi } from './Services/fridge'
import { recipeApi } from './Services/recipes'
import userSlice from './Services/userSlice'
export const store = configureStore({
  reducer: {
    [fridgeApi.reducerPath]: fridgeApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    user: userSlice.reducer,
  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([fridgeApi.middleware, recipeApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
