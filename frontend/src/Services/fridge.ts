// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const URL: string = "http://127.0.0.1:5000/"

// Define a service using a base URL and expected endpoints
export const fridgeApi = createApi({
  reducerPath: 'fridgeApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Fridge'],
  endpoints: (builder) => ({
    getFridgeData: builder.query<any, string>({
      query: (name) => `getuser?username=${name}`,
      providesTags: ['Fridge']
    }),
    updateUserFridge: builder.mutation<any, Record<string, any>>({
      query: (items) => ({
        url: 'addfridge',
        method: 'POST',
        body: {
          "username": items.username,
          "newItems": items.newItems
        },
      }),
      invalidatesTags: ['Fridge']
    }),
    replaceUserFridge: builder.mutation<any, Record<string, any>>({
      query: (items) => ({
        url:'replacefridge',
        method: 'POST',
        body: {
          "username": items.username,
          "newFridge": items.newFridge
        },
      }),
      invalidatesTags: ['Fridge']
    }),
  }),
})


export const { useGetFridgeDataQuery, useUpdateUserFridgeMutation, useReplaceUserFridgeMutation } = fridgeApi