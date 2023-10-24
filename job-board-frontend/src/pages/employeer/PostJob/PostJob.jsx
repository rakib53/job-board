import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SuccessJobPostModal from "../../../components/Modals/SuccessJobPostModal";
import ErrorIcon from "../../../components/SVG/ErrorIcon";
import { useCreateJobMutation } from "../../../features/jobSlice/jobApi";
import styles from "./PostJob.module.css";
import ExperienceInput from "./postJobComp/ExperienceInput";
import JobDescription from "./postJobComp/JobDescription";
import JobTitle from "./postJobComp/JobTitle";
import JobType from "./postJobComp/JobType";
import JoinAndApplyEndDate from "./postJobComp/JoinAndApplyEndDate";
import NumberOfOpeningJob from "./postJobComp/NumberOfOpeningJob";
import SalaryInput from "./postJobComp/SalaryInput";
import WorkLocation from "./postJobComp/WorkLocation";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Getting The user data through redux
  const { user } = useSelector((state) => state.authSlice);

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
    experienceNumber: "1",
    experienceRange: { from: "0", to: "2" },
    experienceType: "fixedExperience",
    error: false,
    errorMessage: "",
  });
  const [joinDate, setJoinDate] = useState({
    joinDate: "",
    error: false,
  });
  const [applyEndDate, setApplyEndDate] = useState({
    applyEndDate: "",
    error: false,
  });
  const [workLocation, setWorkLocation] = useState({
    error: false,
    workLocation: "",
  });
  const [jobType, setJobType] = useState({
    error: false,
    jobType: "",
  });
  const [numberOfOpen, setNumberOfOpen] = useState({
    numberOfOpen: "",
    error: false,
  });
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

  const [createJob, { data: jobAddedResponse, isLoading, isError, isSuccess }] =
    useCreateJobMutation();

  const handleSubmitPost = () => {
    const newJob = {
      companyId: user?.companyId,
      userId: user?._id,
      probation,
      jobTitle,
      experience,
      salary,
      joinDate,
      applyEndDate,
      jobType,
      workLocation,
      numberOfOpen,
      description,
    };

    if (jobTitle?.title?.length > 8) {
      newJob.jobTitle = jobTitle?.title;
    } else {
      return setJobTitle({ ...jobTitle, error: true });
    }

    if (experience?.experienceType === "fixedExperience") {
      const fixedExperienceYear = parseInt(experience.experienceNumber);
      if (experience?.experienceNumber === "5+") {
        newJob.experience = {
          experienceRange: { to: 6, from: 6 },
        };
      } else {
        newJob.experience = {
          experienceRange: {
            to: fixedExperienceYear,
            from: fixedExperienceYear,
          },
        };
      }
    } else if (experience?.experienceType === "Between") {
      const experienceRangeFrom = parseInt(experience?.experienceRange?.from);
      const experienceRangeTo = parseInt(experience?.experienceRange?.to);
      console.log(experienceRangeFrom, experienceRangeTo);
      if (experience.experienceRange.to === "5+") {
        newJob.experience = {
          experienceRange: { from: experienceRangeFrom, to: 6 },
        };
      } else {
        newJob.experience = {
          experienceRange: { from: experienceRangeFrom, to: experienceRangeTo },
        };
      }
    }

    if (
      salary?.salaryAmount.length <= 0 &&
      salary.salaryRange.from.length <= 0 &&
      salary.salaryRange.to.length <= 0
    ) {
      return setSalary({ ...salary, error: true });
    } else {
      if (salary.salaryType === "Fixed") {
        const currency = salary?.selectedCurrency;
        const salaryFrequency = salary?.salaryFrequency.toLocaleLowerCase();
        let salaryValue = parseInt(salary?.salaryAmount);

        if (currency === "USD") {
          if (salaryFrequency === "day") {
            salaryValue = salaryValue * 30 * 12;
          } else if (salaryFrequency === "month") {
            console.log("USD month");
            salaryValue = salaryValue * 12;
          }
        } else if (currency === "EURO") {
          if (salaryFrequency === "day") {
            salaryValue = salaryValue * 1.07 * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryValue = salaryValue * 1.07 * 12;
          } else if (salaryFrequency === "year") {
            salaryValue = salaryValue * 1.07;
          }
        } else if (currency === "BDT") {
          if (salaryFrequency === "day") {
            salaryValue = salaryValue * 0.0091 * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryValue = salaryValue * 0.0091 * 12;
          } else if (salaryFrequency === "year") {
            salaryValue = salaryValue * 0.0091;
          }
        } else if (currency === "INR") {
          if (salaryFrequency === "day") {
            salaryValue = salaryValue * 0.012 * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryValue = salaryValue * 0.012 * 12;
          } else if (salaryFrequency === "year") {
            salaryValue = salaryValue * 0.012;
          }
        }
        newJob.salary = {
          salaryRange: { from: Math.ceil(salaryValue) },
        };
      } else if (salary.salaryType === "basedOnPerformance") {
        const currency = salary?.selectedCurrency;
        const salaryFrequency = salary?.salaryFrequency.toLocaleLowerCase();
        let salaryFirst = parseInt(salary?.salaryRange.from);
        let salarySecond = parseInt(salary?.salaryRange.to);

        if (currency === "USD") {
          if (salaryFrequency === "day") {
            salaryFirst = salaryFirst * 30 * 12;
            salarySecond = salarySecond * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryFirst = salaryFirst * 12;
            salarySecond = salarySecond * 12;
          }
        } else if (currency === "EURO") {
          if (salaryFrequency === "day") {
            salaryFirst = salaryFirst * 1.07 * 30 * 12;
            salarySecond = salarySecond * 1.07 * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryFirst = salaryFirst * 1.07 * 12;
            salarySecond = salarySecond * 1.07 * 12;
          } else if (salaryFrequency === "year") {
            salaryFirst = salaryFirst * 1.07;
            salarySecond = salarySecond * 1.07;
          }
        } else if (currency === "BDT") {
          if (salaryFrequency === "day") {
            salaryFirst = salaryFirst * 0.0091 * 30 * 12;
            salarySecond = salarySecond * 0.0091 * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryFirst = salaryFirst * 0.0091 * 12;
            salarySecond = salarySecond * 0.0091 * 12;
          } else if (salaryFrequency === "year") {
            salaryFirst = salaryFirst * 0.0091;
            salarySecond = salarySecond * 0.0091;
          }
        } else if (currency === "INR") {
          if (salaryFrequency === "day") {
            salaryFirst = salaryFirst * 0.012 * 30 * 12;
            salarySecond = salarySecond * 0.012 * 30 * 12;
          } else if (salaryFrequency === "month") {
            salaryFirst = salaryFirst * 0.012 * 12;
            salarySecond = salarySecond * 0.012 * 12;
          } else if (salaryFrequency === "year") {
            salaryFirst = salaryFirst * 0.012;
            salarySecond = salarySecond * 0.012;
          }
        }

        newJob.salary = {
          salaryRange: {
            from: Math.ceil(salaryFirst),
            to: Math.ceil(salarySecond),
          },
        };
      }
    }

    if (!joinDate.joinDate) {
      return setJoinDate({ ...joinDate, error: true });
    } else {
      newJob.joinDate = joinDate.joinDate;
    }

    if (!applyEndDate.applyEndDate) {
      return setApplyEndDate({ ...applyEndDate, error: true });
    } else {
      newJob.applyEndDate = applyEndDate.applyEndDate;
    }

    if (workLocation?.workLocation) {
      newJob.workLocation = workLocation?.workLocation;
    } else {
      return setWorkLocation({ ...workLocation, error: true });
    }

    if (jobType?.jobType) {
      newJob.jobType = jobType?.jobType;
    } else {
      return setJobType({ ...jobType, error: true });
    }

    if (probation.probation) {
      if (!probation.probationPeriodNumber) {
        return setError({ ...error, probationPeriodError: true });
      }
      if (!probation.probationDuringSalary) {
        return setError({ ...error, probationSalaryError: true });
      }
    }

    if (!numberOfOpen?.numberOfOpen) {
      return setNumberOfOpen({ ...numberOfOpen, error: true });
    } else {
      newJob.numberOfOpen = parseInt(numberOfOpen?.numberOfOpen);
    }

    if (description?.description?.length > 10) {
      newJob.description = description?.description;
    } else {
      return setDescription({ ...description, error: true });
    }
    createJob(newJob);
    // console.log(newJob);
  };

  // Close the modal when click post another
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJobTitle({ ...jobTitle, title: "" });
    setJobType({ ...jobType, jobType: "" });
    setWorkLocation({ ...workLocation, workLocation: "" });
    setApplyEndDate("");
    setJoinDate("");
    setExperience({
      ...experience,
      experienceType: "fixedExperience",
    });
    setSalary({ ...salary, salaryType: "Fixed", salaryAmount: "" });
    setNumberOfOpen("");
    setDescription({ ...description, description: "" });
  };

  // Open the modal when post created
  useEffect(() => {
    if (jobAddedResponse?.job?._id) {
      setIsModalOpen(true);
    }
  }, [jobAddedResponse]);

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
        <SuccessJobPostModal
          isOpen={isModalOpen}
          content={{ title: "Successfully Added job!" }}
          handleCloseModal={handleCloseModal}
        />

        {/* Job title */}
        <JobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />

        {/* Experience */}
        <ExperienceInput
          experience={experience}
          setExperience={setExperience}
        />

        {/* Salary */}
        <SalaryInput salary={salary} setSalary={setSalary} />

        {/* Join Date and Apply date */}
        <JoinAndApplyEndDate
          joinDate={joinDate}
          setJoinDate={setJoinDate}
          applyEndDate={applyEndDate}
          setApplyEndDate={setApplyEndDate}
        />

        {/* Work location */}
        <WorkLocation
          workLocation={workLocation}
          setWorkLocation={setWorkLocation}
        />

        {/* Job Location */}
        <JobType jobType={jobType} setJobType={setJobType} />

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
        <NumberOfOpeningJob
          numberOfOpen={numberOfOpen}
          setNumberOfOpen={setNumberOfOpen}
        />

        {/* Job Description */}
        <JobDescription
          description={description}
          setDescription={setDescription}
        />

        <div>
          <button
            type="submit"
            className="primaryBtn"
            disabled={isLoading}
            onClick={() => handleSubmitPost()}
          >
            Post job
          </button>
        </div>
      </div>
    </div>
  );
}
