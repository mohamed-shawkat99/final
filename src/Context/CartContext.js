import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';

export const CartContext = createContext();

export default function CartContextProvider(props) {
    const[numOfCartItems,setNumOfCartItems] =useState(0)
    const [cartId, setCartId] = useState(null);
    const token = localStorage.getItem("userToken");
    const headers = {
        token: token
    };

    const addToCart = async (productId) => {
        try {
            const {data} = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers }
            );
            setNumOfCartItems(data.numOfCartItems)
            return data;
        } catch (error) {
            return { error: "Error adding item to cart" };
        }
    };


    const loggedCart = async () => {
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
            setNumOfCartItems(data.numOfCartItems)
            setCartId(data.data._id)
            return data;
        } catch (err) {
            console.log(err.response.data.message);
            return { error: "Error fetching cart" };
        }
    };

    const removeItems = async (productId) => {
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            setNumOfCartItems(data.numOfCartItems)
            return data;
        } catch (err) {
            console.error("Error removing item from cart:", err);
        }
    };


    const updateItems = async (productId, count) => {
        try {
            const {data} = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                { headers }
            );
            return data;
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    };
    useEffect(()=>{
        loggedCart()
    },[])

    return (
        <CartContext.Provider value={{setNumOfCartItems,cartId,removeItems,addToCart,loggedCart,numOfCartItems,updateItems}}>
            {props.children}
        </CartContext.Provider>
    );
}















    // const [cartDetails, setCartDetails] = useState(null);
    // const [cartCount, setCartCount] = useState(null);
    // const [cartId, setcartId] = useState(null);
    // const token = localStorage.getItem("userToken");
    // const headers = {
    //     token: token
    // };
    // const [clear , setClear]=useState(false)

    // const addCart = async (productId) => {
    //     try {
    //         const response = await axios.post(
    //             `https://ecommerce.routemisr.com/api/v1/cart`,
    //             { productId },
    //             { headers }
    //         );
    //         const data = response.data;
    //         setCartCount(data.numOfCartItems);
    //         localStorage.setItem("cartCount", data.numOfCartItems);
    //         return data;
    //     } catch (error) {
    //         console.error("Error adding item to cart:", error);
    //         return { error: "Error adding item to cart" };
    //     }
    // };



    // const getLoggedCart = async () => {
    //     try {
    //         const data = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
    //         setcartId(data.data.data._id)
    //         console.log(data);
    //         return data;
    //     } catch (err) {
    //         console.log(err.response.data.message);
    //         return { error: "Error fetching cart" };
    //     }
    // };




    // const removeCart = async (productId) => {
    //     try {
    //         const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
    //         return response;
    //     } catch (err) {
    //         console.error("Error removing item from cart:", err);
    //         return { error: "Error removing item from cart" };
    //     }
    // };

    // const UpdateCart = async (productId, count) => {
    //     try {
    //         const response = await axios.put(
    //             `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    //             { count },
    //             { headers }
    //         );
    //         return response.data;
    //     } catch (err) {
    //         console.error("Error updating cart:", err);
    //         return { error: "Error updating cart" };
    //     }
    // };




