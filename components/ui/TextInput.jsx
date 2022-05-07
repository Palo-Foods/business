import React from "react";
import { MdOutlineEmail, MdPerson, MdOutlineAddBusiness } from "react-icons/md";

function TextInput({ text, type, setInput, setText, id, classes }) {
  return (
    <div className="input-group">
      <div className="input-group-text border-end-0 bg-white px-2">
        {id === "name" && (
          <MdOutlineAddBusiness size={20} className="text-muted" />
        )}
        {id === "fullName" && <MdPerson size={20} className="text-muted" />}
        {id === "email" && <MdOutlineEmail size={20} className="text-muted" />}
      </div>
      <input
        type={type}
        className={`form-control ${classes} border-start-0`}
        aria-label="Text input with radio button"
        placeholder=""
        value={text}
        onChange={setInput(setText)}
        id={id}
      />
    </div>
  );
}

export default TextInput;
