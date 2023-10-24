import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCompanyInformationQuery } from "../../../features/companySlice/companyApi";
import { useGetAllApplicationsQuery } from "../../../features/jobApplications/jobApplicationsApi";
import Applicant from "../Applicants/Applicant";
import styles from "../Applicants/Applicants.module.css";

export default function AllApplications() {
  const [userNameSearch, setUserNameSearch] = useState("");
  const { user } = useSelector((state) => state.authSlice);
  // Getting the company ID
  const { data: companyInfo, isLoading: companyInfoloading } =
    useGetCompanyInformationQuery(
      { companyId: user?.companyId },
      {
        skip: !user?.companyId,
      }
    );

  const {
    data: getAllApplicantions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllApplicationsQuery(
    { companyId: user?.companyId },
    {
      skip: !user?.companyId,
    }
  );
  let content;
  if (isLoading) {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isLoading && !isError && getAllApplicantions?.applications.length > 0) {
    content = (
      <div className={styles.AllApplicationsWrapper}>
        <div className={styles.jobApplicantsHeader}>
          <div>
            <h1 className={styles.totalApplicantsCount}>
              Total Applicants :{" "}
              {getAllApplicantions?.applications.length > 9
                ? getAllApplicantions?.applications.length
                : `0${getAllApplicantions?.applications.length}`}
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
              {getAllApplicantions?.applications
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

  return <div className="container">{content}</div>;
}
