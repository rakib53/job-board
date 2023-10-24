import React from "react";
import ErrorIcon from "../../../../components/SVG/ErrorIcon";
import styles from "../PostJob.module.css";

export default function SalaryInput({ salary, setSalary }) {
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
      <label htmlFor="">Salary</label>
      <div className={styles.salaryInputWrapper}>
        <div className={styles.salaryTypeWrapper}>
          <div className={styles.salaryType}>
            <input
              type="radio"
              id="Fixed"
              name="salaryType"
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
              name="salaryType"
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
          <div className={styles.CurrenciesWrapper}>
            <select
              name="currenciesType"
              id="currenciesType"
              className="custom-select"
              onChange={(e) =>
                setSalary({ ...salary, selectedCurrency: e.target.value })
              }
              value={salary.selectedCurrency}
            >
              <option value="USD">USD</option>
              <option value="EURO">EURO</option>
              <option value="BDT">BDT</option>
              <option value="INR">INR</option>
            </select>
          </div>

          <div>
            <div className={styles.negotiableinputWrapper}>
              {content}
              <select
                name="salaryFrequency"
                id="salaryFrequency"
                className="custom-select"
                value={salary.salaryFrequency}
                onChange={(e) =>
                  setSalary({ ...salary, salaryFrequency: e.target.value })
                }
              >
                <option value="Day">Day</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
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
