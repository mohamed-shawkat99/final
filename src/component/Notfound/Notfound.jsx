import React from 'react'
import style from "./Notfound.module.css"
import notFound from "../../Assets/images/error.svg"
export default function Notfound() {
    return <>
    <section className=' d-flex justify-content-center '>

        <img src={notFound} className='text-center w-75' alt="" />
    </section>
    </>
}

