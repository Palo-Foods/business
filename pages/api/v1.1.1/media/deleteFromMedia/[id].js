import cloudinary from "cloudinary";
import { authenticate } from "../../authentication";
import {
  statusCode200,
  statusCode401,
  statusCode403,
  statusCode404,
  statusCode405,
  statusCode500,
} from "../../status/codes";
import { verifyUser } from "../../verification";
import { deleteFromMedia } from "../deleteFromMedia";

export default authenticate(async (req, res) => {
  //verify user
  const { role, userId } = await verifyUser(req);

  const { id } = req.query;

  //1. get method
  const method = req.method;

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
    if (method !== "DELETE") {
      statusCode405(res);
      return;
    }

    await cloudinary.uploader.destroy(id, async (err, result) => {
      if (err?.result === "not found") {
        //remove to media
        const result = await deleteFromMedia(userId, id);
        if (result === "success") {
          statusCode200(res, {}, "OK");
        } else {
          statusCode404(res, "Deleting from media failed");
        }
      }
    });
  } catch (error) {
    statusCode500(res, error);
  }
});
