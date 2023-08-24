import { apiSlice } from "../api/api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (page) => ({
        url: `api/getJobs?page=${page}`,
      }),
      providesTags: ["getJobs"],
    }),
    getJob: builder.query({
      query: ({ jobId }) => ({
        url: `api/getJobs/${jobId}`,
      }),
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: `api/jobs/${jobId}`,
        method: "DELETE",
      }),
    }),
    createJob: builder.mutation({
      query: (data) => {
        return {
          url: "api/createJob",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getJobs"],
    }),
    getEmployeerJobList: builder.query({
      query: ({ companyId }) => ({
        url: `api/getEmployeerJobList/${companyId}`,
      }),
      providesTags: ["getJobs"],
    }),
    postJobApplication: builder.mutation({
      query: (data) => {
        return {
          url: "api/postJobApplication",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["getJobApplications"],
    }),
    getUserApplications: builder.query({
      query: ({ userId }) => ({
        url: `api/getJobApplications/${userId}`,
      }),
      providesTags: ["getJobApplications"],
    }),
    getApplication: builder.query({
      query: ({ applicationId }) => ({
        url: `api/getApplication/${applicationId}`,
      }),
    }),
    getApplicants: builder.query({
      query: ({ jobId }) => ({
        url: `api/getApplicants/${jobId}`,
      }),
    }),
    postSavedJob: builder.mutation({
      query: (data) => ({
        url: `api/postSavedJob/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["savedJob"],
    }),
    getSavedJob: builder.query({
      query: ({ userId, jobId }) => ({
        url: `api/getSavedJob/${userId}/${jobId}`,
      }),
      providesTags: ["savedJob"],
    }),
    getSavedJobs: builder.query({
      query: ({ userId }) => ({
        url: `api/getSavedJobs/${userId}`,
      }),
      providesTags: ["savedJob"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useGetEmployeerJobListQuery,
  useGetJobQuery,
  useDeleteJobMutation,
  usePostJobApplicationMutation,
  useGetUserApplicationsQuery,
  useGetApplicationQuery,
  useGetApplicantsQuery,
  useGetSavedJobQuery,
  usePostSavedJobMutation,
  useGetSavedJobsQuery,
} = authApi;
