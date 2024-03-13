import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Cart() {
  const{loggedCart ,numOfCartItems,removeItems , updateItems}=useContext(CartContext)
  const [cartDetails,setCartDetails]=useState(null)
  const [isLoading, setIsLoading] = useState(false);



  async function getLoggedCart(){
    setIsLoading(true)
    const data = await loggedCart()
    if (data?.status=='success') {
      setCartDetails(data)
    }else{
      setCartDetails(null)
    }
    setIsLoading(false)
  }


  async function getRemoveItems(id){
    const data = await removeItems(id)
    if (data.status =="success") {
      toast.success('product removed from cart')
    }else{
      toast.error('ops something went wrong')
    }
    setCartDetails(data)
  }

async function getUpdateItems(id, count) {
try {
  const data = await updateItems(id, count);
  setCartDetails(data);
  if (data?.status === "success") {
    toast.success('product updated from cart')
  }else{
    toast.error('ops something went wrong')
  }
} catch (error) {
  console.error("Error updating cart:", error);
}
}

useEffect(()=>{
  getLoggedCart()
},[])

// console.log(cartDetails);

  return (
    <>
    <section className="my-5">
      <div className="container">
        <h2 className="fw-bold mb-4"><i class="fa-solid fa-cart-shopping me-3"></i>Shopping Cart</h2>
          {
            cartDetails ? 
            <section className=" bg-main-light p-5">
            <div className="d-flex justify-content-between mb-3">
              <h3>total price :<span className="text-main">{cartDetails.data.totalCartPrice}</span></h3>
              <h3>total items :<span className="text-main">{numOfCartItems}</span></h3>
            </div>



            {
              cartDetails.data.products.map((product)=>(
                <div key={product.product.id} className="row border-bottom py-3 my-3">
                <div className="col-md-1">
                  <figure>
                    <img src={product.product.imageCover} className=" img-fluid" alt="title" />
                  </figure>
                </div>
                <div className="col-md-9">
                  <h3 className=" fw-bold">{product.product.title
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}</h3>
                  <h4 className=" ms-3 font-sm fw-bold text-success ">{product.price} EGP</h4>
                  <button onClick={()=>getRemoveItems(product.product.id)} className="btn text-danger">
                    <i className="fa fa-trash me-2"></i>
                    Remove
                  </button>
                </div>
                <div className="col-md-2">
                  <button onClick={() =>getUpdateItems(product.product.id, product.count - 1)} className="btn btn-outline-success">-</button>
                  <span  className="mx-2">{product.count}</span>
                  <button onClick={() =>getUpdateItems(product.product.id, product.count + 1)} className="btn btn-outline-success">+</button>
                </div>
              </div>
              )

              )
            }
            <Link to={"/CashOut"} className="btn btn-success text-white bg-main w-100">cashout</Link>
            </section>: isLoading ? (
          <div className="w-100 py-5 my-5 d-flex justify-content-center align-items-center">
            <ClockLoader color="#36d7b7" size={300} />
          </div>
        ) : 
          <h2 className="fw-bolder text-center bg-body-tertiary">
            your cart is empty{" "}
            <i className="fa-solid fa-face-sad-tear me-4"></i>
          </h2>
        
          }
      </div>
    </section>
    </>
  );
}
