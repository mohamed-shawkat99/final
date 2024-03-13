import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { WishlistContext } from "../../Context/wishlistContext";
import { CartContext } from "../../Context/CartContext";
import { ClockLoader } from "react-spinners";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

export default function Wishlist() {
  const { loggedWishlist, removewish } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getAddToCart(id) {
    let data = await addToCart(id);
    if (data?.status == "success") {
      toast.success("Item added to cart successfully");
    } else {
      toast.error("Item didn't add");
    }
  }

  async function getRemovewish(id) {
    const data = await removewish(id);
    console.log(data);
    if (data.status == "success") {
      toast.success("product removed from wishlist");
      window.location.reload()
    } else {
      toast.error("ops something went wrong");
    }
  }


  async function getloggedWishlist() {
    setIsLoading(true);
    try {
        const data = await loggedWishlist()
      if (data?.status == "success") {
        setWishlist(data);
      } else {
        setWishlist(null);

      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
   
  }


  useEffect(() => {
    getloggedWishlist();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <h2 className="h1 text-center">
            <i className="fa-solid fa-heart me-3"></i>WishList
          </h2>
          {wishlist? <div className="row">
            {
                wishlist.data.map((wish) => (
                    <div key={wish.id} className="col-md-2">
                    <div className="product position-relative cursor-pointer p-3 rounded-3">
                        <i
                            onClick={() => getRemovewish(wish.id)}
                            className={`fa-solid fa-x position-absolute heart`}
                        ></i>
                        <Link to={`/ProductDetails/${wish.id}`}>
                            <img src={wish.imageCover} className='w-100' alt="" />
                            <p className='text-main font-sm'>{wish.category.name}</p>
                            <h5 className='mt-2'>{wish.title.split(" ").slice(0, 2).join(" ")}</h5>
                            <div className='d-flex justify-content-between my-2'>
                                <div>
                                    {wish.price}EGP
                                </div>
                                <div>
                                    <i className="fa-solid fa-star rating-color"></i>
                                    {wish.ratingsAverage}
                                </div>
                            </div>
                        </Link>
                        <button onClick={() => getAddToCart(wish.id)} className='btn bg-main text-white w-100'>Add to cart</button>
                    </div>
                </div>
                ))
            }
                </div>: isLoading ? (
          <div className="w-100 py-5 my-5 d-flex justify-content-center align-items-center">
            <ClockLoader color="#36d7b7" size={300} />
          </div>
        ) : <h2 className="fw-bolder text-center bg-body-tertiary">
        your wishs is empty
        <i className="fa-solid fa-face-sad-tear me-4"></i>
      </h2>
}
        </div>
      </section>
    </>
  );
}
          