import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Phone({ setText, text }) {
  return (
    <>
      <PhoneInput
        international
        country="GH"
        defaultCountry="GH"
        value={text}
        onChange={setText}
        type="tel"
        id="phone"
      />
    </>
  );
}

export default Phone;
