import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSelectedInterest,
  getSelectedJobTypes,
  getSelectedJobWhereFrom,
} from "../../../features/additionalInformation/additionalInformationSlice";
import { useUpdateUserDataMutation } from "../../../features/auth/authApi";
import ErrorIcon from "../../SVG/ErrorIcon";
import AccountProgressBar from "../AccountProgressBar/AccountProgressBar";
import styles from "../SignUp.module.css";
import CurrentlyLookingFor from "../userAdditionalInfo/CurrentlyLookingFor";
import InterestArea from "../userAdditionalInfo/InterestArea";
import WorkMode from "../userAdditionalInfo/WorkMode";

export default function Preference() {
  const [error, setError] = useState({
    careerInterestError: false,
    jobTypeError: false,
    workModeError: false,
  });
  // navigate
  const navigate = useNavigate();
  const location = useLocation();
  // User General userInformation
  const { user } = useSelector((state) => state.authSlice);
  // Additional userInformation
  const { selectedInterests, selectedJobTypes, selectedJobWhereFrom } =
    useSelector((state) => state.additionalInformationSlice);
  // Update User data
  const [updateUserData, { data: updateUserResponse, isSuccess }] =
    useUpdateUserDataMutation();
  const dispatch = useDispatch();

  const handleSubmitData = (event) => {
    event.preventDefault();

    const userData = {
      userRole: user?.role,
      interestArea: selectedInterests,
      jobTypes: selectedJobTypes,
      jobWhereFrom: selectedJobWhereFrom,
    };

    if (selectedInterests.length === 0) {
      setError({ ...error, careerInterestError: true });
      return;
    }
    if (selectedJobTypes.length === 0) {
      setError({ ...error, jobTypeError: true });
      return;
    }
    if (selectedJobWhereFrom.length === 0) {
      setError({ ...error, workModeError: true });
      return;
    }

    updateUserData(userData);
  };

  // If Successfully send data to server
  useEffect(() => {
    if (isSuccess) {
      dispatch(getSelectedInterest());
      dispatch(getSelectedJobTypes());
      dispatch(getSelectedJobWhereFrom());
      navigate("/student/dashboard");
    }
  }, [updateUserResponse?.user, isSuccess]);

  return (
    <div className={styles.signUpContentWrapper}>
      <div className={styles.signUpContent}>
        <AccountProgressBar />
        <div className={styles.greetingText}>
          <h3 className={styles.greetingTag}>Review your Preference</h3>
          <p
            className={styles.greeting}
            style={{
              fontSize: "16px",
              maxWidth: "500px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            We'have autofilled your preferences matching the job youre looking
            for
          </p>
        </div>

        <div className={styles.AccountInfo}>
          <div className={styles.inputWrapper}>
            <label htmlFor="">
              <span>Popular career interests</span>
              {error.careerInterestError && (
                <div className={styles.errorWrapper}>
                  <ErrorIcon /> <span className={styles.error}>Required</span>
                </div>
              )}
            </label>
            <div
              onClick={() => setError({ ...error, careerInterestError: false })}
            >
              <InterestArea />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">
              <span>Currently Looking for</span>
              {error.jobTypeError && (
                <div className={styles.errorWrapper}>
                  <ErrorIcon /> <span className={styles.error}>Required</span>
                </div>
              )}
            </label>
            <div onClick={() => setError({ ...error, jobTypeError: false })}>
              <CurrentlyLookingFor />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">
              <span>Work Mode</span>
              {error.workModeError && (
                <div className={styles.errorWrapper}>
                  <ErrorIcon /> <span className={styles.error}>Required</span>
                </div>
              )}
            </label>
            <div onClick={() => setError({ ...error, workModeError: false })}>
              <WorkMode />
            </div>
          </div>
        </div>

        <div className={styles.nextBtnWrapper}>
          <button
            type="submit"
            className="primaryBtn"
            onClick={handleSubmitData}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
