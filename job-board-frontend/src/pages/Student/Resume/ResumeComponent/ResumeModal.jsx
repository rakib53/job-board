import React from "react";
import { useDispatch } from "react-redux";
import {
  closeModal,
  setModalPropsValue,
  setModalType,
} from "../../../../features/resumeSlice/resumeSlice";
import styles from "./ResumeComponent.module.css";

export default function ResumeModal({ modalTitle, children }) {
  const dispatch = useDispatch();

  // Closing the modal
  const handleCloseModal = () => {
    dispatch(setModalPropsValue({}));
    dispatch(setModalType(""));
    dispatch(closeModal());
  };

  return (
    <div className={`${styles.openModal}`}>
      <div className={`${styles.modalContent}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modalTitle}</h2>
          <svg
            onClick={handleCloseModal}
            className={styles.closeModalIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#667085"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}
