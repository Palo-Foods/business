import React from "react";
import { useDispatch } from "react-redux";

function FilesInMedia({ files, image, setImage }) {
  const dispatch = useDispatch();

  return (
    <>
      {files && files?.length > 0 && (
        <div className="row">
          {files &&
            files?.map((file) => (
              <div
                key={file?.url}
                className="col-md-2 form-check form-check-inline me-3">
                <label className="form-check-label" htmlFor={file?.url}>
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
                  {file?.url.includes("pdd") ? (
                    ""
                  ) : (
                    <img src={file?.url} className="img-fluid" />
                  )}
                </label>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default FilesInMedia;
