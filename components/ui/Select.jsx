import React from "react";
import { MdOutlineAddBusiness, MdLocationCity } from "react-icons/md";

const Select = ({ classes, setText, text, setInput, options, id }) => {
  return (
    <div className="input-group">
      <div className="input-group-text border-end-0 bg-white ps-2 pe-0">
        {id === "type" && (
          <MdOutlineAddBusiness size={17} className="text-muted" />
        )}
        {id === "region" && <MdLocationCity size={17} className="text-muted" />}
      </div>
      <select
        className={`form-select custom-select border-start-0 ${classes}`}
        id={id}
        value={text}
        onChange={setInput(setText)}>
        <option value="">Select {id}</option>
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
