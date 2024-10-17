import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, NavLink, Navigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useUser } from "../contexts/authContext";
// import { useCart } from "../contexts/cartcontext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  debouncedFetchCartData,
  fetchCartData,
  removeFromCart,
  removeFromCartAsync,
} from "../app/cartSlice.js";
import { useLoader } from "../contexts/LoaderContext.jsx";
import { getOrCreateGuestId } from "../components/createGuest.jsx";
import MobileHeader from "./mobileheader.jsx";
import { jwtDecode } from "jwt-decode";

export default function Cart() {
  const { userAuth, setuserAuth } = useUser();
  const dispatch = useDispatch();
  const { setLoading } = useLoader();
  const [error, seterror] = useState();

  // const { userCart } = useCart();
  const userCart = useSelector((state) => state.cart);
  useEffect(() => {
    console.log("userCart in useffct ", userCart);
  }, [userCart]);

  useEffect(() => {
    if (userAuth?.id) {
      setLoading(true);
      try {
        console.log("userAuth in cart", userAuth.id);
        console.log("Dispatching fetchCartData with userID:", userAuth.id);
        debouncedFetchCartData(dispatch, userAuth.id);
      } catch (error) {
        console.log("error in dispatch", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } else {
      try {
        // fetchFromGuest();
        console.log("not founf account");
      } catch (error) {
        console.log("error in dispatch", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
  }, [dispatch]);

  const fetchFromGuest = async () => {
    const guestId = await getOrCreateGuestId(userAuth);

    console.log("Dispatching fetchCartData with userID:", guestId);
    debouncedFetchCartData(dispatch, guestId);
  };

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     setLoading(true);
  //     await dispatch(fetchCartData(userID));
  //     setLoading(false);
  //   };

  //   fetchCart();
  // }, [dispatch, setLoading]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [userAuth]);

  const handleUserAction = () => {
    setLoading(true);
    if (userAuth) {
      debouncedFetchCartData(dispatch, userAuth.id);
    } else {
      fetchFromGuest();
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array");
      return 0;
    }
  };
  const [ordernote, setordernote] = useState("");

  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    console.log("userCart in useffct ", userCart);
  }, [userCart]);

  useEffect(() => {
    if (userCart) {
      const initialQuantities = userCart.reduce((acc, product) => {
        const key = `${product.Product.id}-${product.size}`;
        acc[key] = product.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [userCart]);
  const getKey = (product) => `${product.Product.id}-${product.size}`;

  const decreaseQuantity = (product) => {
    const key = getKey(product);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [key]: Math.max(1, prevQuantities[key] - 1),
    }));
  };

  const increaseQuantity = (product) => {
    const key = getKey(product);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [key]: prevQuantities[key] + 1,
    }));
  };

  const handleQuantityChange = (product, e) => {
    setLoading(true);

    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const key = getKey(product);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [key]: value,
      }));
    }
    setLoading(false);
  };
  const handlereload = (event) => {
    event.preventDefault();
    handleUserAction();
    // window.location.reload();
  };

  const handleUpdateProduct = async (e, submit) => {
    setLoading(true);
    if (e) {
      e.preventDefault();
    }

    try {
      console.log("updating...");
      const updatedCart = userCart.map((product) => ({
        productId: product.Product.id,
        size: product.size,
        quantity: quantities[getKey(product)],
      }));
      console.log("update crt work", updatedCart);
      let userID;
      if (userAuth) {
        userID = userAuth?.id;
      } else {
        const guestId = await getOrCreateGuestId(userAuth);
        userID = guestId;
      }
      console.log("userid", userID);
      console.log(updatedCart);

      const response = await axios.post(
        "http://localhost:5500/api/updateCart",
        {
          updatedCart,
          userID,
          ordernote,
        }
      );
      console.log("Cart updated successfully", response.data);

      if (submit === "mainsubmit") {
        navigate("/user/checkout");
      }
      handlereload(e);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error updating cart:", error);
    }
    setLoading(false);
  };

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

  const [Subtotal, setSubtotal] = useState("NaN");

  useEffect(() => {
    if (userCart) {
      if (userAuth?.country === "India") {
        const total = userCart.reduce(
          (acc, product) =>
            acc + product.Product.currentprice * product.quantity,
          0
        );
        console.log("total in usercart", total);
        setSubtotal(total);
      } else {
        const total = userCart.reduce(
          (acc, product) =>
            acc + product.Product.currentpriceGlobal * product.quantity,
          0
        );
        console.log("total ", total);
        setSubtotal(total);
      }
    }
  }, [userCart, Subtotal, dispatch]);
  function calcSubtotal(cart) {
    const total = cart.reduce(
      (acc, product) => acc + product.Product.currentprice * product.quantity,
      0
    );
  }
  const [activetab, setactivetab] = useState("tab1");
  const [isSideBar, setisSideBar] = useState(false);

  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  const handletabchange = (tab) => {
    // useEffect(() => {
    setactivetab(tab);

    // }, [activetab]);
  };
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const handleDeleteItem = async (itemid, sizeState) => {
    setLoading(true);
    let userId;
    if (userAuth) {
      userId = userAuth?.id;
    } else {
      const token = getCookie("token");
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id || decodedToken._id;
    }

    console.log("item", userId, itemid, sizeState);
    dispatch(removeFromCart({ itemId: itemid, sizeState }));
    dispatch(removeFromCartAsync({ userId, itemid, sizeState }))
      .unwrap()
      .catch((error) => {
        console.error("Failed to remove item from cart:", error);
      });
    setLoading(false);
  };

  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />{" "}
      <div id="page-content ">
        {/*Page Title*/}
        <div className="page section-header text-center margin-top">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Your cart</h1>
            </div>
          </div>
        </div>
        {/*End Page Title*/}
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 main-col cart style2">
              {/* <form action="#" method="post" className=""> */}
              <table>
                <thead className="cart__row cart__header">
                  <tr>
                    <th colSpan={2} className="text-center">
                      Product
                    </th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-right">Total</th>
                    <th className="action">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {userCart &&
                    userCart.map((product) => {
                      const key = getKey(product);

                      return (
                        <tr className="cart__row border-bottom line1 cart-flex border-top">
                          <td className="cart__image-wrapper cart-flex-item">
                            {product.Product.Images &&
                              product.Product.Images.filter(
                                (image) => image.isPrimary
                              ).map((image) => (
                                <Link to={`/women/product/${product.Product._id}`} key={product.Product._id}>
                                <a href="#">
                                  <img
                                    className="cart__image"
                                    src={image.url}
                                    alt={product.Product.name}
                                  />
                                </a>
                                </Link>
                              ))}
                          </td>
                          <td className="cart__meta small--text-left cart-flex-item">
                            <Link to={`/women/product/${product.Product._id}`}>
                            <div className="list-view-item__title">
                              <a> {product.Product.name} </a>
                            </div>
                            </Link>
                            <div className="cart__meta-text">
                              Color: {product.Product.Color}
                              <br />
                              Size: {product.size}
                              <br />
                              Quantity: {product.quantity}
                              <br />
                            </div>
                          </td>
                          <td className="cart__price-wrapper cart-flex-item">
                            <span className="money">
                              {userAuth?.country === "India"
                                ? formatPrice(product.Product.currentprice)
                                : formatPrice(
                                    product.Product.currentpriceGlobal
                                  )}
                              {/* {formatPrice(product.Product.currentprice)} */}
                            </span>
                          </td>
                          <td className="cart__update-wrapper cart-flex-item text-right">
                            <div className="cart__qty text-center">
                              <div className="wrapQtyBtn">
                                <div className="qtyField">
                                  <button
                                    className="qtyBtn minus"
                                    onClick={() => decreaseQuantity(product)}
                                    type="button"
                                  >
                                    <i
                                      className="fa anm anm-minus-r"
                                      aria-hidden="true"
                                    />
                                  </button>
                                  <input
                                    type="text"
                                    id="Quantity"
                                    name="quantity"
                                    value={quantities[key]}
                                    onChange={(e) =>
                                      handleQuantityChange(product, e)
                                    }
                                    min="1"
                                    className="product-form__input qty"
                                  />
                                  <button
                                    className="qtyBtn plus"
                                    onClick={() => increaseQuantity(product)}
                                    type="button"
                                  >
                                    <i
                                      className="fa anm anm-plus-r"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right small--hide cart-price">
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
                          </td>
                          <td className="text-center">
                            <a
                              href="#"
                              className="btn btn--secondary cart__remove"
                              title="Remove tem"
                              onClick={() =>
                                handleDeleteItem(
                                  product.Product._id,
                                  product.size
                                )
                              }
                            >
                              <i className="icon icon anm anm-times-l" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-left">
                      <a href="" className="btn--link cart-continue">
                        <i className="icon icon-arrow-circle-left" /> Continue
                        shopping
                      </a>
                    </td>
                    <td colSpan={3} className="text-right">
                      {userCart && userCart.length > 0 && (
                        <button
                          onClick={handleUpdateProduct}
                          name="update"
                          className="btn--link cart-update"
                        >
                          Update Cart
                        </button>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 cart__footer">
              <div className="cart-note">
                <div className="solid-border">
                  <h5>
                    <label
                      htmlFor="CartSpecialInstructions"
                      className="cart-note__label small--text-center"
                    >
                      Add a note to your order
                    </label>
                  </h5>
                  <textarea
                    name="note"
                    id="CartSpecialInstructions"
                    className="cart-note__input"
                    value={ordernote}
                    onChange={(e) => setordernote(e.target.value)}
                  />
                </div>
              </div>
              <div className="solid-border">
                <div className="row">
                  <span className="col-12 col-sm-6 cart__subtotal-title">
                    <strong>Subtotal</strong>
                  </span>
                  {userCart && (
                    <span className="col-12 col-sm-6 cart__subtotal-title cart__subtotal text-right">
                      <span className="money"> {formatPrice(Subtotal)} </span>
                    </span>
                  )}
                </div>
                <div className="cart__shipping">
                  Shipping &amp; taxes calculated at checkout
                </div>
                <form onSubmit={(e) => handleUpdateProduct(e, "mainsubmit")}>
                  <p className="cart_tearm">
                    <label>
                      <input
                        type="checkbox"
                        name="tearm"
                        id="cartTearm"
                        className="checkbox"
                        defaultValue="tearm"
                        required
                      />{" "}
                      I agree with the terms and conditions
                    </label>
                  </p>

                  <input
                    type="submit"
                    name="checkout"
                    id="cartCheckout"
                    className="btn btn--small-wide checkout"
                    defaultValue="Checkout"
                    // onClick={handleUpdateProduct}
                    // disabled="disabled"
                  />
                </form>
                <div className="paymnet-img">
                  <img src="/assets/images/payment-img.jpg" alt="Payment" />
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
