import React from "react";
import styles from "./FilteringJob.module.css";

export default function FilteringJob() {
  return (
    <div className={styles.filterParentWrapper}>
      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Type of employment</h3>
        <div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="Full-time"
              name="Full-time"
            />
            <label htmlFor="Full-time">Full-time</label>
          </div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="Part-time"
              name="Part-time"
            />
            <label htmlFor="Part-time">Part-time</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="Remote"
              name="Remote"
            />
            <label htmlFor="Remote">Remote</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="Internship"
              name="Internship"
            />
            <label htmlFor="Internship">Internship</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="Contract"
              name="Contract"
            />
            <label htmlFor="Contract">Contract</label>
          </div>
        </div>
      </div>

      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Years of experience</h3>
        <div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="fresher"
              name="fresher"
            />
            <label htmlFor="fresher">Fresher</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="ZeroToTwo"
              name="ZeroToTwo"
            />
            <label htmlFor="ZeroToTwo">1 year</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="ZeroToTwo"
              name="ZeroToTwo"
            />
            <label htmlFor="ZeroToTwo">2 years</label>
          </div>
        </div>
      </div>

      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Salary range</h3>
        <div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="100-1000"
              name="100-700"
            />
            <label htmlFor="100-1000">$100 - $700</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="700-1500"
              name="700-1500"
            />
            <label htmlFor="700-1500">$700 - $1500</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="1500-2000"
              name="1500-2000"
            />
            <label htmlFor="1500-2000">$1500 - $2000</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="checkbox"
              id="200OrAvobe"
              name="200OrAvobe"
            />
            <label htmlFor="200OrAvobe">$2000 or avobe</label>
          </div>
        </div>
      </div>
    </div>
  );
}
