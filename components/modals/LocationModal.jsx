import dynamic from "next/dynamic";
import React from "react";
import { MdClear } from "react-icons/md";

const MapContainer = dynamic(() => import("../Map"));

const LocationModal = ({location, setLocation }) => {
  return (
    <div
      className="modal fade"
      id="locationModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
      style={{ paddingRight: 0 }}>
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-fullScreen modal-lg"
        role="document">
        <div className="modal-content">
          <div className="modal-header py-2 d-flex align-items-center pe-0">
            <h6 className="mb-0 text-decoration-none">Select location</h6>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal">
              <span className="bg-light rounded-circle p-2">
                <MdClear size={20} className="" />
              </span>
            </button>
          </div>

          <div className="modal-body" style={{ height: "25rem" }}>
            <MapContainer location={location} setLocation={setLocation} />
          </div>
          <div className="modal-footer text-muted d-md-flex justify-content-md-end">
            <a
              type="submit"
              className="btn btn-danger me-3"
              data-bs-dismiss="modal">
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
