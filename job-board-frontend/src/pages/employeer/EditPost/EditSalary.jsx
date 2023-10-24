import React from "react";
import ErrorIcon from "../../../components/SVG/ErrorIcon";
import styles from "../PostJob/PostJob.module.css";

export default function EditSalary({ salary, setSalary }) {
  let content;
  if (salary.salaryType === "Fixed") {
    content = (
      <div className={styles.negotiableinputWrapper}>
        <input
          className={styles.salaryInput}
          type="number"
          name="salary"
          id="salary"
          value={salary.salaryAmount}
          onChange={(e) =>
            setSalary({ ...salary, salaryAmount: e.target.value, error: false })
          }
          placeholder="e.g. 25000"
        />
      </div>
    );
  }
  if (salary.salaryType === "basedOnPerformance") {
    content = (
      <>
        <input
          className={styles.salaryInput}
          type="number"
          name="salary"
          id="salary"
          value={salary.salaryRange.from}
          onChange={(e) =>
            setSalary({
              ...salary,
              salaryRange: {
                ...salary.salaryRange,
                from: e.target.value,
                error: false,
              },
            })
          }
          placeholder="e.g. 28000"
        />
        <span className={styles.to}>to</span>
        <input
          className={styles.salaryInput}
          type="number"
          name="salary"
          id="salary"
          value={salary.salaryRange.to}
          onChange={(e) =>
            setSalary({
              ...salary,
              salaryRange: {
                ...salary.salaryRange,
                to: e.target.value,
                error: false,
              },
            })
          }
          placeholder="e.g. 30000"
        />
      </>
    );
  }

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="">Salary (Yearly in USD)</label>
      <div className={styles.salaryInputWrapper}>
        <div className={styles.salaryTypeWrapper}>
          <div className={styles.salaryType}>
            <input
              type="radio"
              id="Fixed"
              name="editSalaryType"
              value="Fixed"
              checked={salary.salaryType === "Fixed"}
              onChange={(e) =>
                setSalary({ ...salary, salaryType: e.target.value })
              }
            />
            <label htmlFor="Fixed">Fixed</label>
          </div>
          <div className={styles.salaryType}>
            <input
              type="radio"
              id="basedOnPerformance"
              name="editSalaryType"
              value="basedOnPerformance"
              checked={salary.salaryType === "basedOnPerformance"}
              onChange={(e) =>
                setSalary({ ...salary, salaryType: e.target.value })
              }
            />
            <label htmlFor="basedOnPerformance">Based on performance</label>
          </div>
        </div>
        <div className={styles.CurrenciesAndAmountWrapper}>
          <div>
            <div className={styles.negotiableinputWrapper}>{content}</div>
            <div
              className={` ${styles.errorWrapper} ${
                salary.error && styles.seeError
              }`}
            >
              <ErrorIcon />
              <span className={styles.error}>Salary field can't be empty!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
