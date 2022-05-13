import React, { useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import DocumentPlaceHolder from "./DocumentPlaceholder";
import DocumentPreview from "./DocumentPreview";
import ImagePlaceHolder from "./ImagePlaceHolder";
import ImagePreview from "./ImagePreview";

function Uploader({ typeOfUpload }) {
  const fileInputRef = useRef();
  const [msg, setMsg] = useState();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setMsg("loading start...");
      };
      reader.onprogress = () => {
        setMsg("loading in progress...");
      };
      reader.onerror = () => {
        setMsg("error uploading image");
      };
      reader.onloadend = () => {
        setMsg("loading done");
      };
      reader.readAsDataURL(file);
      //if filetype is image
      if (file.type.substr(0, 5) === "image") {
        console.log("filetype", file.type);
        //resize image
        Resizer.imageFileResizer(
          file,
          100,
          100,
          "JPEG",
          150,
          0,
          (uri) => {
            console.log("uri", uri);
            setPreview({ url: uri, type: "image" });
          },
          "base64"
        );
      } else {
        if (file.type.includes("application")) {
          //set uri to src o a doc
          const pdf = file.type.includes("pdf");
          const src = pdf ? "" : ""; //if pdf use pdf image

          setPreview({ url: src, type: "doc" });
          console.log("filetype", file.type);
        }
      }
    } else {
      setMsg("upload an image file");
    }
  }, [file]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "20rem" }}>
      <div>
        {preview?.type === "image" &&
          ((typeOfUpload === "avatar" && (
            <img
              src={preview?.url}
              width="100"
              height="100"
              className="rounded-circle py-2"
            />
          )) ||
            (typeOfUpload === "product" && (
              <ImagePreview
                src={preview?.url}
                width={200}
                height={180}
                className="py-2"
              />
            )) ||
            (typeOfUpload === "banner" && (
              <ImagePreview
                src={preview?.url}
                width="450"
                height="150"
                className="py-2"
              />
            )))}
        {preview.type === "doc" && <DocumentPreview size={120} />}
        {preview && (
          <div className="text-center">
            <a
              type="button"
              className="btn btn-light btn-sm my-3"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}>
              Change
            </a>
          </div>
        )}
      </div>
      <label htmlFor="uploader" style={{ cursor: "pointer" }}>
        <input
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          id="uploader"
          hidden
        />
        {!preview && (
          <>
            {typeOfUpload === "avatar" && (
              <ImagePlaceHolder text="Upload avatar" width={150} height={100} />
            )}
            {typeOfUpload === "document" && (
              <DocumentPlaceHolder text="upload file" size={100} />
            )}
            {typeOfUpload === "banner" && (
              <ImagePlaceHolder text="Upload banner" width={450} height={150} />
            )}
            {typeOfUpload === "product" && (
              <ImagePlaceHolder
                text="Upload product image"
                width={200}
                height={180}
              />
            )}
          </>
        )}
      </label>
    </div>
  );
}

export default Uploader;
