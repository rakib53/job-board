import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../../components/SVG/CloseIcon";
import styles from "./JobListing.module.css";

export default function JobListCard({ job = {}, handleDeleteJobPost }) {
  const { jobType, jobId, _id } = job;
  return (
    <div className={styles.myJob}>
      <div className={styles.JobTypeAndJobTitleWrapper}>
        <p className={styles.jobTitle}>{job?.jobTitle}</p>
        {jobType === "InHouseJob" ? (
          <>
            <div className={styles.InHouseJob}>
              <span className={styles.inHouseDot}></span>
              <span className={styles.jobTypeText}>In-House</span>
            </div>
          </>
        ) : (
          <div className={styles.InHouseJob}>
            <span className={styles.remoteDot}></span>
            <span className={styles.jobTypeText}>Remote</span>
          </div>
        )}
      </div>

      <div className={styles.JobStatusWrapper}>
        <span className={styles.remoteDot}></span>
        <span>Active</span>
      </div>

      <div className={styles.actionsWrapper}>
        <div className={styles.seeApplicatntsBtnWrapper}>
          <Link to={`/applicants/${_id}`} className={styles.seeApplicatntsBtn}>
            See applicants
          </Link>
        </div>

        <div className={styles.seeJobDetailsBtnWrapper}>
          <Link to={`/job/${jobId}`} className="primaryBtn">
            See Job post
          </Link>
        </div>
        <div className={styles.seeEditPostBtnWrapper}>
          <Link to={`/job/${jobId}`} className="primaryBtn">
            Edit post
          </Link>
        </div>
        <span
          className={styles.CloseIconWrapper}
          onClick={() => handleDeleteJobPost(jobId)}
        >
          <CloseIcon />
        </span>
      </div>
    </div>
  );
}

{
  /* <div key={job._id} className={styles.myJob}>
<div className={styles.JobTypeAndJobTitleWrapper}>
  <p className={styles.jobTitle}>{job?.jobTitle}</p>
  {jobType === "InHouseJob" ? (
    <>
      <div className={styles.InHouseJob}>
        <span className={styles.inHouseDot}></span>
        <span className={styles.jobTypeText}>In-House</span>
      </div>
    </>
  ) : (
    <div className={styles.InHouseJob}>
      <span className={styles.remoteDot}></span>
      <span className={styles.jobTypeText}>Remote</span>
    </div>
  )}
</div>

<div className={styles.JobStatusWrapper}>
  <span className={styles.remoteDot}></span>
  <span>Active</span>
</div>

<div className={styles.actionsWrapper}>
  <div className={styles.seeApplicatntsBtnWrapper}>
    <Link
      to={`/applicants/${_id}`}
      className={styles.seeApplicatntsBtn}
    >
      See applicants
    </Link>
  </div>

  <div className={styles.seeJobDetailsBtnWrapper}>
    <Link to={`/job/${jobId}`} className="primaryBtn">
      See Job post
    </Link>
  </div>
  <div className={styles.seeEditPostBtnWrapper}>
    <Link to={`/job/${jobId}`} className="primaryBtn">
      Edit post
    </Link>
  </div>
  <span
    className={styles.CloseIconWrapper}
    onClick={() => handleDeleteJobPost(jobId)}
  >
    <CloseIcon />
  </span>
</div>
</div> */
}
