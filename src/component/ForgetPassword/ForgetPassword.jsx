import React, { useState } from 'react'
import style from "./ForgetPassword.module.css"
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';




export default function ForgetPassword() {

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate()

    let ValidateScheme = yup.object({
        email: yup.string().email().required("Email is required"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: ValidateScheme,
        onSubmit: handleForgetPass,
    });



    async function handleForgetPass() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
                email: formik.values.email  // Pass the email as a parameter
            });
            console.log(data);
            if (data.statusMsg === "success") {
                navigate('/VerifyReset')

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
    




    return <>
        <section className='my-5'>
            <div className="container shadow p-5">
                <h2 className='text-center fw-bold mb-3'>Reset your password</h2>
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
                    placeholder='enter your email.....'
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="alert alert-danger">{formik.errors.email}</div>
                ) : null}
                    <button disabled={!(formik.isValid && formik.dirty)} className="btn me-2 bg-main text-white mt-2" type="submit">
                        {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
                    </button>
                </form>
            </div>
        </section>
    </>
}

