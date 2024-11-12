import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/loginSchema";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // For storing error messages

  const onSubmit = async (values, actions) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: values.email, // Access values from Formik
        password: values.password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/"); // Redirect to homepage (or dashboard)
      }
    } catch (error) {
      // Handle error and display appropriate error message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      actions.setSubmitting(false); // Reset submitting state
    }
  };

  // Destructure formik helpers and state values
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
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
            {errors.email && touched.email && (
              <div className="error">
                <p className="text-red-500 pt-1">{errors.email}</p>
              </div>
            )}
          </div>

          {/* Password Input */}
          <PasswordInput
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          {/* Error Message */}
          {errorMessage && (
            <div className="error-message text-red-500 text-center py-2">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-slate-800 text-white font-medium text-xl rounded-md py-2 my-5"
          >
            Login
          </button>

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
