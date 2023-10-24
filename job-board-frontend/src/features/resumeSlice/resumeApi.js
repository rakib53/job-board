import { apiSlice } from "../api/api";

export const resumeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editResumeInfo: builder.mutation({
      query: (data) => ({
        url: `api/editResumeInfo`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const { useEditResumeInfoMutation } = resumeApi;
