import React from "react";

const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this item?</p>
        <div className="modalBtnWrapper">
          <button className="modalBtn cancel-delete" onClick={onCancel}>
            Cancel
          </button>
          <button className="modalBtn confirm-delete" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
