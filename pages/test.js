import React, { useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";

function Test() {
  const ref = useRef();
  const [msg, setMsg] = useState();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const handleImage = () => {};

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
        //resize image
        Resizer.imageFileResizer(
          file,
          100,
          100,
          "JPEG",
          150,
          0,
          (uri) => {
            setImage({url: uri, type: 'image'});
          },
          "base64"
        );
      } else {
        if (file.type.includes("application")) {
          //set uri to src o a doc
          const pdf = file.type.includes("pdf");
          const src = pdf ? "" : "" //if pdf use pdf image

          setImage({ url: src, type: "doc" });
          console.log("filetype", file.type);
        }
      }
    } else {
      setMsg("upload an image file");
    }
  }, [file]);

  return (
    <div>
      <div>{msg}</div>
      <input
        ref={ref}
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
      />
      <img src={image?.url} />
      <button onClick={handleImage}>Get base64</button>
    </div>
  );
}

export default Test;
