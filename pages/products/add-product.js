import React, { useEffect } from "react";
import Link from "next/link";
import Password from "../../components/ui/Password";
import Phone from "../../components/ui/Phone";
import Select from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { selectManager } from "../../slices/navSlice";
import { useAuth } from "../../hooks/auth/useAuth";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import AddProductForm from "../../components/forms/AddProduct";

function AddProductPage() {
  return (
    <DashboardLayout>
      <div className="px-0 d-flex justify-content-start align-items-center">
        <Link href="/products">
          <a className="me-3 text-decoration-none">
            <h6 className="mt-2">Products</h6>
          </a>
        </Link>
        <h6 className="mt-2 text-muted">/ Add Product</h6>
      </div>

      <div className="mt-2">
        <AddProductForm />
      </div>
    </DashboardLayout>
  );
}

export default AddProductPage;
