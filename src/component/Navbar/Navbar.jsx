import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import logo from "../../Assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CounterContext } from "./../../Context/CounterContext";
import { UserToken } from "./../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import Wishlist from './../Wishlist/Wishlist';
import { WishlistContext } from "../../Context/wishlistContext";

export default function Navbar() {
  const { Token, setToken } = useContext(UserToken);
  const{numOfCartItems}=useContext(CartContext)
  const{numOfWish}=useContext(WishlistContext)
  
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate('')
    ;
  };

  return (<div className="mb-5 pb-5">
    <nav className="navbar navbar-expand-lg bg-body-tertiary  fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="home">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {Token !== null ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">
                  Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="allorders">
                  AllOrder
                </Link>
              </li>
              <li className="nav-item">
          <Link to={'/Wishlist'} className=" position-relative me-3">
            <span className="">wishlist</span><i className=" fs-3 p-1 me-2 fa-solid fa-heart"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {numOfWish}
                    <span className="visually-hidden">unread messages</span>
                  </span>
          </Link>
              </li>
              <li className="nav-item">
              <Link to={'/cart'} className=" position-relative me-3">
              <span className="">Cart</span>
                    <i className=" fs-3 p-1 me-2 fa-solid fa-cart-shopping"></i>
                  <span className="position-absolute mb-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems}
                  </span>
          </Link>

              </li>

            </ul>
          ) : (
            ""
          )}


          {Token !== null ? (
            <span
              className="m-2 text-decoration-none text-dark cursor-pointer"
              onClick={() => logout()}
            >
              Logout
            </span>
          ) : (
            <>
              <Link className="m-2" to="register">
                Register
              </Link>
              <Link className="m-2" to="">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  </div>

  );
}
