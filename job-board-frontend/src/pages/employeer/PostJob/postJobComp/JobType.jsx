import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function JobType({ jobType, setJobType }) {
  return (
    <div className={styles.employeeTypeWrapper}>
      <label htmlFor="fullTimePartTime">Job type*</label>
      <div>
        <input
          type="radio"
          className="secondary-custom-checkbox"
          id="partTime"
          name="jobType"
          value={"partTime"}
          checked={jobType?.jobType === "partTime"}
          onChange={(e) =>
            setJobType({
              ...jobType,
              jobType: e.target.value,
              error: false,
            })
          }
        />
        <label htmlFor="partTime">Part time</label>
        <input
          type="radio"
          name="jobType"
          className="secondary-custom-checkbox"
          id="fullTime"
          value={"fullTime"}
          checked={jobType?.jobType === "fullTime"}
          onChange={(e) =>
            setJobType({
              ...jobType,
              jobType: e.target.value,
              error: false,
            })
          }
        />
        <label htmlFor="fullTime">Full time</label>

        <div
          className={` ${styles.errorWrapper} ${
            jobType.error && styles.seeError
          }`}
        >
          <ErrorIcon />
          <span className={styles.error}>Please select a job type!</span>
        </div>
      </div>
    </div>
  );
}
