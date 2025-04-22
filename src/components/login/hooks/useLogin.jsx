import { useState } from "react";
import { loginApiCall } from "../../../api/auth.api";

export const useLogin = () => {
  // states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation

    // Api Call
    const response = await loginApiCall();

    if (response.success) {
      console.log("Success");
    } else {
      console.error("Error");
    }

    setLoading(false);
  };
  return { formData, handleChange, handleLogin, loading };
};
