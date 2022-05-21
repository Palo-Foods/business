import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Password({ text, type, setInput, setText, id, classes, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-group mb-3">
      <input
        type={show ? "text" : type}
        className={`form-control border-end-0 ${classes}`}
        aria-label="password"
        aria-describedby="basic-addon2"
        value={text}
        onChange={setInput(setText)}
        placeholder={placeholder}
        id={id}
      />
      <span
        className="input-group-text border-start-0 bg-white px-2"
        style={{ cursor: "pointer" }}
        id="basic-addon2"
        onClick={() => setShow(show ? false : true)}>
        {text && show && <FaEye size={18} />}
        {text && !show && <FaEyeSlash size={18} className="text-muted" />}
      </span>
    </div>
  );
}

export default Password;
