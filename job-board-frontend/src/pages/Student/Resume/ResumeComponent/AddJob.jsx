import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import { useEditResumeInfoMutation } from "../../../../features/resumeSlice/resumeApi";
import styles from "./ResumeComponent.module.css";

export default function AddJob({ handleCloseModal }) {
  const [job, setJob] = useState({
    title: "",
    organization: "",
    location: "",
    isRemote: false,
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

  // saving the data for job
  const handleAddData = () => {
    const newEducation = {
      userId: user?._id,
      updateObj: "job",
      job: job,
    };
    updateJobSekeerResume(newEducation);
    handleCloseModal();
  };

  // Editing the data
  const handleEditResume = (resumeInfoId) => {
    const editJob = {
      userId: user?._id,
      updateObj: "job",
      job: job,
      resumeInfoId: resumeInfoId,
    };
    editResumeinfo(editJob);
    handleCloseModal();
  };

  // setting the data when edit modal
  useEffect(() => {
    if (modalPropsValue?._id) {
      setJob({
        title: modalPropsValue?.title,
        organization: modalPropsValue?.organization,
        datesAttended: {
          startDate: modalPropsValue?.datesAttended?.startDate,
          endDate: modalPropsValue?.datesAttended?.endDate,
        },
        location: modalPropsValue?.location,
        isRemote: modalPropsValue?.isRemote,
        description: modalPropsValue?.description,
      });
    }
  }, []);

  return (
    <div className={styles.AddEducationFormWrapper}>
      {/* title */}
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="School">
          Title
        </label>
        <input
          className={styles.input}
          type="text"
          id="School"
          placeholder="Ex: Software engineer"
          value={job?.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
      </div>

      {/* Organization  */}
      <div className={styles.inputWrapper}>
        <label htmlFor="School" className={styles.inputLabel}>
          Organization
        </label>
        <input
          type="text"
          id="School"
          placeholder="e.g. Upwork"
          className={styles.input}
          value={job?.organization}
          onChange={(e) => setJob({ ...job, organization: e.target.value })}
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
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
        />
      </div>

      {/* Start and end date  */}
      <div className={`${styles.inputWrapper} ${styles.inputGroup}`}>
        <div className={styles.singleInputWrapper}>
          <label htmlFor="startDate" className={styles.inputLabel}>
            Start year (Optional)
          </label>
          <input
            type="text"
            className={styles.input}
            value={job?.datesAttended?.startDate}
            onChange={(e) =>
              setJob({
                ...job,
                datesAttended: {
                  ...job.datesAttended,
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
            value={job?.datesAttended?.endDate}
            onChange={(e) =>
              setJob({
                ...job,
                datesAttended: {
                  ...job.datesAttended,
                  endDate: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      {/* Description  */}
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
          value={job?.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        ></textarea>
      </div>

      <div className={styles.saveBtnWrapper}>
        <button className="primaryBtn" onClick={handleAddData}>
          Save
        </button>
        <button onClick={() => handleEditResume(modalPropsValue?._id)}>
          edit data
        </button>
      </div>
    </div>
  );
}
