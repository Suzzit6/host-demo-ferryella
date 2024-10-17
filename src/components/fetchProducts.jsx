import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/authContext";
import { useLoader } from "../contexts/LoaderContext";
import { searchProducts } from "./searchFunction";
import { useProduct } from "../contexts/Productcontext";
// import { use } from "../../../backend/routes/UploadItem";

export default function ProductList({ category, subCategory, onDataFetched }) {
  const [Products, setProducts] = useState();
  const { userAuth, setuserAuth } = useUser();
  const { setLoading } = useLoader();
  const [PrimaryImage, setPrimaryImage] = useState();

  // const handlePrimaryImage = (image) => {

  // };

  const fetchProducts = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (subCategory) params.append("subCategory", subCategory);
    console.log("params", subCategory);

    const response = await axios.get(
      `http://localhost:5500/api/products?${params.toString()}`,
      { withCredentials: true }
    );

    console.log("response", response.data);
    setLoading(false);
    return response.data;
  };

  const productsQuery = useQuery({
    queryKey: ["products", category, subCategory],
    queryFn: fetchProducts,
    // enabled: false,
    // staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setProducts(productsQuery.data);
  }, [productsQuery.data]);

  useEffect(() => {
    if (productsQuery.data) {
      onDataFetched(productsQuery.data);
    }
  }, [productsQuery.data, onDataFetched]);

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
  // const {}
  


  return (
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
                {Products && (
                  <span className="filters-toolbar__product-count">
                    Showing: {Products.length}
                  </span>
                )}
              </div>
              <div className="col-4 col-md-4 col-lg-4 text-right">
                {/* <div className="filters-toolbar__item">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/*End Toolbar*/}
        <div className="grid-products grid--view-items">
          <div className="row">
            {Products &&
              Products.map((product) => (
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
  );
}
