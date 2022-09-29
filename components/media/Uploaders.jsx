import React, { useCallback, useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import { MdInfo } from "react-icons/md";
import Spinner from "../ui/Spinner";

function Uploader({ media, imageUploadLoading }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [size, setSize] = useState("");

  const [msg, setMsg] = useState("");

  const handleImageUpload = useCallback(async (uri) => {
    const data = {
      name: file?.name,
      uri,
      width: size.width,
      height: size.height,
      type: "image",
    };

    await media.addMedia(data);
    await media.getMedias();
  }, [file?.name, media, size.height, size.width])

  const handleDocumentUpload = useCallback(async (uri) => {
    const fileData = {
      name: file?.name,
      uri,
      size: file?.size,
      type: "document",
    };

    await media.addMedia(fileData);
    await media.getMedias();
  }, [file?.name, file?.size, media])

  useEffect(() => {
    console.log(file);
    if (file) {
      setMsg("");
      const reader = new FileReader();
      reader.onloadstart = () => {
        //setMsg("uploadLoading start...");
      };
      reader.onprogress = () => {
        //setMsg("uploadLoading in progress...");
      };
      reader.onerror = () => {
        setMsg("error uploading image");
        return;
      };
      reader.onloadend = async () => {
        //setMsg("uploadLoading done");

        if (file?.size > 10000000) {
          setMsg(
            `The file size ${
              file?.size / 1000000
            } MB should not be more than 10MB`
          );
          return;
        }

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
                //setImage(uri);
                handleImageUpload(uri);
              },
              "base64"
            );
          };
        } else {
          let suffixes = ["_paper", "_CV", "_other"];
          let fileContains = false;

          //check if suffixes is included in the file
          for (let i = 0; i < suffixes.length; i++) {
            const element = suffixes[i];
            const checkFile = file?.name?.includes(element);

            switch (checkFile) {
              case checkFile:
                true;
                fileContains = true;
                break;

              default:
                false;
                break;
            }
          }

          //check for file names which doesn't include the prefixes
          if (fileContains) {
            console.log(fileContains);
            await handleDocumentUpload(reader.result);
            setFile(null);
          } else {
            setMsg(
              "The file should be prefixed with _CV or _paper or _other. Read the note on upload of documents"
            );
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }, [file, handleDocumentUpload, handleImageUpload]);

  return (
    <>
      <div className="d-flex align-items-center">
        <label className="btn btn-light px-3">
          <input
            type="file"
            placeholder=""
            className="custom-file-input"
            aria-describedby="fileHelpId"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target?.files[0])}
            hidden
          />
          {file && imageUploadLoading ? (
            <Spinner className="ms-2" />
          ) : (
            <span className="">Import image</span>
          )}
        </label>
        {msg && msg?.includes("prefixed") ? (
          <p className="ms-2 mb-0">
            <MdInfo className="text-danger" />
            Error: read document info
          </p>
        ) : (
          <p className="ms-2 mb-0 text-danger">{msg}</p>
        )}
      </div>
    </>
  );
}

export default Uploader;
