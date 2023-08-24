import React from "react";
import styles from "../../FilterAndJob/FilterAndJob.module.css";

export default function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.arrow} ${styles.ArrowLeftIcon}`}
      viewBox="0 -960 960 960"
    >
      <path d="M655-80 255-480l400-400 56 57-343 343 343 343-56 57Z" />
    </svg>
  );
}
