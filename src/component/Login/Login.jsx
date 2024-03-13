import React, { useState } from "react";
import style from "./Login.module.css";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../Context/TokenContext";
import { useContext } from "react";

export default function Login() {
    let { setToken } = useContext(UserToken);
    let navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function submitLogin(reqBody) {
        setIsLoading(true);
        setErrorMessage("");
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', reqBody);
            console.log(data);
            if (data.message === "success") {
                localStorage.setItem(`userToken`, data.token);
                setToken(data.token);
                navigate('/home');
            } else {
                setErrorMessage("Invalid email or password.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage("An error occurred while logging in. Please try again later.");
            console.log(error);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    }

    let ValidateScheme = yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup.string().matches(/^[a-z0-9]{5,10}$/, "Password is invalid").required("Password is required")
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: ValidateScheme,
        onSubmit: submitLogin,
    });

    return (
        <div className="w-75 mx-auto pt-5 mt-5 py-5">
            <h3>Login Now</h3>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    onBlur={formik.handleBlur}
                    onFocus={() => setErrorMessage("")}
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
                    onFocus={() => setErrorMessage("")}
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
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className=" d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <button disabled={!(formik.isValid && formik.dirty)} className="btn me-2 bg-main text-white mt-2" type="submit">
                        {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
                    </button>
                    <Link className="mt-2 ms-3" to={"/register"}>Register Now</Link>
                </div>
                <div className="mt-3">

                    <Link className="mt-2 fw-bold ms-3" to={"/forget"}>forget Password ?</Link>
                </div>
                    </div>
            </form>
        </div>
    );
}
