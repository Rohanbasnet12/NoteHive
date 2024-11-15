import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/signUpSchema";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Store error message if sign-up fails

  const onSubmit = async (values, actions) => {
    try {
      setErrorMessage("");

      // Make the API request to sign up
      const response = await axiosInstance.post("/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      // Check for token and store it
      const token = response.data?.accessToken || response.data?.token;
      if (token) {
        localStorage.setItem("token", token); // Store token in local storage
        navigate("/"); // Redirect to homepage
      } else {
        console.error("Access token missing in response");
        setErrorMessage("Sign-up failed: access token not provided.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error); // Log any error during sign-up
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

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: signUpSchema,
      onSubmit,
    });

  return (
    <>
      <Navbar />
      <div id="sign-up" className="flex items-center justify-center mt-16">
        <form onSubmit={handleSubmit} className="w-[350px]">
          <h1 className="text-center text-4xl font-bold py-4">Sign Up</h1>

          {/* Username */}
          <div className="name-input pt-4">
            <label htmlFor="username">Username</label>
            <div className="border-b-2 border-zinc-600">
              <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              />
            </div>
            {errors.username && touched.username && (
              <div className="error">
                <p className="text-red-500 pt-1">{errors.username}</p>
              </div>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-800 text-white font-medium text-xl rounded-md py-2 my-5"
          >
            Sign Up
          </button>

          {/* Link to Login */}
          <p className="text-center w-full font-medium text-md">
            Already have an account?
            <Link to="/login">
              <span className="font-bold cursor-pointer"> Login </span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
