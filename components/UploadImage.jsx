import React, { useEffect, useRef, useState, useCallback } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useStates } from "../hooks/useStates";
import CropImage from "./CropImage";
import Resizer from "react-image-file-resizer";

function UploadImage() {
  const fileInputRef = useRef();
  const { loading, setLoading, error, setError } = useStates();
  const [file, setFile] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [finalImage, setFinalImage] = useState("");

  const resizeFile = (image) =>
    new Promise(async(resolve) => {
      Resizer.imageFileResizer(
        image,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
          return uri;
        },
        "base64"
      );
    });

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
      setImageToUpload(data);
    } else {
      setImageToUpload(null);
    }
  }, [file]);

  useEffect(() => {
    const resize = async (finalImage) => {
      const image = await resizeFile(finalImage);
      return image;
    };

    if (finalImage) {
      try {
        const data = resize(finalImage);
      } catch (err) {
        console.log(err);
      }
    }
  }, [finalImage]);

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
          {!finalImage && (
            <>
              <MdCloudUpload size={50} className="text-muted" />

              <div className="">Upload</div>
            </>
          )}
          {finalImage && (
            <img
              src={finalImage}
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
        {imageToUpload && (
          <>
            <CropImage
              imageToUpload={imageToUpload}
              setImageToUpload={setImageToUpload}
              setFinalImage={setFinalImage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
