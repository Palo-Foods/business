import { get } from "./get";

export const getData = async (url: string) => {
  const token: string = sessionStorage.getItem("user");
  const authToken: string = JSON.parse(token)
    try { 
      const response = await get(url, authToken);
      return {response}
    } catch(error){
      return {error: error.message}
    }
}

