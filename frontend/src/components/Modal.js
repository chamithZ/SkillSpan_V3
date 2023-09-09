import React from 'react';
import PropTypes from 'prop-types';

function Modal({ isOpen, onRequestClose, contentLabel, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onRequestClose}>
          &times;
        </button>
        <h2 className="modal-title">{contentLabel}</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Modal;
