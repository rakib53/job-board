import React from "react";
import { Link, useParams } from "react-router-dom";
import ApplyDateIcon from "../../../components/SVG/JobDetailsIocns/ApplyDateIcon";
import CTCAnualIcon from "../../../components/SVG/JobDetailsIocns/CTCAnualIcon";
import ExperienceIcon from "../../../components/SVG/JobDetailsIocns/ExperienceIcon";
import StartDateIcon from "../../../components/SVG/JobDetailsIocns/StartDateIcon";
import { useGetApplicationQuery } from "../../../features/jobSlice/jobApi";
import styles from "./MyApplications.module.css";

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

// Customize the salay in visulizatio
const CustomizeSalary = (currenciesType, salary) => {
  let currencySymbol = null;

  if (currenciesType === "USD") {
    currencySymbol = "$";
  } else if (currenciesType === "EURO") {
    currencySymbol = "€";
  } else if (currenciesType === "BDT") {
    currencySymbol = "৳";
  } else if (currenciesType === "INR") {
    currencySymbol = "₹";
  }

  return currencySymbol + " " + formatUSD(salary);
};

export default function ApplicationDetails() {
  const { applicationId } = useParams();

  // Making query for getting the application of a single user
  const {
    data: userApplication,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetApplicationQuery({ applicationId });

  if (!isLoading && isSuccess) {
    const { jobId, coverLetter } = userApplication?.applicationDetails;
    const {
      jobTitle,
      description,
      joinDate,
      salary,
      experience,
      applyEndDate,
    } = jobId;
    return (
      <div className="container">
        <div className={styles.applicationDetailsPageWrapper}>
          <h1 className={styles.applicationDetailsText}>Application details</h1>
          <div className={styles.applicationInfoWrapper}>
            <h3 className={styles.jobDetailsText}>Job details</h3>
            <div className={styles.jobInfoWrapper}>
              <div>
                <h4 className={styles.jobTitle}>{jobTitle}</h4>
                <span className={styles.postDate}>Posted Aug 22, 2023</span>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                  <Link
                    to={`/job/${jobId?.jobId}`}
                    className={styles.viewJobPost}
                  >
                    View job posting
                  </Link>
                </div>
              </div>
              <div className={styles.jobMoreInfo}>
                <hr className={styles.insideJobBorder} />
                <div className={styles.basicJobInfoWrapper}>
                  <div className={styles.basicJobCard}>
                    <div className={styles.basicJobHeader}>
                      <StartDateIcon />
                      <p className={styles.basicJobInfoTitle}>START DATE</p>
                    </div>
                    <span className={styles.basicJobInfoValue}>{joinDate}</span>
                  </div>
                  <div className={styles.basicJobCard}>
                    <div className={styles.basicJobHeader}>
                      <CTCAnualIcon />
                      <p className={styles.basicJobInfoTitle}>Salary</p>
                    </div>
                    <span className={styles.basicJobInfoValue}>
                      {salary?.salaryRange?.from &&
                        salary?.salaryRange?.to &&
                        `${
                          formatUSD(salary?.salaryRange?.from) -
                          formatUSD(salary?.salaryRange?.to)
                        }`}

                      {salary?.salaryRange?.from &&
                        !salary?.salaryRange?.to &&
                        `$ ${formatUSD(salary?.salaryRange?.from)}`}
                    </span>
                  </div>
                  <div className={styles.basicJobCard}>
                    <div className={styles.basicJobHeader}>
                      <ExperienceIcon />
                      <p className={styles.basicJobInfoTitle}>EXPERIENCE</p>
                    </div>
                    <span className={styles.basicJobInfoValue}>
                      {experience?.experienceRange?.to !==
                      experience?.experienceRange?.from
                        ? `${experience?.experienceRange?.from} - ${experience?.experienceRange?.to} years`
                        : `${experience?.experienceRange?.from} years`}
                    </span>
                  </div>
                  <div className={styles.basicJobCard}>
                    <div className={styles.basicJobHeader}>
                      <ApplyDateIcon />
                      <p className={styles.basicJobInfoTitle}>APPLY END IN</p>
                    </div>
                    <span className={styles.basicJobInfoValue}>
                      {applyEndDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.applicationInfoWrapper}>
            <h3 className={styles.coverLetterText}>Cover Letter</h3>
            <p className={styles.coverLetter}>{coverLetter}</p>
          </div>
        </div>
      </div>
    );
  }

  console.log(userApplication);
}
