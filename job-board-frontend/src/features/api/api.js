import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-board-server-theta.vercel.app/", //http://localhost:5000/
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authSlice?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: [
    "getUser",
    "getJobs",
    "getJob",
    "EmployeerJobs",
    "savedJob",
    "getJobApplications",
  ],
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;

const statics = {
  jobAppliedReport: {
    totalJobApplied: 233,
    thisWeek: 223,
    previousWeek: 200,
    report: { sat: 23, sun: 25, mon: 54, tue: 21, wed: 98, thu: 24, fri: 34 },
  },
  jobViewsReport: {
    totalJobViews: 2032,
    thisWeek: 223,
    previousWeek: 200,
    report: { sat: 23, sun: 25, mon: 54, tue: 21, wed: 98, thu: 24, fri: 34 },
  },
};
