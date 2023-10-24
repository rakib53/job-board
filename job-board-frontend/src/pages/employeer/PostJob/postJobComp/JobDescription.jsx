import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function JobDescription({ description, setDescription }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="description">Job Description*</label>

      <textarea
        className={styles.input}
        style={{ minHeight: "250px", resize: "none" }}
        value={description.description}
        onChange={(e) =>
          setDescription({ ...description, description: e.target.value })
        }
        onClick={() => setDescription({ ...description, error: false })}
      />

      <div
        className={` ${styles.errorWrapper} ${
          description?.error && styles.seeError
        }`}
      >
        <ErrorIcon />
        <span className={styles.error}>
          You must provide a job description!
        </span>
      </div>
    </div>
  );
}
