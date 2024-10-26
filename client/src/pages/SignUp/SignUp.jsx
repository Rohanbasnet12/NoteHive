import React from "react";
import Navbar from "../../components/Navbar";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/signUpSchema";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";

const SignUp = () => {
  const onSubmit = async (values, actions) => {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 500));
    actions.resetForm();
  };

  // Destructure formik helpers and state values
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: signUpSchema,
      onSubmit,
    });
  return (
    <>
      <Navbar />
      <div id="login" className="flex items-center justify-center mt-16">
        <form onSubmit={handleSubmit} className="w-[350px]">
          <h1 className="text-center text-4xl font-bold py-4">SignUp</h1>
          <div className="name-input pt-4">
            <label htmlFor="name">Name</label>
            <div className="border-b-2 border-zinc-600">
              <input
                type="name"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full outline-none"
              />
            </div>
            {errors.name && touched.name && (
              <div className="error">
                <p className="text-red-500 pt-1">{errors.name}</p>
              </div>
            )}
          </div>
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
            Sign In
          </button>
          <p className="text-center w-full font-medium text-md">
            Already have an Account!
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
