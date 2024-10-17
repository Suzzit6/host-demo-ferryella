import React, { useRef, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  NavLink,
  Navigate,
} from "react-router-dom";
import { useUser } from "../contexts/authContext";
// import { useCart } from "../contexts/cartcontext";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Footer from "../view/footer.jsx";
import Header from "../view/header";
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
  removeFromCartAsync,
} from "../app/cartSlice.js";
import { getOrCreateGuestId } from "./createGuest.jsx";
import { useLoader } from "../contexts/LoaderContext.jsx";
import ErrorPopup from "./ErrorPopup.jsx";
import { jwtDecode } from "jwt-decode";
import MobileHeader from "../view/mobileheader.jsx";


export function PlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userAuth, setuserAuth } = useUser();
  const { setLoading } = useLoader();
  const dispatch = useDispatch();
  const [Message, setMessage] = useState();
  // const userCart = useSelector((state) => state.cart);
  const [error, seterror] = useState();
  const [errorKey, setErrorKey] = useState(0);
  const effectRan = useRef(false);

  const [CheckoutRan, setCheckoutRan] = useState({});

 useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const PayerID = searchParams.get("PayerID");
  const orderId = searchParams.get("orderId");
  
  const runCheckout = async () => {
    if (paymentId && effectRan.current !== paymentId) {
      // await handleCheckout(paymentId, token, PayerID);
      navigate(
        `/user/checkout/success/confirm?paymentId=${paymentId}&orderID=${orderId}&PayerID=${PayerID}&token=${token}`
      );
      effectRan.current = paymentId;
    }
  };
  
  runCheckout();
}, [location]);


  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handleCheckout = async (paymentId, token, PayerID) => {
    localStorage.setItem('in handle checkout',"true");

    setLoading(true);
    let userID;
    if (userAuth) {
      userID = userAuth._id ? userAuth._id : userAuth.id ;
    } else {
      const token = getCookie("token");
      const decodedToken = jwtDecode(token);
      userID = decodedToken.id || decodedToken._id;
    }
    localStorage.setItem('userId 2',userID);

    try {
      const Order = JSON.parse(localStorage.getItem("orderData"));
     const orderstatus = "pending"
      const response = await axios.post(
        "http://localhost:5500/api/place-order",
        {
          Order,
          userID,
          paymentId,
          token,
          PayerID,
          orderstatus
        }
      );
      console.log(response.data);
      localStorage.setItem('Order Success',response.data);

      setLoading(false);
      console.log("Order placed success");
      setMessage("Order Placed Successfully");
      if (response) {
        localStorage.setItem('Order succes ', JSON.stringify(response.data));
        navigate(
          `/user/checkout/success/confirm?paymentId=${paymentId}&PayerID=${PayerID}&token=${token}`
        );
      }
    } catch (error) {
      console.log("error in placr", error);
      seterror("Something went wrong, Please Contact Support");
      return setErrorKey((prevKey) => prevKey + 1);
    }
  };
  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };
  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      <div id="page-content">
        {error && <ErrorPopup key={errorKey} error={error} />}
        <div>Processing Order Please Wait ....</div>
      </div>
      <Footer />
    </>
  );
}
