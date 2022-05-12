import React from "react";
import dynamic from "next/dynamic";
import { MdArrowBack } from "react-icons/md";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
const ImagesUploaded = dynamic(() => import("../../components/ImagesUploaded"));

function AddFilePage() {
  const { router } = useStates();
  return (
    <DashboardLayout>
      <a
        type="button"
        className="h6 text-decoration-none mb-4"
        onClick={() => router.back()}>
        <MdArrowBack size={24} />
        <span className="ms-2"> Go back</span>
      </a>
      <h6>Media</h6>
      <ImagesUploaded />
    </DashboardLayout>
  );
}

export default AddFilePage;
