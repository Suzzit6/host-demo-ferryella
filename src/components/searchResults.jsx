import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/authContext";
import { useLoader } from "../contexts/LoaderContext";
import { useProduct } from "../contexts/Productcontext";
import Footer from "../view/footer";
import MobileHeader from "../view/mobileheader";
import Header from "../view/header";

export default function ResultList() {
  const  {AllProduct,setProduct,Results}  = useProduct();
  console.log("results in search", Results);
  const { userAuth } = useUser();
  const params = new URLSearchParams(window.location.search);
  const search = params.get("keyword");

  const formatPrice = (price) => {
    if (userAuth && userAuth?.country === "India") {
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
  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };


  return (
    <div className="pageWrapper">

    <Header toggleMenu={toggleMobileMenu} />
    <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
    <div id="page-content ">
        {/*Page Title*/}
        <div className="page section-header text-center page-margin-less">
          <div className="page-title">
            <div className="wrapper">
              {search && (
                <h1 className="page-width">Search results for "{search}" </h1>
              )}
            </div>
          </div>
        </div>
        {search && (
                <h1 className="page-width d-block-phone">Search results for "{search}" </h1>

              )}
    <div className="col-12 col-sm-12 col-md-9 col-lg-10 main-col">
      <div className="productList">
        {/*End Toolbar*/}
        <div className="grid-Product grid--view-items">
          <div className="row">
            {Results &&
              Results.map((product) => (
                <div className="col-6 col-sm-6 col-md-3 col-lg-3 item">
                  {/* start product image */}
                  <div className="product-image">
                    <Link to={`/women/product/${product._id}`}>
                      {/* start product image */}
                      {product.Images &&
                        product.Images.filter((image) => image.isPrimary).map(
                          (image) => (
                            <a href="#">
                              {/* image */}
                              <img
                                className="primary lazyload"
                                src={image.url}
                                alt="image"
                                title="product"
                              />
                              {/* End image */}
                              {/* Hover image */}
                              {/* <img
                      className="hover    lazyload"
                      data-src="/assets/images/product-images/product-image1-1.jpg"
                      src="/assets/images/product-images/product-image1-1.jpg"
                      alt="image"
                          title="product"
                        /> */}
                              {/* End hover image */}
                              {/* product label */}
                              <div className="product-labels rectangular">
                                {product.discount ? (
                                  <span className="lbl on-sale">
                                    -{product.discount}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {product.isNew_ ? (
                                  <span className="lbl pr-label1">new</span>
                                ) : (
                                  ""
                                )}
                                {product.isHot ? (
                                  <span className="lbl pr-label2">Hot</span>
                                ) : (
                                  ""
                                )}
                              </div>
                              {/* End product label */}
                            </a>
                          )
                        )}
                      {/* end product image */}
                      {/* countdown start */}
                      <div
                        className="saleTime desktop"
                        data-countdown="2022/03/01"
                      />
                      {/* countdown end */}
                      {/* Start product button */}
                      {/* <form
                      className="variants add"
                      action="#"
                      onclick="window.location.href='cart.html'"
                      method="post"
                      > */}
                      {/* <button className="btn btn-addto-cart" type="button" onClick={handleCart}>
                        Add to cart
                      </button> */}
                      {/* </form> */}
                      <div className="button-set">
                        {/* <a
                        href="javascript:void(0)"
                        title="Quick View"
                        className="quick-view-popup quick-view"
                        data-toggle="modal"
                        data-target="#content_quickview"
                      >
                        <i className="icon anm anm-search-plus-r" />
                      </a> */}
                        {/* <div className="wishlist-btn">
                        <a
                          className="wishlist add-to-wishlist"
                          href="#"
                          title="Add to Wishlist"
                        >
                          <i className="icon anm anm-heart-l" />
                        </a>
                      </div> */}
                        {/* <div className="compare-btn">
                        <a
                          className="compare add-to-compare"
                          href="compare.html"
                          title="Add to Compare"
                        >
                          <i className="icon anm anm-random-r" />
                        </a>
                      </div> */}
                      </div>
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
                          {/* &#8377; {product.original}{" "} */}
                        </span>
                        <span className="price">
                        {userAuth?.country === "India"
                                ? formatPrice(product.currentprice)
                                : formatPrice(product.currentpriceGlobal)}
                          {/* &#8377; {product.currentprice} */}
                        </span>
                      </div>
                    </Link>
                    {/* End product price */}
                    {/* <div className="product-review">
                        <i className="font-13 fa fa-star" />
                        <i className="font-13 fa fa-star" />
                        <i className="font-13 fa fa-star" />
                        <i className="font-13 fa fa-star-o" />
                        <i className="font-13 fa fa-star-o" />
                      </div> */}
                    {/* Variant */}
                    {/* <ul className="swatches">
                        {product.Images &&
                          product.Images.filter(
                            (image) => !image.isPrimary
                          ).map((image) => (
                            <li className="swatch medium rounded">
                              <img
                                src={image.url}
                                alt="image"
                                // onClick={() => setPrimaryImage(image.url)}
                              />
                            </li>
                          ))}
                      </ul> */}
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
              ))}
          </div>
        </div>
      </div>
      {/*End Main Content*/}
    </div>
    </div>
    <Footer/>
    </div>
  );
}
