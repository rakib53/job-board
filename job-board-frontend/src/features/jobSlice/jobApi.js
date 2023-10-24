import { apiSlice } from "../api/api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({
        page,
        jobTitle,
        location,
        jobType,
        workLocation,
        salary,
        experience,
      }) => ({
        url: `api/getJobs?page=${page}&jobTitle=${jobTitle}&location=${location}&jobType=${jobType}&workLocation=${workLocation}&salaryMin=${salary?.salaryMin}&salaryMax=${salary?.salaryMax}&experience=${experience}`,
      }),
      keepUnusedDataFor: 600,
      providesTags: ["getJobs"],
    }),
    getJob: builder.query({
      query: ({ jobId }) => ({
        url: `api/getJobs/${jobId}`,
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "getJob", id: arg }];
      },
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
    editJob: builder.mutation({
      query: (data) => {
        return {
          url: `api/editJob/${data?.jobId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return ["getJobs", { type: "getJob", id: arg?.data?.jobId }];
      },
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
  useEditJobMutation,
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
