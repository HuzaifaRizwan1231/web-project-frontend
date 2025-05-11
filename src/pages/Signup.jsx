import React from "react";
import { useSignUp } from "../components/signup/hooks/useSignUp";
import InputField from "../components/ui/InputField";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { formData, handleChange, handleSignUp, loading, errors } = useSignUp();
  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  return (
    <>
      {/* Main Div */}
      <div className="grid lg:grid-cols-2 h-screen bg-gray-900">
        <div className="py-25">
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold text-white">Code Insight</h1>
            <div>Other ways</div>
            <div>or use your email account</div>

            <form
              action=""
              className="w-full sm:px-28 px-14 text-center flex flex-col gap-5"
              onSubmit={handleSignUp}
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-4">
                <div className="">
                  <InputField
                    input={
                      <input
                        type="text"
                        name="username"
                        value={username}
                        className="signup-input min-w-80 p-2"
                        placeholder="Username"
                        onChange={handleChange}
                      />
                    }
                    error={errors.username}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="signup-input min-w-80"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    }
                    error={errors.email}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="password"
                        name="password"
                        value={password}
                        className="signup-input min-w-80"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    }
                    error={errors.password}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        className="signup-input min-w-80"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                      />
                    }
                    error={errors.confirmPassword}
                  />
                </div>
                <div>
                  <InputField
                    input={
                      <input
                        type="file"
                        name="profileImage"
                        className="signup-input cursor-pointer min-w-80"
                        placeholder="Profile Image"
                        onChange={handleChange}
                      />
                    }
                    error={errors.profileImage}
                  />
                </div>
                <div></div>
              </div>

              <div className="mb-5 flex gap-2 justify-center">
                Already have an account?
                <b
                  className="hover:button-primary cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </b>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primary-btn flex items-center justify-center gap-2 min-w-40"
              >
                {loading && (
                  <FaSpinner className="animate-spin text-white" size={15} />
                )}
                Sign Up
              </button>
            </form>
          </div>
        </div>
        {/* Cover Div */}
        <div className="cover-section flex-col px-10 py-8 font-bold text-white hidden lg:flex">
          <h1 className="text-3xl">Code Insight</h1>
          <div className="flex flex-col flex-1 gap-3 justify-center">
            <h1 className="text-6xl ">Program Optimally!</h1>
            <div className="text-4xl font-light">
              Write, Analyze and improve your code
            </div>
          </div>
          <h1 className="py-3 text-center font-medium">Links</h1>
        </div>
        {/* Signup Form Section */}
      </div>
    </>
  );
};

export default Signup;
