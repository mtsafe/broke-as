import React from "react"

const Table = ({ type, headings }) => {
  return (
    <table id={type + "-table"} className="table table-hover">
      <thead>
        <tr>
          {headings.map((value, index) => (
            <th key={`${value}`} className="lead" scope="col">
              {value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id={type + "-tbody"}></tbody>
    </table>
  )
}

export default Table
