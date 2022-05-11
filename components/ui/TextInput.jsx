import React from "react";
import { MdOutlineEmail, MdPerson, MdOutlineAddBusiness, MdOutlineMoney, MdPriceChange, MdNature } from "react-icons/md";

function TextInput({ text, type, setInput, setText, id, classes }) {
  return (
    <div className="input-group">
      <div className="input-group-text border-end-0 bg-white ps-2 pe-0">
        {id === "name" && (
          <MdOutlineAddBusiness size={17} className="text-muted" />
        )}
        {id === "fullName" && <MdPerson size={17} className="text-muted" />}
        {id === "email" && <MdOutlineEmail size={17} className="text-muted" />}
        {id === "price" && <MdOutlineMoney size={17} className="text-muted" />}
        {id === "discount" && (
          <MdPriceChange size={17} className="text-muted" />
        )}
        {id === "itemName" && <MdNature size={17} className="text-muted" />}
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
