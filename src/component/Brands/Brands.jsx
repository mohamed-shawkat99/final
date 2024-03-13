import React, { useState } from "react";
import style from "./Brands.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";
export default function Brands() {
  const [searchQuery, setSearchQuery] = useState("");

  function getBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { isError, isLoading, data } = useQuery(`getBrand`, getBrand);

  let Brands = data?.data?.data;

  const filteredBrands = Brands
    ? Brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {Brands ? (
        <section className="p-5 m-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  placeholder="Search Brands"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                />
              </div>
              {filteredBrands.map((brand) => (
                <div
                  key={brand._id}
                  className="col-md-2 product rounded-5 p-3 cursor-pointer"
                >
                  <Link to={`/BrandsDetails/${brand._id}`}>
                    <img src={brand.image} className="w-100" alt={brand.name} />
                    <h1>{brand.id}</h1>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="w-100 py-5 my-5 d-flex justify-content-center align-items-center">
          <ClockLoader color="#36d7b7" size={300} />
        </div>
      )}
    </>
  );
}
