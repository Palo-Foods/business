import Script from "next/script";
import React from "react";

function UploadLayout({ children }) {
  return (
    <>
    {children}
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
    </>
  );
}

export default UploadLayout;
