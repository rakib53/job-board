import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedGender } from "../../../features/additionalInformation/additionalInformationSlice";
import styles from "../SignUp.module.css";

const SelectGender = () => {
  // Gender information
  const { gender, selectedGender } = useSelector(
    (state) => state.additionalInformationSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.optionWrapper}>
      {gender?.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedGender === option && styles.selected
          }`}
          onClick={() => dispatch(getSelectedGender(option))}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SelectGender;
