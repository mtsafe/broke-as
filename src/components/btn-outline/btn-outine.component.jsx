import React from "react";

const BtnOutline = ({ id, type, faIcon, label }) => {
  const btnClass = `btn btn-outline-${type}`;
  return (
    <button id={id} className={btnClass}>
      <i className={faIcon}></i> {label}
    </button>
  );
};

export default BtnOutline;
