import React, { useRef, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  NavLink,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useUser } from "../contexts/authContext";
// import { useCart } from "../contexts/cartcontext";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Footer from "./footer";
import Header from "./header";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import { useDispatch, useSelector } from "react-redux";
import {
  debouncedFetchCartData,
  fetchCartData,
  removeFromCart,
} from "../app/cartSlice.js";
import { getOrCreateGuestId } from "../components/createGuest.jsx";
import { useLoader } from "../contexts/LoaderContext.jsx";
import ErrorPopup from "../components/ErrorPopup.jsx";
import { paymentHandler } from "../components/razorpay.jsx";
import MobileHeader from "./mobileheader.jsx";

export function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const formatPrice = (price) => {
    if (
      Order.country === "India" ||
      (userAuth && userAuth?.country === "India")
    ) {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    }
    const amt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
    return amt;
  };

  const { userAuth, setuserAuth } = useUser();
  // const { userCart } = useCart();
  const { setLoading } = useLoader();
  const dispatch = useDispatch();
  const [Message, setMessage] = useState();

  const userCart = useSelector((state) => state.cart);
  useEffect(() => {
    console.log("userCart in useffct ", userCart);
  }, [userCart]);
  const [Subtotal, setSubtotal] = useState("NaN");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [error, seterror] = useState();
  const [errorKey, setErrorKey] = useState(0);

  const [Order, setOrder] = useState({
    fullname: userAuth?.fullname || "",
    email: userAuth?.email || "",
    mobile: userAuth?.mobile || "",
    secondaryMobile: "",
    address: userAuth?.address || "",
    country: userAuth?.country || "",
    company: "",
    state: userAuth?.state || "",
    city: userAuth?.city || "",
    postcode: userAuth?.postcode || "",
    OrderNotes: "",
    OrderedItems: userCart ? userCart : null,
    TotalAmt: Subtotal,
    couponcode: "",
  });
  const [selectedMethod, setSelectedMethod] = useState("paypal");

  useEffect(() => {
    setOrder({ ...Order, OrderedItems: userCart });
  }, [userCart]);
  useEffect(() => {
    setOrder({ ...Order, TotalAmt: Subtotal });
  }, [userCart, Subtotal]);
  useEffect(() => {
    console.log("total Subtotal ", Order.TotalAmt);
  }, [Order, userCart]);

  useEffect(() => {
    if (userAuth) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        fullname: userAuth.fullname || prevOrder.fullname,
        email: userAuth.email || prevOrder.email,
        mobile: userAuth.mobile || prevOrder.mobile,
        address: userAuth.address || prevOrder.address,
        country: userAuth.country || prevOrder.country,
        state: userAuth.state || prevOrder.state,
        city: userAuth.city || prevOrder.city,
        postcode: userAuth.postcode || prevOrder.postcode,
      }));
    }
    console.log("Order", Order);
  }, [userAuth]);

  // return price.toLocaleString("en-IN", {
  //   maximumFractionDigits: 2,
  //   style: "currency",
  //   currency: "INR",
  // });
  // useEffect(() => {
  //   if (!userAuth) {
  //     fetchFromguest();
  //   }
  // }, [dispatch]);

  const fetchFromguest = async () => {
    const guestId = await getOrCreateGuestId(userAuth);
    dispatch(fetchCartData(guestId));
  };
  useEffect(() => {
    console.log("usercart in orderpage ", userCart);
    if (Order.country === "India" || userAuth?.country === "India") {
      console.log("in order india");
      const total = userCart.reduce(
        (acc, product) => acc + product.Product.currentprice * product.quantity,
        0
      );
      setSubtotal(total);
      setSelectedMethod("razorpay");
    } else {
      console.log("in order not india");
      setSelectedMethod("paypal");
      const total = userCart.reduce(
        (acc, product) =>
          acc + product.Product.currentpriceGlobal * product.quantity,
        0
      );
      setSubtotal(total);
    }
  }, [userCart, Order]);

  const [activeMenu, setactiveMenu] = useState({});
  const toggleSubMenu = (id) => {
    console.log(activeMenu);
    setactiveMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handlePlaceorder = async () => {
    if (
      !Order.fullname ||
      !Order.email ||
      !Order.mobile ||
      !Order.address ||
      !Order.country ||
      !Order.state ||
      !Order.postcode
    ) {
      console.log("input missing");
      seterror("Please fill all the important details");
      setErrorKey((prevKey) => prevKey + 1);
      return;
    }
    setLoading(true);
    let userID;
    if (userAuth) {
      userID = userAuth?.id;
    } else {
      const token = getCookie("token");
      const decodedToken = jwtDecode(token);
      userID = decodedToken.id || decodedToken._id;
      console.log("decodedToken", decodedToken);
    }

    try {
      console.log("Order", Order.OrderedItems);
      if (
        Order &&
        Array.isArray(Order.OrderedItems) &&
        Order.OrderedItems.length > 0
      ) {
        console.log("in order");
        localStorage.setItem("orderData", JSON.stringify(Order));
        localStorage.setItem("userId", userID);
        if (selectedMethod === "razorpay") {
          paymentHandler(Order, userAuth, userID);
        } else {
          const res = await axios.post(`http://localhost:5500/payment/pay`, {
            Order,
            userID,
          });
          console.log(res.data.message);
          console.log("res.data ", res.data);
          setLoading(false);

          window.location.href = res.data.message;
        }
      }

      setLoading(false);
    } catch (error) {
      seterror("Something went wrong, Please Contact Support");
      return setErrorKey((prevKey) => prevKey + 1);
    }
  };

  const getValidEmail = (email) => {
    if (email.startsWith("guest_")) {
      return "";
    }
    return email;
  };
  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };
  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />{" "}
      <div id="page-content">
        {/*Page Title*/}
        <div className="page section-header text-center margin-top">
          <div className="Screen-error-product">
            {error && <ErrorPopup key={errorKey} error={error} />}
          </div>
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Checkout</h1>
            </div>
          </div>
        </div>
        {/*End Page Title*/}
        <div className="container">
          <div className="row"></div>
          <div className="row billing-fields">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 sm-margin-30px-bottom">
              <div className="create-ac-content bg-light-gray padding-20px-all">
                <form onSubmit={handlePlaceorder}>
                  <fieldset>
                    <h2 className="login-title mb-3">Billing details</h2>
                    <div className="row">
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-firstname">
                          First Name <span className="required-f">*</span>
                        </label>
                        <input
                          required
                          name="firstname"
                          // defaultValue={userAuth?.fullname}
                          id="input-firstname"
                          type="text"
                          value={Order.fullname}
                          onChange={(e) =>
                            setOrder({ ...Order, fullname: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-email">
                          E-Mail <span className="required-f">*</span>
                        </label>
                        <input
                          required
                          name="email"
                          // defaultValue={userAuth?.email}
                          id="input-email"
                          type="email"
                          value={getValidEmail(Order.email)}
                          onChange={(e) =>
                            setOrder({ ...Order, email: e.target.value })
                          }
                          disabled={
                            !userAuth || userAuth?.fullname !== ""
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-telephone">
                          Mobile <span className="required-f">*</span>
                        </label>
                        <input
                          required
                          name="telephone"
                          // defaultValue={userAuth?.mobile}
                          id="input-telephone"
                          type="tel"
                          // disabled
                          value={Order.mobile}
                          onChange={(e) =>
                            setOrder({ ...Order, mobile: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-telephone">
                          Secondary Mobile
                        </label>
                        <input
                          name="telephone"
                          // defaultValue={userAuth?.mobile}
                          id="input-telephone"
                          type="tel"
                          // disabled
                          value={Order.secondaryMobile}
                          onChange={(e) =>
                            setOrder({
                              ...Order,
                              secondaryMobile: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div className="row">
                      <div className="form-group col-md-6 col-lg-6 col-xl-6">
                        <label htmlFor="input-company">Company</label>
                        <input
                          name="company"
                          defaultValue=""
                          id="input-company"
                          type="text"
                          value={Order.company}
                          onChange={(e) =>
                            setOrder({ ...Order, company: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-address-1">
                          Address <span className="required-f">*</span>
                        </label>
                        <input
                          required
                          name="address_1"
                          id="input-address-1"
                          type="text"
                          value={Order.address}
                          onChange={(e) =>
                            setOrder({ ...Order, address: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-country">
                          Country <span className="required-f">*</span>
                        </label>
                        <CountrySelect
                          required
                          onChange={(e) => {
                            setCountryid(e.id),
                              setOrder({ ...Order, country: e.name });
                          }}
                          placeHolder={Order.country}
                        />
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                          <label htmlFor="input-zone">
                            Region / State <span className="required-f">*</span>
                          </label>
                          <StateSelect
                            required
                            countryid={countryid}
                            onChange={(e) => {
                              setstateid(e.id),
                                setOrder({ ...Order, state: e.name });
                            }}
                            placeHolder={Order.state}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-city">
                          City 
                        </label>
                        {/* <input
                          name="city"
                          defaultValue=""
                          id="input-city"
                          type="text"
                        /> */}
                        <CitySelect
                          countryid={countryid}
                          stateid={stateid}
                          onChange={(e) => {
                            // setCityid(e.id)
                            setOrder({ ...Order, city: e.name });
                          }}
                          placeHolder={Order.city}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 col-lg-6 col-xl-6 required">
                        <label htmlFor="input-postcode">
                          Post Code <span className="required-f">*</span>
                        </label>
                        <input
                          required
                          name="postcode"
                          defaultValue=""
                          id="input-postcode"
                          type="text"
                          value={Order.postcode}
                          onChange={(e) => {
                            setOrder({ ...Order, postcode: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    {/* <div className="row">
                      <div className="form-group form-check col-md-12 col-lg-12 col-xl-12">
                        <label className="form-check-label padding-15px-left">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            defaultValue=""
                          />
                          <strong>Create an account ?</strong>
                        </label>
                      </div>
                    </div> */}
                  </fieldset>
                  <fieldset>
                    <div className="row">
                      <div className="form-group col-md-12 col-lg-12 col-xl-12">
                        <label htmlFor="input-company">Order Notes</label>
                        <textarea
                          className="form-control resize-both"
                          rows={3}
                          value={Order.OrderNotes}
                          onChange={(e) => {
                            setOrder({ ...Order, OrderNotes: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="your-order-payment">
                <div className="your-order">
                  <h2 className="order-title mb-4">Your Order</h2>
                  <div className="table-responsive-sm order-table">
                    <table className="bg-white table table-bordered table-hover text-center">
                      <thead>
                        <tr>
                          <th className="text-left">Product Name</th>
                          <th>Price</th>
                          <th>Size</th>
                          <th>Qty</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userCart &&
                          userCart.map((product) => (
                            <tr>
                              <td className="text-left">
                                {" "}
                                {product.Product.name}{" "}
                              </td>
                              <td>
                                {" "}
                                {Order.country === "India" ||
                                userAuth?.country === "India"
                                  ? formatPrice(product.Product.currentprice)
                                  : formatPrice(
                                      product.Product.currentpriceGlobal
                                    )}
                              </td>
                              <td>{product.size}</td>
                              <td>{product.quantity}</td>
                              <td>
                                {/* {formatPrice(product.Product.currentprice * product.quantity)} */}
                                {Order.country === "India" ||
                                userAuth?.country === "India"
                                  ? formatPrice(
                                      product.Product.currentprice *
                                        product.quantity
                                    )
                                  : formatPrice(
                                      product.Product.currentpriceGlobal *
                                        product.quantity
                                    )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot className="font-weight-600">
                        <tr>
                          <td colSpan={4} className="text-right">
                            Shipping{" "}
                          </td>
                          <td>&#8377; Free </td>
                        </tr>
                        <tr>
                          <td colSpan={4} className="text-right">
                            Total
                          </td>
                          <td>{formatPrice(Subtotal)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <hr />
                <div className="your-payment">
                  <h2 className="payment-title mb-3">payment method</h2>
                  <div className="payment-method">
                    <div className="payment-accordion">
                      <div id="accordion" className="payment-section">
                        <div className="card margin-15px-bottom border-radius-none ">
                          {Order.country === "India" ||
                          userAuth?.country === "India" ? (
                            <div className="card-header pointer">
                              {/* <input
                                type="checkbox"
                                className="collapsed card-link"
                                data-toggle="collapse"
                                checked={selectedMethod === "razorpay"}
                                onChange={() => setSelectedMethod("razorpay")}
                              /> */}
                              <span> Razorpay </span>
                            </div>
                          ) : (
                            <div className="card-header pointer">
                              {/* <input
                                type="radio"
                                className="collapsed card-link"
                                data-toggle="collapse"
                                checked={selectedMethod === "paypal"}
                                onChange={() => setSelectedMethod("paypal")}
                                
                              /> */}
                              <span> Paypal </span>
                            </div>
                          )}
                        </div>
                        {/* <div className="card mb-2 ">
                          <div
                            className="card-header pointer"
                            onClick={() => toggleSubMenu("card")}
                          >
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="order-button-payment">
                      <button
                        className="btn"
                        value="Place order"
                        type="submit"
                        onClick={handlePlaceorder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
