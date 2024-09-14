// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const URL: string = "http://127.0.0.1:5000/"

// Define a service using a base URL and expected endpoints
export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    // getFridgeData: builder.query<any, string>({
    //   query: (name) => `getuser?username=${name}`,
    // }),
    getNewRecipe: builder.mutation<any, string>({
      query: (items) => ({
        url: 'generateRecipe',
        method: 'POST',
        body: {
          "ingredients": items
        }
      })
    }),
    getAllRecipes: builder.query<any, any>({
      query: (items) => ({
        url: 'getrecipes',
        method: 'POST',
        body: {
          "ingredients": items
        }
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewRecipeMutation, useGetAllRecipesQuery } = recipeApi