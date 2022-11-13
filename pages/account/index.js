import React from "react";
import AccountForm from "../../components/forms/AccountForm";
import { useUser } from "../../hooks/useUser";

function EditAccountPage() {
   const { user } = useUser("user")

  return (
    <>
      <AccountForm user={user} />
    </>
  );
}

export default EditAccountPage;
