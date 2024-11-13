import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/loginSchema";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Store error message if login fails

  // Login form submission handler
  const onSubmit = async (values, actions) => {
    try {
      console.log("Attempting login with values:", values); // Log form values for debugging

      // Make the API request to log in
      const response = await axiosInstance.post("/login", {
        email: values.email,
        password: values.password,
      });

      console.log("Full response:", response); // Check full response structure
      console.log("Response data:", response.data); // Log response data to confirm structure

      // Adjust for different potential response structures
      const token = response.data?.accessToken || response.data?.token;
      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        console.log("Token saved successfully. Navigating to '/'");
        navigate("/"); // Redirect to homepage
      } else {
        console.error("Access token missing in response");
        setErrorMessage("Login failed: access token not provided.");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log any error during login
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Show specific error from API
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      actions.setSubmitting(false); // Reset form submitting state
    }
  };

  // Formik setup to manage form state and validation
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

          {/* Error Message Display */}
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
