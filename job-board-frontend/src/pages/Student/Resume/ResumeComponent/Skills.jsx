import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import { useEditResumeInfoMutation } from "../../../../features/resumeSlice/resumeApi";
import styles from "./ResumeComponent.module.css";

export default function Skills({ handleCloseModal }) {
  const [skill, setSkill] = useState({
    title: "",
    level: "",
  });

  const { user } = useSelector((state) => state.authSlice);
  const { modalTitle, modalType, modalPropsValue } = useSelector(
    (state) => state.resumeSlice
  );

  const [updateJobSekeerResume, { data }] = useUpdateJobSekeerResumeMutation();
  const [editResumeinfo, { data: editedResponse }] =
    useEditResumeInfoMutation();

  const handleSaveSkill = () => {
    const addNewSkill = {
      userId: user?._id,
      updateObj: "skill",
      skill: skill,
    };
    updateJobSekeerResume(addNewSkill);
    handleCloseModal();
  };

  // Editing the data
  const handleEditResume = (resumeInfoId) => {
    const editSkill = {
      userId: user?._id,
      updateObj: "skill",
      skill: skill,
      resumeInfoId: resumeInfoId,
    };
    editResumeinfo(editSkill);
    handleCloseModal();
  };

  useEffect(() => {
    if (modalPropsValue?._id) {
      setSkill({
        title: modalPropsValue?.title,
        level: modalPropsValue?.level,
      });
    }
  }, []);

  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          Add skill
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="e.g. JavaScript"
          value={skill.title}
          onChange={(e) => setSkill({ ...skill, title: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="skill-level" className={styles.inputLabel}>
          Skill level
        </label>

        <select
          id="skill-level"
          value={skill.level}
          onChange={(e) => setSkill({ ...skill, level: e.target.value })}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div className={styles.saveBtnWrapper}>
        <button className="primaryBtn" onClick={handleSaveSkill}>
          Add skill
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
