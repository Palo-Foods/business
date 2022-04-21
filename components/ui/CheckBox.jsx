import React from 'react'

function CheckBox({setInput, setText, text, content}) {
  return (
    <label className="form-check-label px-3">
      <input
        type="checkbox"
        className="form-check-input"
        name=""
        id={text}
        value="agree"
        onChange={setInput(setText)}
      />
     {content}
    </label>
  );
}

export default CheckBox