import React from "react";

function VerifyPhoneNumber({
  setVerificationCode,
  verificationCode,
  setInput,
}) {
  return (
    <input
      type="text"
      className={`form-control ${classes}`}
      id="code"
      aria-describedby="phoneHelp"
      value={verificationCode}
      onChange={setInput(setVerificationCode)}
      maxLength={10}
      placeholder="e.g 435482"
    />
  );
}

export default VerifyPhoneNumber;
