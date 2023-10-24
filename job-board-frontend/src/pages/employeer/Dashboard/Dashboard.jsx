import { default as React, useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import buttonLoading from "../../../assets/loading/buttonLoading.svg";
import wavingHand from "../../../assets/waving.png";
import { useGetCompanyInformationQuery } from "../../../features/companySlice/companyApi";
import { getCompanyInfo } from "../../../features/companySlice/companySlice";
import { useGetAllJobsApplicationQuery } from "../../../features/jobApplications/jobApplicationsApi";
import { useGetEmployeerJobListQuery } from "../../../features/jobSlice/jobApi";
import JobListCard from "../JobListing/JobListCard";
import styles from "./Dashboard.module.css";
import JobStatics from "./DashboardComp/JobStatics";

export default function Dashboard() {
  const [applicationRemainReview, setApplicationRemainReview] = useState();
  const { user } = useSelector((state) => state.authSlice);
  const { companyInfo } = useSelector((state) => state.companySlice);

  // Getting the company ID
  const {
    data: company,
    isLoading: companyInfoloading,
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

  const {
    data: allJobsApplications,
    isLoading: allJobsApplicationsLoading,
    isSuccess: allJobsApplicationsSuccess,
  } = useGetAllJobsApplicationQuery(
    { companyId: user?.companyId },
    {
      skip: !user?.companyId,
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (allJobsApplicationsSuccess) {
      const result = allJobsApplications?.applications?.filter(
        (application) => {
          return !application?.viewApplication;
        }
      );

      setApplicationRemainReview(result?.length);
    }
  }, [allJobsApplicationsSuccess, allJobsApplications?.applications]);

  useEffect(() => {
    if (!companyInfoloading && !isError && company?.companyInfo?._id) {
      dispatch(getCompanyInfo(company?.companyInfo));
    }
  }, [company?.companyInfo, companyInfoloading, company?.companyInfo?._id]);

  return (
    <div className="container">
      <div className={styles.userNameAndWavingWrappers}>
        <div className={styles.userNameAndWaving}>
          <h1>Hello, {user?.userName}</h1>
          <img className={styles.wavingHandImamge} src={wavingHand} alt="" />
        </div>
        <p>Here is your overall job statics report!</p>
      </div>

      <div className={styles.appViewScheduleAndMessagedWrapper}>
        <Link
          to={"/employeer/all-applications"}
          className={`${styles.staticCard} ${styles.applicationToView}`}
        >
          <div className={styles.staticCardValueWrapper}>
            {allJobsApplicationsLoading ? (
              <div className={styles.buttonLoadingWrapper}>
                <img src={buttonLoading} className={styles.buttonLoading} />
              </div>
            ) : (
              <>
                <h2 className={styles.amount}>
                  {applicationRemainReview || 0}
                </h2>
                <p className={styles.staticName}>New candidates to review</p>
                <BsArrowRightShort className={styles.arrowRight} />
              </>
            )}
          </div>
        </Link>

        <Link
          to={"/employeer/my-joblist"}
          className={`${styles.staticCard} ${styles.scheduleForToday}`}
        >
          <div className={styles.staticCardValueWrapper}>
            {employeerListLoading ? (
              <div className={styles.buttonLoadingWrapper}>
                <img src={buttonLoading} className={styles.buttonLoading} />
              </div>
            ) : (
              <>
                <h2 className={styles.amount}>
                  {employeerJobList?.jobs?.length || 0}
                </h2>
                <p className={styles.staticName}>Jobs open</p>
                <BsArrowRightShort className={styles.arrowRight} />
              </>
            )}
          </div>
        </Link>

        <div className={`${styles.staticCard} ${styles.messageReceived}`}>
          <div className={styles.staticCardValueWrapper}>
            <h2 className={styles.amount}>0</h2>
            <p className={styles.staticName}>Messaged received</p>
            <BsArrowRightShort className={styles.arrowRight} />
          </div>
        </div>

        <Link
          to={"/employeer/all-applications"}
          className={`${styles.staticCard} ${styles.totalJobApplied}`}
        >
          <div className={styles.staticCardValueWrapper}>
            {allJobsApplicationsLoading ? (
              <div className={styles.buttonLoadingWrapper}>
                <img src={buttonLoading} className={styles.buttonLoading} />
              </div>
            ) : (
              <>
                <div className={styles.staticValueWrapper}>
                  <h3 className={styles.amount}>
                    {allJobsApplications?.applications?.length || 0}
                  </h3>
                  <p className={styles.staticName}>Total job applications</p>
                </div>

                <BsArrowRightShort className={styles.arrowRight} />
              </>
            )}
          </div>
        </Link>
      </div>
      {companyInfoloading ? (
        "Loading..."
      ) : (
        <>
          {companyInfo?.statics ? (
            <JobStatics companyInfo={companyInfo} />
          ) : (
            <div className={styles.noJobStaticFound}>
              <h2>No job static found!</h2>
            </div>
          )}
        </>
      )}

      <div className={styles.jobListWrapper}>
        {employeerJobList?.jobs.slice(0, 5).map((job) => {
          return <JobListCard key={job?._id} job={job} />;
        })}
      </div>
    </div>
  );
}
