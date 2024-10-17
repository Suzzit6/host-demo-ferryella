import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImageSlider from "../components/ProductImageSlider";
import { useUser } from "../../src/contexts/authContext";
import { useLoader } from "../contexts/LoaderContext";
import { getOrCreateGuestId } from "../components/createGuest";
import ErrorPopup from "../components/ErrorPopup";
import MobileHeader from "./mobileheader";
import {
  removeFromWishlist,
  removeFromWishlistAsync,
  addToWishlist,
  debouncedfetchWishlistData,
} from "../app/wishlistSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useProduct } from "../contexts/Productcontext";

export function Product() {
  const { productId } = useParams();
  const [Product, setProduct] = useState("");
  const {AllProduct} = useProduct();

  const [UniqueSizes, setUniqueSizes] = useState();
  const [error, seterror] = useState();
  const [message, setMessage] = useState(null);
  const [wishlishtActive, setwishlishtActive] = useState(false);

  const { setLoading } = useLoader();
  const [sizeState, setSizeState] = useState();

  const dispatch = useDispatch();
  const userWishlist = useSelector((state) => state.wishlist);
  const [SelectedVariant, setSelectedVariant] = useState();
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    console.log("SelectedVariant ", SelectedVariant);
  }, [SelectedVariant]);
  useEffect(() => {
    if (sizeState) {
      console.log("Updated sizeState:", sizeState);
    }
  }, [sizeState]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5500/women/product/${productId}`
        );
        console.log(response.data);
        const mainProduct = response.data[0];
        setProduct(mainProduct);
        setLoading(false);

        // console.log("Updated product:", Product);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    // if (Product) {
    console.log("Updated product:", Product);
    // }
  }, [Product]);
  const calculateDiscount = (original, current) => {
    if (original && current) {
      const discount = ((original - current) / original) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  const { userAuth } = useUser();
  const userID = userAuth?.id;
  console.log("userID", userID);

  const handleCart = async () => {
    if (!userAuth) {
      handleGuestAddCart();
      return;
    } else {
      console.log("add to cart");
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:5500/api/upload-cart`,
          {
            Product,
            quantity,
            userID,
            sizeState,
          }
        );
        if (!response) {
          setLoading(false);
        }
        if (response) {
          setLoading(false);
        }
        console.log("message", response);
      } catch (error) {
        seterror("Error Adding to Cart");
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (Product) {
      const sizeSet = new Set();
      // Product.forEach((product) => {
      console.log("Product", Product);
      Product.variants.forEach((variant) => {
        sizeSet.add(variant.size);
      });
      // });
      setUniqueSizes(Array.from(sizeSet).sort());
    }
  }, [Product]);

  useEffect(() => {
    if (UniqueSizes && UniqueSizes.length > 0) {
      setSizeState(UniqueSizes[0]);
    }
  }, [UniqueSizes]);

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

  const handleGuestAddCart = async () => {
    setLoading(true);
    const guestId = await getOrCreateGuestId(userAuth);
    console.log("guestId ", guestId);

    try {
      if (guestId) {
        const response = await axios.post(
          `http://localhost:5500/api/upload-guest-cart`,
          {
            Product,
            quantity,
            sizeState,
            guestId,
            SelectedVariant,
          }
        );
        console.log("guest res ", response);
        setLoading(false);
        window.location.href = "http://localhost:5173/user/cart";
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("guest error ", error);
    }
  };

  const handleSizeChange = (Product, size) => {
    setSizeState(size);

    if (Product && Product.variants) {
      const selectedVariant = Product.variants.find(
        (variant) => variant.size === size
      );
      setSelectedVariant(selectedVariant ? selectedVariant.sku : null);
    }
  };
  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  const handlewishlist = async (itemid, sizeState) => {
    setwishlishtActive((prev) => !prev);
    try {
      if (!wishlishtActive) {
        if (!userAuth) {
          handleGuestAddWishlist();
          return;
        } else {
          console.log("add to cart");
          setLoading(true);
          const response = await axios.post(
            `http://localhost:5500/api/upload-wishlist`,
            {
              Product,
              quantity,
              userID,
              sizeState,
            }
          );
          if (!response) {
            setLoading(false);
          }
          if (response) {
            setLoading(false);
          }
          console.log("message", response);
          setLoading(false);
          console.log(error);
        }
        setLoading(false);
      } else {
        let userId;
        if (userAuth) {
          userId = userAuth?.id;
        } else {
          const token = getCookie("token");
          const decodedToken = jwtDecode(token);
          userId = decodedToken.id || decodedToken._id;
        }

        console.log("item", userId, itemid, sizeState);
        dispatch(removeFromWishlist({ itemId: itemid, sizeState }));
        dispatch(removeFromWishlistAsync({ userId, itemid, sizeState }))
          .unwrap()
          .catch((error) => {
            console.error("Failed to remove item from wishlist:", error);
          });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error at handle wishlist", error);
    }
  };

  const handleGuestAddWishlist = async () => {
    setLoading(true);
    const guestId = await getOrCreateGuestId(userAuth);
    console.log("guestId ", guestId);

    try {
      if (guestId) {
        const response = await axios.post(
          `http://localhost:5500/api/upload-guest-wishlist`,
          {
            Product,
            quantity,
            sizeState,
            guestId,
            SelectedVariant,
          }
        );
        console.log("guest res wish ", response);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("guest wishlist error ", error);
    }
  };

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

  useEffect(() => {
    console.log("userWishlist in product ", userWishlist);
    // const foundWishlistItem = userWishlist.find((wishlist) => (
    //   wishlist.id === Product._id
    // ));
    // console.log('foundWishlistItem:', foundWishlistItem);
  }, [userWishlist]);

  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      <div id="page-content">
        {/*MainContent*/}
        <div
          id="MainContent"
          className="main-content margin-top margin-top-product"
          role="main"
        >
          <div className="Screen-error-product">
            {error && <ErrorPopup error={error} />}
          </div>
          <div
            id="ProductSection-product-template"
            className="product-template__container prstyle1 container"
          >
            {/*product-single*/}
            {Product && (
              <div className="product-single">
                <div className="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    {Product === null ? (
                      <p>Loading...</p>
                    ) : Product ? (
                      <>
                        <ProductImageSlider Product={Product} />
                      </>
                    ) : (
                      <p>No product data available.</p>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="product-single__meta">
                      <h1 className="product-single__title">{Product.name}</h1>
                      <div className="product-nav clearfix">
                        <a href="#" className="next" title="Next">
                          <i className="fa fa-angle-right" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="prInfoRow">
                        <div className="product-stock">
                          {" "}
                          {sizeState && (
                            <div className="stock-info">
                              {Product.variants.find(
                                (variant) => variant.size === sizeState
                              )?.quantity > 0 ? (
                                <span className="instock">In Stock</span>
                              ) : (
                                <span className="outstock">Unavailable</span>
                              )}
                            </div>
                          )}
                        </div>
                        {(() => {
                          const selectedVariant = Product.variants.find(
                            (variant) => variant.size === sizeState
                          );
                          if (selectedVariant) {
                            if (selectedVariant.sku) {
                              return (
                                <div className="product-sku">
                                  SKU:{" "}
                                  <span className="variant-sku">
                                    {selectedVariant.sku}
                                  </span>
                                </div>
                              );
                            } else {
                              return "";
                            }
                          }
                        })()}
                        {/* <div className="product-review">
                          <a className="reviewLink" href="#tab2">
                            <i className="font-13 fa fa-star" />
                            <i className="font-13 fa fa-star" />
                            <i className="font-13 fa fa-star" />
                            <i className="font-13 fa fa-star-o" />
                            <i className="font-13 fa fa-star-o" />
                            <span className="spr-badge-caption">6 reviews</span>
                          </a>
                        </div> */}
                      </div>
                      <p className="product-single__price product-single__price-product-template">
                        <span className="visually-hidden">Regular price</span>
                        <s id="ComparePrice-product-template">
                          <span className="money">
                            {" "}
                            {userAuth?.country === "India"
                              ? formatPrice(Product.original)
                              : formatPrice(Product.originalGlobal)}
                            {/* { formatPrice(Product.original)} */}
                            {/* &#8377; {Product.original} */}
                          </span>{" "}
                        </s>
                        <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                          <span id="ProductPrice-product-template">
                            <span className="money">
                              {userAuth?.country === "India"
                                ? formatPrice(Product.currentprice)
                                : formatPrice(Product.currentpriceGlobal)}
                              {/* { formatPrice(Product.currentprice)} */}
                              {/* &#8377; {Product.currentprice} */}
                            </span>
                          </span>
                        </span>
                        <span className="discount-badge">
                          {" "}
                          <span className="devider">|</span>&nbsp;
                          <span>You Save</span>{" "}
                          <span
                            id="SaveAmount-product-template"
                            className="product-single__save-amount"
                          >
                            <span className="money">
                              {/* &#8377; {Product.original - Product.currentprice} */}
                              {userAuth?.country === "India"
                                ? formatPrice(
                                    Product.original - Product.currentprice
                                  )
                                : formatPrice(
                                    Product.originalGlobal -
                                      Product.currentpriceGlobal
                                  )}

                              {/* {formatPrice(
                                Product.original - Product.currentprice
                              )} */}
                            </span>
                          </span>{" "}
                          <span className="off">
                            ({" "}
                            <span>
                              {calculateDiscount(
                                Product.original,
                                Product.currentprice
                              )}
                            </span>
                            % )
                          </span>
                        </span>
                      </p>
                      {/* <div className="orderMsg" data-user={23} data-time={24}>
                        <img src="/assets/images/order-icon.jpg" alt="" />{" "}
                        <strong className="items">5</strong> sold in last{" "}
                        <strong className="time">26</strong> hours
                      </div> */}
                    </div>
                    <div className="product-single__description rte">
                      <ul>
                        <li>{Product.description}</li>
                      </ul>
                      <p>{Product.detail}</p>
                    </div>
                    {/* <div id="quantity_message">
                      Hurry! Only{" "}
                      <span className="items">10</span>{" "}
                      left in stock.
                    </div> */}
                    {sizeState && (
                      <div className="stock-info">
                        {(() => {
                          const selectedVariant = Product.variants.find(
                            (variant) => variant.size === sizeState
                          );
                          if (selectedVariant) {
                            if (
                              selectedVariant.quantity < 10 &&
                              selectedVariant.quantity > 0
                            ) {
                              return (
                                <div id="quantity_message">
                                  Hurry! Only{" "}
                                  <span className="items">
                                    {selectedVariant.quantity}
                                  </span>{" "}
                                  left in stock.
                                </div>
                              );
                            } else {
                              return "";
                            }
                          }
                        })()}
                      </div>
                    )}

                    {/* <form
                      method="post"
                      action="http://annimexweb.com/cart/add"
                      id="product_form_10508262282"
                      acceptCharset="UTF-8"
                      className="product-form product-form-product-template hidedropdown"
                      encType="multipart/form-data"
                    > */}
                    <div
                      className="product-form product-form-product-template hidedropdown"
                      id="product_form_10508262282"
                    >
                      <div
                        className="swatch clearfix swatch-1 option2"
                        data-option-index={1}
                      >
                        <div className="product-form__item">
                          <label className="header">
                            Size: <span className="slVariant">{sizeState}</span>
                          </label>
                          {Product.variants &&
                            Product.variants.map((variant) => (
                              <div
                                data-value={variant.size}
                                className={`swatch-element ${variant.size.toLowerCase()} available`}
                              >
                                <input
                                  className="swatchInput"
                                  id={`swatch-1-${variant.size.toLowerCase()}`}
                                  type="radio"
                                  name="option-1"
                                  value={variant.size}
                                  checked={sizeState === variant.size}
                                  onChange={() =>
                                    handleSizeChange(Product, variant.size)
                                  }
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor={`swatch-1-${variant.size.toLowerCase()}`}
                                  title={variant.size}
                                >
                                  {variant.size}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>
                      {/* <p className="infolinks">
                        <a href="#sizechart" className="sizelink btn">
                          {" "}
                          Size Guide
                        </a>{" "}
                        <a href="#productInquiry" className="emaillink btn">
                          {" "}
                          Ask About this Product
                        </a>
                      </p> */}
                      {/* Product Action */}
                      <div className="product-action clearfix">
                        <div className="product-form__item--quantity">
                          <div className="wrapQtyBtn">
                            <div className="qtyField">
                              <button
                                className="qtyBtn minus"
                                onClick={decreaseQuantity}
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
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="product-form__input qty"
                              />
                              <button
                                className="qtyBtn plus"
                                onClick={increaseQuantity}
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

                        {sizeState && (
                          <div className="stock-info">
                            {Product.variants.find(
                              (variant) => variant.size === sizeState
                            )?.quantity > 0 ? (
                              <>
                                <div className="product-form__item--submit">
                                  <button
                                    type="button"
                                    name="add"
                                    className="btn product-form__cart-submit"
                                    onClick={handleCart}
                                  >
                                    <span>Add to cart</span>
                                  </button>
                                </div>
                                <div
                                  className="shopify-payment-button"
                                  data-shopify="payment-button"
                                >
                                  <button
                                    type="button"
                                    className="shopify-payment-button__button shopify-payment-button__button--unbranded"
                                  >
                                    Buy it now
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div
                                className="shopify-payment-button"
                                data-shopify="payment-button"
                              >
                                <button
                                  type="button"
                                  className="shopify-payment-button__button shopify-payment-button__button--unbranded"
                                  disabled
                                >
                                  Unavailable
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* End Product Action */}
                    {/* </form> */}
                    <div className="display-table shareRow">
                      <div className="display-table-cell medium-up--one-third">
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                            onClick={() =>
                              handlewishlist(Product._id, sizeState)
                            }
                          >
                            {wishlishtActive ||
                            userWishlist.find(
                              (wishlist) => wishlist.Product._id === Product._id
                            ) ? (
                              <i
                                className="icon anm anm-heart"
                                aria-hidden="true"
                              />
                            ) : (
                              <i
                                className="icon anm anm-heart-l"
                                aria-hidden="true"
                              />
                            )}
                            {/* <i
                              className="icon anm anm-heart-l"
                              aria-hidden="true"
                            />{" "} */}
                            <span>Add to Wishlist</span>
                          </a>
                        </div>
                      </div>
                      {/* <div className="display-table-cell text-right">
                        <div className="social-sharing">
                          <a
                            target="_blank"
                            href="#"
                            className="btn btn--small btn--secondary btn--share share-facebook"
                            title="Share on Facebook"
                          >
                            <i
                              className="fa fa-facebook-square"
                              aria-hidden="true"
                            />{" "}
                            <span className="share-title" aria-hidden="true">
                              Share
                            </span>
                          </a>
                          <a
                            target="_blank"
                            href="#"
                            className="btn btn--small btn--secondary btn--share share-twitter"
                            title="Tweet on Twitter"
                          >
                            <i className="fa fa-twitter" aria-hidden="true" />{" "}
                            <span className="share-title" aria-hidden="true">
                              Tweet
                            </span>
                          </a>
                          <a
                            href="#"
                            title="Share on google+"
                            className="btn btn--small btn--secondary btn--share"
                          >
                            <i
                              className="fa fa-google-plus"
                              aria-hidden="true"
                            />{" "}
                            <span className="share-title" aria-hidden="true">
                              Google+
                            </span>
                          </a>
                          <a
                            target="_blank"
                            href="#"
                            className="btn btn--small btn--secondary btn--share share-pinterest"
                            title="Pin on Pinterest"
                          >
                            <i className="fa fa-pinterest" aria-hidden="true" />{" "}
                            <span className="share-title" aria-hidden="true">
                              Pin it
                            </span>
                          </a>
                          <a
                            href="#"
                            className="btn btn--small btn--secondary btn--share share-pinterest"
                            title="Share by Email"
                            target="_blank"
                          >
                            <i className="fa fa-envelope" aria-hidden="true" />{" "}
                            <span className="share-title" aria-hidden="true">
                              Email
                            </span>
                          </a>
                        </div>
                      </div> */}
                    </div>
                    {/* <p id="freeShipMsg" className="freeShipMsg" data-price={199}>
                    <i className="fa fa-truck" aria-hidden="true" /> GETTING CLOSER!
                    ONLY{" "}
                    <b className="freeShip">
                      <span
                        className="money"
                        data-currency-usd="$199.00"
                        data-currency="USD"
                      >
                        $199.00
                      </span>
                    </b>{" "}
                    AWAY FROM <b>FREE SHIPPING!</b>
                  </p>
                  <p className="shippingMsg">
                    <i className="fa fa-clock-o" aria-hidden="true" /> ESTIMATED
                    DELIVERY BETWEEN <b id="fromDate">Wed. May 1</b> and{" "}
                    <b id="toDate">Tue. May 7</b>.
                  </p>
                  <div className="userViewMsg" data-user={20} data-time={11000}>
                    <i className="fa fa-users" aria-hidden="true" />{" "}
                    <strong className="uersView">14</strong> PEOPLE ARE LOOKING FOR
                    THIS PRODUCT
                  </div> */}
                  </div>
                </div>
              </div>
            )}

            {/*End-product-single*/}
            {/*Product Fearure*/}
            {/*Store Feature*/}
            <div className="store-feature section">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <ul className="display-table store-info">
                      <li className="display-table-cell">
                        <i className="icon anm anm-truck-l" />
                        <h5>New Arrivals Weekly</h5>
                        <span className="sub-text">
                          Fresh Styles Every Week
                        </span>
                      </li>
                      <li className="display-table-cell">
                        <i className="icon anm anm-dollar-sign-r" />
                        <h5>Limited Time Flash Deals</h5>
                        <span className="sub-text">Grab Them Before Gone</span>
                      </li>
                      <li className="display-table-cell">
                        <i className="icon anm anm-comments-l" />
                        <h5>Online Support</h5>
                        <span className="sub-text">
                          We support online 24/7 on day
                        </span>
                      </li>
                      <li className="display-table-cell">
                        <i className="icon anm anm-credit-card-front-r" />
                        <h5>Secure Payments</h5>
                        <span className="sub-text">
                          All payment are Secured and trusted.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/*End Store Feature*/}
            {/*End Product Fearure*/}
            {/*Product Tabs*/}

            {/*End Product Tabs*/}
            {/*Related Product Slider*/}
            <div className="related-product grid-products">
              <header className="section-header">
                <h2 className="section-header__title text-center h2">
                  <span>Related Products</span>
                </h2>
                <p className="sub-heading">
                  Handpicked related products for you
                </p>
              </header>
              {/* <div className="productPageSlider">

              </div> */}
              {/* <div className="col-12 col-sm-12 col-md-12 col-lg-12"> */}
                {/* <li className="lvl1 parent megamenu">
                  <div className="form-group"> */}
                    {/* <label htmlFor="Stock">
                      Set Related Products{" "}
                      <small>
                        (on tick the products will be recommended below this
                        product)
                      </small>
                    </label> */}
                    <div className="grid-products grid--view-items">
                      <div className="row">
                        {Product &&
                          Product.relatedProducts.map((productId) => (
                            AllProduct.filter(
                              (product) => product._id === productId
                            ).map((product) => (
                            <div className="col-6 col-sm-6 col-md-3 col-lg-3 item">
                              {/* start product image */}
                              <div className="product-image">
                                <Link to={`/women/product/${product._id}`}>
                                  {/* start product image */}
                                  {product.Images &&
                                    product.Images.filter(
                                      (image) => image.isPrimary
                                    ).map((image) => (
                                      <a href="#">
                                        {/* image */}
                                        <img
                                          className="primary lazyload"
                                          src={image.url}
                                          alt="image"
                                          title="product"
                                        />

                                        <div className="product-labels rectangular">
                                          {product.discount ? (
                                            <span className="lbl on-sale">
                                              -{product.discount}
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          {product.isNew_ ? (
                                            <span className="lbl pr-label1">
                                              new
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          {product.isHot ? (
                                            <span className="lbl pr-label2">
                                              Hot
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        {/* End product label */}
                                      </a>
                                    ))}
                                  {/* end product image */}
                                  {/* countdown start */}
                                  <div
                                    className="saleTime desktop"
                                    data-countdown="2022/03/01"
                                  />
                                  {/* countdown end */}
                                  {/* Start product button */}

                                  <div className="button-set"></div>
                                  {/* end product button */}
                                </Link>
                              </div>
                              {/* end product image */}
                              {/*start product details */}
                              <div className="product-details text-center">
                                <Link to={`/women/product/${product._id}`}>
                                  {/* product name */}
                                  <div className="product-name">
                                    <a href="#">{product.name}</a>
                                  </div>
                                  {/* End product name */}
                                  {/* product price */}
                                  <div className="product-price">
                                    <span className="old-price">
                                      {userAuth?.country === "India"
                                        ? formatPrice(product.original)
                                        : formatPrice(product.originalGlobal)}
                                    </span>
                                    <span className="price">
                                      {userAuth?.country === "India"
                                        ? formatPrice(product.currentprice)
                                        : formatPrice(
                                            product.currentpriceGlobal
                                          )}
                                    </span>
                                  </div>
                                </Link>
                                {/* End product price */}

                                {/* End Variant */}
                              </div>
                              {/* End product details */}
                              {/* countdown start */}
                              <div className="timermobile">
                                <div
                                  className="saleTime desktop"
                                  data-countdown="2022/03/01"
                                />
                              </div>
                              {/* countdown end */}
                            </div>
                            ))
                          ))}
                          
                      </div>
                    </div>{" "}
                  {/* </div>
                </li>
              </div> */}
            </div>
            {/*End Related Product Slider*/}
            {/*Recently Product Slider*/}

            {/*End Recently Product Slider*/}
          </div>
          {/*#ProductSection-product-template*/}
        </div>
        {/*MainContent*/}
      </div>
      <Footer />
    </>
  );
}
