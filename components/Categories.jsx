import React from "react";

function Categories() {
  return (
    <section className="my-2 py-3">
        <div className="row mb-md-3">
          <h4 className="mb-4 fw-bold">Categories</h4>
          <div className="d-flex justify-content-start overflow-auto" id="categories">
            <a
              type="button"
              className="badge active rounded-pill bg-white py-3 px-4 me-3 shadow-sm">
              All
            </a>
            <a
              type="button"
              className="badge  rounded-pill bg-white py-3 px-4 me-3 shadow-sm">
              Rice
            </a>
            <a
              type="button"
              className="badge  rounded-pill bg-white py-3 px-4 me-3 shadow-sm">
              Pizza
            </a>
            <a
              type="button"
              className="badge  rounded-pill bg-white py-3 px-4 me-3 shadow-sm">
              Salad
            </a>
          </div>
      </div>
    </section>
  );
}

export default Categories;
