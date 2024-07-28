// Button.jsx
import React from 'react';
import './Button.css'; // Import the CSS file

const Button = ({ onClick, label, disabled }) => {
  return (
    <button
      onClick={onClick}
      className="button"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
