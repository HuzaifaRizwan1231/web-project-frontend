import React from "react";
import { useSignUp } from "../components/signup/hooks/useSignUp";
import { Link } from "react-router";

const Signup = () => {
  const { formData, handleChange, handleSignUp, loading } = useSignUp();
  const { username, email, password, confirmPassword, profileImage } = formData;
  return (
    <>
      {/* Main Div */}
      <div className="grid grid-cols-2 h-screen">
        <div className="py-25">
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold text-white">Code Insight</h1>
            <div>Other ways</div>
            <div>or use your email account</div>

            <form
              action=""
              className="w-full px-30 text-center flex flex-col gap-5"
              onSubmit={handleSignUp}
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    className="signup-input"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="signup-input"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="signup-input"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    className="signup-input"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="profileImage"
                    value={profileImage}
                    className="signup-input cursor-pointer"
                    placeholder="Profile Image"
                    onChange={handleChange}
                  />
                </div>
                <div></div>
              </div>

              <div className="mb-5">
                Already have an account?
                <b className="hover:button-primary cursor-pointer">Login</b>
              </div>

              <button type="submit" disabled={loading} className="primary-btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        {/* Cover Div */}
        <div className="cover-section flex flex-col px-10 py-8 font-bold text-white">
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
