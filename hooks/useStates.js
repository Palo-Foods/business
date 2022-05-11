/**
 * 1. Pass state used to process http request
 **/
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const useStates = (dataFromStore) => {
  console.log("use states", dataFromStore);
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(dataFromStore?.email);
  const [phone, setPhone] = useState(dataFromStore?.phone);
  const [fullName, setFullName] = useState(dataFromStore?.fullName);
  const [name, setName] = useState(dataFromStore?.name);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState(dataFromStore?.address);
  const [joined, setJoined] = useState("");
  const [statusCode, setStatusCode] = useState();
  const [error, setError] = useState("");
  const [department, setDepartment] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(dataFromStore?.type);
  const [options, setOptions] = useState("");
  const [agree, setAgree] = useState("");
  const [region, setRegion] = useState(dataFromStore?.region);
  const [show, setShow] = useState(true);
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const [uploadedImage, setUploadedImage] = useState("");
  const [itemImage, setItemImage] = useState(dataFromStore?.itemImage?.url);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);

  const router = useRouter();

  const dispatch = useDispatch();

  //receive all input values and process them
  function setInput(setter) {
    return (e) => {
      setter(e.currentTarget.value);
    };
  }

  return {
    loading,
    setLoading,
    message,
    setMessage,
    statusCode,
    setStatusCode,
    error,
    setError,
    dispatch,
    user,
    setUser,
    auth,
    setAuth,
    joined,
    setJoined,
    birthday,
    setBirthday,
    city,
    setCity,
    address,
    setAddress,
    password,
    setPassword,
    fullName,
    setFullName,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    department,
    setDepartment,
    text,
    setText,
    setInput,
    description,
    setDescription,
    type,
    setType,
    numberOfPeople,
    setNumberOfPeople,
    agree,
    options,
    setOptions,
    setAgree,
    show,
    setShow,
    router,
    region,
    setRegion,
    price,
    setPrice,
    discount,
    setDiscount,
    itemImage,
    setItemImage,
    uploadedImage,
    setUploadedImage,
  };
};
