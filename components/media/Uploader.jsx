import React, { useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import ImagePlaceHolder from "./ImagePlaceHolder";
import ImagePreview from "./ImagePreview";
import { MdAttachFile } from "react-icons/md";
import DocumentPreview from "./DocumentPreview";

function Uploader({ setImage }) {
  const fileInputRef = useRef();
  const [msg, setMsg] = useState();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  //file info
  const [size, setSize] = useState({});

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

        if (file.type.substr(0, 5) === "image") {
          var image = new Image();
          image.src = reader.result;
          image.onload = () => {
            setSize({ width: image.width, height: image.height });

            Resizer.imageFileResizer(
              file,
              "100%",
              "100%",
              "JPEG",
              150,
              0,
              (uri) => {
                //console.log("uri", uri);
                setPreview({ url: uri, type: "image" });
                setImage(uri);
              },
              "base64"
            );
          };
        } else {
          const doc = reader.result;
          setImage(doc);
          //set uri to src o a doc
          const pdf = file.type.includes("pdf");
          const src = pdf ? "" : ""; //if pdf use pdf image

          setPreview({ url: src, type: "doc" });
        }
      };

      reader.readAsDataURL(file);
    } else {
      setMsg("upload an image file");
    }
  }, [file]);

  return (
    <div className="row h-100">
      <div className="col-sm-6 col-lg-7">
        {preview?.type === "image" && (
          <div className="d-flex justify-content-center">
            <ImagePreview src={preview?.url} className="rounded" />
          </div>
        )}
        {preview.type === "doc" && <DocumentPreview />}
        {!preview && (
          <label
            htmlFor="uploader"
            style={{ cursor: "pointer" }}
            className="d-flex justify-content-center align-items-center h-100">
            <input
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              id="uploader"
              hidden
            />

            <ImagePlaceHolder text="Upload file" width={200} height={200} />
          </label>
        )}
        {preview && (
            <label
              htmlFor="uploader"
              style={{ cursor: "pointer" }}
              className="d-flex justify-content-center align-items-center">
              <input
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="uploader"
                hidden
              />
              <a type="button" className="btn btn-light btn-sm my-3">
                <MdAttachFile size={18} /> Change image
              </a>
            </label>
        )}
      </div>
      <div className="border-md-start col-sm-6 col-lg-5 mt-3">
        <h6>File details</h6>
        <div className="form-group my-3 mb-4">
          <label htmlFor="fileName" className="h6">
            File name
          </label>
          <input
            type="text"
            className="form-control"
            value={file?.name}
            onChange={(e) => setFile({ name: e.target?.value })}
            id="fileName"
            aria-describedby="helpId"
            placeholder=""
          />
        </div>
        <p className="mb-1 h6">Image size (Pixels)</p>
        <div className="row mb-3">
          <div className="col form-group">
            <label htmlFor="width">Width</label>
            <input
              type="number"
              className="form-control"
              value={size.width}
              onChange={(e) => setSize({ width: e.target.value })}
              id="width"
              aria-describedby="helpId"
              placeholder=""
              disabled
            />
          </div>
          <div className="col form-group">
            <label htmlFor="height">Height</label>
            <input
              type="text"
              className="form-control"
              value={size.height}
              onChange={(e) => setSize({ height: e.target.value })}
              id="height"
              aria-describedby="helpId"
              placeholder=""
              disabled
            />
          </div>
        </div>
        <p className="mb-1 h6">File size</p>
        <p>{file && file?.size / 1000} KB</p>
      </div>
    </div>
  );
}

export default Uploader;
