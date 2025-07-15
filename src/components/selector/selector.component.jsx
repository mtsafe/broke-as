import React from "react";

function Selector({ id, className, defaultValue, options }) {
  function changeHandler(params) {
    return null;
  }

  let keyNum = 0;
  return (
    <select
      id={id}
      className={className}
      defaultValue={defaultValue}
      onChange={changeHandler}
    >
      {options.map((option) => (
        <option key={(keyNum += 1)} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Selector;
