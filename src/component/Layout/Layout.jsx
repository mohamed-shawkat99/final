import React, { useEffect } from 'react'
import style from "./Layout.module.css"
import Footer from './../Footer/Footer';
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserToken } from '../../Context/TokenContext';
import { Offline, Online } from "react-detect-offline";


export default function Layout() {
    
    let {setToken}=useContext(UserToken)

    useEffect(()=>{
        if(localStorage.getItem('userToken')!==null)
        setToken(localStorage.getItem('userToken'))
    },[])
    
    return <>
    <Navbar/>
    <Outlet></Outlet>
    <div >
    <Offline>
        <div  className="network">
            <i className=' fa fa-wifi text-danger'></i>offline
            </div>
            </Offline>
    </div>
    <Footer/>
    </>
}

