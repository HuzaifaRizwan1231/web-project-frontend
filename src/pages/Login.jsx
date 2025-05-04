import React from "react";
import { useLogin } from "../components/login/hooks/useLogin";
import InputField from "../components/ui/InputField";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { formData, handleChange, handleLogin, loading, errors } = useLogin();
  const { email, password } = formData;
  return (
    <>
      <div className="grid grid-cols-2 h-screen">
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
        <div className="py-25">
          <div className="h-full flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-bold text-white">Code Insight</h1>
            <div>Other ways</div>
            <div>or use your email account</div>

            <form
              action=""
              className="w-full px-30 text-center flex flex-col gap-5"
              onSubmit={handleLogin}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <InputField
                    input={
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className="primary-input"
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
                        className="primary-input"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    }
                    error={errors.password}
                  />
                </div>
              </div>

              <div className="mb-5">Forgot your password?</div>

              <div className="mb-5 flex gap-2 justify-center">
                Don't have an account?
                <Link
                  to={"/signup"}
                  className="hover:button-primary cursor-pointer font-bold"
                >
                  Signup
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primary-btn flex items-center justify-center gap-2"
              >
                {loading && (
                  <FaSpinner className="animate-spin text-white" size={15} />
                )}
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
