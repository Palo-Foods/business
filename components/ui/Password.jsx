import React, { useState } from "react";
import { MdLock, MdRemoveRedEye } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Password({ setText, text, setInput, classes }) {
  const [show, setShow] = useState(false);
  return (
    <div className="input-group mb-3">
      <span
        className="input-group-text border-end-0 bg-white"
        id="basic-addon2">
        <MdLock size={22} />
      </span>
      <input
        type={show ? "text" : "password"}
        className={`form-control border-start-0 border-end-0 ${classes}`}
        aria-label="password"
        aria-describedby="basic-addon2"
        value={text}
        onChange={setInput(setText)}
      />
      <span
        className="input-group-text border-start-0 bg-white"
        style={{cursor: "pointer"}}
        id="basic-addon2"
        onClick={() => setShow(show ? false : true)}>
        {show && <FaEye size={20} />}
        {!show && <FaEyeSlash size={20} className="text-muted" />}
      </span>
    </div>
  );
}

export default Password;
