import { baseApi } from "./api";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserWallet: builder.mutation({
      query: () => ({
        url: "/Wallet/MyWallet",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserWalletMutation } = walletApi;