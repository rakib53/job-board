import { apiSlice } from "../api/api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyInformation: builder.query({
      query: ({ companyId }) => ({
        url: `api/getCompanyInformation/${companyId}`,
      }),
    }),
  }),
});

export const { useGetCompanyInformationQuery } = authApi;
