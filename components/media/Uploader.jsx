import React from 'react'
import UploadLayout from '../Layouts/UploadLayout';

function Uploader({ children, setImage }) {
  const handleUpload = () => {
    var myWidget = cloudinary.createUploadWidget(
      {
        cloudName: "tiger86ss",
        uploadPreset: "zokwfwvk",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage({
            url: result?.info?.url,
            public_id: result?.info?.public_id,
          });
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    myWidget.open();
  };
  return (
    <UploadLayout>
      <div className="" type="button" onClick={handleUpload}>
        {children}
      </div>
    </UploadLayout>
  );
}

export default Uploader