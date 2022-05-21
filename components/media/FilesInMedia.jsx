import Image from "next/image";
import React from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { useDispatch } from "react-redux";

function FilesInMedia({ files, image, setImage }) {
  const dispatch = useDispatch();

  return (
    <>
      {files && files?.length > 0 && (
        <div className="row">
          {files &&
            files?.map((file) => (
              <div key={file?.url} className="col-6 col-md-4 mb-3">
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    htmlFor={file?.url}
                    style={{ objectFit: "contain", minWidth: "max-content" }}>
                    <input
                      className="form-check-input"
                      name="file"
                      type="radio"
                      id={file?.url}
                      value={file?.public_id}
                      onChange={(e) =>
                        setImage({
                          name: "image of id: " + file?.public_id,
                          _id: e.target.value,
                          url: file?.url,
                        })
                      }
                    />
                    {file?.url.includes(".pdf") ? (
                      <Image
                        src="/images/icons/pdf.png"
                        width="100%"
                        height="100%"
                        className="img-fluid"
                        alt="product"
                      />
                    ) : (
                      <Image
                        src={file?.url}
                        width="100%"
                        height="100%"
                        className="img-fluid"
                        alt="product"
                      />
                    )}
                  </label>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default FilesInMedia;
