import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetJobsQuery } from "../../features/jobSlice/jobApi";
import FilteringJob from "../FilteringJob/FilteringJob";
import JobCard from "../JobCard/JobCard";
import ArrowLeftIcon from "../SVG/JobFinding/ArrowLeftIcon";
import ArrowRightIcon from "../SVG/JobFinding/ArrowRightIcon";
import styles from "./FilterAndJob.module.css";

export default function FilterAndJob() {
  const [page, setPage] = useState(1);
  const [isInJobContent, setIsInJobContent] = useState(false);
  const { jobTitle, jobLocation } = useSelector(
    (state) => state.searchInputSlice
  );
  const { user } = useSelector((state) => state.authSlice);
  const [searchQuery, setSearchQuery] = useState({
    experience: "",
    salary: { salaryMin: "", salaryMax: "" },
    workLocation: "",
    jobType: "",
  });
  // React router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // go to apply job page or others route function
  const handleJobApply = (jobId) => {
    if (!user?._id) {
      return navigate(`/sign-up`, {
        replace: true,
        state: { ...location, jobId },
      });
    } else if (user?._id && user?.accountCompeletation === 30) {
      return navigate(`/personal-info`, {
        replace: true,
        state: { ...location, jobId },
      });
    } else if (user?._id && user?.accountCompeletation === 70) {
      return navigate(`/preference`, {
        replace: true,
        state: { ...location, jobId },
      });
    } else if (user?._id && user?.accountCompeletation === 100) {
      return navigate(`/applciation/form/${jobId}`, {
        replace: true,
        state: { ...location, jobId },
      });
    }
  };

  // Searching all job query
  const {
    data: allTheJobs,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useGetJobsQuery({
    page,
    jobTitle: jobTitle,
    location: jobLocation,
    jobType: searchQuery?.jobType,
    workLocation: searchQuery?.workLocation,
    salary: searchQuery.salary,
    experience: searchQuery?.experience,
  });

  let content;

  if (isError) {
    content = (
      <h1 style={{ color: "red", fontSize: "18px" }}>Something went wrong!</h1>
    );
  }

  if (isLoading) {
    content = (
      <div className={styles.loaderWrapper}>
        <div className="contentLoader"></div>
      </div>
    );
  }

  if (!isLoading && !isError && allTheJobs?.jobs?.length > 0) {
    content = allTheJobs?.jobs?.map((job) => {
      return (
        <JobCard key={job._id} jobInfo={job} handleJobApply={handleJobApply} />
      );
    });
  }

  if (!isLoading && !isError && allTheJobs?.jobs?.length === 0) {
    content = <div>No Job Found at this moment!</div>;
  }

  useEffect(() => {
    refetch();
    setPage(1);
  }, [searchQuery, jobTitle, location]);

  return (
    <div className={styles.filterAndJobBodyWrapper}>
      <div className="container">
        <div className={styles.filterAndJobWrapper}>
          <div className={styles.filteringJob}>
            <FilteringJob
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className={styles.allJobInfo}>
            <div className={styles.allJobInfoHeader}>
              <div>
                <h2 className={styles.allJobText}>
                  {jobTitle ? jobTitle : "All"} Job
                </h2>
                <p className={styles.showIngJobText}>
                  Total {allTheJobs?.totalJob} job found
                </p>
              </div>
              <div className={styles.sortByWrapper}>
                <label htmlFor="cars" className={styles.sortBy}>
                  Sort by:
                </label>

                <select name="cars" id="cars" className={styles.sortByValue}>
                  <option
                    value="Most relevant"
                    className={styles.sortOptionValue}
                  >
                    Most relevant
                  </option>
                </select>
              </div>
            </div>

            <div className={styles.allJobContainer} id="job-content">
              {content}
            </div>

            {allTheJobs?.jobs?.length > 0 && (
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
                  className={`${
                    !allTheJobs?.hasNextPage && styles.disabledBtn
                  }`}
                  onClick={() => {
                    if (allTheJobs?.hasNextPage) {
                      setPage(allTheJobs?.currentPage + 1);
                    }
                  }}
                >
                  <ArrowRightIcon />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
