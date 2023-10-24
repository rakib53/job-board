import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import { useEditResumeInfoMutation } from "../../../../features/resumeSlice/resumeApi";
import styles from "./ResumeComponent.module.css";

export default function TraningAndCourse({ handleCloseModal }) {
  const [traningCourse, setTraningCourse] = useState({
    title: "",
    organization: "",
    location: "",
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

  const handleSaveTraningCourse = () => {
    const newTraningCourse = {
      userId: user?._id,
      updateObj: "traningCourse",
      traningCourse: traningCourse,
    };
    updateJobSekeerResume(newTraningCourse);
    handleCloseModal();
  };

  // Editing the data
  const handleEditResume = (resumeInfoId) => {
    const editJob = {
      userId: user?._id,
      updateObj: "traningCourse",
      traningCourse: traningCourse,
      resumeInfoId: resumeInfoId,
    };
    editResumeinfo(editJob);
    handleCloseModal();
  };

  useEffect(() => {
    if (modalPropsValue?._id) {
      setTraningCourse({
        title: modalPropsValue?.title,
        organization: modalPropsValue?.organization,
        datesAttended: {
          startDate: modalPropsValue?.datesAttended?.startDate,
          endDate: modalPropsValue?.datesAttended?.endDate,
        },
        location: modalPropsValue?.location,
        description: modalPropsValue?.description,
      });
    }
  }, []);

  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="School">
          Training program
        </label>
        <input
          className={styles.input}
          type="text"
          id="School"
          placeholder="e.g. Analytics"
          value={traningCourse.title}
          onChange={(e) =>
            setTraningCourse({
              ...traningCourse,
              title: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="School" className={styles.inputLabel}>
          Organization
        </label>
        <input
          type="text"
          id="School"
          placeholder="e.g. udemy"
          className={styles.input}
          value={traningCourse.organization}
          onChange={(e) =>
            setTraningCourse({ ...traningCourse, organization: e.target.value })
          }
        />
      </div>

      {/* Location  */}
      <div className={styles.inputWrapper}>
        <label htmlFor="School" className={styles.inputLabel}>
          Location
        </label>
        <input
          type="text"
          id="School"
          placeholder="e.g. New york, USA"
          className={styles.input}
          value={traningCourse.location}
          onChange={(e) =>
            setTraningCourse({ ...traningCourse, location: e.target.value })
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
            value={traningCourse.datesAttended.startDate}
            onChange={(e) =>
              setTraningCourse({
                ...traningCourse,
                datesAttended: {
                  ...traningCourse.datesAttended,
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
            value={traningCourse.datesAttended.endDate}
            onChange={(e) =>
              setTraningCourse({
                ...traningCourse,
                datesAttended: {
                  ...traningCourse.datesAttended,
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
          value={traningCourse.description}
          onChange={(e) =>
            setTraningCourse({ ...traningCourse, description: e.target.value })
          }
        ></textarea>
      </div>

      <div className={styles.saveBtnWrapper}>
        <button className="primaryBtn" onClick={handleSaveTraningCourse}>
          Save
        </button>

        <button onClick={() => handleEditResume(modalPropsValue?._id)}>
          Edit education
        </button>
      </div>
    </div>
  );
}
