import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import AddProductForm from "../../../components/forms/AddProductForm"

function AddProductPage() {
 
  return (
    <DashboardLayout>
      <nav class="breadcrumb">
         <Link href="/products">
          <a className="breadcrumb-item text-decoration-none">
           Products
          </a>
        </Link>
        <span class="breadcrumb-item active"> Add Product</span>
      </nav>
      <div className="row">
        <div className="col-md-10 mb-3">
          <div className="card mt-2">
            <div className="card-body my-3">
             <AddProductForm />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddProductPage;
