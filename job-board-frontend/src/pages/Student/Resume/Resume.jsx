import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { BiPencil, BiPlus } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteJobSekeerResumeInfoMutation } from "../../../features/auth/authApi";
import {
  closeModal,
  openModal,
  setModalPropsValue,
  setModalType,
} from "../../../features/resumeSlice/resumeSlice";
import styles from "./Resume.module.css";
import AddEducation from "./ResumeComponent/AddEducation";
import AddJob from "./ResumeComponent/AddJob";
import AdditionalDetails from "./ResumeComponent/AdditionalDetails";
import DownloadResume from "./ResumeComponent/DownloadResume";
import PersonalProject from "./ResumeComponent/PersonalProject";
import ResumeModal from "./ResumeComponent/ResumeModal";
import Skills from "./ResumeComponent/Skills";
import SocialLinks from "./ResumeComponent/SocialLinks";
import SingleSocialLink from "./ResumeComponent/SocialLinks/SingleSocialLink";
import TraningAndCourse from "./ResumeComponent/TraningAndCourse";

export default function Resume() {
  // Delete an information from resume query
  const [deleteJobSekeerResumeInfo, { data }] =
    useDeleteJobSekeerResumeInfoMutation();

  const { user } = useSelector((state) => state.authSlice);
  const { isModalOpen, modalTitle, modalType } = useSelector(
    (state) => state.resumeSlice
  );
  const dispatch = useDispatch();

  // setting up the modal type
  const handleSetModalType = (modalTypeValue, modalTitle) => {
    dispatch(setModalPropsValue({}));
    dispatch(openModal(modalTitle));
    dispatch(setModalType(modalTypeValue));
  };

  // Edit resume data with modal info
  const handleEditResumeInfo = (resumeData, type, title) => {
    dispatch(setModalPropsValue(resumeData));
    dispatch(setModalType(type));
    dispatch(openModal(title));
  };

  // Closing the modal
  const handleCloseModal = () => {
    // setModalInfo({
    //   ...modalInfo,
    //   isModalOpen: false,
    //   modalType: "",
    // });

    dispatch(setModalPropsValue({}));
    dispatch(setModalType(""));
    dispatch(closeModal());
  };

  // delete resume information
  const deleteResumeInfo = ({ infoId, infoType, dynamicPropertyName }) => {
    deleteJobSekeerResumeInfo({
      infoId,
      infoType,
      userId: user?._id,
      dynamicPropertyName,
    });
  };

  // setting modal content
  let modalContent;

  if (modalType === "education") {
    modalContent = <AddEducation handleCloseModal={handleCloseModal} />;
  } else if (modalType === "job") {
    modalContent = <AddJob handleCloseModal={handleCloseModal} />;
  } else if (modalType === "traningCourse") {
    modalContent = <TraningAndCourse handleCloseModal={handleCloseModal} />;
  } else if (modalType === "personalProject") {
    modalContent = <PersonalProject handleCloseModal={handleCloseModal} />;
  } else if (modalType === "skill") {
    modalContent = <Skills handleCloseModal={handleCloseModal} />;
  } else if (modalType === "socialLinks") {
    modalContent = <SocialLinks handleCloseModal={handleCloseModal} />;
  } else if (modalType === "singleSocialLink") {
    modalContent = <SingleSocialLink handleCloseModal={handleCloseModal} />;
  } else if (modalType === "additionalDetails") {
    modalContent = <AdditionalDetails handleCloseModal={handleCloseModal} />;
  }

  return (
    <div className="container">
      <div className={styles.resumePageWrapper}>
        {/* Modal  */}
        {isModalOpen && (
          <ResumeModal modalTitle={modalTitle}>{modalContent}</ResumeModal>
        )}

        <h2 className={styles.resumeText}>Resume</h2>
        <span className={styles.note}>
          Whenever you apply to an jobs or fresher job, this is the resume that
          the employer will see. Always make sure it is up to date.
        </span>
        <div className={styles.resumeWrapper}>
          <div className={styles.resumeHeader}>
            <div>
              <h2 className={styles.studentName}>{user?.userName}</h2>
              <p className={styles.email}>{user?.email}</p>
              <p className={styles.email}>{user?.contactNumber}</p>
              <p className={styles.email}>{user?.location}</p>
            </div>
            <div className={styles.download}>
              <HiOutlineDownload className={styles.downloadIocn} />

              <PDFDownloadLink
                document={<DownloadResume user={user} />}
                fileName={`${user?.userName}.pdf`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading resume..."
                  ) : (
                    <span className={styles.downloadText}>Download</span>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Educations info*/}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>EDUCATION</span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.allInformationWrapper}>
                {user?.resume?.education?.map((educationDetails, index) => {
                  return (
                    <div
                      className={styles.informationWrapper}
                      key={educationDetails?._id}
                    >
                      <div>
                        <p
                          className={styles.informationTitle}
                        >{`${educationDetails?.degree}, ${educationDetails?.subject}`}</p>
                        <p className={styles.moreinfo}>
                          {educationDetails?.title}
                        </p>
                        <p className={styles.moreinfo}>
                          {`${educationDetails?.datesAttended?.startDate} - ${educationDetails?.datesAttended?.endDate}`}
                        </p>
                      </div>
                      <div className={styles.deleteAndEditWrapper}>
                        <BiPencil
                          className={styles.editIcon}
                          onClick={() =>
                            handleEditResumeInfo(
                              educationDetails,
                              "education",
                              "Edit education"
                            )
                          }
                        />
                        <RiDeleteBin6Line
                          className={styles.deleteIcon}
                          onClick={() =>
                            deleteResumeInfo({
                              infoId: educationDetails?._id,
                              infoType: "education",
                            })
                          }
                        />
                      </div>
                    </div>
                  );
                })}
                <div
                  className={styles.addNewInfo}
                  onClick={() => handleSetModalType("education", "Education")}
                >
                  <BiPlus className={styles.plusIcon} />
                  <span>Add education</span>
                </div>
              </div>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Jobs info*/}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>JOBS</span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.allInformationWrapper}>
                {user?.resume?.job?.map((jobDetails, index) => {
                  return (
                    <div
                      className={styles.informationWrapper}
                      key={jobDetails?._id}
                    >
                      <div>
                        <p className={styles.informationTitle}>
                          {jobDetails?.title}
                        </p>
                        <p
                          className={styles.moreinfo}
                        >{`${jobDetails?.organization}, ${jobDetails?.location}`}</p>

                        <p className={styles.moreinfo}>
                          {`${jobDetails?.datesAttended?.startDate} - ${jobDetails?.datesAttended?.endDate}`}
                        </p>
                        <p className={styles.moreinfo}>
                          {jobDetails?.description}
                        </p>
                      </div>
                      <div className={styles.deleteAndEditWrapper}>
                        <BiPencil
                          className={styles.editIcon}
                          onClick={() =>
                            handleEditResumeInfo(
                              jobDetails,
                              "job",
                              "Edit job details"
                            )
                          }
                        />
                        <RiDeleteBin6Line
                          className={styles.deleteIcon}
                          onClick={() =>
                            deleteResumeInfo({
                              infoId: jobDetails?._id,
                              infoType: "job",
                            })
                          }
                        />
                      </div>
                    </div>
                  );
                })}
                <div
                  className={styles.addNewInfo}
                  onClick={() => handleSetModalType("job", "Job Details")}
                >
                  <BiPlus className={styles.plusIcon} />
                  <span>Add job</span>
                </div>
              </div>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Traning and course information */}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>TRANING/COURSES</span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.allInformationWrapper}>
                {user?.resume?.traningCourse?.map(
                  (traingingProgramDetails, index) => {
                    return (
                      <div
                        className={styles.informationWrapper}
                        key={traingingProgramDetails?._id}
                      >
                        <div>
                          <p className={styles.informationTitle}>
                            {traingingProgramDetails?.title}
                          </p>
                          <p
                            className={styles.moreinfo}
                          >{`${traingingProgramDetails?.organization}, ${traingingProgramDetails?.location}`}</p>

                          <p className={styles.moreinfo}>
                            {`${traingingProgramDetails?.datesAttended?.startDate} - ${traingingProgramDetails?.datesAttended?.endDate}`}
                          </p>
                          <p className={styles.moreinfo}>
                            {traingingProgramDetails?.description}
                          </p>
                        </div>
                        <div className={styles.deleteAndEditWrapper}>
                          <BiPencil
                            className={styles.editIcon}
                            onClick={() =>
                              handleEditResumeInfo(
                                traingingProgramDetails,
                                "traningCourse",
                                "Edit Traning details"
                              )
                            }
                          />
                          <RiDeleteBin6Line
                            className={styles.deleteIcon}
                            onClick={() =>
                              deleteResumeInfo({
                                infoId: traingingProgramDetails?._id,
                                infoType: "traningCourse",
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                )}
                <div
                  className={styles.addNewInfo}
                  onClick={() =>
                    handleSetModalType("traning/course", "Training details")
                  }
                >
                  <BiPlus className={styles.plusIcon} />
                  <span>Add training/ course</span>
                </div>
              </div>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Academic perosnal project informations */}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>
              ACADEMICS/ PERSONAL PROJECTS
            </span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.allInformationWrapper}>
                {user?.resume?.personalProject?.map(
                  (personalProject, index) => {
                    return (
                      <div
                        className={styles.informationWrapper}
                        key={personalProject?._id}
                      >
                        <div>
                          <p className={styles.informationTitle}>
                            {personalProject?.title}
                          </p>

                          <p className={styles.moreinfo}>
                            {`${personalProject?.datesAttended?.startDate} - ${personalProject?.datesAttended?.endDate}`}
                          </p>
                          <p className={styles.moreinfo}>
                            {personalProject?.projectLink}
                          </p>
                          <p className={styles.moreinfo}>
                            {personalProject?.description}
                          </p>
                        </div>
                        <div className={styles.deleteAndEditWrapper}>
                          <BiPencil
                            className={styles.editIcon}
                            onClick={() =>
                              handleEditResumeInfo(
                                personalProject,
                                "personalProject",
                                "Edit project details"
                              )
                            }
                          />
                          <RiDeleteBin6Line
                            className={styles.deleteIcon}
                            onClick={() =>
                              deleteResumeInfo({
                                infoId: personalProject?._id,
                                infoType: "personalProject",
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                )}
                <div
                  className={styles.addNewInfo}
                  onClick={() =>
                    handleSetModalType("personalProject", "Work samples")
                  }
                >
                  <BiPlus className={styles.plusIcon} />
                  <span>Add academic/ personal project</span>
                </div>
              </div>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Skills informations */}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>SKILLS</span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.skillsWrapper}>
                {user?.resume?.skill?.map((skill, index) => {
                  return (
                    <div
                      className={styles.skillsInformationWrapper}
                      key={skill?._id}
                    >
                      <div>
                        <p>{skill?.title}</p>
                      </div>
                      <div className={styles.deleteAndEditWrapper}>
                        <BiPencil
                          className={styles.editIcon}
                          onClick={() =>
                            handleEditResumeInfo(
                              skill,
                              "skill",
                              "Edit skill details"
                            )
                          }
                        />
                        <RiDeleteBin6Line
                          className={styles.deleteIcon}
                          onClick={() =>
                            deleteResumeInfo({
                              infoId: skill?._id,
                              infoType: "skill",
                            })
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className={styles.addNewInfo}
                onClick={() => handleSetModalType("skill", "Skills")}
              >
                <BiPlus className={styles.plusIcon} />
                <span>Add skills</span>
              </div>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Social links informations */}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>PORTFOLIO/ SOCIAL LINKS</span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.socialLinkWrapper}>
                {user?.resume?.socialLinks?.blogLink && (
                  <div className={styles.informationWrapper}>
                    <div>
                      <p>Blog link</p>
                      <p className={styles.socialMediaLink}>
                        {user?.resume?.socialLinks?.blogLink}
                      </p>
                    </div>
                    <div className={styles.deleteAndEditWrapper}>
                      <BiPencil
                        className={styles.editIcon}
                        onClick={() =>
                          handleEditResumeInfo(
                            user?.resume?.socialLinks?.blogLink,
                            "singleSocialLink",
                            "Blog link"
                          )
                        }
                      />
                      <RiDeleteBin6Line
                        className={styles.deleteIcon}
                        onClick={() =>
                          deleteResumeInfo({
                            infoType: "socialLinks",
                            dynamicPropertyName: "blogLink",
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {user?.resume?.socialLinks?.githubLink && (
                  <div className={styles.informationWrapper}>
                    <div>
                      <p>GitHub profile</p>
                      <p className={styles.socialMediaLink}>
                        {user?.resume?.socialLinks?.githubLink}
                      </p>
                    </div>
                    <div className={styles.deleteAndEditWrapper}>
                      <BiPencil
                        className={styles.editIcon}
                        onClick={() =>
                          handleEditResumeInfo(
                            user?.resume?.socialLinks?.githubLink,
                            "singleSocialLink",
                            "Github link"
                          )
                        }
                      />
                      <RiDeleteBin6Line
                        className={styles.deleteIcon}
                        onClick={() =>
                          deleteResumeInfo({
                            infoType: "socialLinks",
                            dynamicPropertyName: "githubLink",
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {user?.resume?.socialLinks?.playStore && (
                  <div className={styles.informationWrapper}>
                    <div>
                      <p>Play store developer</p>
                      <p className={styles.socialMediaLink}>
                        {user?.resume?.socialLinks?.playStore}
                      </p>
                    </div>
                    <div className={styles.deleteAndEditWrapper}>
                      <BiPencil
                        className={styles.editIcon}
                        onClick={() =>
                          handleEditResumeInfo(
                            user?.resume?.socialLinks?.playStore,
                            "singleSocialLink",
                            "Playstore link"
                          )
                        }
                      />
                      <RiDeleteBin6Line
                        className={styles.deleteIcon}
                        onClick={() =>
                          deleteResumeInfo({
                            infoType: "socialLinks",
                            dynamicPropertyName: "playStore",
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {user?.resume?.socialLinks?.behanceLink && (
                  <div className={styles.informationWrapper}>
                    <div>
                      <p>Behance portfolo link</p>
                      <p className={styles.socialMediaLink}>
                        {user?.resume?.socialLinks?.behanceLink}
                      </p>
                    </div>
                    <div className={styles.deleteAndEditWrapper}>
                      <BiPencil
                        className={styles.editIcon}
                        onClick={() =>
                          handleEditResumeInfo(
                            user?.resume?.socialLinks?.behanceLink,
                            "singleSocialLink",
                            "Behance link"
                          )
                        }
                      />
                      <RiDeleteBin6Line
                        className={styles.deleteIcon}
                        onClick={() =>
                          deleteResumeInfo({
                            infoType: "socialLinks",
                            dynamicPropertyName: "behanceLink",
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {user?.resume?.socialLinks?.otherLink && (
                  <div className={styles.informationWrapper}>
                    <div>
                      <p>Other link</p>
                      <p className={styles.socialMediaLink}>
                        {user?.resume?.socialLinks?.otherLink}
                      </p>
                    </div>
                    <div className={styles.deleteAndEditWrapper}>
                      <BiPencil
                        className={styles.editIcon}
                        onClick={() =>
                          handleEditResumeInfo(
                            user?.resume?.socialLinks?.otherLink,
                            "singleSocialLink",
                            "Other link"
                          )
                        }
                      />
                      <RiDeleteBin6Line
                        className={styles.deleteIcon}
                        onClick={() =>
                          deleteResumeInfo({
                            infoType: "socialLinks",
                            dynamicPropertyName: "otherLink",
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                className={styles.addNewInfo}
                onClick={() =>
                  handleSetModalType("socialLinks", "Social links")
                }
              >
                <BiPlus className={styles.plusIcon} />
                <span>Add portfolio/ social links</span>
              </div>
            </div>
          </div>

          <hr className={styles.line} />

          {/* Additional informations */}
          <div className={styles.informationRow}>
            <span className={styles.propretyName}>
              ACCOMPLISHMENTS/ ADDITIONAL DETAILS
            </span>

            <div className={styles.informationAndDeleteAndEdit}>
              <div className={styles.informationParentWrapper}>
                {user?.resume?.additionalDetails?.map(
                  (additionalDetail, index) => {
                    return (
                      <div
                        className={styles.informationWrapper}
                        key={additionalDetail?._id}
                      >
                        <div>
                          <p className={styles.moreinfo}>
                            {additionalDetail?.additionalDetails}
                          </p>
                        </div>
                        <div className={styles.deleteAndEditWrapper}>
                          <BiPencil
                            className={styles.editIcon}
                            onClick={() =>
                              handleEditResumeInfo(
                                additionalDetail,
                                "additionalDetails",
                                "Edit additionalDetails details"
                              )
                            }
                          />
                          <RiDeleteBin6Line
                            className={styles.deleteIcon}
                            onClick={() =>
                              deleteResumeInfo({
                                infoId: additionalDetail?._id,
                                infoType: "additionalDetails",
                              })
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              <div
                className={styles.addNewInfo}
                onClick={() =>
                  handleSetModalType("additionalDetails", "Additional details")
                }
              >
                <BiPlus className={styles.plusIcon} />
                <span>Add accomplishment/ additional detail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
