import { useRouter } from "next/router";
import { useState } from "react";

export const useStates = () => {
  const [fullName, setFullName] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [region, setRegion] = useState("");
  const [site, setSite] = useState("");
  const [day, setDay] = useState("");
  const [amount, setAmount] = useState("");
  const [role, setRole] = useState("");
  const [travelingTo, setTravelingTo] = useState("");
  const [reason, setReason] = useState("");
  const [employee, setEmployee] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [joinedOn, setJoinedOn] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState("");
  const [image, setImage] = useState({ url: "", public_id: "" });
  const [location, setLocation] = useState({
    town: "", district: "", region: "", geometry: {}, address: ""
  })
  const [typeOfBusiness, setTypeOfBusiness] = useState("")

  const router = useRouter();

  return {
    phone,
    setPhone,
    password,
    setPassword,
    agree,
    setAgree,
    city,
    setCity,
    loading,
    setLoading,
    isLoading,
    setIsLoading,
    error,
    setError,
    isError,
    setIsError,
    router,
    amount,
    setAmount,
    message,
    setMessage,
    isMessage,
    setIsMessage,
    description,
    setDescription,
    destinations,
    setDestinations,
    endDate,
    setEndDate,
    startHours,
    setStartHours,
    endHours,
    setEndHours,
    day,
    setDay,
    country,
    setCountry,
    startDate,
    setStartDate,
    name,
    setName,
    email,
    setEmail,
    region,
    setRegion,
    site,
    setSite,
    travelingTo,
    setTravelingTo,
    reason,
    setReason,
    role,
    setRole,
    bankAccount,
    setBankAccount,
    bankName,
    setBankName,
    employee,
    setEmployee,
    workingHours,
    setWorkingHours,
    joinedOn,
    setJoinedOn,
    image, setImage,
    location, setLocation,
    fullName, setFullName,
    typeOfBusiness, setTypeOfBusiness
  };
};
