import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import axios from "axios";

export default function CategorySlider() {
  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isError, isLoading, data } = useQuery(
    `categorySlider`,
    getCategorySlider
  );
  let category = data?.data.data;
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };

  return (
    <>
      {category ? (
        <div className="container">
          <h3 className=" text-capitalize fw-medium mb-2">
            shop popular categories
          </h3>
          <Slider className="pb-3" {...settings}>
            {category.map((categoryItem) => (
              <div key={categoryItem._id}>
                <img
                  src={categoryItem.image}
                  height={200}
                  className="w-100"
                  alt=""
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
