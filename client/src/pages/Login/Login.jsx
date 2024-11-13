import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log("Login values:", values); // Log the values for debugging
    navigate("/"); // Redirect to the home page
  };

  // Initialize formik with basic structure for email and password
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <>
      <Navbar />
      <div id="login" className="flex items-center justify-center mt-24">
        <form onSubmit={handleSubmit} className="w-[350px]">
          <h1 className="text-center text-4xl font-bold py-4">Login</h1>

          {/* Email Input */}
          <div className="email-input pt-4">
            <label htmlFor="email">Email</label>
            <div className="border-b-2 border-zinc-600">
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <PasswordInput
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-slate-800 text-white font-medium text-xl rounded-md py-2 my-5"
          >
            Login
          </button>

          {/* Sign-up Link */}
          <p className="text-center w-full font-medium text-md">
            Don't have an account?
            <Link to="/signup">
              <span className="font-bold cursor-pointer"> Register</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
