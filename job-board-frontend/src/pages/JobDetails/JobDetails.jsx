import moment from "moment/moment";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ApplicantIcon from "../../components/SVG/JobDetailsIocns/ApplicantIcon";
import ApplyDateIcon from "../../components/SVG/JobDetailsIocns/ApplyDateIcon";
import CTCAnualIcon from "../../components/SVG/JobDetailsIocns/CTCAnualIcon";
import ExperienceIcon from "../../components/SVG/JobDetailsIocns/ExperienceIcon";
import JobPostedIcon from "../../components/SVG/JobDetailsIocns/JobPostedIcon";
import ShareJobIcon from "../../components/SVG/JobDetailsIocns/ShareJobIcon";
import StartDateIcon from "../../components/SVG/JobDetailsIocns/StartDateIcon";
import SimilarJobCard from "../../components/SimilarJob/SimilarJobCard";
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
    return (
      <div className="initialLoadingWrapper">
        <div className="contentLoader"></div>
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
      applicants,
      timeStamp,
      _id,
    } = jobDetails?.jobDetails;

    content = (
      <div className={styles.JobDetailsPageWrapper}>
        <div className={styles.JobDetailsWrapper}>
          <div className={styles.jobDetailsHeader}>
            <div>
              <h2 className={styles.jobTitle}>{jobTitle}</h2>
              <p className={styles.companyName}>
                {company?.companyName}
                {" - "}
                {company?.companyLocation}
              </p>
            </div>
            <div className={styles.applyBtnHeaderWrapper}>
              <button
                onClick={() => handleJobApply()}
                className={`${
                  user?.role === "employeer" &&
                  styles.applyNowEmployeerDisableBtn
                } ${styles.applyNowBtn}`}
                disabled={user?.role === "employeer"}
              >
                Apply Now
              </button>
              <span className={styles.headerMoreBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 7C13.104 7 14 6.104 14 5C14 3.896 13.104 3 12 3C10.896 3 10 3.896 10 5C10 6.104 10.896 7 12 7ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM10 19C10 17.896 10.896 17 12 17C13.104 17 14 17.896 14 19C14 20.104 13.104 21 12 21C10.896 21 10 20.104 10 19Z"
                    fill="#757D8A"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.basicJobInfoWrapper}>
            <div className={styles.basicJobCard}>
              <div className={styles.basicJobHeader}>
                <StartDateIcon />
                <p className={styles.basicJobInfoTitle}>Employee Type</p>
              </div>
              <span className={styles.basicJobInfoValue}>
                {jobType === "fullTime" ? "Full time Job" : "Part time job"}
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
                <CTCAnualIcon />
                <p className={styles.basicJobInfoTitle}>Salary(Annual)</p>
              </div>
              <span className={styles.basicJobInfoValue}>
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
              <span className={styles.jobPostIcon}>
                <JobPostedIcon />
              </span>
              <span>{moment(timeStamp).startOf("day").fromNow()}</span>
            </div>
            <span className={styles.job}>Job</span>
          </div>

          <div className={styles.moreOptionWrapper}>
            {applicants ? (
              <div className={styles.applicantsWrapper}>
                <ApplicantIcon />
                <span>
                  {applicants === 0 ? (
                    "No applicant applied"
                  ) : (
                    <>
                      {applicants}{" "}
                      {applicants === 1 ? `applicant` : `applicants`}{" "}
                    </>
                  )}
                </span>
              </div>
            ) : (
              <p></p>
            )}

            <div className={styles.iconWrapper}>
              {user?.role !== "employeer" && (
                <SavedJob
                  userId={user?._id}
                  jobId={_id}
                  companyId={company?._id}
                />
              )}

              {user?.role === "employeer" && (
                <Link to={`/edit-job/${jobId}`}>
                  <CiEdit className={styles.editJobIcon} />
                </Link>
              )}

              <ShareJobIcon />
            </div>
          </div>

          <hr className={styles.line} />
          <div>
            <h4 className={styles.title}>About the job</h4>
            <p className={styles.jobDescription}>{description}</p>
          </div>
          <div>
            <h4 className={styles.title}>Skill(s) required</h4>
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
              {salary?.salaryRange?.from &&
                salary?.salaryRange?.to &&
                `${
                  formatUSD(salary?.salaryRange?.from) -
                  formatUSD(salary?.salaryRange?.to)
                }`}
              {salary?.salaryRange?.from &&
                !salary?.salaryRange?.to &&
                `$ ${formatUSD(salary?.salaryRange?.from)}`}
            </p>
          </div>

          <div className={styles.numberOfOpeningWrapper}>
            <h4 className={styles.title}>Number of openings</h4>
            <span className={styles.jobDescription}> {numberOfOpen}</span>
          </div>
          <div className={styles.applyBtnFooterWrapper}>
            <button
              className={`${
                user?.role === "employeer" && styles.applyNowEmployeerDisableBtn
              } ${styles.applyNowFooterBtn}`}
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

  return (
    <div className="container">
      <div className={styles.jobAndSimilarJobWrapper}>
        <div>
          <p className={styles.goBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M11.25 4.5L6.75 9L11.25 13.5"
                stroke="#92929D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link to={"/"} className={styles.back}>
              Back
            </Link>
          </p>
          {content}
        </div>
        <div className={styles.similarJobs}>
          <h4 className={styles.simlilarKJobText}>Similar Jobs</h4>
          <div className={styles.similarJobWrapper}>
            <SimilarJobCard />
            <SimilarJobCard />
            <SimilarJobCard />
            <SimilarJobCard />
            <SimilarJobCard />
            <SimilarJobCard />
          </div>
        </div>
      </div>
    </div>
  );
}
