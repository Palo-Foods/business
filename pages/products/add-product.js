import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddProductForm from "../../components/forms/AddProduct";
const ImagesUploaded = dynamic(() => import("../../components/ImagesUploaded"));

function AddProductPage() {
  const { show, setShow } = useStates();
  return (
    <DashboardLayout>
      {!!show && (
        <>
          <div className="px-0 d-flex justify-content-start align-items-center">
            <Link href="/products">
              <a className="me-3 text-decoration-none">
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
      {!show && <ImagesUploaded setShow={setShow} />}
    </DashboardLayout>
  );
}

export default AddProductPage;
