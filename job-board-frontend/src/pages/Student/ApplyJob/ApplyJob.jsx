import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetJobQuery,
  usePostJobApplicationMutation,
} from "../../../features/jobSlice/jobApi";
import styles from "./ApplyJob.module.css";

export default function ApplyJob() {
  const [coverLetter, setCoverLetter] = useState({
    coverLetter: "",
    error: false,
  });
  const [jobDutyAgreeMent, setJobDutyAgreement] = useState("");

  const { jobId } = useParams();
  // User data
  const { user } = useSelector((state) => state.authSlice);

  const {
    data: jobDetails,
    isError,
    isLoading,
    error,
  } = useGetJobQuery({ jobId: jobId });

  // Post application state
  const [postJobApplication, { data: postJobApplicationResponse, isSuccess }] =
    usePostJobApplicationMutation();

  const handleJobApply = () => {
    try {
      if (coverLetter?.coverLetter?.length <= 250) {
        setCoverLetter({ ...coverLetter, error: true });
        return;
      } else {
        const application = {
          userId: user?._id,
          jobId: jobDetails?.jobDetails?._id,
          companyId: jobDetails?.jobDetails?.company?._id,
          coverLetter: coverLetter?.coverLetter,
          jobTerms: jobDutyAgreeMent,
        };

        if (application?.userId && application?.jobId) {
          postJobApplication(application);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(postJobApplicationResponse);

  return (
    <div className="container">
      <div className={styles.applyJobWrraper}>
        <h1 className={styles.jobTitle}>
          {jobDetails?.jobDetails?.jobTitle} job at{" "}
          {jobDetails?.jobDetails?.company?.companyName}
        </h1>

        <div>
          <h4 className={styles.aboutTheJob}>About the job</h4>
          <p className={styles.jobDescription}>
            {jobDetails?.jobDetails?.description}
          </p>
        </div>
        {/* Apply Job Form  */}
        <div>
          <h3>Submit Your Application</h3>
        </div>
        <h2 className={styles.coverLetterText}>Cover letter</h2>
        <p className={styles.assessmentQuestion}>
          Why should you be hired for this role?
        </p>
        <form action="">
          <textarea
            className={`${styles.coverLetterInput} ${
              coverLetter?.error && "errorInput"
            }`}
            name=""
            id=""
            cols="30"
            rows="10"
            value={coverLetter?.coverLetter}
            onChange={(e) =>
              setCoverLetter({ ...coverLetter, coverLetter: e.target.value })
            }
          ></textarea>
        </form>

        <div>
          <h3 className={styles.avalibility}>Your availability</h3>
          <p className={styles.confirmYouravalibility}>
            Confirm your availability
          </p>
          <div className={styles.avalibilityInput}>
            <input
              type="radio"
              name="jobDetailsTerm"
              className="secondary-custom-checkbox"
              id="agree"
              value={"agree"}
              checked={jobDutyAgreeMent === "agree"}
              onChange={(e) => setJobDutyAgreement(e.target.value)}
            />
            <label htmlFor="agree">
              Yes, I am available for{" "}
              {jobDetails?.jobDetails?.jobType.includes("InHouseJob")
                ? `In-house`
                : `work from home`}{" "}
              job, start within {jobDetails?.jobDetails?.applyEndDate}
            </label>

            <input
              type="radio"
              className="secondary-custom-checkbox"
              id="agreeWithCondition"
              name="jobDetailsTerm"
              value={"agreeWithCondition"}
              checked={jobDutyAgreeMent === "agreeWithCondition"}
              onChange={(e) => setJobDutyAgreement(e.target.value)}
            />
            <label htmlFor="agreeWithCondition">
              No (Please specify your availability)
            </label>
          </div>
        </div>
        <div className={styles.termsAndCondition}>
          <input
            type="checkbox"
            id="termsAndCondition"
            className="secondary-custom-checkbox"
          />
          <label htmlFor="termsAndCondition">
            I agree with terms & conditions
          </label>
        </div>
        <div onClick={() => handleJobApply()}>
          <button className={`primaryBtn ${styles.submitApplication}`}>
            Submit application
          </button>
        </div>
      </div>
    </div>
  );
}
