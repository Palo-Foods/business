import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Password({ text, type, setInput, setText, id, classes }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-group mb-3">
      <span
        className="input-group-text border-end-0 bg-white px-2"
        id="basic-addon2">
        <MdLock size={20} className="text-muted" />
      </span>
      <input
        type={show ? "text" : type}
        className={`form-control border-start-0 border-end-0 ${classes}`}
        aria-label="password"
        aria-describedby="basic-addon2"
        value={text}
        onChange={setInput(setText)}
        id={id}
      />
      <span
        className="input-group-text border-start-0 bg-white px-2"
        style={{ cursor: "pointer" }}
        id="basic-addon2"
        onClick={() => setShow(show ? false : true)}>
        {show && <FaEye size={18} />}
        {!show && <FaEyeSlash size={18} className="text-muted" />}
      </span>
    </div>
  );
}

export default Password;
