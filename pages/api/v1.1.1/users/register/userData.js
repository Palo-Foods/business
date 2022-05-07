import moment from "moment";
import crypto from "crypto";

export const getUserData = (collection, body, hash, userId, role, apiKey) => {
  const date = new Date();

  const busId = crypto.randomUUID().slice(30);
  const url = body?.name?.split(" ").join("").toLowerCase() + "-" + busId;

  if (collection === "managers") {
    const data = {
      ...body,
      megos: body?.password,
      password: hash,
      adminId: userId,
      location: null,
      terms: "agree",
      documents: [],
      idType: "",
      idNumber: "",
      district: "",
      location: "",
      role: "manager",
      createdAt: moment(date).format("lll"),
      apiKey,
    };
    return data;
  }

  if (collection === "businesses") {
    const data = {
      ...body,
      megos: body?.password,
      password: hash,
      adminId: role === "admin" && userId,
      managerId: role === "manager" && userId,
      terms: "agree",
      openingHours: [],
      logo: "",
      heroImg: "",
      role: "business",
      location: null,
      url,
      createdAt: moment(date).format("lll"),
      apiKey,
    };

    return data;
  }

  if (collection === "riders") {
    const data = {
      ...body,
      onlineStatus: "unavailable",
      pass2: body?.password,
      password: hash,
      adminId: role === "admin" && userId,
      managerId: role === "manager" && userId,
      businessId: role === "business" && userId,
      role: "rider",
      avatar: null,
      createdAt: moment(date).format("lll"),
      verifiedEmail: false,
      location: null,
      documents: null,
      apiKey,
    };
    return data;
  }
};
