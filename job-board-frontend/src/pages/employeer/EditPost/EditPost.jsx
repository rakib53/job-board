import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SuccessJobPostModal from "../../../components/Modals/SuccessJobPostModal";
import ErrorIcon from "../../../components/SVG/ErrorIcon";
import {
  useEditJobMutation,
  useGetJobQuery,
} from "../../../features/jobSlice/jobApi";
import styles from "../PostJob/PostJob.module.css";
import ExperienceInput from "../PostJob/postJobComp/ExperienceInput";
import JobDescription from "../PostJob/postJobComp/JobDescription";
import JobTitle from "../PostJob/postJobComp/JobTitle";
import JobType from "../PostJob/postJobComp/JobType";
import JoinAndApplyEndDate from "../PostJob/postJobComp/JoinAndApplyEndDate";
import NumberOfOpeningJob from "../PostJob/postJobComp/NumberOfOpeningJob";
import WorkLocation from "../PostJob/postJobComp/WorkLocation";
import EditSalary from "./EditSalary";

export default function EditPost() {
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
  const { jobId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: jobDetailsResponse, isLoading } = useGetJobQuery({
    jobId: jobId,
  });

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
    salaryAmount: "",
    salaryRange: { from: "", to: "" },
    salaryType: "Fixed",
    error: false,
  });

  const [editJob, { data: editedJobResponse, isError, isSuccess }] =
    useEditJobMutation();

  const handleEditJob = () => {
    const editedJob = {
      jobId,
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
      editedJob.jobTitle = jobTitle?.title;
    } else {
      return setJobTitle({ ...jobTitle, error: true });
    }

    if (experience?.experienceType === "fixedExperience") {
      const fixedExperienceYear = parseInt(experience.experienceNumber);
      if (experience?.experienceNumber === "5+") {
        editedJob.experience = {
          experienceRange: { to: 6, from: 6 },
        };
      } else {
        editedJob.experience = {
          experienceRange: {
            to: fixedExperienceYear,
            from: fixedExperienceYear,
          },
        };
      }
    } else if (experience?.experienceType === "Between") {
      const experienceRangeFrom = parseInt(experience?.experienceRange?.from);
      const experienceRangeTo = parseInt(experience?.experienceRange?.to);

      if (experience.experienceRange.to === "5+") {
        editedJob.experience = {
          experienceRange: { from: experienceRangeFrom, to: 6 },
        };
      } else {
        editedJob.experience = {
          experienceRange: { from: experienceRangeFrom, to: experienceRangeTo },
        };
      }
    }

    if (salary.salaryType === "Fixed") {
      if (salary?.salaryAmount.length <= 0) {
        return setSalary({ ...salary, error: true });
      } else {
        editedJob.salary = {
          salaryRange: { from: salary.salaryAmount },
        };
      }
    } else if (salary.salaryType === "basedOnPerformance") {
      if (
        salary.salaryRange.from.length <= 0 &&
        salary.salaryRange.to.length <= 0
      ) {
        return setSalary({ ...salary, error: true });
      } else {
        editedJob.salary = {
          salaryRange: {
            from: salary.salaryRange.from,
            to: salary.salaryRange.to,
          },
        };
      }
    }

    if (!joinDate.joinDate) {
      return setJoinDate({ ...joinDate, error: true });
    } else {
      editedJob.joinDate = joinDate.joinDate;
    }

    if (!applyEndDate.applyEndDate) {
      return setApplyEndDate({ ...applyEndDate, error: true });
    } else {
      editedJob.applyEndDate = applyEndDate.applyEndDate;
    }

    if (workLocation?.workLocation) {
      editedJob.workLocation = workLocation?.workLocation;
    } else {
      return setWorkLocation({ ...workLocation, error: true });
    }

    if (jobType?.jobType) {
      editedJob.jobType = jobType?.jobType;
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
      editedJob.numberOfOpen = parseInt(numberOfOpen?.numberOfOpen);
    }

    if (description?.description?.length > 10) {
      editedJob.description = description?.description;
    } else {
      return setDescription({ ...description, error: true });
    }
    editJob(editedJob);
  };

  // Open the modal when post created
  useEffect(() => {
    if (editedJobResponse?.job?._id) {
      setIsModalOpen(true);
    }
  }, [editedJobResponse]);

  // setting up the information to the from for editing!
  useEffect(() => {
    if (jobDetailsResponse?.jobDetails?._id) {
      const job = jobDetailsResponse?.jobDetails;
      setJobTitle({ ...jobTitle, title: job?.jobTitle });
      setWorkLocation({ ...workLocation, workLocation: job?.workLocation });
      setJobTitle({ ...jobTitle, title: job?.jobTitle });
      setJobType({ ...jobType, jobType: job?.jobType });
      setJobTitle({ ...jobTitle, title: job?.jobTitle });
      setNumberOfOpen({ ...numberOfOpen, numberOfOpen: job?.numberOfOpen });
      setDescription({ ...description, description: job?.description });
      setApplyEndDate({ ...applyEndDate, applyEndDate: job.applyEndDate });
      setJoinDate({ ...joinDate, joinDate: job?.joinDate });
      if (
        job?.experience?.experienceRange?.from ===
        job?.experience?.experienceRange?.to
      ) {
        if (job?.experience?.experienceRange?.from > 5) {
          setExperience({
            ...experience,
            experienceType: "fixedExperience",
            experienceNumber: "5+",
          });
        } else {
          setExperience({
            ...experience,
            experienceType: "fixedExperience",
            experienceNumber: job?.experience?.experienceRange?.from,
          });
        }
      } else {
        setExperience({
          ...experience,
          experienceType: "Between",
          experienceRange: {
            ...experience.experienceRange,
            from: job?.experience?.experienceRange?.from,
            to: job?.experience?.experienceRange?.to,
          },
        });
      }
      if (job?.salary?.salaryRange?.from && job?.salary?.salaryRange?.to) {
        setSalary({
          ...salary,
          salaryRange: {
            from: job?.salary?.salaryRange?.from,
            to: job?.salary?.salaryRange?.to,
          },
          salaryType: "basedOnPerformance",
          error: false,
        });
      } else {
        setSalary({
          ...salary,
          salaryAmount: job?.salary?.salaryRange?.from,
          salaryType: "Fixed",
          error: false,
        });
      }
    }
  }, [jobDetailsResponse]);

  return (
    <div className="container">
      <div className={styles.InputFormWrapper}>
        <SuccessJobPostModal
          isOpen={isModalOpen}
          content={{
            title: "Successfully edited job!",
            jobId: jobId,
            isEdit: true,
          }}
        />

        {/* Job title */}
        <JobTitle jobTitle={jobTitle} setJobTitle={setJobTitle} />

        {/* Experience */}
        <ExperienceInput
          experience={experience}
          setExperience={setExperience}
        />

        {/* Salary */}
        <EditSalary salary={salary} setSalary={setSalary} />

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
            onClick={() => handleEditJob()}
          >
            Save job
          </button>
        </div>
      </div>
    </div>
  );
}
