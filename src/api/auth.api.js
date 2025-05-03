import api from "../axios/axios.config";

const path = "/auth";

export const signUpApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/signup`, body);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
