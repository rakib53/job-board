import React from "react";
import styles from "../Dashboard.module.css";

import { AiOutlineEye } from "react-icons/ai";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import BarChart from "./BarChart";

export default function JobStatics({ companyInfo }) {
  return (
    <div className={styles.jobDashboardStatic}>
      <div className={styles.barCharInfo}>
        <div className={styles.barChartWrapper}>
          <BarChart statics={companyInfo?.statics} />
        </div>

        <div className={styles.staticInfoCardWrapper}>
          <div className={styles.staticInfoCard}>
            <div className={styles.staticInfoCardHeader}>
              <h3 className={styles.staticTitle}>Job Views</h3>
              <AiOutlineEye className={styles.views} />
            </div>
            <p className={styles.staticValue}>
              {companyInfo?.statics?.jobAppliedReport?.totalJobApplied}
            </p>
            <p className={styles.report}>
              This week
              <span className={styles.growUp}>
                6.4% <FaArrowTrendUp />
              </span>
            </p>
          </div>
          <div className={styles.staticInfoCard}>
            <div className={styles.staticInfoCardHeader}>
              <h3 className={styles.staticTitle}>Job applied</h3>
              <RiTodoLine className={styles.job} />
            </div>
            <p className={styles.staticValue}>
              {companyInfo?.statics?.jobViewsReport?.totalJobViews}
            </p>
            <p className={styles.report}>
              This week{" "}
              {companyInfo?.statics?.jobAppliedReport?.thisWeek -
                companyInfo?.statics?.jobAppliedReport?.previousWeek}
              <span className={styles.growDown}>
                6.4% <FaArrowTrendDown />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
