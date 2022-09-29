import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddProductForm from "../../components/forms/AddProductForm";
import { useUser } from "../../hooks/useUser";

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

      <div className="card mt-2">
        <div className="card-body my-3">
          <AddProductForm />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddProductPage;
