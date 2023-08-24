import React, { useState } from "react";
import { useSelector } from "react-redux";
import ErrorIcon from "../../../components/SVG/ErrorIcon";
import { useCreateJobMutation } from "../../../features/jobSlice/jobApi";
import styles from "./PostJob.module.css";
import ExperienceInput from "./postJobComp/ExperienceInput";
import FullTimePartTime from "./postJobComp/FullTimePartTime";
import JobDescription from "./postJobComp/JobDescription";
import JobTitle from "./postJobComp/JobTitle";
import JobType from "./postJobComp/JobType";
import SalaryInput from "./postJobComp/SalaryInput";

export default function PostJob() {
  const [error, setError] = useState({
    probationPeriodError: false,
    probationSalaryError: false,
    joinDateError: false,
    applyEndDateError: false,
    jobTypeError: false,
    employeeTypeError: false,
    numberOfOpenError: false,
    descriptionError: false,
  });

  // Getting The user data through redux
  const { user } = useSelector((state) => state.authSlice);
  const { companyInfo } = useSelector((state) => state.companySlice);

  // Internal state for form data management
  const [probation, setProbation] = useState({
    probation: false,
    probationPeriodTime: "Month",
    probationPeriodNumber: "",
    probationCurrencyType: "USD",
    probationDuringSalary: "",
  });
  const [jobTitle, setJobTitle] = useState({
    title: "",
    error: false,
  });
  const [experience, setExperience] = useState({
    selectedExperience: "0 - 2 Years",
    error: false,
  });
  const [joinDate, setJoinDate] = useState("");
  const [applyEndDate, setApplyEndDate] = useState("");
  const [jobType, setJobType] = useState({
    error: false,
    jobType: "",
  });
  const [fullTimePartTime, setFullTimePartTime] = useState({
    error: false,
    fullTimePartTime: "",
  });
  const [numberOfOpen, setNumberOfOpen] = useState("");
  const [description, setDescription] = useState({
    error: false,
    description: "",
  });
  const [salary, setSalary] = useState({
    selectedCurrency: "USD",
    salaryFrequency: "Month",
    salaryAmount: "",
    salaryRange: { from: "", to: "" },
    salaryType: "Fixed",
    error: false,
  });

  const [createJob, { data, isError }] = useCreateJobMutation();

  const handleSubmitPost = () => {
    const newJob = {
      companyId: user?.companyId,
      companyName: companyInfo?.companyName,
      companyLocation: companyInfo?.companyLocation,
      userId: user?._id,
      probation,
      jobTitle,
      experience,
      salary,
      joinDate,
      applyEndDate,
      jobType,
      numberOfOpen,
      description,
    };

    if (jobTitle?.title?.length > 8) {
      newJob.jobTitle = jobTitle?.title;
    } else {
      return setJobTitle({ ...jobTitle, error: true });
    }
    if (experience.selectedExperience) {
      newJob.experience = experience.selectedExperience;
    } else {
      return setExperience({ ...experience, error: true });
    }
    if (
      salary?.salaryAmount.length <= 0 &&
      salary.salaryRange.from.length <= 0 &&
      salary.salaryRange.to.length <= 0
    ) {
      return setSalary({ ...salary, error: true });
    } else {
      if (salary.salaryType === "Fixed") {
        newJob.salary = {
          selectedCurrency: salary?.selectedCurrency,
          salaryFrequency: salary?.salaryFrequency,
          salaryRange: { to: salary?.salaryAmount },
        };
      } else if (salary.salaryType === "basedOnPerformance") {
        newJob.salary = {
          selectedCurrency: salary?.selectedCurrency,
          salaryFrequency: salary?.salaryFrequency,
          salaryRange: {
            from: salary?.salaryRange.from,
            to: salary?.salaryRange.to,
          },
        };
      }
    }
    if (!joinDate) {
      return setError({ ...error, joinDateError: true });
    }
    if (!applyEndDate) {
      return setError({ ...error, applyEndDateError: true });
    }
    if (!jobType?.jobType) {
      return setJobType({ ...jobType, error: true });
    } else {
      newJob.jobType = jobType?.jobType;
    }
    if (probation.probation) {
      if (!probation.probationPeriodNumber) {
        return setError({ ...error, probationPeriodError: true });
      }
      if (!probation.probationDuringSalary) {
        return setError({ ...error, probationSalaryError: true });
      }
    }
    if (!numberOfOpen) {
      return setError({ ...error, numberOfOpenError: true });
    }
    if (description?.description?.length > 10) {
      newJob.description = description?.description;
    } else {
      return setDescription({ ...description, error: true });
    }
    createJob(newJob);
  };

  return (
    <div className="container">
      <div className={styles.InputFormWrapper}>
        <div className={styles.inputWrapper}>
          <JobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />
        </div>

        {/* Experience */}
        <ExperienceInput
          experience={experience}
          setExperience={setExperience}
        />

        {/* Salary */}
        <SalaryInput salary={salary} setSalary={setSalary} />

        {/* Join Date and Apply date */}
        <div className={styles.JoinDateAndJobExpireWrapper}>
          {/* Join Date */}
          <div style={{ width: "300px" }}>
            <label htmlFor="joinDate">Join date:</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              className={styles.input}
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              onClick={() => setError({ ...error, joinDateError: false })}
            />
            <div
              className={` ${styles.errorWrapper} ${
                error.joinDateError && styles.seeError
              }`}
            >
              <ErrorIcon />
              <span className={styles.error}>
                You must provide a job join date!
              </span>
            </div>
          </div>

          {/* Job Expires In */}
          <div style={{ width: "300px" }}>
            <label htmlFor="applyEndTime">Apply End time:</label>
            <input
              type="date"
              id="applyEndTime"
              name="applyEndTime"
              value={applyEndDate}
              onChange={(e) => setApplyEndDate(e.target.value)}
              onClick={() => setError({ ...error, applyEndDateError: false })}
              className={styles.input}
            />
            <div
              className={` ${styles.errorWrapper} ${
                error.applyEndDateError && styles.seeError
              }`}
            >
              <ErrorIcon />
              <span className={styles.error}>
                You must provide a job apply end date!
              </span>
            </div>
          </div>
        </div>

        <JobType jobType={jobType} setJobType={setJobType} />
        <FullTimePartTime
          fullTimePartTime={fullTimePartTime}
          setFullTimePartTime={setFullTimePartTime}
        />

        {/* Probation */}
        <div className={styles.inputWrapper}>
          <label htmlFor="Probation">Probation*</label>
          <input
            className="secondary-custom-checkbox"
            type="checkbox"
            name="Probation"
            id="Probation"
            checked={probation.probation}
            onChange={(e) =>
              setProbation({ ...probation, probation: e.target.checked })
            }
          />
          <label htmlFor="Probation">Probation</label>

          <div
            className={`${styles.probationDetails} ${
              probation?.probation && styles.probationDetailsExpand
            }`}
          >
            {/* Probation Details */}
            <div className={styles.inputWrapper}>
              <div className={styles.SalaryDuringProbation}>
                <label htmlFor="">Probation Duration</label>
                <div className={styles.CurrenciesAndAmountWrapper}>
                  <div className={styles.CurrenciesWrapper}>
                    <select
                      name="Probation"
                      id="Probation"
                      className="custom-select"
                      value={probation.probationPeriodTime}
                      onChange={(e) =>
                        setProbation({
                          ...probation,
                          probationPeriodTime: e.target.value,
                        })
                      }
                    >
                      <option value="Day">Day</option>
                      <option value="Month">Month</option>
                      <option value="Year">Year</option>
                    </select>
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      className={styles.input}
                      type="text"
                      name="salary"
                      id="salary"
                      value={probation.probationPeriodNumber}
                      onChange={(e) =>
                        setProbation({
                          ...probation,
                          probationPeriodNumber: e.target.value,
                        })
                      }
                      onClick={() =>
                        setError({ ...error, probationPeriodError: false })
                      }
                      placeholder="Enter Probation period"
                    />
                    <div
                      className={` ${styles.errorWrapper} ${
                        error.probationPeriodError && styles.seeError
                      }`}
                    >
                      <ErrorIcon />
                      <span className={styles.error}>
                        Please select a job type!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.SalaryDuringProbation}>
              <label htmlFor="Probation">Salary during probation</label>
              <div className={styles.CurrenciesAndAmountWrapper}>
                <div className={styles.CurrenciesWrapper}>
                  <select
                    name="probationCurrencyType"
                    id="probationCurrencyType"
                    className="custom-select"
                    value={probation.probationCurrencyType}
                    onChange={(e) =>
                      setProbation({
                        ...probation,
                        probationCurrencyType: e.target.value,
                      })
                    }
                  >
                    <option value="USD">USD</option>
                    <option value="EURO">EURO</option>
                    <option value="BDT">BDT</option>
                    <option value="INR">Indian Ruppe(INR)</option>
                  </select>
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    type="text"
                    name="Probation"
                    id="Probation"
                    value={probation.probationDuringSalary}
                    onChange={(e) =>
                      setProbation({
                        ...probation,
                        probationDuringSalary: e.target.value,
                      })
                    }
                    onClick={() =>
                      setError({ ...error, probationSalaryError: false })
                    }
                    placeholder="Monthly salary during probation"
                  />
                  <div
                    className={` ${styles.errorWrapper} ${
                      error.probationSalaryError && styles.seeError
                    }`}
                  >
                    <ErrorIcon />
                    <span className={styles.error}>
                      Please select a job type!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Numbers of opening */}
        <div className={styles.inputWrapper}>
          <label htmlFor="companyName">Numbers of opening*</label>
          <input
            className={styles.input}
            type="number"
            name="numbersInOpening"
            id="numbersInOpening"
            placeholder="Numbers of opening"
            value={numberOfOpen}
            onChange={(e) => setNumberOfOpen(e.target.value)}
            onClick={() => setError({ ...error, numberOfOpenError: false })}
          />
          <div
            className={` ${styles.errorWrapper} ${
              error.numberOfOpenError && styles.seeError
            }`}
          >
            <ErrorIcon />
            <span className={styles.error}>
              Please specify the number of job oppurtunity you have!
            </span>
          </div>
        </div>

        {/* Job Description */}
        <JobDescription
          description={description}
          setDescription={setDescription}
        />

        <div>
          <button
            type="submit"
            className="primaryBtn"
            onClick={() => handleSubmitPost()}
          >
            Post job
          </button>
        </div>
      </div>
    </div>
  );
}
