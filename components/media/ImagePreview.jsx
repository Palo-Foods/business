import Image from "next/image";
import React from "react";

const ImagePreview = ({ src, className }) => {
  return (
    <div className="">
      <div
        className="text-center d-flex justify-content-center align-items-center p-1 rounded overflow-auto"
        style={{
          objectFit: "contain",
          objectPosition: "top",
          width: 300,
          height: 300,
        }}>
        <img
          src={src}
          width="100%"
          height="100%"
          alt="image"
          className={className}
          style={{
            objectFit: "contain",
            objectPosition: "top",
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
