import React, { useCallback, useState } from "react";

import Cropper from "react-easy-crop";
import getCroppedImg from "../functions/cropImage";

function CropImage({ imageToUpload, setImageToUpload, setFinalImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [rotation, setRotation] = useState(0);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageToUpload,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setFinalImage(croppedImage);
      setImageToUpload(null);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setImageToUpload(null);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
    if (imageToUpload) {
      //console.log("imageToUpload", imageToUpload);
      //set the resize data into base 64
      //resize image
      /*  Resizer.imageFileResizer(
      imageToUpload,
      croppedAreaPixels?.width,
      croppedAreaPixels?.height,
      "WEBP",
      150,
      0,
      (uri) => {
        setFinalImage(uri);
        console.log("uri", uri);
      },
      "base64"
    );   */
    }
  }, []);

  return (
    <div className="crop">
      <div className="crop-container">
        <Cropper
          image={imageToUpload}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="bg-light w-100">
        <div className="controls">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />
          <div className="d-lex justify-content-between w-100">
            <button className="btn btn-success" onClick={showCroppedImage}>
              Done
            </button>
            <button className="btn btn-danger ms-3" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .crop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .crop-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 80px;
        }

        .controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          width: 50%;
          transform: translateX(-50%);
          height: 40px;
          display: flex;
          align-items: center;
        }

        .slider {
          padding: 22px 0px;
        }

        .zoom-range {
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 2px;
          border-top: 5px solid #fff;
          border-bottom: 5px solid #fff;
          background: #3f51b5;
          width: 100%;
        }

        .zoom-range::-moz-range-thumb {
          -webkit-appearance: none;
          -moz-appearance: none;
          border: 1px solid #3f51b5;
          background: #3f51b5;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }

        .zoom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          -moz-appearance: none;
          border: 1px solid #3f51b5;
          background: #3f51b5;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }

        .controls:hover input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0px 0px 0px 8px rgba(63, 81, 181, 0.16);
          border-radius: 50%;
        }

        .controls:hover input[type="range"]::-moz-range-thumb {
          box-shadow: 0px 0px 0px 8px rgba(63, 81, 181, 0.16);
        }
      `}</style>
      ;
    </div>
  );
}

export default CropImage;
