import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, NavLink, Navigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useUser } from "../contexts/authContext";
// import { useCart } from "../contexts/cartcontext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../contexts/LoaderContext.jsx";
import { getOrCreateGuestId } from "../components/createGuest.jsx";
import MobileHeader from "./mobileheader.jsx";
import { jwtDecode } from "jwt-decode";
import {
  removeFromWishlist,
  removeFromWishlistAsync,
  addToWishlist,
  debouncedfetchWishlistData,
} from "../app/wishlistSlice";

export default function WishList() {
  const { userAuth, setuserAuth } = useUser();
  const dispatch = useDispatch();
  const { setLoading } = useLoader();
  const [error, seterror] = useState();

  const fetchFromGuest = async () => {
    const guestId = await getOrCreateGuestId(userAuth);

    console.log("Dispatching fetchCartData with userID:", guestId);
    debouncedFetchCartData(dispatch, guestId);
  };

  const userWishlist = useSelector((state) => state.wishlist);
  useEffect(() => {
    console.log("userWishlist", userWishlist);
  }, [userWishlist]);

  useEffect(() => {
    if (userAuth?.id) {
      setLoading(true);
      try {
        console.log("Dispatching fetchwishlisttData with userID:", userAuth.id);
        debouncedfetchWishlistData(dispatch, userAuth.id);
      } catch (error) {
        console.log("error in dispatch", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } else {
      try {
      } catch (error) {
        console.log("error in dispatch wish", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
  }, [dispatch, userAuth]);

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

  const getKey = (product) => `${product.Product.id}-${product.size}`;

  const handlereload = (event) => {
    event.preventDefault();
    handleUserAction();
    // window.location.reload();
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
    try {
        dispatch(removeFromWishlist({ itemId: itemid, sizeState }));
        dispatch(removeFromWishlistAsync({ userId, itemid, sizeState }))
          .unwrap()
          .catch((error) => {
            console.error("Failed to remove item from wishlist:", error)
          });
    } catch (error) {
      console.log("error while deleting item", error);
    }

    setLoading(false);
  };
  //   useEffect(() => {
  //     handleOrderFetch();
  //   }, []);

  //   const handleOrderFetch = async () => {
  //     let userID;
  //     if (userAuth) {
  //       userID = userAuth?.id;
  //     } else {
  //       const token = getCookie("token");
  //       const decodedToken = jwtDecode(token);
  //       userID = decodedToken.id || decodedToken._id;
  //     }
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5500/api/fetch-cart/${userID}`
  //       );
  //       console.log("response in fetch userWishList", response.data[0].userWishlist);
  //       setuserWishlist(response.data[0].userWishlist);
  //     } catch (error) {
  //       console.log("error while fetching wihslist", error);
  //     }
  //   };

  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />{" "}
      <div id="page-content ">
        {/*Page Title*/}
        <div className="page section-header text-center margin-top">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Your WishList</h1>
            </div>
          </div>
        </div>
        {/*End Page Title*/}
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 main-col cart style2">
              <table>
                <thead className="cart__row cart__header">
                  <tr>
                    <th colSpan={2} className="text-center">
                      Product
                    </th>
                    <th className="text-center">Price</th>
                    {/* <th className="text-center">Quantity</th>
                    <th className="text-right">Total</th> */}
                    <th className="action">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {userWishlist &&
                    userWishlist.map((product) => {
                      const key = getKey(product);

                      return (
                        <tr className="cart__row border-bottom line1 cart-flex border-top">
                          <td className="cart__image-wrapper cart-flex-item ">
                            {product.Product.Images &&
                              product.Product.Images.filter(
                                (image) => image.isPrimary
                              ).map((image) => (
                                <Link
                                  to={`/women/product/${product.Product._id}`}
                                >
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
                          <td className="cart__meta small--text-left cart-flex-item ">
                            <Link to={`/women/product/${product.Product._id}`}>
                              <div className="list-view-item__title">
                                <a> {product.Product.name}</a>
                              </div>
                            </Link>
                            <div className="cart__meta-text">
                              Color: {product.Product.Color}
                              <br />
                              Size: {product.size}
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
                          {/* <td className="cart__update-wrapper cart-flex-item text-right">
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
                          </td> */}
                          {/* <td className="text-right small--hide cart-price">
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
                              </span>
                            </div>
                          </td> */}
                          <td className="">
                            <a
                              href="#"
                              className="btn btn--secondary cart__remove"
                              title="Remove item"
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
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
