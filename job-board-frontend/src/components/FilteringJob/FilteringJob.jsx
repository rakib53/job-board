import React, { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import styles from "./FilteringJob.module.css";

export default function FilteringJob({ searchQuery, setSearchQuery }) {
  const [isOpenYearFilter, setIsOpenYearFilter] = useState(false);
  const [filterYear, setFilterYear] = useState(null);
  const expandYearMenuRef = useRef();

  // Open year filter
  const handleOpenYearFilter = () => {
    if (isOpenYearFilter) {
      setIsOpenYearFilter(false);
    } else {
      setIsOpenYearFilter(true);
    }
  };

  // Select an year
  const handleFilterYear = (year, yearValue) => {
    setFilterYear(year);
    setSearchQuery({ ...searchQuery, experience: yearValue });
    setIsOpenYearFilter(false);
  };

  // setting up the salary query to salary search query
  const handleSelectSalary = (salary) => {
    const salarySplit = salary.split("-");
    const salaryMin = parseInt(salarySplit[0]);
    const salaryMax = parseInt(salarySplit[1]);

    if (salaryMin || salaryMax) {
      setSearchQuery({
        ...searchQuery,
        salary: {
          ...searchQuery?.salary,
          salaryMin: salaryMin,
          salaryMax: salaryMax,
        },
      });
    }
  };

  // checking if the user click outside of the
  useEffect(() => {
    function handleClickOutSide(event) {
      if (
        expandYearMenuRef.current &&
        !expandYearMenuRef.current.contains(event.target)
      ) {
        setIsOpenYearFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [expandYearMenuRef, isOpenYearFilter]);

  return (
    <div className={styles.filterParentWrapper}>
      <div className={styles.FilterTitleWrapper}>
        <p className={styles.filterText}>Filter</p>
      </div>
      {/* work location filter  */}
      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Work location</h3>
        <div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="defaultWorkLocation"
              name="workLocation"
              value={""}
              checked={searchQuery?.workLocation === ""}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, workLocation: e.target.value })
              }
            />
            <label htmlFor="defaultWorkLocation">Default</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="In-house"
              name="workLocation"
              value={"InHouse"}
              checked={searchQuery?.workLocation === "InHouse"}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, workLocation: e.target.value })
              }
            />
            <label htmlFor="In-house">In-house</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="Remote"
              name="workLocation"
              value={"Remote"}
              checked={searchQuery?.workLocation === "Remote"}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, workLocation: e.target.value })
              }
            />
            <label htmlFor="Remote">Remote</label>
          </div>
        </div>
      </div>

      {/* Employment filter  */}
      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Type of Employment</h3>
        <div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="defaultJobType"
              name="jobType"
              value={""}
              checked={searchQuery?.jobType === ""}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, jobType: e.target.value })
              }
            />
            <label htmlFor="defaultJobType">Default</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="fullTime"
              name="jobType"
              value={"fullTime"}
              checked={searchQuery?.jobType === "fullTime"}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, jobType: e.target.value })
              }
            />
            <label htmlFor="fullTime">Full-time</label>
          </div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="partTime"
              name="jobType"
              value={"partTime"}
              checked={searchQuery?.jobType === "partTime"}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, jobType: e.target.value })
              }
            />
            <label htmlFor="partTime">Part-time</label>
          </div>
        </div>
      </div>

      {/* Salary filter  */}
      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Salary range</h3>
        <div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="1OrAvobe"
              name="salary"
              value={"1"}
              onChange={(e) => handleSelectSalary(e.target.value)}
            />
            <label htmlFor="1OrAvobe">Default</label>
          </div>
          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="100-1000"
              name="salary"
              value={"100-1000"}
              onChange={(e) => handleSelectSalary(e.target.value)}
            />
            <label htmlFor="100-1000">$100 - $700</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="700-1500"
              name="salary"
              value={"700-1500"}
              onChange={(e) => handleSelectSalary(e.target.value)}
            />
            <label htmlFor="700-1500">$700 - $1500</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="1500-2000"
              name="salary"
              value={"1500-2000"}
              onChange={(e) => handleSelectSalary(e.target.value)}
            />
            <label htmlFor="1500-2000">$1500 - $2000</label>
          </div>

          <div className={styles.filter}>
            <input
              className="secondary-custom-checkbox"
              type="radio"
              id="2000OrAvobe"
              name="salary"
              value={"2000-Avobe"}
              onChange={(e) => handleSelectSalary(e.target.value)}
            />
            <label htmlFor="2000OrAvobe">$2000 or avobe</label>
          </div>
        </div>
      </div>

      {/* Experience filter  */}
      <div className={styles.filterWrapper}>
        <h3 className={styles.filterTitle}>Years of experience</h3>
        <div className={styles.yearsOfExperienceField}>
          <div
            className={styles.YearfileldContent}
            onClick={() => handleOpenYearFilter()}
            ref={expandYearMenuRef}
          >
            <span>{filterYear ? filterYear : "Select year"}</span>
            <IoChevronDown />
          </div>

          <div
            className={`${styles.yearsWraper} ${
              isOpenYearFilter && styles.activeYearsWraper
            }`}
          >
            <span onClick={(e) => handleFilterYear("Fresher", "0")}>
              Fresher
            </span>
            <span onClick={(e) => handleFilterYear("1 year", "1")}>1 year</span>
            <span onClick={(e) => handleFilterYear("2 years", "2")}>
              2 years
            </span>
            <span onClick={(e) => handleFilterYear("3 years", "3")}>
              3 years
            </span>
            <span onClick={(e) => handleFilterYear("4 years", "4")}>
              4 years
            </span>
            <span onClick={(e) => handleFilterYear("5 years", "5")}>
              5 years
            </span>
            <span onClick={(e) => handleFilterYear("5+ years", "6")}>
              5+ years
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
