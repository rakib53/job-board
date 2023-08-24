import React from "react";
import SearchJobInput from "../SearchJobInput/SearchJobInput";
import styles from "./FindYourJob.module.css";

const FindYourJob = () => {
  return (
    <div className={styles.findYourJobSection}>
      <div className="container">
        <div>
          <h1 className={styles.pageTitle}>
            Find your <span className={styles.dreamJob}>Dream Job</span>
          </h1>
          <p className={styles.pageDesc}>
            Find your next career at companies like hubSpot, Nike and dropbox
          </p>
        </div>
        <div>
          <SearchJobInput />
        </div>
      </div>
    </div>
  );
};

export default FindYourJob;
