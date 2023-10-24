import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import { useEditResumeInfoMutation } from "../../../../features/resumeSlice/resumeApi";
import styles from "./ResumeComponent.module.css";

export default function AdditionalDetails({ handleCloseModal }) {
  const [additionalDetails, setAdditionalDetails] = useState({
    additionalDetails: "",
  });

  const { user } = useSelector((state) => state.authSlice);
  const { modalTitle, modalType, modalPropsValue } = useSelector(
    (state) => state.resumeSlice
  );

  const [updateJobSekeerResume, { data }] = useUpdateJobSekeerResumeMutation();
  const [editResumeinfo, { data: editedResponse }] =
    useEditResumeInfoMutation();

  const handleSaveAdditionalInformation = () => {
    const newAdditionalInfo = {
      userId: user?._id,
      updateObj: "additionalDetails",
      additionalDetails: additionalDetails,
    };
    updateJobSekeerResume(newAdditionalInfo);
    handleCloseModal();
  };

  // Editing the data
  const handleEditResume = (resumeInfoId) => {
    const editPersonalProject = {
      userId: user?._id,
      updateObj: "additionalDetails",
      additionalDetails: additionalDetails,
      resumeInfoId: resumeInfoId,
    };
    editResumeinfo(editPersonalProject);
    handleCloseModal();
  };

  useEffect(() => {
    if (modalPropsValue?._id) {
      setAdditionalDetails({
        additionalDetails: modalPropsValue?.additionalDetails,
      });
    }
  }, []);

  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <textarea
          className={`${styles.input} ${styles.textareaInput}`}
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="E.g. Secured 1st rank among 500 entries in national level story writing competition organised by Internshala."
          value={additionalDetails?.additionalDetails}
          onChange={(e) =>
            setAdditionalDetails({
              ...additionalDetails,
              additionalDetails: e.target.value,
            })
          }
        ></textarea>
      </div>
      <div className={styles.saveBtnWrapper}>
        <button
          className="primaryBtn"
          onClick={handleSaveAdditionalInformation}
        >
          Save
        </button>
        <button
          className="primaryBtn"
          onClick={() => handleEditResume(modalPropsValue?._id)}
        >
          Save edit
        </button>
      </div>
    </div>
  );
}
