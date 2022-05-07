import cloudinary from "cloudinary";
import { verify } from "jsonwebtoken";
import { secret_key } from "../../../../lib/secret";
import { authenticate } from "../authentication";
import { deleteFromMedia } from "./deleteFromMedia";

export default authenticate(async (req, res) => {
  //1. get method
  const method = req.method;
  // get api key
  const { authorization } = req.headers;

  const { data } = verify(authorization, secret_key);

  const { id } = data;

  const { publicId } = JSON.parse(JSON.parse(req.body));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (method === "DELETE") {
      let response = await cloudinary.uploader.destroy(
        publicId,
        (err, result) => {
          if (err) return { success: false, message: err };
          return "success";
        }
      );

      //remove to media
      await deleteFromMedia(id, publicId);
      res
        .status(200)
        .json({ status: 200, statusText: "OK", data: { response } });
    } else {
      res.status(400).json({
        status: 400,
        statusText: "bad request method",
        data: { response },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      statusText: "Internal server error",
      error: error.message,
    });
  }
});
