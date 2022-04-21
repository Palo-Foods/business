import React from "react";
import { MdOutlineEmail, MdPerson, MdOutlineAddBusiness } from "react-icons/md";

function TextInput({ setText, text, type, setInput, classes, id }) {
  return (
    <div className="input-group">
      <div className="input-group-text border-end-0 bg-white">
        {id === "name" && <MdOutlineAddBusiness size={22} />}
        {id === "fullName" && <MdPerson size={22} />}
        {id === "email" && <MdOutlineEmail size={22} />}
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
