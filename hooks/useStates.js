/**
 * 1. Pass state used to process http request
 **/
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSessionStorage } from "./useSession";

export const useStates = (incomingData) => {
  console.log("incomingData", incomingData);
  const { item } = useSessionStorage("user");
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [joined, setJoined] = useState("");
  const [statusCode, setStatusCode] = useState();
  const [error, setError] = useState("");
  const [department, setDepartment] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState("");
  const [agree, setAgree] = useState("");
  const [region, setRegion] = useState("");
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(true);
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [data, setData] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [day, setDay] = useState("");

  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [avatar, setAvatar] = useState("" || item?.avatar?.url);
  const [document, setDocument] = useState("" || item?.document?.url);
  const [banner, setBanner] = useState("" || item?.banner?.url);
  const [logo, setLogo] = useState("" || item?.logo?.url);

  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (item) {
      setEmail(item?.email);
      setFullName(item?.fullName);
      setPhone(item?.phone);
      setAddress(item?.location?.address);
      setLogo(item?.logo?.url);
      setBanner(item?.banner?.url);
      setLocation(item?.location?.address);
    }

    if (incomingData) {
      console.log("incomingData", incomingData);
      const { product } = incomingData;
      setName(product?.name);
      setImage(product?.itemImage);
      setPrice(product?.price);
      setDiscount(product?.discount);
      setType(product?.category);
      setDescription(product?.description);
    }
  }, [item, incomingData]);

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
    banner,
    setBanner,
    document,
    setDocument,
    avatar,
    setAvatar,
    logo,
    setLogo,
    image,
    setImage,
    data,
    setData,
    id: item?.id,
    location,
    setLocation,
    closingHour,
    setClosingHour,
    openingHour,
    setOpeningHour,
    day, setDay
  };
};
