import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    const[numOfWish,setNumOfWish] =useState([])

    const token = localStorage.getItem("userToken");
    const headers = {
        token: token
    };

    const addToWishlist = async (productId) => {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId },
                { headers }
            );
            setNumOfWish(data.data.length)
            return data;
        } catch (error) {
            console.error("Error adding item to wishlist:", error);
            return { error: "Error adding item to wishlist" };
        }
    };


    const removewish = async (productId) => {
        try {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers }
            );
            // console.log(data);
            setNumOfWish(data.data.length)

            return data;
        } catch (err) {
            console.error("Error removing item from wishlist:", err);
            return { error: "Error removing item from wishlist" };
        }
    };
    




    const loggedWishlist = async () => {
        try {
            const { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers }
            );
            setNumOfWish(data.data.length)

            return data;
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            return { error: "Error fetching wishlist" };
        }
    };


    useEffect(()=>{
        loggedWishlist()
        removewish()
    },[])

    return (
        <WishlistContext.Provider value={{ addToWishlist, loggedWishlist ,numOfWish, removewish}}>
            {props.children}
        </WishlistContext.Provider>
    );
}
