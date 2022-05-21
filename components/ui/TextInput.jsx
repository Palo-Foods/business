import React from "react";

function TextInput({
  text,
  type,
  setInput,
  setText,
  id,
  classes,
  placeholder,
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={`form-control ${classes}`}
        placeholder={placeholder}
        value={text}
        onChange={setInput(setText)}
        id={id}
      />
    </div>
  );
}

export default TextInput;
