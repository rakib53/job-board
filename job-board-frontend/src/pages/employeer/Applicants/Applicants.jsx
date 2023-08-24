import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicantsQuery } from "../../../features/jobSlice/jobApi";
import Applicant from "./Applicant";
import styles from "./Applicants.module.css";

export default function Applicants() {
  const [userNameSearch, setUserNameSearch] = useState("");
  const { jobId } = useParams();

  const {
    data: getApplicantsList,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetApplicantsQuery({ jobId: jobId });

  let content;

  if (isLoading) {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isLoading && !isError && getApplicantsList?.applicants.length > 0) {
    content = (
      <div>
        <div className={styles.jobApplicantsHeader}>
          <div>
            <h1 className={styles.totalApplicantsCount}>
              Total Applicants :{" "}
              {getApplicantsList?.applicants.length > 9
                ? getApplicantsList?.applicants.length
                : `0${getApplicantsList?.applicants.length}`}
            </h1>
          </div>
          <input
            className={styles.searchApplicantsInput}
            type="text"
            placeholder="Search applicants"
            value={userNameSearch}
            onChange={(e) => setUserNameSearch(e.target.value)}
          />
        </div>

        <div>
          <table className={styles.tableHeader} borderCollapse="collapse">
            <thead>
              <tr>
                <th>Full name</th>
                <th>Hiring stage</th>
                <th>Applied Date</th>
                <th>Job role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {getApplicantsList?.applicants
                ?.filter((applicant) => {
                  if (userNameSearch?.length > 0) {
                    return applicant.userId?.userName
                      ?.toLowerCase()
                      .includes(userNameSearch?.toLowerCase());
                  } else {
                    return applicant;
                  }
                })
                .map((applicant) => {
                  return <Applicant applicant={applicant} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!isLoading && !isError && getApplicantsList?.applicants.length === 0) {
    content = (
      <div className={styles.noApplicationFoundWrapper}>
        <h1>No Application founds!</h1>
      </div>
    );
  }

  return <div className="container">{content}</div>;
}
