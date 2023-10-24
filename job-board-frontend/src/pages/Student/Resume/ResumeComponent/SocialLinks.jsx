import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateJobSekeerResumeMutation } from "../../../../features/auth/authApi";
import styles from "./ResumeComponent.module.css";

export default function SocialLinks({ handleCloseModal }) {
  const [socialLinks, setSocialLinks] = useState({
    blogLink: "",
    githubLink: "",
    playStore: "",
    behanceLink: "",
    otherLink: "",
  });

  const { user } = useSelector((state) => state.authSlice);

  const [updateJobSekeerResume, { data }] = useUpdateJobSekeerResumeMutation();

  const handleSaveSocialLinks = () => {
    const newSocialLinks = {
      userId: user?._id,
      updateObj: "socialLinks",
      socialLinks: socialLinks,
    };
    updateJobSekeerResume(newSocialLinks);
    handleCloseModal();
  };

  useEffect(() => {
    if (user?.resume?.socialLinks) {
      const { blogLink, githubLink, playStore, behanceLink, otherLink } =
        user?.resume?.socialLinks;
      setSocialLinks({
        blogLink,
        githubLink,
        playStore,
        behanceLink,
        otherLink,
      });
    }
  }, []);

  return (
    <div className={styles.AddEducationFormWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          Blog link
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="http://example.com/"
          value={socialLinks.blogLink}
          onChange={(e) =>
            setSocialLinks({
              ...socialLinks,
              blogLink: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          GitHub profile
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="http://github.com/myprofile"
          value={socialLinks.githubLink}
          onChange={(e) =>
            setSocialLinks({
              ...socialLinks,
              githubLink: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          Play store developer A/c (public link)
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="http://play.google.com/store/apps/developer?id=myapps"
          value={socialLinks.playStore}
          onChange={(e) =>
            setSocialLinks({
              ...socialLinks,
              playStore: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          Behance portfolo link
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="http://behance.net/my_profile"
          value={socialLinks.behanceLink}
          onChange={(e) =>
            setSocialLinks({
              ...socialLinks,
              behanceLink: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.inputLabel} htmlFor="skill">
          Other work sample link
        </label>
        <input
          className={styles.input}
          type="text"
          id="skill"
          placeholder="https://myworksample.com"
          value={socialLinks.otherLink}
          onChange={(e) =>
            setSocialLinks({
              ...socialLinks,
              otherLink: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.saveBtnWrapper}>
        <button className="primaryBtn" onClick={handleSaveSocialLinks}>
          Save
        </button>
      </div>
    </div>
  );
}
