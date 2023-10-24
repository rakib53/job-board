import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSelectedEmployeeType,
  getSelectedGender,
  getSelectedLanguage,
} from "../../../features/additionalInformation/additionalInformationSlice";
import { useUpdateUserDataMutation } from "../../../features/auth/authApi";
import ErrorIcon from "../../SVG/ErrorIcon";
import AccountProgressBar from "../AccountProgressBar/AccountProgressBar";
import styles from "../SignUp.module.css";
import EmployeeType from "../userAdditionalInfo/EmployeeType";
import Gender from "../userAdditionalInfo/Gender";
import Language from "../userAdditionalInfo/Languages";

export default function PersonalInfo() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState({
    userNameError: false,
    contactNumberError: false,
    locationError: false,
    genderError: false,
    languageError: false,
    employeeTypeError: false,
  });
  // navigate
  const navigate = useNavigate();
  const userLocation = useLocation();
  // User General userInformation
  const { user } = useSelector((state) => state.authSlice);
  // Additional userInformation
  const { selectedGender, selectedEmployeeTypes, selectedLanguages } =
    useSelector((state) => state.additionalInformationSlice);
  // Update User data
  const [updateUserData, { data: updateUserResponse, isSuccess }] =
    useUpdateUserDataMutation();
  const dispatch = useDispatch();

  const handleSubmitData = (event) => {
    event.preventDefault();

    const userData = {
      userRole: user?.role,
      userName,
      email,
      contactNumber,
      location,
      gender: selectedGender,
      employeeType: selectedEmployeeTypes,
      language: selectedLanguages,
    };

    if (!userName) {
      setError({ ...error, userNameError: true });
      return;
    }
    if (!contactNumber) {
      setError({ ...error, contactNumberError: true });
      return;
    }
    if (!location) {
      setError({ ...error, locationError: true });
      return;
    }
    if (!selectedGender) {
      setError({ ...error, genderError: true });
      return;
    }
    if (selectedLanguages.length === 0) {
      setError({ ...error, languageError: true });
      return;
    }
    if (!selectedEmployeeTypes) {
      setError({ ...error, employeeTypeError: true });
      return;
    }

    updateUserData(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(getSelectedGender());
      dispatch(getSelectedEmployeeType());
      dispatch(getSelectedLanguage());
      navigate("/preference", {
        replace: true,
        state: userLocation?.state,
      });
    }
  }, [updateUserResponse?.user, isSuccess, userLocation]);

  // Set The default user Name and email after render the component
  useEffect(() => {
    setUsername(user?.userName ? user?.userName : "");
    setEmail(user?.email ? user?.email : "");
  }, []);

  return (
    <div className={styles.signUpContentWrapper}>
      <div className={styles.signUpContent}>
        <AccountProgressBar />
        <div className={styles.greetingText}>
          <p className={styles.greeting}>Hi There👋</p>
          <h3 className={styles.greetingTag}>Let's get started</h3>
        </div>

        <div className={styles.AccountInfo}>
          <div className={styles.inputWrapper}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              className={styles.input}
              name="userName"
              id="userName"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              onClick={() => setError({ ...error, userNameError: false })}
            />
            {error.userNameError && (
              <div className={styles.errorWrapper}>
                <ErrorIcon />
                <span className={styles.error}>Invalid user name</span>
              </div>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              className={styles.input}
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="contactNumber">Contact number</label>
            <input
              type="text"
              className={styles.input}
              name="contactNumber"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Mobile number"
              onClick={() => setError({ ...error, contactNumberError: false })}
            />
            {error.contactNumberError && (
              <div className={styles.errorWrapper}>
                <ErrorIcon />
                <span className={styles.error}>Invalid contact number</span>
              </div>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className={styles.input}
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Current location"
              onClick={() => setError({ ...error, locationError: false })}
            />
            {error.locationError && (
              <div className={styles.errorWrapper}>
                <ErrorIcon />
                <span className={styles.error}>Invalid location</span>
              </div>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">
              <span>Gender</span>
              {error.genderError && (
                <div className={styles.errorWrapper}>
                  <ErrorIcon /> <span className={styles.error}>Required</span>
                </div>
              )}
            </label>
            <div onClick={() => setError({ ...error, genderError: false })}>
              <Gender />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">
              <span>Language you know</span>
              {error.languageError && (
                <div className={styles.errorWrapper}>
                  <ErrorIcon /> <span className={styles.error}>Required</span>
                </div>
              )}
            </label>
            <div onClick={() => setError({ ...error, languageError: false })}>
              <Language />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="">
              <span>Employee type</span>
              {error.employeeTypeError && (
                <div className={styles.errorWrapper}>
                  <ErrorIcon /> <span className={styles.error}>Required</span>
                </div>
              )}
            </label>
            <div
              onClick={() => setError({ ...error, employeeTypeError: false })}
            >
              <EmployeeType />
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
