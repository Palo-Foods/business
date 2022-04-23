/**
 * 1. Pass state used to process http request
 **/
import { useState } from "react";
import { useDispatch } from "react-redux";
import {useRouter} from "next/router";

export const useStates = () => {
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
  const [statusCode, setStatusCode] = useState("");
  const [error, setError] = useState("");
  const [department, setDepartment] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState("");
  const [agree, setAgree] = useState("");
  const [region, setRegion] = useState("");
  const [show, setShow] = useState(true);
  const [numberOfPeople, setNumberOfPeople] = useState("");
   const router = useRouter();

  const dispatch = useDispatch();

  const hello = () => {};

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
  };
};
