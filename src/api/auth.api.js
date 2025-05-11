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

export const loginApiCall = async (body) => {
  try {
    const response = await api.post(`${path}/login`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getUserApiCall = async () => {
  try {
    // const response = await api.get(`${path}/user`);
    const response = await {
      data: {
        success: true,
        data: {
          user: {
            username: "Khizr",
            email: "khiz6@gmail.com",
            password:
              "$2b$10$w1IFVpwXL11SLr6cvOuOnu9Yl3fcii1lyildzz7Pb.ADAB0zbnO4S",
            profileImage: "https://www.w3schools.com/howto/img_avatar.png",
            createdAt: {
              $date: "2025-04-24T13:48:32.761Z",
            },
            updatedAt: {
              $date: "2025-04-24T13:48:32.761Z",
            },
            __v: 0,
          },
        },
      },
    };
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
