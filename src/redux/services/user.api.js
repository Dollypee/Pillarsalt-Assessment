import { baseApi } from "./api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.mutation({
      query: () => ({
        url: "/User/Profile",
        method: "GET",
      }),
    }),
  })
});

export const { useUserProfileMutation } = userApi;