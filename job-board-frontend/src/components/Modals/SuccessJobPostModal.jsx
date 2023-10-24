import React from "react";
import { Link } from "react-router-dom";

const SuccessJobPostModal = ({ isOpen, content, handleCloseModal }) => {
  let lowerContent;
  if (!isOpen) {
    return null;
  }
  if (content?.isEdit) {
    lowerContent = (
      <div className="modalBtnWrapper">
        <Link to={`/job/${content?.jobId}`} className="modalBtn cancel-delete">
          View job
        </Link>
        <Link className="modalBtn confirm-delete" onClick={handleCloseModal}>
          Still want to edit?
        </Link>
      </div>
    );
  } else {
    lowerContent = (
      <div className="modalBtnWrapper">
        <Link className="modalBtn cancel-delete">View job</Link>
        <Link className="modalBtn confirm-delete" onClick={handleCloseModal}>
          Another job post
        </Link>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{content?.title}</p>
        {lowerContent}
      </div>
    </div>
  );
};

export default SuccessJobPostModal;
