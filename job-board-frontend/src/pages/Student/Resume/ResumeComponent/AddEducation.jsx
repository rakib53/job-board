import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import { useEditResumeInfoMutation } from "../../../../features/resumeSlice/resumeApi";
import styles from "./ResumeComponent.module.css";

export default function AddEducation({ handleCloseModal }) {
  const [error, setError] = useState({});
  const [education, setEducation] = useState({
    title: "",
    degree: "",
    datesAttended: { startDate: "", endDate: "" },
    subject: "",
    description: "",
  });

  const { user } = useSelector((state) => state.authSlice);
  const { modalTitle, modalType, modalPropsValue } = useSelector(
    (state) => state.resumeSlice
  );

  const [updateJobSekeerResume, { data: addEducationResponse }] =
    useUpdateJobSekeerResumeMutation();
  const [
    editResumeinfo,
    { data: editResumeResponse, isLoading, isError, isSuccess },
  ] = useEditResumeInfoMutation();

  const handleSaveEducation = () => {
    const newEducation = {
      userId: user?._id,
      updateObj: "education",
      education: education,
    };
    updateJobSekeerResume(newEducation);
    handleCloseModal();
  };

  // Editing the data
  const handleEditResume = (resumeInfoId) => {
    const editEducation = {
      userId: user?._id,
      updateObj: "education",
      education: education,
      resumeInfoId: resumeInfoId,
    };
    editResumeinfo(editEducation);
    handleCloseModal();
  };

  useEffect(() => {
    if (modalPropsValue?._id) {
      setEducation({
        title: modalPropsValue?.title,
        degree: modalPropsValue?.degree,
        datesAttended: {
          startDate: modalPropsValue?.datesAttended?.startDate,
          endDate: modalPropsValue?.datesAttended?.endDate,
        },
        subject: modalPropsValue?.subject,
        description: modalPropsValue?.description,
      });
    }
  }, []);

  console.log(addEducationResponse);
  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="School">
          School
        </label>
        <input
          className={styles.input}
          type="text"
          id="School"
          placeholder="Ex: National university"
          value={education.title}
          onChange={(e) =>
            setEducation({ ...education, title: e.target.value })
          }
        />
      </div>

      <div className={`${styles.inputWrapper} ${styles.inputGroup}`}>
        <div className={styles.singleInputWrapper}>
          <label htmlFor="startDate" className={styles.inputLabel}>
            Start year (Optional)
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ex: 2020"
            value={education.datesAttended.startDate}
            onChange={(e) =>
              setEducation({
                ...education,
                datesAttended: {
                  ...education.datesAttended,
                  startDate: e.target.value,
                },
              })
            }
          />
        </div>
        <div className={styles.singleInputWrapper}>
          <label htmlFor="startDate" className={styles.inputLabel}>
            End year (Optional)
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ex: 2024"
            value={education.datesAttended.endDate}
            onChange={(e) =>
              setEducation({
                ...education,
                datesAttended: {
                  ...education.datesAttended,
                  endDate: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="School" className={styles.inputLabel}>
          Degree (Optional)
        </label>
        <input
          type="text"
          id="School"
          placeholder="Ex: Bachelor of science"
          className={styles.input}
          value={education?.degree}
          onChange={(e) =>
            setEducation({ ...education, degree: e.target.value })
          }
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="School" className={styles.inputLabel}>
          Area of Study (Optional)
        </label>
        <input
          type="text"
          id="School"
          placeholder="Ex: Computer science"
          className={styles.input}
          value={education?.subject}
          onChange={(e) =>
            setEducation({ ...education, subject: e.target.value })
          }
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="" className={styles.inputLabel}>
          Description (Optional)
        </label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className={`${styles.input} ${styles.textareaInput}`}
          value={education?.description}
          onChange={(e) =>
            setEducation({ ...education, description: e.target.value })
          }
        ></textarea>
      </div>

      <div className={styles.saveBtnWrapper}>
        {modalPropsValue?._id ? (
          <button
            className="primaryBtn"
            onClick={() => handleEditResume(modalPropsValue?._id)}
          >
            Edit education
          </button>
        ) : (
          <button className="primaryBtn" onClick={handleSaveEducation}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}
