import React from "react";
import { useSelector } from "react-redux";
import styles from "../SignUp.module.css";

export default function AccountProgressBar() {
  // User Data
  const { user } = useSelector((state) => state.authSlice);
  const { accountCompeletation } = user;

  return (
    <div className={styles.progressBar}>
      <span
        style={{
          width: accountCompeletation ? `${accountCompeletation}%` : `0`,
        }}
        className={styles.innerProgressBar}
      ></span>
    </div>
  );
}
