import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function JobType({ jobType, setJobType }) {
  return (
    <div className={styles.employeeTypeWrapper}>
      <label htmlFor="employeeType">Job type*</label>
      <div>
        <input
          type="radio"
          name="employeeType"
          className="secondary-custom-checkbox"
          id="InHouseJob"
          value={"InHouseJob"}
          checked={jobType?.jobType === "InHouseJob"}
          onChange={(e) => setJobType({ ...jobType, jobType: e.target.value })}
          onClick={() => setJobType({ ...jobType, error: false })}
        />
        <label htmlFor="InHouseJob">In-house</label>

        <input
          type="radio"
          className="secondary-custom-checkbox"
          id="workFromHome"
          name="employeeType"
          value={"workFromHome"}
          checked={jobType?.jobType === "workFromHome"}
          onChange={(e) => setJobType({ ...jobType, jobType: e.target.value })}
          onClick={() => setJobType({ ...jobType, error: false })}
        />
        <label htmlFor="workFromHome">Work from home</label>
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
