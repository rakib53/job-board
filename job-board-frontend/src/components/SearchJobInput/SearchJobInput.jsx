import React from "react";
import styles from "./SearchJobInput.module.css";

const SearchJobInput = () => {
  return (
    <div className="container">
      <div className={styles.jobSearchInputWrapper}>
      <div className={styles.jobSearchInput}>
        <div className={styles.inputWrapper}>
          <span>
            <svg
              className={styles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M790.615-137.54 531.077-397.078q-29.848 26.414-69.61 40.707t-82.313 14.293q-101.873 0-172.436-70.514t-70.563-170.999q0-100.485 70.514-171.062 70.514-70.577 171.219-70.577 100.706 0 171.255 70.533 70.548 70.532 70.548 171.054 0 42.028-14.384 81.835-14.385 39.808-41.616 72.115l260.154 258.539-33.23 33.614ZM378.539-387.461q81.955 0 138.862-57.116 56.907-57.115 56.907-139.077 0-81.961-56.907-139.077-56.907-57.115-138.862-57.115-82.468 0-139.734 57.115-57.266 57.116-57.266 139.077 0 81.962 57.266 139.077 57.266 57.116 139.734 57.116Z" />
            </svg>
          </span>
          <input
            type="text"
            className={styles.input}
            placeholder="Job title or keyword"
          />
        </div>
        <div className="line"></div>
        <div className={styles.inputWrapper}>
          <span>
            <svg
              className={styles.searchIcon}
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M480.089-490Q509-490 529.5-510.589q20.5-20.588 20.5-49.5Q550-589 529.411-609.5q-20.588-20.5-49.5-20.5Q451-630 430.5-609.411q-20.5 20.588-20.5 49.5Q410-531 430.589-510.5q20.588 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
            </svg>
          </span>
          <input type="text" className={styles.input} placeholder="Location" />
        </div>
        <div>
          <button className="primaryBtn">Search</button>
        </div>
      </div>
      <span className={styles.popularSearch}>Popular: UI Design, UX Designer, Software developer</span>
      </div>
      
    </div>
  );
};

export default SearchJobInput;
