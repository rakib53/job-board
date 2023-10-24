import React from "react";
import { Link } from "react-router-dom";
import companyLogo from "../../assets/logo/job.png";
import styles from "./JobCard.module.css";

// Formating the salary
function formatUSD(number, digits) {
  // Convert the number to a string
  const numStr = number.toString();

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = numStr.split(".");

  // Format the integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine the formatted integer part and decimal part (if any)
  let formattedNumber = formattedIntegerPart;
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}

export default function JobCard({ jobInfo = {}, handleJobApply }) {
  const { _id, jobId, salary, jobTitle, experience, company } = jobInfo;

  return (
    <div className={styles.JobInfoWrapper}>
      <div className={styles.CompanyImageAndJobInfo}>
        <div className={styles.companyLogoWrapper}>
          <img className={styles.companyLogo} src={companyLogo} alt="" />
        </div>
        <div>
          <h2 className={styles.jobTitle}>{jobTitle}</h2>
          <span className={styles.jobLocationAndCompanyName}>
            {company?.companyName} <span className={styles.dot}></span>{" "}
            {company?.companyLocation}
          </span>
          <div className={styles.otherInfo}>
            <div className={styles.OtherInfoWrapper}>
              <p className={styles.infoTitle}>
                <span>
                  <svg
                    className={styles.moneyIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    viewBox="0 -960 960 960"
                    width="48"
                  >
                    <path d="M453-274h60v-45h48q15 0 24.5-12t9.5-27v-114.745q0-16.255-9.5-27.755T561-512H425v-69h170v-60h-82v-45h-60v45h-49q-15 0-27 12t-12 28.117v113.766Q365-471 377-461.5t27 9.5h131v73H365v60h88v45ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z" />
                  </svg>
                </span>
                <span>CTC (ANNUAL)</span>
              </p>
              <span className={styles.infoValue}>
                {salary?.salaryRange?.from &&
                  salary?.salaryRange?.to &&
                  `$ ${formatUSD(salary?.salaryRange?.from)} - ${formatUSD(
                    salary?.salaryRange?.to
                  )}`}

                {salary?.salaryRange?.from &&
                  !salary?.salaryRange?.to &&
                  `$ ${formatUSD(salary?.salaryRange?.from)}`}
              </span>
            </div>
            <div className={styles.OtherInfoWrapper}>
              <p className={styles.infoTitle}>
                <span>
                  <svg
                    className={styles.moneyIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    viewBox="0 -960 960 960"
                    width="48"
                  >
                    <path d="M140-277v97h680v-97H140Zm153-443v-100q0-24 18-42t42-18h253q24 0 42 18t18 42v100h154q24 0 42 18t18 42v480q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h153ZM140-385h680v-275H666v75h-60v-75H353v75h-60v-75H140v275Zm213-335h253v-100H353v100ZM140-180v-480 75-75 75-75 480Z" />
                  </svg>
                </span>
                <span>EXPERIENCE</span>
              </p>
              <span className={styles.infoValue}>
                {experience?.experienceRange?.to !==
                experience?.experienceRange?.from
                  ? `${experience?.experienceRange?.from} - ${experience?.experienceRange?.to} years`
                  : `${experience?.experienceRange?.from} years`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.applyBtnWrapper}>
        <button onClick={() => handleJobApply(jobId)} className="primaryBtn">
          Apply
        </button>
        <Link to={`/job/${jobId}`} className="primaryBtn">
          See details
        </Link>
      </div>
    </div>
  );
}
