import { apiSlice } from "../api/api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "api/registration",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "api/login",
        method: "POST",
        body: data,
      }),
    }),
    getUserInfo: builder.query({
      query: () => "api/userInfo",
      providesTags: ["getUser"],
    }),
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "api/updateUserData",
        method: "PUT",
        body: data,
      }),
    }),
    addCompanay: builder.mutation({
      query: (data) => ({
        url: "api/addCompany",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useSignInMutation,
  useGetUserInfoQuery,
  useUpdateUserDataMutation,
  useAddCompanayMutation,
} = authApi;
