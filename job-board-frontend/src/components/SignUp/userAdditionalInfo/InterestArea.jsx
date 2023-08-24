import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedInterest } from "../../../features/additionalInformation/additionalInformationSlice";
import styles from "../SignUp.module.css";

const SelectInterestArea = () => {
  // Interest area
  const { interestAreas, selectedInterests } = useSelector(
    (state) => state.additionalInformationSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.optionWrapper}>
      {interestAreas?.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedInterests.includes(option) && styles.selected
          }`}
          onClick={() => dispatch(getSelectedInterest(option))}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SelectInterestArea;
