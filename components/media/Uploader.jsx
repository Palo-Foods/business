import React from 'react'
import UploadLayout from '../layouts/UploadLayout';

function Uploader({ children, setImage }) {
  const handleUpload = () => {
    var myWidget = cloudinary?.createUploadWidget(
      {
        cloudName: "alpha-digital-agency",
        uploadPreset: "ewgxau4o",
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