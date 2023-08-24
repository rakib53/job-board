import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import SavedJobLoadinAnimation from "../../../assets/SavedJobLoadinAnimation.svg";
import {
  useGetSavedJobQuery,
  usePostSavedJobMutation,
} from "../../../features/jobSlice/jobApi";
import styles from "../JobDetails.module.css";

export default function SavedJob({ userId, jobId, companyId }) {
  const [postSavedJob, { data, isLoading, isSuccess }] =
    usePostSavedJobMutation();

  const { data: isSavedJob, refetch } = useGetSavedJobQuery({
    userId,
    jobId,
  });

  const handlePostSavedJob = () => {
    const savedJobObj = {
      jobId,
      userId,
      companyId,
    };

    if (jobId && savedJobObj?.userId && savedJobObj?.companyId) {
      postSavedJob(savedJobObj);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <>
      {isSavedJob?.userId ? (
        isLoading ? (
          <img src={SavedJobLoadinAnimation} alt="" />
        ) : (
          <AiFillHeart
            className={styles.fillHeart}
            onClick={() => {
              handlePostSavedJob(jobId);
            }}
          />
        )
      ) : isLoading ? (
        <img src={SavedJobLoadinAnimation} alt="" />
      ) : (
        <AiOutlineHeart
          className={styles.emptyHeart}
          onClick={() => {
            handlePostSavedJob(jobId);
          }}
        />
      )}
    </>
  );
}
