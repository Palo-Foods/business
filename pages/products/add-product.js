import React, { useEffect } from "react";
import Link from "next/link";
import { useStates } from "../../hooks/useStates";
import AddProductForm from "../../components/forms/AddProduct";

function AddProductPage() {
  const { show, setShow } = useStates();
  return (
    <>
      {!!show && (
        <>
          <div className="d-flex justify-content-start align-items-center">
            <Link href="/[route]/[page]" as="/dashboard/products">
              <a className="me-2 text-decoration-none">
                <h6 className="mt-2">Products</h6>
              </a>
            </Link>
            <h6 className="mt-2 text-muted">/ Add Product</h6>
          </div>

          <div className="mt-2">
            <AddProductForm setShow={setShow} />
          </div>
        </>
      )}
    </>
  );
}

export default AddProductPage;
