import React from "react";
import Alert from "../../components/ui/Alert";
import Spinner from "../../components/ui/Spinner";
import Phone from "../../components/ui/Phone";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import FilePicker from "../media/FilePicker";
import { usePut } from "../../hooks/crud/usePut";
import { useSessionStorage } from "../../hooks/useSession";

function AccountForm() {
  const { putData, loading, message } = usePut();
  const { item } = useSessionStorage("user");
  console.log("user", item);

  const {
    fullName,
    phone,
    setPhone,
    email,
    setEmail,
    logo,
    setLogo,
    banner,
    setBanner,
    setFullName,
    setInput,
    router,
  } = useStates(item);

  const handleEditAccount = async (e) => {
    e.preventDefault();

    const data = { fullName, phone, email, logo, banner };

    const url = `/api/v1.1.1/items/account/managers/${item?.id}`;

    //provide url, email, password, custom args
    await putData(url, data, "PUT");
  };

  return (
    <form className="row" onSubmit={handleEditAccount}>
      <div className="mb-4 d-xl-flex justify-content-xl-start">
        <div className="mb-3">
          <p className="mb-1">Logo</p>
          <FilePicker
            image={logo}
            setImage={setLogo}
            type="photo"
            width={100}
            height={100}
          />
        </div>
        <div>
          <p className="mb-1">Banner</p>
          <FilePicker
            image={banner}
            setImage={setBanner}
            type="photo"
            width={450}
            height={150}
          />
        </div>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="fullName" className="mb-2">
          Enter name
        </label>
        <TextInput
          type="text"
          text={fullName}
          setInput={setInput}
          setText={setFullName}
          classes=""
          id="fullName"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="email" className="mb-2">
          Enter email
        </label>
        <TextInput
          type="email"
          text={email}
          setInput={setInput}
          setText={setEmail}
          classes=""
          id="email"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="phone" className="mb-2">
          Enter phone
        </label>
        <Phone setText={setPhone} text={phone} classes="" id="phone" />
      </div>
      {message && (
        <div className="px-3">
          <Alert
            type={
              statusCode === 201
                ? "success"
                : statusCode === 500
                ? "danger"
                : "info"
            }
            message={message}
          />
        </div>
      )}

      <div className="d-flex justify-content-between mt-3">
        <a
          className="btn btn-outline-primary w-100 me-2"
          onClick={() => router.back()}>
          Cancel
        </a>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!fullName || !email || !phone}>
          {loading && <Spinner />} Update
        </button>
      </div>
    </form>
  );
}

export default AccountForm;
