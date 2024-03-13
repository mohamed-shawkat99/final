import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick"
import slider1 from "../../Assets/images/slider-image-1.jpeg"
import slider2 from "../../Assets/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/slider-image-3.jpeg"
import blog1 from "../../Assets/images/blog-img-1.jpeg"
import blog2 from "../../Assets/images/blog-img-2.jpeg"

export default function MainSlider() {


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };


    return <>
    <div className="container my-5">
        <div className="row g-0">
            <div className="col-md-9">
            <Slider {...settings}>
                <img src={slider1} height={400} className=' cursor-pointer w-100' alt="" />
                <img src={slider2} height={400} className=' cursor-pointer w-100' alt="" />
                <img src={slider3} height={400} className=' cursor-pointer w-100' alt="" />
            </Slider>
            </div>
            <div className=' col-md-3'>
                <img height={200} className='w-100' src={blog1} alt="" />
                <img height={200} className='w-100' src={blog2} alt="" />
            </div>
        </div>
    </div>
    </>
}

