import React, { useEffect } from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function ExperienceInput({ experience, setExperience }) {
  let content;
  if (experience.experienceType === "fixedExperience") {
    content = (
      <select
        id="Experience"
        className={`custom-select ${styles.experienceField}`}
        onChange={(e) =>
          setExperience({ ...experience, experienceNumber: e.target.value })
        }
        onClick={(e) =>
          setExperience({
            ...experience,
            error: false,
            errorMessage: "",
          })
        }
        value={experience.experienceNumber}
      >
        <option value="1">1 Year</option>
        <option value="2">2 Years</option>
        <option value="3">3 Years</option>
        <option value="4">4 Years</option>
        <option value="5">5 Years</option>
        <option value="5+">5+ Years</option>
      </select>
    );
  }
  if (experience.experienceType === "Between") {
    content = (
      <div className={styles.experienceBetweenField}>
        <select
          id="Experience"
          className={`custom-select ${styles.experienceField}`}
          onChange={(e) =>
            setExperience({
              ...experience,
              experienceRange: {
                ...experience.experienceRange,
                from: e.target.value,
              },
            })
          }
          onClick={(e) =>
            setExperience({
              ...experience,
              error: false,
              errorMessage: "",
            })
          }
          value={experience.experienceRange.from}
        >
          <option value="0">0 year</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
          <option value="5">5 Years</option>
        </select>
        <select
          id="Experience"
          className={`custom-select ${styles.experienceField}`}
          onChange={(e) =>
            setExperience({
              ...experience,
              experienceRange: {
                ...experience.experienceRange,
                to: e.target.value,
              },
            })
          }
          onClick={(e) =>
            setExperience({
              ...experience,
              error: false,
              errorMessage: "",
            })
          }
          value={experience.experienceRange.to}
        >
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
          <option value="5">5 Years</option>
          <option value="5+">5+ Years</option>
        </select>
      </div>
    );
  }

  useEffect(() => {
    const expoFrom = parseInt(experience?.experienceRange?.from);
    const expoTo = parseInt(experience?.experienceRange?.to);
    if (expoFrom >= expoTo) {
      setExperience({
        ...experience,
        experienceRange: { ...experience.experienceRange, from: "0", to: "2" },
        error: true,
        errorMessage: "Experience one can't be greater than two",
      });
    }
  }, [experience]);

  return (
    <div className={`${styles.inputWrapper} ${styles.experienceInput}`}>
      <label htmlFor="Experience">Experience*</label>
      <div className={styles.salaryTypeWrapper}>
        <div className={styles.salaryType}>
          <input
            type="radio"
            id="fixedExperience"
            name="experienceType"
            value="fixedExperience"
            checked={experience.experienceType === "fixedExperience"}
            onChange={(e) =>
              setExperience({ ...experience, experienceType: e.target.value })
            }
          />
          <label htmlFor="fixedExperience">Fixed</label>
        </div>
        <div className={styles.salaryType}>
          <input
            type="radio"
            id="Between"
            name="experienceType"
            value="Between"
            checked={experience.experienceType === "Between"}
            onChange={(e) =>
              setExperience({ ...experience, experienceType: e.target.value })
            }
          />
          <label htmlFor="Between">Between</label>
        </div>
      </div>

      {content}

      <div
        className={` ${styles.errorWrapper} ${
          experience.error && styles.seeError
        }`}
      >
        <ErrorIcon />
        <span className={styles.error}>{experience.errorMessage}</span>
      </div>
    </div>
  );
}
