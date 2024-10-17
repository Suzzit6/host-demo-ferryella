import React from "react";
import { useEffect, useState } from "react";
import MobileHeader from "../mobileheader";
import Header from "../header";
import Footer from "../footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useUser } from "../../contexts/authContext";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useLoader } from "../../contexts/LoaderContext";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { TrackOrder } from "./trackorder";
import { jwtDecode } from "jwt-decode";
// import {
//   debouncedFetchCartData,
//   fetchCartData,
//   removeFromCart,
//   removeFromCartAsync,
// } from "../app/cartSlice.js";

export function MyOrders({toggleTrackPop,setPopOrder,setPopOrderId}) {
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const { userAuth, setuserAuth } = useUser();
  const [isDisabled, setisDisabled] = useState(true);

  const userCart = useSelector((state) => state.cart);
  const [userOrders, setUserOrders] = useState([]);

  const getKey = (product) => `${product.Product.id}-${product.size}`;
  const formatPrice = (price) => {
    if (userAuth && userAuth.country === "India") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  useEffect(() => {
    handleOrderFetch();
  }, []);

  const handleOrderFetch = async () => {
    let userID;
    if (userAuth) {
      userID = userAuth?.id;
    } else {
      const token = getCookie("token");
      const decodedToken = jwtDecode(token);
      userID = decodedToken.id || decodedToken._id;
    }
    try {
      const response = await axios.get(
        `http://localhost:5500/api/fetch-cart/${userID}`
      );
      console.log("response in fetch", response.data[0].userOrders);
      setUserOrders(response.data[0].userOrders);
    } catch (error) {
      console.log("error while cart", error);
    }
  };

    const togglefns = (userOrder,productId) => {
      toggleTrackPop();
      setPopOrder(userOrder);
      setPopOrderId(productId);
      console.log("productId",productId); 
    }
    
  return (
    <div id="page-content">
      
      <div className="container ">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
            <form action="#">
              <div className="wishlist-table table-content table-responsive">
                <table>
                  {/* <thead className="cart__row cart__header">
                    <tr>
                      <th colSpan={2} className="text-center">
                        Product
                      </th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-right">Total</th>
                      <th className="action">&nbsp;</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {userOrders &&
                      userOrders.map((userOrder,orderIndex) => (
                        <React.Fragment key={`order-${orderIndex}`}>

                        {userOrder.Order.OrderedItems.map((product) => {
                          const key = getKey(product);

                          return (
                            <tr className="cart__row border-bottom line1 cart-flex border-top">
                              <td className="cart__image-wrapper cart-flex-item">
                                {product.Product.Images &&
                                  product.Product.Images.filter(
                                    (image) => image.isPrimary
                                  ).map((image) => (
                                    <a href="#">
                                      <img
                                        className="cart__image"
                                        src={image.url}
                                        alt={product.Product.name}
                                      />
                                    </a>
                                  ))}
                              </td>
                              <td className="cart__meta small--text-left cart-flex-item">
                                <div className="list-view-item__title">
                                  <a> {product.Product.name} </a>
                                </div>
                                <div className="cart__meta-text">
                                  Color: {product.Product.Color}
                                  <br />
                                  Size: {product.size}
                                  <br />
                                  Quantity: {product.quantity}
                                  <br />
                                </div>
                              </td>
                              {/* <td className="cart__price-wrapper cart-flex-item">
                              <span className="money">
                                {userAuth?.country === "India"
                                  ? formatPrice(product.Product.currentprice)
                                  : formatPrice(
                                      product.Product.currentpriceGlobal
                                    )}
                              </span>
                            </td> */}
                              <td className="text-right left-phone">
                                <div>
                                  <span className="money">
                                    {userAuth?.country === "India"
                                      ? formatPrice(
                                          product.Product.currentprice *
                                            product.quantity
                                        )
                                      : formatPrice(
                                          product.Product.currentpriceGlobal *
                                            product.quantity
                                        )}
                                    {/* {formatPrice(
                                  product.Product.currentprice *
                                    product.quantity
                                )} */}
                                  </span>
                                </div>
                                <span className="input-group__btn down-adjust">
                                  <Link to={"/user/profile"}>
                                    <button
                                      className="btn newsletter__submit"
                                      name="commit"
                                      id="Subscribe"
                                      onClick={()=> togglefns(userOrder,product.Product._id)}  
                                    >
                                      <span className="newsletter__submit-text--large">
                                        Track
                                      </span>
                                    </button>
                                  </Link>
                                </span>
                              </td>
                          
                            </tr>
                          );
                        })}
                          </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
