import { baseApi } from "./api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/Account/Register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/Account/Authenticate",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyaccount: builder.mutation({
      query: (credentials) => ({
        url: "/Account/ConfirmActivationCode",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useVerifyaccountMutation } = authApi;