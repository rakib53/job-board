import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import { useEditResumeInfoMutation } from "../../../../features/resumeSlice/resumeApi";
import styles from "./ResumeComponent.module.css";

export default function PersonalProject({ handleCloseModal }) {
  const [personalProject, setPersonalProject] = useState({
    title: "",
    projectLink: "",
    datesAttended: { startDate: "", endDate: "" },
    description: "",
  });

  const { user } = useSelector((state) => state.authSlice);
  const { modalTitle, modalType, modalPropsValue } = useSelector(
    (state) => state.resumeSlice
  );
  const dispatch = useDispatch();

  const [updateJobSekeerResume, { data }] = useUpdateJobSekeerResumeMutation();
  const [editResumeinfo, { data: editedResponse }] =
    useEditResumeInfoMutation();

  const handleSavePersonalProject = () => {
    const newPersonalProject = {
      userId: user?._id,
      updateObj: "personalProject",
      personalProject: personalProject,
    };
    updateJobSekeerResume(newPersonalProject);
    handleCloseModal();
  };

  // Editing the data
  const handleEditResume = (resumeInfoId) => {
    const editPersonalProject = {
      userId: user?._id,
      updateObj: "personalProject",
      personalProject: personalProject,
      resumeInfoId: resumeInfoId,
    };
    editResumeinfo(editPersonalProject);
    handleCloseModal();
  };

  useEffect(() => {
    if (modalPropsValue?._id) {
      setPersonalProject({
        title: modalPropsValue?.title,
        datesAttended: {
          startDate: modalPropsValue?.datesAttended?.startDate,
          endDate: modalPropsValue?.datesAttended?.endDate,
        },
        projectLink: modalPropsValue?.projectLink,
        description: modalPropsValue?.description,
      });
    }
  }, []);

  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="School">
          Title
        </label>
        <input
          className={styles.input}
          type="text"
          id="School"
          placeholder="e.g. Analytics"
          value={personalProject.title}
          onChange={(e) =>
            setPersonalProject({
              ...personalProject,
              title: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="School" className={styles.inputLabel}>
          Project Link
        </label>
        <input
          type="text"
          id="School"
          placeholder="e.g. udemy"
          className={styles.input}
          value={personalProject.projectLink}
          onChange={(e) =>
            setPersonalProject({
              ...personalProject,
              projectLink: e.target.value,
            })
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
            value={personalProject.datesAttended.startDate}
            onChange={(e) =>
              setPersonalProject({
                ...personalProject,
                datesAttended: {
                  ...personalProject.datesAttended,
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
            value={personalProject.datesAttended.endDate}
            onChange={(e) =>
              setPersonalProject({
                ...personalProject,
                datesAttended: {
                  ...personalProject.datesAttended,
                  endDate: e.target.value,
                },
              })
            }
          />
        </div>
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
          value={personalProject.description}
          onChange={(e) =>
            setPersonalProject({
              ...personalProject,
              description: e.target.value,
            })
          }
        ></textarea>
      </div>

      <div className={styles.saveBtnWrapper}>
        <button className="primaryBtn" onClick={handleSavePersonalProject}>
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
