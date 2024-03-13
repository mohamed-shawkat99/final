import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CashOut() {
    const { cartId, setNumOfCartItems } = useContext(CartContext);
    const token = localStorage.getItem("userToken");
    const[isOnline,setIsOnline]=useState(false)
    const headers = {
        token: token
    };
    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^(01)(0|1|2|5)\d{8}$/, 'Invalid phone number')
            .required('Phone number is required'),
        city: Yup.string().required('City is required'),
        details: Yup.string()
    });

    const initialValues = {
        details: "",
        phone: "",
        city: ""
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => handlePayment(values)
    });

    async function handlePayment(shippingAddress) {
        console.log(shippingAddress, cartId);
        const endpoint = isOnline?
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
        :`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
       try {
            const { data } = await axios.post(endpoint, { shippingAddress }, { headers });
            if (data.status === 'success') {
                toast.success('order place successfully');
                setNumOfCartItems(0);
                if (isOnline) {
                    window.location.href = data.session.url
                }else{
                    setTimeout(() => {
                        navigate("/allorders");
                    }, 3000);
                }
            } else {
                toast.error('Oops! Something went wrong.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div className="container my-5">
                <h2>Checkout</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="phone">Phone</label>
                    <input
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        name="phone"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                    ) : null}

                    <label htmlFor="city">City</label>
                    <input
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                        id="city"
                        name="city"
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div className="invalid-feedback">{formik.errors.city}</div>
                    ) : null}

                    <label htmlFor="details">Details</label>
                    <textarea
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="form-control"
                        id="details"
                        name="details"
                        cols="3"
                        rows="3"
                    ></textarea>
                    <div className=' d-flex align-items-center'>
                    <input type="checkbox" className=' form-check-input'  onChange={()=>setIsOnline(!isOnline)}  />is online
                    {
                        isOnline?
                        (<button disabled={!(formik.isValid && formik.dirty)} type="submit" className="ms-3 btn btn-success bg-main mt-3">online Payment</button>):(
                        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="ms-3 btn btn-success bg-main mt-3">cash Payment</button>)
                    }
                    </div>
                </form>
            </div>
        </section>
    );
}
