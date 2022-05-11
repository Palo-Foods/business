import React from "react";
import { setItem } from "../../../../Palo/FOOD/business/slices/navSlice";

function Extras({ extras }) {
  const editExtra = (extra) => {
    dispatch(setItem(extra));
  };

  const deleteExtra = (extra) => {
    dispatch(setItem(extra));
  };

  return (
    <>
      <h5>Extras</h5>
      <ol className="pl-0">
        {extras?.map((extra) => (
          <li key={extra?.id} className="mb-2">
            {extra?.name} <span className="ms-3">Ghc {extra?.price}</span>
            <span className="ms-4">
              <a
                type="button"
                className="me-3 text-dark"
                onClick={() => editExtra(extra)}
                data-bs-toggle="modal"
                data-bs-target="#addExtraModal">
                Edit
              </a>
              <a
                type="button"
                className="navlink"
                onClick={() => deleteExtra(extra)}
                data-bs-toggle="modal"
                data-bs-target="#deleteExtraModal">
                Delete
              </a>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Extras;
