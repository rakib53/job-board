import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectedLanguage } from "../../features/additionalInformation";
import { getSelectedLanguage } from "../../../features/additionalInformation/additionalInformationSlice";
import styles from "../SignUp.module.css";

const Language = () => {
  // Languages
  const { languages, selectedLanguages } = useSelector(
    (state) => state.additionalInformationSlice
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.optionWrapper}>
      {languages?.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${
            selectedLanguages.includes(option) && styles.selected
          }`}
          onClick={() => dispatch(getSelectedLanguage(option))}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Language;
