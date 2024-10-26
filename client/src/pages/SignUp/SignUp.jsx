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
      <div id="login" className="flex items-center justify-center mt-24">
        <form onSubmit={handleSubmit} className="w-[350px]">
          <h1 className="text-center text-4xl font-bold py-4">SignUp</h1>

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
        </form>
      </div>
    </>
  );
};

export default SignUp;
