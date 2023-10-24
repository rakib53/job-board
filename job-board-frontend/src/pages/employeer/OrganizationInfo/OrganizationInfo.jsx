import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCompanayMutation } from "../../../features/auth/authApi";
import styles from "./OrganizationInfo.module.css";

export default function OrganizationInfo() {
  // getInputData
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyWebUrl, setCompanyWebUrl] = useState("");
  const [employees, setEmployees] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  // Input field empty or error handling state
  const [error, setError] = useState({
    companyNameError: false,
    companyLogoError: false,
    companyWebUrlError: false,
    companyDescriptionError: false,
    employeesError: false,
    companyTypeError: false,
    locationError: false,
  });
  const nagivate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [
    addCompany,
    { data: addCompanyResponse, isError, isLoading, isSuccess },
  ] = useAddCompanayMutation();

  const handleSubmitCompanyInfo = () => {
    const userData = {
      userId: user?._id,
      companyName,
      companyLogo,
      companyWebUrl,
      companyDescription,
      employees,
      companyType,
      companyLocation,
    };
    if (
      (user?._id,
      companyName,
      companyLogo,
      companyWebUrl,
      companyDescription,
      employees,
      companyType,
      companyLocation)
    ) {
      // Add company
      addCompany(userData);
    }
  };

  useEffect(() => {
    if (user?.companyId) {
      nagivate(from);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="initialLoadingWrapper">
        <div className="contentLoader"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.InputFormWrapper}>
        <div className={styles.inputGroupWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="companyName">Company name*</label>
            <input
              className={styles.input}
              type="text"
              name="companyName"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="companyWebsite">Website*</label>
            <input
              className={styles.input}
              type="text"
              name="companyWebsite"
              id="companyWebsite"
              value={companyWebUrl}
              onChange={(e) => setCompanyWebUrl(e.target.value)}
              placeholder="Enter company website"
            />
          </div>
        </div>

        <div className={styles.inputGroupWrapper}>
          {/* Job Numbers of opening */}
          <div className={styles.inputWrapper}>
            <label htmlFor="numbersOfEmolpuyees">Numbers of Employees*</label>
            <input
              className={styles.input}
              type="number"
              name="numbersOfEmolpuyees"
              id="numbersOfEmolpuyees"
              value={employees}
              onChange={(e) => setEmployees(e.target.value)}
              placeholder="Numbers of Employees"
            />
          </div>

          {/* Job Description */}
          <div className={styles.inputWrapper}>
            <label htmlFor="companyLocation">Location*</label>
            <input
              className={styles.input}
              type="text"
              name="companyLocation"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
              id="companyLocation"
              placeholder="Enter company location"
            />
          </div>
        </div>

        {/* Indurstry type */}
        <div className={styles.inputWrapper}>
          <label htmlFor="IndurstryType">Indurstry type*</label>
          <input
            className={styles.input}
            type="text"
            name="IndurstryType"
            id="IndurstryType"
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            placeholder="Enter job description"
          />
        </div>

        {/* Job Description */}
        <div className={styles.inputWrapper}>
          <label htmlFor="jobDescription">About company*</label>
          <textarea
            className={styles.companyDescription}
            type="text"
            name="jobDescription"
            id="jobDescription"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder="Enter job description"
          />
        </div>

        <div className={styles.SaveInfoWrapper}>
          <button
            type="submit"
            className="primaryBtn"
            onClick={() => handleSubmitCompanyInfo()}
          >
            {from.includes("post-job") ? "Proceed Job post" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
