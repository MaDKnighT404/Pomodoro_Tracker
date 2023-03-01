import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rs-clone-server-ggzg.onrender.com',
  }),
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = usersApi;
