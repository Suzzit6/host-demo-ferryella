import React, { useRef, useEffect, useState } from "react";
import Header from "../view/header";
import Footer from "../view/footer";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/authContext";
import { getOrCreateGuestId } from "./createGuest";
import { useDispatch } from "react-redux";
import { useLoader } from "../contexts/LoaderContext";
import { removeFromCart, removeFromCartAsync } from "../app/cartSlice";
import { useInfo } from "../contexts/admincontexts/companydetails";
import axios from "axios";
import InrToUsdConverter from "./INRtoUSD";
import { jwtDecode } from "jwt-decode";
import MobileHeader from "../view/mobileheader";

export function OrderConfirmed() {
  const { userAuth, setuserAuth } = useUser();
  const { Info } = useInfo();
  const [paymentID, setpaymentID] = useState();
  const [PayerID, setPayerID] = useState();
  const [Token, setToken] = useState();
  const [error, seterror] = useState();
  const [errorKey, setErrorKey] = useState(0);

  const [orderId, setorderId] = useState();
  const [GSTtotal, setGSTtotal] = useState(0);
  const { setLoading } = useLoader();
  const dispatch = useDispatch();
  const [isInfoLoaded, setIsInfoLoaded] = useState(false);

useEffect(() => {
  if (Object.keys(Info).length > 0) {
    setIsInfoLoaded(true);
  }
}, [Info]);

  const Order = JSON.parse(localStorage.getItem("orderData"));

  const location = useLocation();
  const handleDeleteItem = async (Order) => {
    let userId;
    if (userAuth) {
      userId = userAuth?.id;
    } else {
      const guestId = await getOrCreateGuestId(userAuth);
      userId = guestId;
    }
    Order.OrderedItems.map((product) => {
      console.log("item", userId, product.Product._id, product.size);
      dispatch(
        removeFromCart({ itemId: product.Product._id, sizeState: product.size })
      );
      dispatch(
        removeFromCartAsync({
          userId,
          itemid: product.Product._id,
          sizeState: product.size,
        })
      )
        .unwrap()
        .catch((error) => {
          console.error("Failed to remove item from cart:", error);
        });
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get("paymentId");
    const PayerId = searchParams.get("PayerID");
    const token = searchParams.get("token");
    const orderId = searchParams.get("orderId");

    if (paymentId) {
      setpaymentID(paymentId);
      setPayerID(PayerId);
      setToken(token);
      setorderId(orderId);
    }
  }, [location]);

  useEffect(() => {
    const processedPaymentId = sessionStorage.getItem("processedPaymentId");
    if (paymentID && processedPaymentId !== paymentID && Object.keys(Info).length > 0) {
      console.log("Info in effect", Info);
      handleCheckout(paymentID, Token, PayerID, orderId);
      sessionStorage.setItem("processedPaymentId", paymentID);
    }
  }, [Token, PayerID, paymentID,isInfoLoaded]);

  const handleCurrentPrice = (price) => {
    // if (price > Info?.priceGST) {
    //   const gstamt = (Info.defaultGST / 100) * price;
    //   setGSTtotal((prev) => prev + gstamt.toFixed(2));
    // } else {
    //   const gstamt = (Info?.GST1000 / 100) * price;
    //   setGSTtotal((prev) => prev + gstamt.toFixed(2));
    // }
    return formatPrice(price);
  };

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

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handleCheckout = async (paymentId, token, PayerID, orderId) => {
    console.log("in handle checkout");
    setLoading(true);

    let userID;
    if (userAuth) {
      userID = userAuth._id ? userAuth._id : userAuth.id;
    } else {
      const token = getCookie("token");
      const decodedToken = jwtDecode(token);
      userID = decodedToken.id || decodedToken._id;
    }
    console.log("userId 2", userID);
    console.log("Info", Info);

    try {
      const Order = JSON.parse(localStorage.getItem("orderData"));
      const orderstatus = "pending";
      const Orderedate = new Date(Date.now()).toLocaleString();
      
        const response = await axios.post(
          "http://localhost:5500/api/place-order",
          {
            Order,
            userID,
            paymentId,
            token,
            PayerID,
            orderId,
            orderstatus,
            Orderedate,
            Info,
          }
        );
        console.log("Order place res", response.data);

      setLoading(false);
      console.log("Order placed success");
      // setMessage("Order Placed Successfully");
    } catch (error) {
      console.log("error in place", error);
      seterror("Something went wrong, Please Contact Support");
      return setErrorKey((prevKey) => prevKey + 1);
    }
  };

  useEffect(() => {
    let totalGST = 0;

    Order?.OrderedItems.forEach((product) => {
      const price =
        userAuth?.country === "India"
          ? product.Product.currentprice
          : product.Product.currentpriceGlobal;
      const quantity = product.quantity || 1;
      let gstRate;

      if (price < Info?.priceGST) {
        console.log("Info gst", Info?.priceGST);
        gstRate = Info.defaultGST / 100;
      } else {
        gstRate = Info?.GST1000 / 100;
      }

      const gstPerItem = price * gstRate;
      const totalGstForProduct = gstPerItem * quantity;

      console.log(
        `Product: ${
          product.Product.name
        }, Price: ${price}, Quantity: ${quantity}, GST Rate: ${(
          gstRate * 100
        ).toFixed(2)}%, GST per item: ${gstPerItem.toFixed(
          2
        )}, Total GST: ${totalGstForProduct.toFixed(2)}`
      );

      totalGST += totalGstForProduct;
    });

    setGSTtotal(parseFloat(totalGST.toFixed(2)));
  }, [Order, Info, userAuth]);

  useEffect(() => {
    console.log("gst total", GSTtotal);
  }, [GSTtotal]);

  const today = new Date();

  // Format the date (e.g., 22 Dec, 2019)
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-GB", options);

  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };
  const [isSideBar, setisSideBar] = useState(false);

  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />

      <div id="page-content">
        <div className="container-fluid container-sm my-5 height-auto d-flex justify-content-center  ">
          <div className="card card-1 margin-top">
            <div className="card-header bg-white ">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center ">
                <div className="mb-2 mb-sm-0 ">
                  {Order && (
                    <h4 className="mb-0 text-wrap">
                      Thanks for your Order ,
                      {/* <span
                      className="change-color d-inline-block text-truncate"
                      style={{ maxWidth: "200px" }}
                    > */}
                      {Order?.fullname}
                      {/* </span> */}
                    </h4>
                  )}
                </div>
                {/* <div className="text-left text-sm-right">
                  <small>Receipt Voucher : 1KAU9-84UIL</small>
                </div> */}
              </div>
            </div>
            <div className="card-body">
              {Order?.OrderedItems.map((product) => (
                <div className="row">
                  <div className="col">
                    <div className="card card-2">
                      <div className="card-body">
                        <div className="media flex-column flex-sm-row">
                          <div className="sq align-self-center mb-3 mb-sm-0">
                            {product.Product.Images &&
                              product.Product.Images.filter(
                                (image) => image.isPrimary
                              ).map((image) => (
                                <img
                                  className="img-fluid"
                                  src={image.url}
                                  alt="Product"
                                  style={{ maxWidth: "135px" }}
                                />
                              ))}
                          </div>
                          <div className="media-body my-auto">
                            <div className="row my-auto flex-column flex-sm-row">
                              <div className="col-12 col-sm-6 my-auto">
                                <h6 className="mb-0">{product.Product.name}</h6>
                              </div>
                              <div className="col-12 col-sm-6 my-auto text-sm-right text-left">
                                <h6 className="mb-0">
                                  {Order.country === "India" ||
                                  (userAuth?.country === "India" && Info)
                                    ? formatPrice(product.Product.currentprice)
                                    : formatPrice(
                                        product.Product.currentpriceGlobal
                                      )}
                                </h6>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="col-12 col-sm-6">
                                <small>{product.Product.Brand}</small>
                              </div>
                              <div className="col-12 col-sm-3">
                                <small>Size : {product.size} </small>
                              </div>
                              <div className="col-12 col-sm-3">
                                <small>Qty : {product.quantity} </small>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr className="my-3 " />
                        <span className="input-group__btn ">
                          <Link to={"/user/profile"}>
                            <button
                              className="btn newsletter__submit"
                              name="commit"
                              id="Subscribe"
                            >
                              <span className="newsletter__submit-text--large">
                                Track Product
                              </span>
                            </button>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {Order && (
                <div className="row mt-4">
                  <div className="col">
                    <div className="row justify-content-between">
                      <div className="col-auto">
                        <p className="mb-1 text-dark">
                          <b>Order Details</b>
                        </p>
                      </div>
                      <div className="flex-sm-col text-right col">
                        {" "}
                        <p className="mb-1">
                          <b>Total</b>
                        </p>{" "}
                      </div>
                      <div className="flex-sm-col col-auto">
                        {" "}
                        <p className="mb-1">
                          {formatPrice(Order?.TotalAmt)}
                        </p>{" "}
                      </div>
                    </div>
                    {Order?.discount && (
                      <div className="row justify-content-between">
                        <div className="flex-sm-col text-right col">
                          <p className="mb-1">
                            {" "}
                            <b>Discount</b>
                          </p>{" "}
                        </div>
                        <div className="flex-sm-col col-auto">
                          <p className="mb-1">{formatPrice(Order?.discount)}</p>
                        </div>
                      </div>
                    )}
                    <div className="row justify-content-between">
                      <div className="flex-sm-col text-right col">
                        <p className="mb-1">
                          <b>
                            GST
                            {/* {userAuth?.country === "India" && GST
                                    ? {GSTtotal}
                                    : <InrToUsdConverter amountInr={GSTtotal} />
                                    } */}
                          </b>
                        </p>
                      </div>
                      <div className="flex-sm-col col-auto">
                        <p className="mb-1">{GSTtotal}</p>
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div className="flex-sm-col text-right col">
                        <p className="mb-1">
                          <b>Delivery Charges</b>
                        </p>
                      </div>
                      <div className="flex-sm-col col-auto">
                        <p className="mb-1">Free</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {PayerID && paymentID && (
                <div className="row invoice ">
                  <div className="col">
                    <p className="mb-1"> Invoice Number : {paymentID}</p>
                    <p className="mb-1">Invoice Date : {formattedDate}</p>
                    {PayerID ? (
                      <p className="mb-1">PayerID:{PayerID}</p>
                    ) : (
                      <p className="mb-1">OrderId:{orderId}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer">
              <div className="jumbotron-fluid">
                <div className="row justify-content-between ">
                  <div className="col-sm-auto col-auto my-auto">
                    <img
                      className="img-fluid my-auto align-self-center "
                      src="/assets/images/logo2.png"
                      width={115}
                      height={115}
                    />
                  </div>
                  <div className="col-auto my-auto ">
                    <h2 className="mb-0 font-weight-bold">TOTAL PAID</h2>
                  </div>
                  <div className="col-auto my-auto ml-auto">
                    <h1 className="display-3 ">
                      {formatPrice(Order?.TotalAmt)}
                    </h1>
                  </div>
                </div>
                <div className="row mb-3 mt-3 mt-md-0">
                  <div className="col-auto border-line">
                    {" "}
                    <small className="text-white">PAN:AA02hDW7E</small>
                  </div>
                  <div className="col-auto border-line">
                    {" "}
                    <small className="text-white">CIN:UMMC20PTC </small>
                  </div>
                  <div className="col-auto ">
                    <small className="text-white">GSTN:268FD07EXX </small>{" "}
                  </div>
                </div>
                <span className="input-group__btn">
                  <Link to={"/user/profile"}>
                    <button
                      className="btn newsletter__submit"
                      name="commit"
                      id="Subscribe"
                    >
                      <span className="newsletter__submit-text--large">
                        Track Product
                      </span>
                    </button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
