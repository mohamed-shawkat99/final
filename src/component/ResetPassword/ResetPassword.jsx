import React, { useState } from "react";
import style from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ValidateScheme = yup.object().shape({
    email: yup.string().email().required("email is required"),
      newPassword: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]{5,10}$/,
        "New password must be 5-10 characters long and contain only letters and numbers."
      )
      .required("New password is required"),
  });

  const formik = useFormik({
    initialValues: {
        email: "",
        newPassword: "",
    },
    validationSchema: ValidateScheme,
    onSubmit: updatePassword,
  });
  async function updatePassword(values) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword,
        },
      );

      console.log(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred while updating password. Please try again later."
      );
    } finally {
      setIsLoading(false);
      navigate("/")
    }
  }
  return (
    <div className="w-75 mx-auto py-5">
      <h3>Reset Password</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className={`form-control mb-2 ${
              formik.touched.email && formik.errors.email ? "is-invalid" : " "
            }`}
            name="email"
            type="email"
            id="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className={`form-control ${
              formik.touched.newPassword && formik.errors.newPassword
                ? "is-invalid"
                : ""
            }`}
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="invalid-feedback">{formik.errors.newPassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formik.isValid || isLoading}
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
        </button>
      </form>
    </div>
  );
}
