import * as yup from "yup";

const usernameSchema = yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot be more than 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .required("Username is required");

const passwordSchema = yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    )
    .required("Password is required");

export const registrationSchema = yup.object().shape({
    username: usernameSchema,
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: passwordSchema,
});
