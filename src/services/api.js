import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
export const getApi = async (path) => {
  try {
    const result = await axios.get(baseURL + path, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("admin_anjuman_token"),

      },
      withCredentials: true
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postApi = async (path, body) => {
  try {
    const result = await axios.post(baseURL + path, body, {
       headers: {
        // Authorization: "Bearer " + localStorage.getItem("admin_anjuman_token"),
      },
      withCredentials: true
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
