import React from 'react'

function Select({options, id, value, setChange}) {
  return (
    <>
      <div className="form-group">
        <select
          className="form-select"
          id={id}
          value={value}
          onChange={(e) => setChange(e.target.value)}>
          {value ? <option value={value}>{value}</option> : 
          <option value="">--Select {id} --</option>}
          {options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Select