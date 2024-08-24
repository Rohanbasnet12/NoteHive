import React from "react";
import { Formik, Form, Field } from "formik";

const SearchBar = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { setSubmitting }) => {
        onSearch(values.query);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-center justify-between border-2 rounded-md">
          <Field
            type="text"
            name="query"
            placeholder="Search..."
            className="border py-1 px-4 rounded"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-2 py-1 px-2 bg-blue-500 text-white rounded"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
