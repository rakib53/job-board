import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useEditResumeInfoMutation } from "../../../../../features/resumeSlice/resumeApi";
import styles from "../ResumeComponent.module.css";

export default function SingleSocialLink({ handleCloseModal }) {
  const [link, setLink] = useState({
    link: "",
    linkType: "",
  });

  const setLinkType = () => {
    let linkTy;
    console.log("hje;llo");
    switch (modalTitle) {
      case "Blog link":
        linkTy = "blogLink";
        break;
      case "Github link":
        linkTy = "githubLink";
        break;
      case "Playstore link":
        linkTy = "playStore";
        break;
      case "Behance link":
        linkTy = "behanceLink";
        break;
      case "Other link":
        linkTy = "otherLink";
        break;
    }

    return linkTy;
  };

  const { user } = useSelector((state) => state.authSlice);
  const { modalTitle, modalType, modalPropsValue } = useSelector(
    (state) => state.resumeSlice
  );

  const [editResumeinfo, { data: editedResponse }] =
    useEditResumeInfoMutation();

  // Editing the data
  const handleEditResume = () => {
    const editSkill = {
      userId: user?._id,
      updateObj: "socialLinks",
      link: link?.link,
      resumeInfoId: setLinkType(),
    };

    console.log(editSkill);
    editResumeinfo(editSkill);
    handleCloseModal();
  };

  useEffect(() => {
    if (modalPropsValue) {
      setLink({
        link: modalPropsValue,
        linkType: modalTitle,
      });
    }
  }, []);

  console.log(modalTitle, modalType, modalPropsValue);

  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          {modalTitle}
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="http://example.com/"
          value={link.link}
          onChange={(e) => setLink({ ...link, link: e.target.value })}
        />
      </div>

      <div className={styles.saveBtnWrapper}>
        <button className="primaryBtn" onClick={() => handleEditResume()}>
          Save
        </button>
      </div>
    </div>
  );
}
