import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function NumberOfOpeningJob({ numberOfOpen, setNumberOfOpen }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="companyName">Numbers of opening*</label>
      <input
        className={styles.input}
        type="number"
        name="numbersInOpening"
        id="numbersInOpening"
        placeholder="Numbers of opening"
        value={numberOfOpen?.numberOfOpen}
        onChange={(e) =>
          setNumberOfOpen({
            ...numberOfOpen,
            numberOfOpen: e.target.value,
            error: false,
          })
        }
      />
      <div
        className={` ${styles.errorWrapper} ${
          numberOfOpen?.error && styles.seeError
        }`}
      >
        <ErrorIcon />
        <span className={styles.error}>
          Please specify the number of job oppurtunity you have!
        </span>
      </div>
    </div>
  );
}
