import React from "react";
import AsideContent from "./AsideContent";

function Aside() {
  return (
    <div
      className="offcanvas offcanvas-start "
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header ms-auto">
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div className="offcanvas-body overflow-auto pt-0">
        <AsideContent />
      </div>
    </div>
  );
}

export default Aside;
