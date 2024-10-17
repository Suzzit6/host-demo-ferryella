import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImageSlider from "../components/ProductImageSlider";
import { useUser } from "../../src/contexts/authContext";


export function Product() {
  const { productId } = useParams();
  const [Product, setProduct] = useState("");
  const [sizeState, setSizeState] = useState("S");

  useEffect(() => {
    if (sizeState) {
      console.log("Updated sizeState:", sizeState);
    }
  }, [sizeState]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:5500/women/product/${productId}`
        );
        console.log(response.data);
        const mainProduct = response.data[0];
        setProduct(mainProduct);
        // console.log("Updated product:", Product);
      } catch (err) {
        console.log(err.message);  
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
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  const { userAuth } = useUser();
 const  userID = userAuth?.id
  console.log("userID",userID)
  
  const handleCart = async () =>{
    
    console.log("add to cart")
    try {
      const response = await axios.post(
        `http://localhost:5500/api/upload-cart`,
        {
          Product,
          quantity,
          userID,
          sizeState,  
        }
      );
      console.log(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      <div id="page-content">
        {/*MainContent*/}
        <div id="MainContent" className="main-content margin-top" role="main">
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
                        <div className="product-review">
                          <a className="reviewLink" href="#tab2">
                            <i className="font-13 fa fa-star" />
                            <i className="font-13 fa fa-star" />
                            <i className="font-13 fa fa-star" />
                            <i className="font-13 fa fa-star-o" />
                            <i className="font-13 fa fa-star-o" />
                            <span className="spr-badge-caption">6 reviews</span>
                          </a>
                        </div>
                      </div>
                      <p className="product-single__price product-single__price-product-template">
                        <span className="visually-hidden">Regular price</span>
                        <s id="ComparePrice-product-template">
                          <span className="money">
                            {" "}
                            {/* &#8377; {Product.original} */}
                             {formatPrice(Product.original)}
                          </span>{" "}
                        </s>
                        <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                          <span id="ProductPrice-product-template">
                            <span className="money">
                            {formatPrice(product.currentprice)}
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
                              &#8377; {Product.original - Product.currentprice}
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
                                  onChange={() => setSizeState(variant.size)}
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
                      <p className="infolinks">
                        <a href="#sizechart" className="sizelink btn">
                          {" "}
                          Size Guide
                        </a>{" "}
                        <a href="#productInquiry" className="emaillink btn">
                          {" "}
                          Ask About this Product
                        </a>
                      </p>
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
                                    <span >Add to cart</span> 
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
                      {/* End Product Action */}
                    {/* </form> */}
                    <div className="display-table shareRow">
                      <div className="display-table-cell medium-up--one-third">
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i
                              className="icon anm anm-heart-l"
                              aria-hidden="true"
                            />{" "}
                            <span>Add to Wishlist</span>
                          </a>
                        </div>
                      </div>
                      <div className="display-table-cell text-right">
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
                      </div>
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
                        <h5>Free Shipping &amp; Return</h5>
                        <span className="sub-text">
                          Free shipping on all Indian orders
                        </span>
                      </li>
                      <li className="display-table-cell">
                        <i className="icon anm anm-dollar-sign-r" />
                        <h5>Money Guarantee</h5>
                        <span className="sub-text">
                          30 days money back guarantee
                        </span>
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
                  You can stop autoplay, increase/decrease aniamtion speed and
                  number of grid to show and products from store admin.
                </p>
              </header>
              <div className="productPageSlider"></div>
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
