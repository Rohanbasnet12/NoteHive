import React, { useState } from "react";

const PasswordInput = ({ value, handleChange, handleBlur, error, touched }) => {
  const [seePass, setSeePass] = useState(false); // State to toggle the visibility of the password
  const [passwordFocused, setPasswordFocused] = useState(false); // State to track if the password input is focused

  // Handle focus event on the password input
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  // Handle click event on the eye icon to toggle password visibility
  const handleEyeClick = () => {
    setSeePass((prevState) => !prevState);
  };

  return (
    <div className="password-input py-4">
      <label htmlFor="password">Password</label>
      <div className="flex border-b-2 border-zinc-600">
        <input
          type={seePass ? "text" : "password"} // Toggle input type between "text" and "password"
          id="password"
          name="password"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handlePasswordFocus}
        />
        {passwordFocused && (
          <span onClick={handleEyeClick} className="cursor-pointer">
            {seePass ? (
              <i className="fa-solid fa-eye-slash"></i> // Icon for hiding password
            ) : (
              <i className="fa-solid fa-eye"></i> // Icon for showing password
            )}
          </span>
        )}
      </div>
      {error && touched && (
        <div className="error">
          <p className="text-red-500 pt-1">{error}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
