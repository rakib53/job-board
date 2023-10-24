import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function JoinAndApplyEndDate({
  joinDate,
  setJoinDate,
  applyEndDate,
  setApplyEndDate,
}) {
  return (
    <div className={styles.JoinDateAndJobExpireWrapper}>
      {/* Join Date */}
      <div style={{ width: "300px" }}>
        <label htmlFor="joinDate">Join date:</label>
        <input
          type="date"
          id="joinDate"
          name="joinDate"
          className={styles.input}
          value={joinDate.joinDate}
          onChange={(e) =>
            setJoinDate({ ...joinDate, joinDate: e.target.value, error: false })
          }
        />
        <div
          className={` ${styles.errorWrapper} ${
            joinDate?.error && styles.seeError
          }`}
        >
          <ErrorIcon />
          <span className={styles.error}>
            You must provide a job join date!
          </span>
        </div>
      </div>

      {/* Job Expires In */}
      <div style={{ width: "300px" }}>
        <label htmlFor="applyEndTime">Apply End time:</label>
        <input
          type="date"
          id="applyEndTime"
          name="applyEndTime"
          className={styles.input}
          value={applyEndDate.applyEndDate}
          onChange={(e) =>
            setApplyEndDate({
              ...applyEndDate,
              applyEndDate: e.target.value,
              error: false,
            })
          }
        />
        <div
          className={` ${styles.errorWrapper} ${
            applyEndDate?.error && styles.seeError
          }`}
        >
          <ErrorIcon />
          <span className={styles.error}>
            You must provide a job apply end date!
          </span>
        </div>
      </div>
    </div>
  );
}
