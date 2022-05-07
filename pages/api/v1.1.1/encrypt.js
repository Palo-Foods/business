import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const encryptPassword = async (payload, signUp) => {
  //create an api key and hash it
  const token = uuidv4();

  const apiKey = await hash(token, 10);

  hash(payload, 10, async function (err, hash) {
    await signUp(hash);
  });

  return { apiKey };
};
