import React from 'react'

type textAreaProps = {
  value: string,
  id: string,
  placeholder: string,
  setChange: (value: string) => void
}

function TextArea(props: textAreaProps) {
  return (
    <>
      <textarea
        id={props.id}
        value={props.value}
        onChange={(e) => props.setChange(e.target.value)}
        placeholder={props.placeholder}
        className="form-control"
        name=""
        rows={3}></textarea>
    </>
  );
}

export default TextArea