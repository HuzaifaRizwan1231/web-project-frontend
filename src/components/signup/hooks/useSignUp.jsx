import { useState } from "react";
import { signUpApiCall } from "../../../api/auth.api";

export const useSignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await signUpApiCall();

    if (response.success) {
      console.log("success");
    } else {
      console.log("Error");
    }

    setLoading(false);
  };
  return { formData, handleChange, handleSignUp, loading };
};
