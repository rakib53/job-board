import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEmployeeType } from "../../../features/additionalInformation/additionalInformationSlice";
import styles from "../SignUp.module.css";

const SelectEmployeeType = () => {
  // employeeType information
  const { employeeType, selectedEmployeeTypes } = useSelector(
    (state) => state.additionalInformationSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.optionWrapper}>
      {employeeType?.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedEmployeeTypes === option && styles.selected
          }`}
          onClick={() => dispatch(getSelectedEmployeeType(option))}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SelectEmployeeType;
