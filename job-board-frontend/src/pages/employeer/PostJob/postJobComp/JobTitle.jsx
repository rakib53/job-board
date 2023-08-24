import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function JobTitle({ jobTitle, setJobTitle }) {
  return (
    <>
      <label htmlFor="companyName">Job title*</label>

      <input
        className={styles.input}
        type="text"
        name="jobTitle"
        id="jobTitle"
        placeholder="Enter job title"
        value={jobTitle.title}
        onChange={(e) => setJobTitle({ ...jobTitle, title: e.target.value })}
        onClick={() => setJobTitle({ ...jobTitle, error: false })}
      />

      <div
        className={` ${styles.errorWrapper} ${
          jobTitle.error && styles.seeError
        }`}
      >
        <ErrorIcon />
        <span className={styles.error}>
          Job title must be atleast 8 charactor
        </span>
      </div>
    </>
  );
}
