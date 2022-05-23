import React from "react";
import Link from "next/link";
import { MdCalendarToday, MdOutlineFilePresent } from "react-icons/md";
import { useSessionStorage } from "../../hooks/useSession";
import AccountForm from "../../components/forms/AccountForm";
import Select from "../../components/ui/Select";

function EditAccountPage() {
  const { user } = useSessionStorage("user");

  return (
    <>
      <h5 className="">My business</h5>

      <AccountForm user={user} />
    </>
  );
}

export default EditAccountPage;
