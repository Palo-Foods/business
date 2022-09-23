type inputProps = {
  type: string,
  value: string,
  id: string,
  placeholder: string,
  setChange: (value: string) => void
}

function TextInput(props: inputProps) {
  return (
    <input
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={(e) => props.setChange(e.target.value)}
      placeholder={props.placeholder}
      required
      className="form-control"
    />
  );
}

export default TextInput;
