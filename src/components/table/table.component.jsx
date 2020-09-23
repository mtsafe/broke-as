import React from "react";

const Table = ({ type, headings }) => {
  let indexNum = 0;
  return (
    <table id={type + "-table"} className="table table-hover">
      <thead>
        <tr>
          {headings.map((value, index) => (
            <th id={`${(indexNum += 1)}`} className="lead" scope="col">
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id={type + "-tbody"}></tbody>
    </table>
  );
};

export default Table;
