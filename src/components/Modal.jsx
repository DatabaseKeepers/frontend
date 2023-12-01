import React from 'react';
import './Modal.css';

function Modal({ showModal, setShowModal, children }) {
  if (!showModal) return null;

  return (
    <div className="modal-backdrop" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;