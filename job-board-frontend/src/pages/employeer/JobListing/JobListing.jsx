import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadinSVG from "../../../components/Loading/LoadinSVG";
import ConfirmModal from "../../../components/Modals/ConfirmModal";
import {
  useDeleteJobMutation,
  useGetEmployeerJobListQuery,
} from "../../../features/jobSlice/jobApi";
import JobListCard from "./JobListCard";
import styles from "./JobListing.module.css";

export default function JobListing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { user } = useSelector((state) => state.authSlice);
  const {
    data: employeerJobList,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetEmployeerJobListQuery({ companyId: user?.companyId });
  // Delete job post Redux Mutation
  const [deleteJob] = useDeleteJobMutation();

  const handleConfirmDelete = () => {
    console.log(itemToDelete);

    // Perform your delete logic here
    if (itemToDelete) {
      deleteJob(itemToDelete);
      refetch();
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  // Deleting a job
  const handleDeleteJobPost = (jobId) => {
    setItemToDelete(jobId);
    setIsModalOpen(true);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="pageLoadingWrapper">
        <LoadinSVG />
      </div>
    );
  }

  if (!isLoading && !isError && employeerJobList?.jobs?.length > 0) {
    content = (
      <div className={styles.JobListingPageWrapper}>
        <ConfirmModal
          isOpen={isModalOpen}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <h1 className={styles.JobListingTitle}>Job Listing</h1>
        <div className={styles.myJobListWrapper}>
          {employeerJobList?.jobs?.map((job) => {
            return (
              <JobListCard
                key={job?._id}
                job={job}
                handleDeleteJobPost={handleDeleteJobPost}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (!isLoading && !isError && employeerJobList?.jobs?.length === 0) {
    content = (
      <div className={styles.noJobFoundWrapper}>
        <p className={styles.noJobFoundText}>No job found!</p>
      </div>
    );
  }

  return <div className="container">{content}</div>;
}
