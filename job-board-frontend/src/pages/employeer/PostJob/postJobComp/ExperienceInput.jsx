import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function ExperienceInput({ experience, setExperience }) {
  return (
    <div className={`${styles.inputWrapper} ${styles.experienceInput}`}>
      <label htmlFor="Experience">Experience*</label>

      <select
        id="Experience"
        className={`custom-select ${styles.experienceField}`}
        onChange={(e) =>
          setExperience({ ...experience, selectedExperience: e.target.value })
        }
        onClick={() => setExperience({ ...experience, error: false })}
        value={experience.selectedExperience}
      >
        <option value="Fresher">Fresher</option>
        <option value="0 - 2 Years">0 - 2 Years</option>
        <option value="1 - 5 Years">1 - 5 Years</option>
        <option value="5 - 7 Years">5 - 7 Years</option>
        <option value="7 or avobe">7 or avobe</option>
      </select>
      <div
        className={` ${styles.errorWrapper} ${
          experience.error && styles.seeError
        }`}
      >
        <ErrorIcon />
        <span className={styles.error}>Experience field can't be empty!</span>
      </div>
    </div>
  );
}
