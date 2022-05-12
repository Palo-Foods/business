import React, { useEffect, useRef, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useStates } from "../hooks/useStates";

function UploadImage() {
  const fileInputRef = useRef();
  const { loading, setLoading, error, setError } = useStates();
  const [file, setFile] = useState();
  const [imageToUpload, setImageToUpload] = useState();

  useEffect(() => {
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setLoading(true);
      };
      reader.onprogress = () => {
        setLoading(true);
      };
      reader.onerror = () => {
        setError("error uploading image");
        setLoading("");
      };
      reader.onloadend = () => {
        setLoading("");
        setImageToUpload(reader.result);
        console.log(reader.result);
      };
      const data = reader.readAsDataURL(file);

      
    } else {
      setImageToUpload(null);
    }
  }, [file]);

  return (
    <div className="h-100 d-flex justify-content-center align-items-center overflow-auto">
      <div className="form-group text-center">
        <label
          className="custom-file p-5 text-center"
          style={{ cursor: "pointer" }}>
          <input
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name=""
            id=""
            placeholder=""
            className="custom-file-input"
            aria-describedby="fileHelpId"
            hidden
          />
          {!imageToUpload && (
            <>
              <MdCloudUpload size={50} className="text-muted" />

              <div className="">Upload</div>
            </>
          )}
          {imageToUpload && (
            <img
              src={imageToUpload}
              width="75%"
              height="75%"
              alt="image"
              style={{
                objectFit: "cover",
                objectPosition: "top",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
            />
          )}
        </label>
      </div>
    </div>
  );
}

export default UploadImage;
