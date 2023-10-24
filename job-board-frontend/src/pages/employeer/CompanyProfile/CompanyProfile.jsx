import React from "react";
import { MdOutlineTempleHindu } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmployeesIcon from "../../../components/SVG/companyProfileIcons/EmployeesIcon";
import FoundedIcon from "../../../components/SVG/companyProfileIcons/FoundedIcon";
import IndusrtyIcon from "../../../components/SVG/companyProfileIcons/IndusrtyIcon";
import PlusIcon from "../../../components/SVG/companyProfileIcons/PlusIcon";
import { useGetCompanyInformationQuery } from "../../../features/companySlice/companyApi";
import { useGetEmployeerJobListQuery } from "../../../features/jobSlice/jobApi";
import JobListCard from "../JobListing/JobListCard";
import styles from "./CompanyProfile.module.css";

export default function CompanyProfile() {
  const { user } = useSelector((state) => state.authSlice);

  // Getting the company ID
  const {
    data: company,
    isLoading,
    isError,
  } = useGetCompanyInformationQuery(
    { companyId: user?.companyId },
    {
      skip: !user?.companyId,
    }
  );

  const { data: employeerJobList, isLoading: employeerListLoading } =
    useGetEmployeerJobListQuery({
      companyId: user?.companyId,
    });

  if (isLoading) {
    return (
      <div className="initialLoadingWrapper">
        <div className="contentLoader"></div>
      </div>
    );
  }

  let content;

  if (employeerListLoading) {
    content = (
      <div className="initialLoadingWrapper">
        <div className="contentLoader"></div>
      </div>
    );
  }

  if (!employeerListLoading && employeerJobList?.jobs?.length > 0) {
    content = employeerJobList?.jobs.slice(0, 5).map((job) => {
      return <JobListCard key={job?._id} job={job} />;
    });
  }

  return (
    <div className="container">
      <div className={styles.companyProfileWrapper}>
        <div className={styles.companyProfileInfoWrapper}>
          <div className={styles.companyLogoWrapper}>
            <img
              className={styles.companyLogo}
              src={company?.companyInfo?.companyLogo}
              alt=""
            />
          </div>
          <div>
            <div className={styles.companyInfoHeader}>
              <div>
                <h1 className={styles.companyName}>
                  {company?.companyInfo?.companyName}
                </h1>
                <p className={styles.webURL}>
                  {company?.companyInfo?.companyWebUrl}
                </p>
              </div>
              <div className={styles.postAJobBtnWrapper}>
                <button className="primaryBtn">
                  <PlusIcon></PlusIcon>

                  <span> Post a job</span>
                </button>
              </div>
            </div>
            <div className={styles.companyInfoBody}>
              <div className={styles.companyInfoCard}>
                <span className={styles.companyProfileIconWrapper}>
                  <FoundedIcon />
                </span>
                <div>
                  <p className={styles.InfoType}>Founded</p>
                  <span className={styles.InfoValue}>31 july 2011</span>
                </div>
              </div>
              <div className={styles.companyInfoCard}>
                <span className={styles.companyProfileIconWrapper}>
                  <EmployeesIcon />
                </span>
                <div>
                  <p className={styles.InfoType}>Employees</p>
                  <span className={styles.InfoValue}>
                    {company?.companyInfo?.employees}+
                  </span>
                </div>
              </div>

              <div className={styles.companyInfoCard}>
                <span className={styles.companyProfileIconWrapper}>
                  <MdOutlineTempleHindu />
                </span>
                <div>
                  <p className={styles.InfoType}>Location</p>
                  <span className={styles.InfoValue}>
                    {company?.companyInfo?.companyLocation}
                  </span>
                </div>
              </div>

              <div className={styles.companyInfoCard}>
                <span className={styles.companyProfileIconWrapper}>
                  <IndusrtyIcon />
                </span>
                <div>
                  <p className={styles.InfoType}>Industry type</p>
                  <span className={styles.InfoValue}>
                    {company?.companyInfo?.companyType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className={styles.aboutTheCompany}>About the company</h3>
          <p className={styles.companyDesc}>
            {company?.companyInfo?.companyDescription}
          </p>
        </div>

        <div>
          <div className={styles.jobPositionHeader}>
            <h3>Latest open position</h3>
            <Link to={"/employeer/my-joblist"} className={styles.showAllJob}>
              show all job
            </Link>
          </div>
          <div className={styles.jobListWrapper}>{content}</div>
        </div>
      </div>
    </div>
  );
}
