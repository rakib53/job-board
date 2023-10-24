import { apiSlice } from "../api/api";

export const jobApplicationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobsApplication: builder.query({
      query: ({ companyId }) => ({
        url: `api/getAllJobsApplication/${companyId}`,
      }),
      providesTags: ["getJobApplications"],
    }),
    getAllApplications: builder.query({
      query: ({ companyId }) => ({
        url: `api/getAllApplications/${companyId}`,
      }),
      providesTags: ["getJobApplications"],
    }),
    viewedJobApplication: builder.mutation({
      query: ({ applicationId }) => ({
        url: `api/viewedJobApplication/${applicationId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["getJobApplications"],
    }),
    countJobApplication: builder.mutation({
      query: ({ jobId }) => ({
        url: `api/countJobApplication/${jobId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useGetAllJobsApplicationQuery,
  useCountJobApplicationMutation,
  useViewedJobApplicationMutation,
} = jobApplicationsApi;
