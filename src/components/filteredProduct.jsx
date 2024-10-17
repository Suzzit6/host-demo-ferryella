import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/authContext";


export default function FilterProduct({ filteredList }) {
  const { userAuth, setuserAuth } = useUser();

  const formatPrice = (price) => {
    if (userAuth && userAuth.country === "India") {

      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: "INR",
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: "USD",
    }).format(price);
  }

    return(
        <div className="col-12 col-sm-12 col-md-9 col-lg-10 main-col">
        <div className="productList">
          {/*Toolbar*/}
          <button
            type="button"
            className="btn btn-filter d-block d-md-none d-lg-none"
          >
            {" "}
            Product Filters
          </button>
          <div className="toolbar">
            <div className="filters-toolbar-wrapper">
              <div className="row">
                <div className="col-4 col-md-4 col-lg-4 text-center filters-toolbar__item filters-toolbar__item--count d-flex justify-content-center align-items-center">
                 { filteredList &&(
                   <span className="filters-toolbar__product-count">
                    Showing: {filteredList.length}
                  </span>)}
                </div>
                <div className="col-4 col-md-4 col-lg-4 text-right">
                  <div className="filters-toolbar__item">
                    <label htmlFor="SortBy" className="hidden">
                      Sort
                    </label>
                    <select
                      name="SortBy"
                      id="SortBy"
                      className="filters-toolbar__input filters-toolbar__input--sort"
                    >
                      <option value="title-ascending" selected="selected">
                        Sort
                      </option>
                      <option>Best Selling</option>
                      <option>Alphabetically, A-Z</option>
                      <option>Alphabetically, Z-A</option>
                      <option>Price, low to high</option>
                      <option>Price, high to low</option>
                      <option>Date, new to old</option>
                      <option>Date, old to new</option>
                    </select>
                    <input
                      className="collection-header__default-sort"
                      type="hidden"
                      defaultValue="manual"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*End Toolbar*/}
          <div className="grid-products grid--view-items">
            <div className="row">
  
              
              {filteredList &&
                filteredList.map((product) => (
                  
                  <div className="col-6 col-sm-6 col-md-3 col-lg-3 item"> 
                    <Link to={`/women/product/${product._id}`} > 
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      {product.Images &&
                        product.Images.filter((image) => image.isPrimary).map( 
                          (image) => (
                            <a href="#">
                              {/* image */}
                              <img
                                className="primary  lazyload"
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
                        <button className="btn btn-addto-cart" type="button">
                          Add to cart
                        </button>
                      {/* </form> */}
                      <div className="button-set">
                        <a
                          href="javascript:void(0)"
                          title="Quick View"
                          className="quick-view-popup quick-view"
                          data-toggle="modal"
                          data-target="#content_quickview"
                        >
                          <i className="icon anm anm-search-plus-r" />
                        </a>
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="#"
                            title="Add to Wishlist"
                          >
                            <i className="icon anm anm-heart-l" />
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r" />
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}
                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="#">{product.name}</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="old-price">
                          {/* &#8377; {product.original}{" "} */}
                          { userAuth?.country === "India" ? (
                            formatPrice(product.original) 
                          ) :  (
                            formatPrice(product.originalGlobal)
                          )
                             }
                        </span>
                        <span className="price">
                          {/* &#8377; {product.currentprice} */}
                          { userAuth?.country === "India" ? (
                            formatPrice(product.currentprice)
                          ) :  (
                              formatPrice(product.currentpriceGlobal)
                            )
                             }
                          
                        </span>
                      </div>
                      {/* End product price */}
                      <div className="product-review">
                        <i className="font-13 fa fa-star" />
                        <i className="font-13 fa fa-star" />
                        <i className="font-13 fa fa-star" />
                        <i className="font-13 fa fa-star-o" />
                        <i className="font-13 fa fa-star-o" />
                      </div>
                      {/* Variant */}
                      <ul className="swatches">
                        {product.Images &&
                          product.Images.filter((image) => !image.isPrimary).map(
                            (image) => (
                              <li className="swatch medium rounded">
                                <img
                                  src={image.url} 
                                  alt="image"
                                />
                              </li>
                            )
                          )}
                      </ul>
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
                  </Link>
                  </div>
                ))} 
              
            </div>
          </div>
        </div>
        {/*End Main Content*/}
      </div>
    )
}