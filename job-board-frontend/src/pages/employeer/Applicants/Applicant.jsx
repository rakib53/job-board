import React, { useEffect, useRef, useState } from "react";
import ApplicantsIcon from "../../../components/SVG/ApplicantsIcon";
import CloseCoverLetterIcon from "../../../components/SVG/CloseCoverLetterIcon";
import styles from "./Applicants.module.css";

export default function Applicant({ applicant }) {
  const [show, setShow] = useState(false);
  const [seeCoverLetter, setSeeCoverLetter] = useState(false);
  const expandUserMenuRef = useRef(null);
  const expandCoverLetterRef = useRef(null);
  const { userId, jobId } = applicant;

  // excute this function when click on more button
  const handleMoreOption = () => {
    setShow(!show);
  };

  // excute this function when click on see application
  const handleViewCoverLetter = () => {
    setSeeCoverLetter(!seeCoverLetter);
  };

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandUserMenuRef.current &&
        !expandUserMenuRef.current.contains(event.target)
      ) {
        setShow(false);
        // setSeeCoverLetter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandUserMenuRef, show]);

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandCoverLetterRef.current &&
        !expandCoverLetterRef.current.contains(event.target)
      ) {
        setSeeCoverLetter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandCoverLetterRef, show]);

  return (
    <tr>
      <td className={styles.userName}>{userId?.userName}</td>
      <td>Interviewing</td>
      <td>4/5/23</td>
      <td>{jobId?.jobTitle}</td>
      <td className={styles.actionWrapper}>
        <button
          className={styles.seeApplicationBtn}
          onClick={() => handleViewCoverLetter(applicant?.coverLetter)}
        >
          See Application
        </button>

        <span
          className={styles.SeeMoreBtn}
          onClick={handleMoreOption}
          ref={expandUserMenuRef}
        >
          <ApplicantsIcon />

          {show && (
            <div className={styles.actionsWrapper}>
              <ul>
                <li className={styles.menuItem}>
                  <a href="">message</a>
                </li>
                <li className={styles.menuItem}>
                  <a href="">names</a>
                </li>
              </ul>
            </div>
          )}
        </span>
      </td>
      {seeCoverLetter && (
        <div ref={expandCoverLetterRef}>
          <div className={styles.modalCoverLetter}>
            <span
              className={styles.closeBtn}
              onClick={() => setSeeCoverLetter(!seeCoverLetter)}
            >
              <CloseCoverLetterIcon />
            </span>
            <div>
              <div className={styles.coverLetteruserName}>
                Name: {userId?.userName}
              </div>
              <div className={styles.coverLetterJobRole}>
                Role: {jobId?.jobTitle}
              </div>
            </div>
            <p className={styles.coverLetterText}>{applicant?.coverLetter}</p>
          </div>
        </div>
      )}
    </tr>
  );
}
