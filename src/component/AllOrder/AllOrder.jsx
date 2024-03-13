import React, { useContext, useState } from "react";
import style from "./AllOrder.module.css";
import axios from "axios";
import { UserToken } from "../../Context/TokenContext";
import { useEffect } from "react";
import { ClockLoader } from "react-spinners";

export default function AllOrder() {
  const { userId } = useContext(UserToken);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  async function getAllOrder() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );

      if (data?.length) {
        setOrders(data);
      } else {
        setOrders(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllOrder();
  }, []);



  return (
    <>
      <section>
        <div className="container"></div>
        <h2 className=" fw-bold text-uppercase mb-5 text-center">
          <i className="fa-solid fa-bag-shopping me-4 "></i>my orders
        </h2>
        {orders ? (
          orders.map((order) => (
            <div key={order.cartItems.id} className=" bg-body-secondary">
              <div className="row text-center">
                <div className="  my-4 rounded-pill">
                  <div className="row d-flex justify-content-center">
                    {order.cartItems.map((item) => (
                      <div key={item.id} className="col-md-1 mb-4">
                        <img
                          src={item.product.imageCover}
                          className="w-100"
                          alt=""
                        />
                        <p className="text-main font-sm">
                          {item.product.category.name}
                        </p>
                        <h5 className="mt-2">
                          {item.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h5>
                        <div className="d-flex justify-content-between my-2">
                          <div>{item.price}EGP</div>
                          <div>
                            <i className="fa-solid fa-star rating-color"></i>
                            {item.product.ratingsAverage}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="fw-bold">
                    <i className="fa-solid fa-circle-info me-1 text-danger"></i>
                    your city is{" "}
                    <span className="text-main">
                      {order.shippingAddress.city}
                    </span>{" "}
                    <span className="text-main">
                      {order.shippingAddress.details}
                    </span>{" "}
                    and logged phone number{" "}
                    <span className="text-main">
                      {order.shippingAddress.phone}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : isLoading ? (
          <div className="w-100 py-5 my-5 d-flex justify-content-center align-items-center">
            <ClockLoader color="#36d7b7" size={300} />
          </div>
        ) : (
          <h2 className="fw-bolder text-center bg-body-tertiary">
            your orders is empty{" "}
            <i className="fa-solid fa-face-sad-tear me-4"></i>
          </h2>
        )}
      </section>
    </>
  );
}
