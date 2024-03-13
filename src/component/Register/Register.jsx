import React, { useState } from "react";
import style from "./Register.module.css";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";





export default function Register() {


let navigate = useNavigate()

const [errorMassage,seterrormessage] =useState("")
const [isLoading,setIsLoading] =useState(false)

  async function submitRegister(reqBody) {
    setIsLoading(true)
    seterrormessage("")
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',reqBody).catch(error=>{
    setIsLoading(false)
    console.log(error.response.data);
    seterrormessage(error.response.data.message)})
    console.log(data);
    if (data.message=="success") {
        navigate('/')
    }
  }

  let phoneRegex = /^(?:\+?20)?(?:0)?(?:1[0-2]|2|5)?[0-9]{8}/;
  let ValidateScheme = yup.object({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    phone: yup
      .string()
      .matches(phoneRegex, "phone is invalid")
      .required("phone is required"),
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .matches(/^[a-z0-9]{5,10}$/, "password is invalid")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords must match")
      .required("repassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: ValidateScheme,
    onSubmit: submitRegister,
  });





  return (
    <div className="w-75 mx-auto py-5">
      <h3>Register Now</h3>
      {errorMassage ?<div className=" alert-danger alert">{errorMassage}</div>:'' }
      
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          className={`form-control mb-2 ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
          name="name"
          type="text"
          id="name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="alert alert-danger">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="phone">Phone</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          className={`form-control mb-2 ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ' '}`}
          name="phone"
          type="text"
          id="phone"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="alert alert-danger">{formik.errors.phone}</div>
        ) : null}

        <label htmlFor="email">Email</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className={`form-control mb-2 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ' '}`}

          name="email"
          type="email"
          id="email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          onBlur={formik.handleBlur}
          onFocus={() => seterrormessage(null)}
          onChange={formik.handleChange}
          value={formik.values.password}
          className={`form-control mb-2 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ' '}`}
          name="password"
          type="password"
          id="password"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="alert alert-danger">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="rePassword">Confirm Password</label>
        <input
          onBlur={formik.handleBlur}
          onFocus={() => seterrormessage(null)}
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          className={`form-control mb-2 ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ' '}`}
          name="rePassword"
          type="password"
          id="rePassword"
        />
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <div className="alert alert-danger">{formik.errors.rePassword}</div>
        ) : null}

        <button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-white mt-2" type="submit">
            {isLoading ? <i className="fa fa-spinner fa-spin"></i>: "Register"}
          
        </button>
      </form>
    </div>
  );
}
