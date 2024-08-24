import React, { useState } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas/LoginSchema";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [successMessageLogin, setSuccessMessageLogin] = useState(""); // Move state declaration to the top

  const onSubmit = async (values, actions) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 500));
    actions.resetForm();
    setSuccessMessageLogin(
      "Congratulations! Your account has been successfully logged in!"
    );
  };

  // Destructure formik helpers and state values
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <>
      <Navbar />
      <div id="Login-Form" className="z-40 py-4 px-6 w-2/6 m-auto my-16">
        <form onSubmit={handleSubmit}>
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
            <Link to="/signUp">
              <span className="font-bold cursor-pointer"> Register</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
