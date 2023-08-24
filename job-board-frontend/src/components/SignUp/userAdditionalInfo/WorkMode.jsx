import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedJobWhereFrom } from "../../../features/additionalInformation/additionalInformationSlice";
import styles from "../SignUp.module.css";

const WorkMode = () => {
  // Interest area
  const { jobWhereFrom, selectedJobWhereFrom } = useSelector(
    (state) => state.additionalInformationSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.optionWrapper}>
      {jobWhereFrom?.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedJobWhereFrom.includes(option) && styles.selected
          }`}
          onClick={() => dispatch(getSelectedJobWhereFrom(option))}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default WorkMode;
