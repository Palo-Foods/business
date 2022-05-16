import React from "react";
import { useDispatch } from "react-redux";
import { setFile } from "../../slices/navSlice";

function FilesInMedia({ files }) {
  const dispatch = useDispatch();

  return (
    <>
     

      {files && files?.length > 0 && (
        <div className="d-flex justify-content-start">
          {files && files?.map((file) => (
            <>
              <div className="form-check form-check-inline ms-3">
                <label className="form-check-label" htmlFor={file?.url}>
                  <input
                    className="form-check-input"
                    name="file"
                    type="radio"
                    id={file?.url}
                    value={file?.public_id}
                    onChange={(e) =>
                      dispatch(
                        setFile({
                          name: "image of id: " + file?.public_id,
                          _id: e.target.value,
                        })
                      )
                    }
                  />
                  <img src={file?.url} width="100" height="100" />
                </label>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default FilesInMedia;
