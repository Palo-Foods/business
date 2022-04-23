import React from "react";
import { MdOutlineEmail, MdPerson, MdOutlineAddBusiness } from "react-icons/md";

function TextInput({ setText, text, type, setInput, classes, id }) {
  return (
    <div className="input-group">
      <div className="input-group-text border-end-0 bg-white px-2">
        {id === "name" && <MdOutlineAddBusiness size={20} />}
        {id === "fullName" && <MdPerson size={20} />}
        {id === "email" && <MdOutlineEmail size={20} />}
      </div>
      <input
        type={type}
        className={`form-control ${classes} border-start-0`}
        aria-label="Text input with radio button"
        name={text}
        aria-describedby="helpId"
        placeholder=""
        value={text}
        onChange={setInput(setText)}
      />
    </div>
  );
}

export default TextInput;
