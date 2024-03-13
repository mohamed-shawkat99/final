import React, { useState } from 'react'
import style from "./VerifyReset.module.css"
import axios from 'axios'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";

export default function VerifyReset() {


    let navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function verify(values) {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
                resetCode: values.resetCode
            });

            if (data.status === "Success") {
                navigate('/ResetPassword');
            } else {
                setErrorMessage("Invalid reset code.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while verifying the reset code. Please try again later.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    let ValidateScheme = yup.object().shape({
        resetCode: yup
          .string()
          .matches(/^\d{3,7}$/, 'Code must be between 3 and 7 digits')
                    .required('Code is required'),
    });

    let formik = useFormik({
        initialValues: {
            resetCode:""
        },
        validationSchema: ValidateScheme,
        onSubmit: verify,
    });

    return (
        <section className='my-5'>
            <div className="container shadow p-5">
                <h2 className='text-center fw-bold mb-3'>Verify Code</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="resetCode">Code</label>
                    <input
                        onBlur={formik.handleBlur}
                        onFocus={() => setErrorMessage("")}
                        onChange={formik.handleChange}
                        value={formik.values.resetCode}
                        className={`form-control mb-2 ${formik.touched.resetCode && formik.errors.resetCode ? 'is-invalid' : ''}`}
                        name="resetCode"
                        type="text"
                        id="resetCode"
                        placeholder='Enter your verification code...'
                    />
                    {formik.touched.resetCode && formik.errors.resetCode ? (
                        <div className="alert alert-danger">{formik.errors.resetCode}</div>
                    ) : null}
                    <button disabled={!(formik.isValid && formik.dirty)} className="btn me-2 bg-main text-white mt-2" type="submit">
                        {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Verify"}
                    </button>
                </form>
                {/* {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>} */}
            </div>
        </section>
    );
}
