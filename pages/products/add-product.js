import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddProductForm from "../../components/forms/AddProductForm";
import { useUser } from "../../hooks/useUser";

function AddBusinessPage() {
  const {user} = useUser("user")
  return (
    <DashboardLayout>
      <nav class="breadcrumb">
         <Link href="/products">
          <a className="breadcrumb-item text-decoration-none">
           Businesses
          </a>
        </Link>
        <span class="breadcrumb-item active"> Add Product</span>
      </nav>

      <div className="card mt-2">
        <div className="card-body my-3">
          <AddProductForm user={user} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddBusinessPage;
