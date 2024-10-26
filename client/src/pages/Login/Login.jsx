import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "../../schema/loginSchema";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/PasswordInput";

const Login = () => {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    actions.resetForm();
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
          <PasswordInput
            value={values.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
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
