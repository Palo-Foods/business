import React from "react";

function TextArea({
  text,
  setText,
  setInput,
  classes,
  rows
}) {
  return (
    <>
      <textarea
        className={`form-control ${classes}`}
        value={text}
        onChange={setInput(setText)}
        rows={rows}
        placeholder=""></textarea>
    </>
  );
}

export default TextArea;
