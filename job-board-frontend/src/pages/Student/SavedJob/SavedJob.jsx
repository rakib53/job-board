import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../../components/JobCard/JobCard";
import LoadinSVG from "../../../components/Loading/LoadinSVG";
import { useGetSavedJobsQuery } from "../../../features/jobSlice/jobApi";
import styles from "./SavedJob.module.css";

export default function SavedJob() {
  const { user } = useSelector((state) => state.authSlice);
  const { data, isLoading, isError, error } = useGetSavedJobsQuery({
    userId: user?._id,
  });

  let content;

  if (isLoading) {
    content = (
      <div className="pageLoadingWrapper">
        <LoadinSVG />
      </div>
    );
  }

  if (!isLoading && !isError && data?.jobs?.length > 0) {
    content = (
      <div className={styles.savedJobWrapper}>
        {data?.jobs?.map((job) => {
          return <JobCard key={job?._id} jobInfo={job?.jobDetails} />;
        })}
      </div>
    );
  }

  if (!isLoading && !isError && data?.jobs?.length === 0) {
    content = <div>No Saved job found!</div>;
  }

  console.log(data?.jobs);

  return (
    <div className="container">
      <div className={styles.savedJobPageWrapper}>
        <h2 className={styles.savedJobText}>Saved job</h2>
        {content}
      </div>
    </div>
  );
}
