import cloudinary from "cloudinary";
import { authenticate } from "../authentication";
import {
  statusCode200,
  statusCode401,
  statusCode403,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../status/codes";
import { verifyUser } from "../verification";
import { pushToMedia } from "./pushtoMedia";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  //1. get method
  const method = req.method;

  const { imgUrl } = JSON.parse(req.body);
  console.log("imgUrl", imgUrl);

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    //1. check if authorized to sign up, using match, role
    if (role !== "business") {
      statusCode401(res);
      return;
    }

    //2. check for method
    //if method does not exist
    if (method !== "POST") {
      statusCode405(res);
      return;
    }

    let response = await cloudinary.uploader.upload(imgUrl, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    if (response?.public_id) {
      //push to media
      const result = await pushToMedia(
        userId,
        response?.public_id,
        response?.url
      );
      if (result === "success") {
        statusCode200(res, {}, "OK");
      } else {
        statusCode403(res, "Uploading to your media folder failed");
      }
    } else {
      statusCode404(res, "Uploading to cloud failed");
    }
  } catch (error) {
    statusCode500(res, error);
  }
});
