import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadinSVG from "../../../components/Loading/LoadinSVG";
import { useGetUserApplicationsQuery } from "../../../features/jobSlice/jobApi";
import styles from "./MyApplications.module.css";

export default function MyApplications() {
  // getting the user data
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  // Making query for getting the application of a single user
  const {
    data: userApplications,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserApplicationsQuery({ userId: user?._id });

  const handleJobApplicationDetails = (applicationId) => {
    return navigate(`/my-applciation/details/${applicationId}`);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="pageLoadingWrapper">
        <LoadinSVG />
      </div>
    );
  }

  if (!isLoading && !isError && userApplications?.myApplicaitons?.length > 0) {
    content = (
      <div className={styles.myApplicationsPageWrapper}>
        <h1 className={styles.submittedApplicationText}>
          Submitted Applications
        </h1>
        <div className={styles.jobApplicaitonCardWrapper}>
          {userApplications?.myApplicaitons?.map((jobApplicaiton) => {
            const { jobId, companyId, coverLetter, companyName } =
              jobApplicaiton;

            return (
              <div
                key={jobApplicaiton?._id}
                className={styles.jobApplicaitonCard}
                onClick={() => handleJobApplicationDetails(jobApplicaiton?._id)}
              >
                <div>
                  <h1 className={styles.jobRole}>{jobId?.jobTitle}</h1>
                  <p className={styles.companyName}>{companyId?.companyName}</p>
                </div>
                <div className={styles.applyDate}>
                  <p className={styles.date}>Initiated Aug 22, 2023</p>
                  <span className={styles.dateAgo}>16 min ago</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (
    !isLoading &&
    !isError &&
    userApplications?.myApplicaitons?.length === 0
  ) {
    content = <h2>No Job applicaiton found!</h2>;
  }
  return <div className="container">{content}</div>;
}
