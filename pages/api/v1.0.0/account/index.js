import { authenticate } from "../authentication";
import { findOne } from "../crud/find";

export default authenticate(async (req, res) => {
  try {
    const response = await findOne(req, res, "managers", {
      _id: ObjectId(id),
    });

    const { status, statusText, data, error } = response;

    res.status(status).json({
      status: status,
      statusText: statusText,
      data: data,
      error: error,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, statusText: "OK", error: error.message });
  }
});
