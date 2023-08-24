import React, { useState } from "react";
import { useGetJobsQuery } from "../../features/jobSlice/jobApi";
import FilteringJob from "../FilteringJob/FilteringJob";
import JobCard from "../JobCard/JobCard";
import ArrowLeftIcon from "../SVG/JobFinding/ArrowLeftIcon";
import ArrowRightIcon from "../SVG/JobFinding/ArrowRightIcon";
import styles from "./FilterAndJob.module.css";

export default function FilterAndJob() {
  const [page, setPage] = useState(1);
  const { data: allTheJobs, isLoading, isError } = useGetJobsQuery(page);

  let content;

  if (isLoading) {
    content = <h1 style={{ color: "red" }}>Loading...</h1>;
  }

  if (isError) {
    content = (
      <h1 style={{ color: "red", fontSize: "18px" }}>Something went wrong!</h1>
    );
  }

  if (!isLoading && !isError && allTheJobs?.jobs?.length > 0) {
    content = allTheJobs?.jobs?.map((job) => {
      return <JobCard key={job._id} jobInfo={job} />;
    });
  }

  if (!isLoading && !isError && allTheJobs?.jobs?.length === 0) {
    content = <div>No Job Found at this moment!</div>;
  }

  console.log(allTheJobs);

  return (
    <div className="container">
      <div className={styles.filterAndJobWrapper}>
        <div className={styles.filteringJob}>
          <FilteringJob />
        </div>
        <div className={styles.allJobInfo}>
          <div className={styles.allJobInfoHeader}>
            <div>
              <h2 className={styles.allJobText}>All Job</h2>
              <p className={styles.showIngJobText}>
                Total {allTheJobs?.totalJob} job found
              </p>
            </div>
            <div className={styles.sortByWrapper}>
              <label htmlFor="cars" className={styles.sortBy}>
                Sort by:
              </label>

              <select name="cars" id="cars" className={styles.sortByValue}>
                <option value="Most relevant">Most relevant</option>
              </select>
            </div>
          </div>

          <div className={styles.allJobContainer}>{content}</div>
          <div className={styles.previousBtnAndNextBtnWrapper}>
            <span
              className={`${
                !allTheJobs?.hasPreviousPage && styles.disabledBtn
              }`}
              onClick={() => {
                if (allTheJobs?.hasPreviousPage) {
                  setPage(allTheJobs?.currentPage - 1);
                }
              }}
            >
              <ArrowLeftIcon />
            </span>

            {`${page}/${allTheJobs?.totalPages}`}

            <span
              className={`${!allTheJobs?.hasNextPage && styles.disabledBtn}`}
              onClick={() => {
                if (allTheJobs?.hasNextPage) {
                  setPage(allTheJobs?.currentPage + 1);
                }
              }}
            >
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
