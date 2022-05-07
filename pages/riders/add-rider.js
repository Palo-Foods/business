import React from "react";
import { postPutDelete } from "../../functions/crud/POST-PUT-DELETE";

function AddRiderPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {}
    const response = await postPutDelete("/api/v1.1.0/riders/signup", data, "POST", "bjdjed");
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button>Hello</button>
      </form>
    </div>
  );
}

export default AddRiderPage;
