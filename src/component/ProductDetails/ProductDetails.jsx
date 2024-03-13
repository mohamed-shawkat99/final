import React, { useContext } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick"
import logo from "../../Assets/images/banner-4.jpeg"
import logo2 from "../../Assets/images/blog-img-1.jpeg"
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
export default function ProductDetails() {
const { addToCart } = useContext(CartContext);
let params = useParams()
function getProductDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.id}`)
}
let{isError,isLoading,data}=useQuery(`ProductDetails`,getProductDetails)

    let apiProductDetails = data?.data.data
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

      async function getAddToCart(id) {
        let data = await addToCart(id);
        if (data?.status == 'success') {
            toast.success('Item added to cart successfully');
        } else {
            toast.error('Item didn\'t add');
        }
    }


      
    return <>
    {data?.data.data?<div className="container">
        <div className="row align-items-center py-5 gy-5">
            <div className="col-md-3">
                 <Slider {...settings}>
                    {apiProductDetails.images.map((image,index)=>{
                        return <div key={index} className=' cursor-pointer'>
                        <img src={image} className='w-100' alt="" />
                        </div>
                    })}
                        </Slider>
            
            </div>
            <div className="col-md-9 ">
            <h2 className=' fw-bold h5'>{apiProductDetails.title}</h2>
            <p className=' text-muted'>{apiProductDetails.description}</p>
            <p >{apiProductDetails.category.name}</p>
            <div className=' d-flex justify-content-between'>
                <p className='text-main'>{apiProductDetails.price} EGP</p>
                <p>{apiProductDetails.ratingsAverage} <i className='fa fa-star rating-color'></i></p>
            </div>
            <button onClick={()=>getAddToCart(apiProductDetails.id)}  className='btn bg-main text-white w-100'>+ Add To Cart</button>
            </div>
        </div>
    </div>:""}
    
    </>
}

