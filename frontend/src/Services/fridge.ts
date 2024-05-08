// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const URL: string = "http://127.0.0.1:5000/"

// Define a service using a base URL and expected endpoints
export const fridgeApi = createApi({
  reducerPath: 'fridgeApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `getuser/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = fridgeApi