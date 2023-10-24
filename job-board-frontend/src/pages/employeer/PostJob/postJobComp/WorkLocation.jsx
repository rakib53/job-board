import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function WorkLocation({ workLocation, setWorkLocation }) {
  return (
    <div className={styles.employeeTypeWrapper}>
      <label htmlFor="workLocation">Work Location*</label>
      <div>
        <input
          type="radio"
          name="workLocation"
          className="secondary-custom-checkbox"
          id="InHouse"
          value={"InHouse"}
          checked={workLocation?.workLocation === "InHouse"}
          onChange={(e) =>
            setWorkLocation({
              ...workLocation,
              workLocation: e.target.value,
              error: false,
            })
          }
        />
        <label htmlFor="InHouse">In-house</label>

        <input
          type="radio"
          className="secondary-custom-checkbox"
          id="Remote"
          name="workLocation"
          value={"Remote"}
          checked={workLocation?.workLocation === "Remote"}
          onChange={(e) =>
            setWorkLocation({
              ...workLocation,
              workLocation: e.target.value,
              error: false,
            })
          }
        />
        <label htmlFor="Remote">Remote</label>
        <div
          className={` ${styles.errorWrapper} ${
            workLocation.error && styles.seeError
          }`}
        >
          <ErrorIcon />
          <span className={styles.error}>Please select a work location!</span>
        </div>
      </div>
    </div>
  );
}
