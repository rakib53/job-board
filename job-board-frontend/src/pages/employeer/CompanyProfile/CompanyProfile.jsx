import React from "react";
import { useSelector } from "react-redux";
import companyLogo from "../../../assets/companyLogo.png";
import EmployeesIcon from "../../../components/SVG/companyProfileIcons/EmployeesIcon";
import FoundedIcon from "../../../components/SVG/companyProfileIcons/FoundedIcon";
import IndusrtyIcon from "../../../components/SVG/companyProfileIcons/IndusrtyIcon";
import PlusIcon from "../../../components/SVG/companyProfileIcons/PlusIcon";
import CompanyLocationIcon from "../../../components/SVG/companyProfileIcons/companyLocationIcon";
import styles from "./CompanyProfile.module.css";

export default function CompanyProfile() {
  const { companyInfo } = useSelector((state) => state.companySlice);
  return (
    <div className="container">
      <div className={styles.companyProfileWrapper}>
        <div className={styles.companyProfileInfoWrapper}>
          <div className={styles.companyLogoWrapper}>
            <img className={styles.companyLogo} src={companyLogo} alt="" />
          </div>
          <div>
            <div className={styles.companyInfoHeader}>
              <div>
                <h1 className={styles.companyName}>
                  {companyInfo?.companyName}
                </h1>
                <p className={styles.webURL}>{companyInfo?.companyWebUrl}</p>
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
                    {companyInfo?.employees}+
                  </span>
                </div>
              </div>

              <div className={styles.companyInfoCard}>
                <span className={styles.companyProfileIconWrapper}>
                  <CompanyLocationIcon />
                </span>
                <div>
                  <p className={styles.InfoType}>Location</p>
                  <span className={styles.InfoValue}>
                    {companyInfo?.companyLocation}
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
                    {companyInfo?.companyType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className={styles.aboutTheCompany}>About the company</h3>
          <p className={styles.companyDesc}>
            {companyInfo?.companyDescription}
          </p>
        </div>

        <div>
          <div>
            <h3>Latest open position</h3>
            <p>show all job</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
