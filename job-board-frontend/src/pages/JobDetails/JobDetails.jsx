import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadinSVG from "../../components/Loading/LoadinSVG";
import ApplicantIcon from "../../components/SVG/JobDetailsIocns/ApplicantIcon";
import ApplyDateIcon from "../../components/SVG/JobDetailsIocns/ApplyDateIcon";
import CTCAnualIcon from "../../components/SVG/JobDetailsIocns/CTCAnualIcon";
import ExperienceIcon from "../../components/SVG/JobDetailsIocns/ExperienceIcon";
import JobLocationIcon from "../../components/SVG/JobDetailsIocns/JobLocationIcon";
import JobPostedIcon from "../../components/SVG/JobDetailsIocns/JobPostedIcon";
import ShareJobIcon from "../../components/SVG/JobDetailsIocns/ShareJobIcon";
import StartDateIcon from "../../components/SVG/JobDetailsIocns/StartDateIcon";
import { useGetJobQuery } from "../../features/jobSlice/jobApi";
import styles from "./JobDetails.module.css";
import SavedJob from "./jobDetailsComp/SavedJob";

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

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // User information
  const { user } = useSelector((state) => state.authSlice);

  // Querying job Details
  const {
    data: jobDetails,
    isError,
    isLoading,
    error,
  } = useGetJobQuery({ jobId: jobId });

  let content;

  if (isLoading) {
    content = (
      <div>
        <LoadinSVG />
      </div>
    );
  }

  if (!isLoading && !isError && jobDetails?.jobDetails?._id) {
    // Destructing Job details information
    const {
      jobId,
      jobTitle,
      applyEndDate,
      company,
      description,
      experience,
      jobType,
      joinDate,
      numberOfOpen,
      probation,
      salary,
      _id,
    } = jobDetails?.jobDetails;

    content = (
      <div className={styles.JobDetailsPageWrapper}>
        <h1 className={styles.jobAtCompany}>
          {jobTitle} Job{" "}
          {jobType === "InHouseJob" && `in ${company?.companyLocation}`} at{" "}
          {company?.companyName}
        </h1>
        <div className={styles.JobDetailsWrapper}>
          <h2 className={styles.jobTitle}>{jobTitle}</h2>
          <p className={styles.companyName}>{company?.companyName}</p>
          {jobType === "InHouseJob" ? (
            <>
              <div className={styles.InHouseJob}>
                <span className={styles.InHouseJobIcon}>
                  <JobLocationIcon />
                </span>
                <span className={styles.InHouseJobLocation}>
                  {company?.companyLocation}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}

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
                {salary?.salaryRange?.from
                  ? `${CustomizeSalary(
                      salary?.selectedCurrency,
                      salary?.salaryRange?.from
                    )} - ${CustomizeSalary(
                      salary?.selectedCurrency,
                      salary?.salaryRange?.to
                    )}`
                  : CustomizeSalary(
                      salary?.selectedCurrency,
                      salary?.salaryRange?.to
                    )}{" "}
                {` /${salary?.salaryFrequency.toLowerCase()}`}
              </span>
            </div>
            <div className={styles.basicJobCard}>
              <div className={styles.basicJobHeader}>
                <ExperienceIcon />
                <p className={styles.basicJobInfoTitle}>EXPERIENCE</p>
              </div>
              <span className={styles.basicJobInfoValue}>{experience}</span>
            </div>
            <div className={styles.basicJobCard}>
              <div className={styles.basicJobHeader}>
                <ApplyDateIcon />
                <p className={styles.basicJobInfoTitle}>APPLY END IN</p>
              </div>
              <span className={styles.basicJobInfoValue}>{applyEndDate}</span>
            </div>
          </div>

          <div className={styles.jobBodyInfo}>
            <div className={styles.jobPostedAt}>
              <span>
                <JobPostedIcon />
              </span>
              <span>Posted few hours ago</span>
            </div>
            <span className={styles.job}>Job</span>
          </div>

          <div className={styles.moreOptionWrapper}>
            <div className={styles.applicantsWrapper}>
              <ApplicantIcon />
              <span>98 applicants</span>
            </div>
            <div className={styles.iconWrapper}>
              <SavedJob
                userId={user?._id}
                jobId={_id}
                companyId={company?._id}
              />

              <ShareJobIcon />
            </div>
          </div>

          <hr className={styles.line} />
          <div>
            <h4 className={styles.title}>About the job</h4>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <div>
            <h4 className={styles.title}>Skill(s) required</h4>
            <h5>Earn certifications in these skills</h5>
            <div className={styles.skillsWraper}>
              <span className={styles.skill}>English Proficiency (Spoken)</span>
              <span className={styles.skill}>Hindi Proficiency (Spoken)</span>
              <span className={styles.skill}>Mathematics</span>
              <span className={styles.skill}>Video Editing</span>
              <span className={styles.skill}>Video Making</span>
              <span className={styles.skill}>Voice-over artist</span>
              <span className={styles.skill}>Voiceover</span>
            </div>
          </div>
          <div>
            <h4 className={styles.title}>Salary</h4>

            {probation && (
              <>
                <h5 className={styles.lowerTitle}>Probation:</h5>
                <p className={styles.jobDescription}>
                  Duration: {probation?.probationPeriodTime}
                </p>
                <p className={styles.jobDescription}>
                  during probation: {probation?.probationDuringSalary}
                </p>
                <p className={styles.lowerTitle}>After probation:</p>
              </>
            )}

            <p className={styles.jobDescription}>
              Salary:{" "}
              {salary?.salaryRange?.from
                ? `${CustomizeSalary(
                    salary?.selectedCurrency,
                    salary?.salaryRange?.from
                  )} - ${CustomizeSalary(
                    salary?.selectedCurrency,
                    salary?.salaryRange?.to
                  )}`
                : CustomizeSalary(
                    salary?.selectedCurrency,
                    salary?.salaryRange?.to
                  )}
              {` /${salary?.salaryFrequency.toLowerCase()}`}
            </p>
          </div>

          <div className={styles.numberOfOpeningWrapper}>
            <h4 className={styles.title}>Number of openings</h4>
            <span className={styles.jobDescription}> {numberOfOpen}</span>
          </div>
          <div className={styles.applyNowBtnWrapper}>
            <button
              className={`${
                user?.role === "employeer" && styles.applyNowBtn
              } primaryBtn`}
              disabled={user?.role === "employeer"}
              onClick={() => handleJobApply()}
            >
              Apply now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleJobApply = () => {
    if (!user?._id) {
      return navigate(`/sign-up`, {
        replace: true,
        state: { ...location, jobId },
      });
    } else if (user?._id && user?.accountCompeletation === 30) {
      return navigate(`/personal-info`, {
        replace: true,
        state: { ...location, jobId },
      });
    } else if (user?._id && user?.accountCompeletation === 70) {
      return navigate(`/preference`, {
        replace: true,
        state: { ...location, jobId },
      });
    } else if (user?._id && user?.accountCompeletation === 100) {
      return navigate(`/applciation/form/${jobId}`, {
        replace: true,
        state: { ...location, jobId },
      });
    }
  };

  return <div className="container">{content}</div>;
}
