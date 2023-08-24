import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function FullTimePartTime({
  fullTimePartTime,
  setFullTimePartTime,
}) {
  return (
    <div className={styles.employeeTypeWrapper}>
      <label htmlFor="fullTimePartTime">Full time/Part time*</label>
      <div>
        <input
          type="radio"
          name="fullTimePartTime"
          className="secondary-custom-checkbox"
          id="fullTime"
          value={"fullTime"}
          checked={fullTimePartTime?.fullTimePartTime === "fullTime"}
          onChange={(e) =>
            setFullTimePartTime({
              ...fullTimePartTime,
              fullTimePartTime: e.target.value,
            })
          }
          onClick={() =>
            setFullTimePartTime({ ...fullTimePartTime, error: false })
          }
        />
        <label htmlFor="fullTime">Full time</label>

        <input
          type="radio"
          className="secondary-custom-checkbox"
          id="partTime"
          name="fullTimePartTime"
          value={"partTime"}
          checked={fullTimePartTime?.fullTimePartTime === "partTime"}
          onChange={(e) =>
            setFullTimePartTime({
              ...fullTimePartTime,
              fullTimePartTime: e.target.value,
            })
          }
          onClick={() =>
            setFullTimePartTime({ ...fullTimePartTime, error: false })
          }
        />
        <label htmlFor="partTime">Part time</label>
        <div
          className={` ${styles.errorWrapper} ${
            fullTimePartTime.error && styles.seeError
          }`}
        >
          <ErrorIcon />
          <span className={styles.error}>Please select a job type!</span>
        </div>
      </div>
    </div>
  );
}
