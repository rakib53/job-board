import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedJobTypes } from "../../../features/additionalInformation/additionalInformationSlice";
import styles from "../SignUp.module.css";

const CurrentlyLookingFor = () => {
  // Interest area
  const { jobTypes, selectedJobTypes } = useSelector(
    (state) => state.additionalInformationSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.optionWrapper}>
      {jobTypes?.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedJobTypes.includes(option) && styles.selected
          }`}
          onClick={() => dispatch(getSelectedJobTypes(option))}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default CurrentlyLookingFor;
