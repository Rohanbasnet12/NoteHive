import * as yup from "yup";

const passwordSchema = yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    )
    .required("Password is required");

export const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: passwordSchema,
});
