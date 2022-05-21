import React from "react";
import { MdOutlineAddBusiness, MdLocationCity } from "react-icons/md";

const Select = ({ classes, setText, text, setInput, options, id }) => {
  return (
    <div className="input-group">
      <select
        className={`form-select custom-select ${classes}`}
        id={id}
        value={text}
        onChange={setInput(setText)}>
        <option value="" className="text-muted">Select {id}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
