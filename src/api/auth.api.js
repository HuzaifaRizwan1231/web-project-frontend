import api from "../axios/axios.config";

const path = "/auth";

export const loginApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/login`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
