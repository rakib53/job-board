import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetJobQuery,
  usePostJobApplicationMutation,
} from "../../../features/jobSlice/jobApi";
import styles from "./ApplyJob.module.css";
import SentenceDisplay from "./SentenceDisplay";

export default function ApplyJob() {
  const [coverLetter, setCoverLetter] = useState({
    coverLetter: "",
    error: false,
  });
  const [jobDutyAgreeMent, setJobDutyAgreement] = useState("");
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

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
      if (termsAndCondition) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className={styles.applyJobWrraper}>
        {isLoading ? (
          <p>Loading Job details...</p>
        ) : (
          <>
            {/* Job title with company name  */}
            <h1 className={styles.jobTitle}>
              {jobDetails?.jobDetails?.jobTitle} job at{" "}
              {jobDetails?.jobDetails?.company?.companyName}
            </h1>
            {/* About the job  */}
            <div>
              <h4 className={styles.aboutTheJob}>About the job</h4>
              <p className={styles.jobDescription}>
                <SentenceDisplay
                  sentence={jobDetails?.jobDetails?.description}
                  maxWords={100}
                />
              </p>
            </div>
          </>
        )}

        {/* Apply Job Form  */}
        <div>
          <h2 className={styles.aboutTheJob}>Cover letter</h2>
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
        </div>

        {/* Availability  */}
        <div>
          <h3 className={styles.aboutTheJob}>Your availability</h3>
          <p className={styles.confirmYouravalibility}>
            Confirm your availability
          </p>
          <div className={styles.avalibilityInput}>
            <div className={styles.avalibilityInputWrapper}>
              <input
                type="radio"
                name="jobDetailsTerm"
                className="secondary-custom-checkbox"
                id="agree"
                value={"agree"}
                checked={jobDutyAgreeMent === "agree"}
                onChange={(e) => setJobDutyAgreement(e.target.value)}
              />
              <label htmlFor="agree" className={styles.avalibilityLabel}>
                Yes, I am available for{" "}
                {jobDetails?.jobDetails?.jobType.includes("InHouseJob")
                  ? `On-site`
                  : `Remotly`}{" "}
                job and, start within {jobDetails?.jobDetails?.applyEndDate}
              </label>
            </div>

            <div className={styles.avalibilityInputWrapper}>
              <input
                type="radio"
                className="secondary-custom-checkbox"
                id="agreeWithCondition"
                name="jobDetailsTerm"
                value={"agreeWithCondition"}
                checked={jobDutyAgreeMent === "agreeWithCondition"}
                onChange={(e) => setJobDutyAgreement(e.target.value)}
              />
              <label
                htmlFor="agreeWithCondition"
                className={styles.avalibilityLabel}
              >
                No (Please specify your availability)
              </label>
            </div>
          </div>
        </div>

        {/* Upload Your Resume  */}
        <div>
          <h3 className={styles.aboutTheJob}>Resume/CV*</h3>
          <div className={styles.fileUploadInput}>
            <div
              className={styles.fileInputCover}
              style={{
                boxShadow: "-1px 4px 110px 9px rgba(0, 0, 0, 0.06)",
              }}
            >
              <input
                type="file"
                style={{
                  boxShadow: "-1px 4px 110px 9px rgba(43, 37, 37, 0.06)",
                }}
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <div
                className={styles.insideFileInput}
                onClick={() => {
                  document.getElementById("fileInput").click();
                }}
              >
                <span style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={styles.attachSVG}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.29354 21.0001C7.63754 21.0001 6.06354 20.3341 4.86154 19.1251C2.47354 16.7221 2.37554 12.9121 4.64254 10.6311L12.0285 3.20106C12.7975 2.42706 13.8355 2.00006 14.9505 2.00006C16.1435 2.00006 17.2775 2.47906 18.1425 3.34906C19.8635 5.08006 19.9295 7.83106 18.2885 9.48106L10.8935 16.9101C10.4145 17.3931 9.76954 17.6581 9.07754 17.6581C8.34654 17.6581 7.65354 17.3661 7.12754 16.8371C6.07454 15.7761 6.04154 14.0851 7.05454 13.0651L13.8795 6.21006C14.2695 5.81806 14.9015 5.81606 15.2935 6.20606C15.6845 6.59606 15.6865 7.22906 15.2965 7.62006L8.47254 14.4761C8.23254 14.7181 8.26554 15.1451 8.54654 15.4271C8.69254 15.5741 8.88654 15.6581 9.07754 15.6581C9.18754 15.6581 9.34554 15.6311 9.47554 15.5001L16.8705 8.07106C17.7375 7.19806 17.6725 5.71306 16.7245 4.75906C15.8175 3.84706 14.2785 3.77506 13.4465 4.61106L6.06054 12.0411C4.56654 13.5441 4.66454 16.0901 6.28054 17.7151C7.10354 18.5441 8.17354 19.0001 9.29354 19.0001C10.2945 19.0001 11.2225 18.6221 11.9045 17.9361L19.2915 10.5061C19.6805 10.1151 20.3135 10.1121 20.7055 10.5021C21.0965 10.8921 21.0985 11.5241 20.7095 11.9161L13.3225 19.3461C12.2625 20.4121 10.8315 21.0001 9.29354 21.0001Z"
                      fill="#92929D"
                    />
                  </svg>
                </span>
                <span className={styles.attachResume}>Attach Resume/CV</span>
              </div>
            </div>
            {selectedFile && (
              <div className={styles.fileuploadedName}>
                <p>Uploded file: {selectedFile.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Terms & condition and Submit application  */}
        <div>
          <div className={styles.termsAndCondition}>
            <input
              type="checkbox"
              id="termsAndCondition"
              className="secondary-custom-checkbox"
              value={termsAndCondition}
              onChange={(e) => setTermsAndCondition(e.target.checked)}
            />
            <label htmlFor="termsAndCondition">
              I agree with terms & conditions
            </label>
          </div>
          <div onClick={() => handleJobApply()}>
            <button
              className={`primaryBtn ${styles.submitApplication} ${
                !termsAndCondition && styles.applyDisableBtn
              }`}
            >
              Submit application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
