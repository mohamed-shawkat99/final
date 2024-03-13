import React from 'react'
import style from "./Footer.module.css"
export default function Footer() {
    return <>
    <footer>
        <div className="container p-5">
            <h2>Get the freshcart app</h2>
            <p className=" text-muted">we will send you a lik , open on your phone to download the app </p>
            <div className='py-3 d-flex justify-content-between border-bottom'>
                <input className=' form-control me-5' type="email" placeholder='Email...' />
                <button className='btn bg-main text-white w-25'>share app link </button>
            </div>
            <div className="d-flex py-3 justify-content-between border-bottom">
            <p>payment partners </p>
            <p>get deliveries with freshcart</p>
            </div>
        </div>
    </footer>
    </>
}

