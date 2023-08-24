import React from "react";
import { useSelector } from "react-redux";
import wavingHand from "../../../assets/waving.png";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useSelector((state) => state.authSlice);
  return (
    <div className="container">
      <div className={styles.DashboardPageWrapper}>
        {" "}
        <div className={styles.userNameAndWaving}>
          <h1>{user?.userName}!</h1>
          <img className={styles.wavingHandImamge} src={wavingHand} alt="" />
        </div>
        <p>Let’s help you land your dream career</p>
      </div>
    </div>
  );
}
