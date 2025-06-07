import React from 'react';

function Alert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    </div>
  );
}

export default Alert;
