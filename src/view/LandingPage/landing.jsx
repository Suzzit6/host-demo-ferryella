import React, { useMemo } from "react";
import Header from "../header";
import Footer from "../footer";
import SimpleSlider from "./carousel";
import ProductSlider from "./ProductSlider";
import ProductSlidert3 from "./ProductSlidert3";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CategSlider from "./CategSlider";
import { useState, useEffect } from "react";
import MobileHeader from "../mobileheader";
import Category from "./categories";
import { useUser } from "../../contexts/authContext";
import { useProduct } from "../../contexts/Productcontext";
import { Link } from "react-router-dom";

export function LandingPage() {
  const [activetab, setactivetab] = useState("tab1");
  const [isSideBar, setisSideBar] = useState(false);
  const { AllProduct } = useProduct();
  const { userAuth } = useUser();
  // useEffect(() => {
  //   console.log("userAuth", userAuth);
  // }, [userAuth]);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  const handletabchange = (tab) => {
    setactivetab(tab);
  };
  const products = useMemo(() => {
    if (
      AllProduct &&
      typeof AllProduct === "object" &&
      Array.isArray(AllProduct.products)
    ) {
      return AllProduct.products;
    }
    if (Array.isArray(AllProduct)) {
      return AllProduct;
    }
    return [];
  }, [AllProduct]);

  const sortedProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.OrderedTimes || 0) - (a.OrderedTimes || 0))
      .slice(0, 6);
  }, [products]);
  console.log("sortedProducts", sortedProducts);

  const sortedNewArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [products, 5]);

  console.log("sortedNewArrivals", sortedNewArrivals);
  const formatPrice = (price) => {
    if (userAuth?.country === "India") {
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

  return (
    <div className="pageWrapper" id="pageWrapper">
      {/*Search Form Drawer*/}
      <div className="search">
        <div className="search__form">
          <form className="search-bar__form" action="#">
            <button className="go-btn search__button" type="submit">
              <i className="icon anm anm-search-l" />
            </button>
            <input
              className="search__input"
              type="search"
              name="q"
              defaultValue=""
              placeholder="Search entire store..."
              aria-label="Search"
              autoComplete="off"
            />
          </form>
          <button type="button" className="search-trigger close-btn">
            <i className="anm anm-times-l" />
          </button>
        </div>
      </div>
      {/*End Search Form Drawer*/}
      {/*Top Header*/}
      <Header toggleMenu={toggleMobileMenu} />
      {/*?php include 'header.php'; ?*/}
      {/*End Header*/}
      {/* <MobileHeader/> */}

      {/*Mobile Menu*/}
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      {/*?php include 'mobileheader.php'; ?*/}
      {/*End Mobile Menu*/}
      {/*Body Content*/}
      <div id="page-content">
        {/*Home slider*/}
        <div className="slideshow slideshow-wrapper pb-section sliderFull">
          <div className="home-slideshow">
            <SimpleSlider />
            {/* <Slider/> */}
          </div>
        </div>
        {/*End Home slider*/}
        {/*Collection Tab slider*/}
        <div className="tab-slider-product section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-header text-center">
                  <h2 className="h2">New Arrivals</h2>
                  <p>Browse the huge variety of our products</p>
                </div>
                <div className="tabs-listing">
                  <ul className="tabs clearfix">
                    <li
                      className={activetab === "tab1" ? "active" : ""}
                      onClick={() => handletabchange("tab1")}
                    >
                      Women
                    </li>
                    <li
                      className={activetab === "tab2" ? "active" : ""}
                      onClick={() => handletabchange("tab2")}
                    >
                      Men
                    </li>
                    {/* <li
                      className={activetab === "tab3" ? "active" : ""}
                      onClick={handletabchange("tab3")}
                    >
                      Sale */}
                    {/* </li> */}
                  </ul>
                  <div className="tab_container">
                    {activetab === "tab1" && (
                      <div id="tab1" className="tab_content grid-products">
                        {sortedNewArrivals != [] ? (
                          <div className="productSlider">
                            <ProductSlider
                              sortedNewArrivals={sortedNewArrivals}
                            />
                          </div>
                        ) : (
                          "No products found"
                        )}
                      </div>
                    )}

                    {activetab === "tab2" && (
                      <div id="tab2" className="tab_content grid-products">
                        <img
                          className=" primary lazyload"
                          style={{ marginLeft: "15%" }}
                          data-src="/assets/images/comingsoon.png"
                          src="/assets/images/comingsoon.png"
                          alt="image"
                          title="product"
                          height="511px"
                        />
                        {/* <div class="productSlider"> */}
                        {/* <div class="col-12 item"> */}
                        {/* start product image */}
                        {/* <div class="product-image"> */}
                        {/* start product image */}
                        {/* <a href="short-description.html"> */}
                        {/* image */}
                        {/* <img class="primary   lazyload" data-src="/assets/images/product-images/product-image6.jpg" src="/assets/images/product-images/product-image6.jpg" alt="image" title="product"> */}
                        {/* End image */}
                        {/* Hover image */}
                        {/* <img class="hover   lazyload" data-src="/assets/images/product-images/product-image6-1.jpg" src="/assets/images/product-images/product-image6-1.jpg" alt="image" title="product"> */}
                        {/* End hover image */}
                        {/* product label */}
                        {/* <div class="product-labels rectangular"><span class="lbl on-sale">-16%</span> <span class="lbl pr-label1">new</span></div> */}
                        {/* End product label */}
                        {/* </a> */}
                        {/* end product image */}
                        {/* Start product button */}
                        {/* <form class="variants add" action="#" onclick="window.location.href='cart.html'" method="post"> */}
                        {/* <button class="btn btn-addto-cart" type="button" tabindex="0">Add To Cart</button> */}
                        {/* </form> */}
                        {/* <div class="button-set"> */}
                        {/* <a href="javascript:void(0)" title="Quick View" class="quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview"> */}
                        {/* <i class="icon anm anm-search-plus-r"></i> */}
                        {/* </a> */}
                        {/* <div class="wishlist-btn"> */}
                        {/* <a class="wishlist add-to-wishlist" href="wishlist.html"> */}
                        {/* <i class="icon anm anm-heart-l"></i> */}
                        {/* </a> */}
                        {/* </div> */}
                        {/* <div class="compare-btn"> */}
                        {/* <a class="compare add-to-compare" href="compare.html" title="Add to Compare"> */}
                        {/* <i class="icon anm anm-random-r"></i> */}
                        {/* </a> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* end product button */}
                        {/* </div> */}
                        {/* end product image */}
                        {/*start product details */}
                        {/* <div class="product-details text-center"> */}
                        {/* product name */}
                        {/* <div class="product-name"> */}
                        {/* <a href="short-description.html">Zipper Jacket</a> */}
                        {/* </div> */}
                        {/* End product name */}
                        {/* product price */}
                        {/* <div class="product-price"> */}
                        {/* <span class="price">$788.00</span> */}
                        {/* </div> */}
                        {/* End product price */}
                        {/* <div class="product-review"> */}
                        {/* <i class="font-13 fa fa-star"></i> */}
                        {/* <i class="font-13 fa fa-star"></i> */}
                        {/* <i class="font-13 fa fa-star"></i> */}
                        {/* <i class="font-13 fa fa-star-o"></i> */}
                        {/* <i class="font-13 fa fa-star-o"></i> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* End product details */}
                        {/* </div> */}
                        {/* <div class="col-12 item"> */}
                        {/* start product image */}
                        {/* <div class="product-image"> */}
                        {/* start product image */}
                        {/* <a href="short-description.html"> */}
                        {/* image */}
                        {/* <img class="primary   lazyload" data-src="/assets/images/product-images/product-image7.jpg" src="/assets/images/product-images/product-image7.jpg" alt="image" title="product"> */}
                        {/* End image */}
                        {/* Hover image */}
                        {/* <img class="hover   lazyload" data-src="/assets/images/product-images/product-image7-1.jpg" src="/assets/images/product-images/product-image7-1.jpg" alt="image" title="product"> */}
                        {/* End hover image */}
                        {/* </a> */}
                        {/* end product image */}
                        {/* Start product button */}
                        {/* <form class="variants add" action="#" onclick="window.location.href='cart.html'" method="post"> */}
                        {/* <button class="btn btn-addto-cart" type="button" tabindex="0">Select Options</button> */}
                        {/* </form>
                                          <div class="button-set">
                                              <a href="javascript:void(0)" title="Quick View" class="quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview">
                                                  <i class="icon anm anm-search-plus-r"></i>
                                              </a>
                                              <div class="wishlist-btn"> */}
                        {/* <a class="wishlist add-to-wishlist" href="wishlist.html">
                                                      <i class="icon anm anm-heart-l"></i>
                                                  </a>
                                              </div>
                                              <div class="compare-btn">
                                                  <a class="compare add-to-compare" href="compare.html" title="Add to Compare">
                                                      <i class="icon anm anm-random-r"></i> */}
                        {/* </a> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* end product button */}
                        {/* </div> */}
                        {/* end product image */}
                        {/*start product details */}
                        {/* <div class="product-details text-center"> */}
                        {/* product name */}
                        {/* <div class="product-name">
                                              <a href="short-description.html">Zipper Jacket</a>
                                          </div> */}
                        {/* End product name */}
                        {/* product price */}
                        {/* <div class="product-price">
                                              <span class="price">$748.00</span>
                                          </div> */}
                        {/* End product price */}
                        {/* <div class="product-review">
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* End product details */}
                        {/* </div> */}
                        {/* <div class="col-12 item"> */}
                        {/* start product image */}
                        {/* <div class="product-image"> */}
                        {/* start product image */}
                        {/* <a href="short-description.html"> */}
                        {/* image */}
                        {/* <img class="primary   lazyload" data-src="/assets/images/product-images/product-image8.jpg" src="/assets/images/product-images/product-image8.jpg" alt="image" title="product"> */}
                        {/* End image */}
                        {/* Hover image */}
                        {/* <img class="hover   lazyload" data-src="/assets/images/product-images/product-image8-1.jpg" src="/assets/images/product-images/product-image8-1.jpg" alt="image" title="product"> */}
                        {/* End hover image */}
                        {/* </a> */}
                        {/* end product image */}
                        {/* Start product button */}
                        {/* <form class="variants add" action="#" onclick="window.location.href='cart.html'" method="post">
                                              <button class="btn btn-addto-cart" type="button" tabindex="0">Add To Cart</button>
                                          </form>
                                          <div class="button-set">
                                              <a href="javascript:void(0)" title="Quick View" class="quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview">
                                                  <i class="icon anm anm-search-plus-r"></i>
                                              </a> */}
                        {/* <div class="wishlist-btn">
                                                  <a class="wishlist add-to-wishlist" href="wishlist.html">
                                                      <i class="icon anm anm-heart-l"></i>
                                                  </a>
                                              </div>
                                              <div class="compare-btn">
                                                  <a class="compare add-to-compare" href="compare.html" title="Add to Compare">
                                                      <i class="icon anm anm-random-r"></i>
                                                  </a>
                                              </div>
                                          </div> */}
                        {/* end product button */}
                        {/* </div> */}
                        {/* end product image */}
                        {/*start product details */}
                        {/* <div class="product-details text-center"> */}
                        {/* product name */}
                        {/* <div class="product-name">
                                              <a href="short-description.html">Workers Shirt Jacket</a>
                                          </div> */}
                        {/* End product name */}
                        {/* product price */}
                        {/* <div class="product-price">
                                              <span class="price">$238.00</span>
                                          </div> */}
                        {/* End product price */}
                        {/* <div class="product-review">
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star-o"></i>
                                          </div>
                                      </div> */}
                        {/* End product details */}
                        {/* </div> */}
                        {/* <div class="col-12 item"> */}
                        {/* start product image */}
                        {/* <div class="product-image"> */}
                        {/* start product image */}
                        {/* <a href="short-description.html"> */}
                        {/* image */}
                        {/* <img class="primary   lazyload" data-src="/assets/images/product-images/product-image9.jpg" src="/assets/images/product-images/product-image9.jpg" alt="image" title="product"> */}
                        {/* End image */}
                        {/* Hover image */}
                        {/* <img class="hover   lazyload" data-src="/assets/images/product-images/product-image9-1.jpg" src="/assets/images/product-images/product-image9-1.jpg" alt="image" title="product"> */}
                        {/* End hover image */}
                        {/* </a> */}
                        {/* end product image */}
                        {/* Start product button */}
                        {/* <form class="variants add" action="#" onclick="window.location.href='cart.html'" method="post"> */}
                        {/* <button class="btn btn-addto-cart" type="button" tabindex="0">Add To Cart</button> */}
                        {/* </form> */}
                        {/* <div class="button-set"> */}
                        {/* <a href="javascript:void(0)" title="Quick View" class="quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview"> */}
                        {/* <i class="icon anm anm-search-plus-r"></i> */}
                        {/* </a> */}
                        {/* <div class="wishlist-btn"> */}
                        {/* <a class="wishlist add-to-wishlist" href="wishlist.html"> */}
                        {/* <i class="icon anm anm-heart-l"></i> */}
                        {/* </a> */}
                        {/* </div> */}
                        {/* <div class="compare-btn"> */}
                        {/* <a class="compare add-to-compare" href="compare.html" title="Add to Compare"> */}
                        {/* <i class="icon anm anm-random-r"></i> */}
                        {/* </a> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* end product button */}
                        {/* </div> */}
                        {/* end product image */}
                        {/*start product details */}
                        {/* <div class="product-details text-center"> */}
                        {/* product name */}
                        {/* <div class="product-name">
                                              <a href="short-description.html">Watercolor Sport Jacket in Brown/Blue</a>
                                          </div> */}
                        {/* End product name */}
                        {/* product price */}
                        {/* <div class="product-price">
                                              <span class="price">$348.00</span>
                                          </div> */}
                        {/* End product price */}
                        {/* <div class="product-review">
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star-o"></i>
                                              <i class="font-13 fa fa-star-o"></i> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* End product details */}
                        {/* </div> */}
                        {/* <div class="col-12 item"> */}
                        {/* start product image */}
                        {/* <div class="product-image"> */}
                        {/* start product image */}
                        {/* <a href="short-description.html"> */}
                        {/* image */}
                        {/* <img class="primary   lazyload" data-src="/assets/images/product-images/product-image10.jpg" src="/assets/images/product-images/product-image10.jpg" alt="image" title="product"> */}
                        {/* End image */}
                        {/* Hover image */}
                        {/* <img class="hover   lazyload" data-src="/assets/images/product-images/product-image10-1.jpg" src="/assets/images/product-images/product-image10-1.jpg" alt="image" title="product"> */}
                        {/* End hover image */}
                        {/* </a> */}
                        {/* end product image */}
                        {/* Start product button */}
                        {/* <form class="variants add" action="#" onclick="window.location.href='cart.html'" method="post">
                                              <button class="btn btn-addto-cart" type="button" tabindex="0">Add To Cart</button>
                                          </form>
                                          <div class="button-set">
                                              <a href="javascript:void(0)" title="Quick View" class="quick-view-popup quick-view" data-toggle="modal" data-target="#content_quickview">
                                                  <i class="icon anm anm-search-plus-r"></i>
                                              </a>
                                              <div class="wishlist-btn">
                                                  <a class="wishlist add-to-wishlist" href="wishlist.html">
                                                      <i class="icon anm anm-heart-l"></i>
                                                  </a>
                                              </div> */}
                        {/* <div class="compare-btn">
                                                  <a class="compare add-to-compare" href="compare.html" title="Add to Compare">
                                                      <i class="icon anm anm-random-r"></i>
                                                  </a>
                                              </div>
                                          </div> */}
                        {/* end product button */}
                        {/* </div> */}
                        {/* end product image */}
                        {/*start product details */}
                        {/* <div class="product-details text-center"> */}
                        {/* product name */}
                        {/* <div class="product-name">
                                              <a href="short-description.html">Washed Wool Blazer</a>
                                          </div> */}
                        {/* End product name */}
                        {/* product price */}
                        {/* <div class="product-price">
                                              <span class="price">$1,078.00</span>
                                          </div> */}
                        {/* End product price */}
                        {/* <div class="product-review">
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i>
                                              <i class="font-13 fa fa-star"></i> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* End product details */}
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                    )}
                    {/* <div id="tab3" className="tab_content grid-products">
                    <div className="productSlider">
                      <ProductSlidert3/>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Collection Tab slider*/}
        {/*Collection Box slider*/}
        <div className="product-rows section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-header text-center">
                  <h2 className="h2">Featured Categories</h2>
                {/* write smmgth about category in p tag */}
                  <p>Shop by Category</p>
                </div>
              </div>
            </div>
            <Category />
          </div>
        </div>
        {/* <CategSlider /> */}
        {/* <div className="collection-box section">
          <div className="container-fluid">
            <div className="collection-grid">
            </div>
          </div>
        </div> */}
        {/*End Collection Box slider*/}
        {/*Logo Slider*/}
        {/* <div className="section logo-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="logo-bar">
                  <div className="logo-bar__item">
                    <img
                      src="/assets/images/logo/brandlogo1.png"
                      alt=""
                      title=""
                    />
                  </div>
                  <div className="logo-bar__item">
                    <img
                      src="/assets/images/logo/brandlogo2.png"
                      alt=""
                      title=""
                    />
                  </div>
                  <div className="logo-bar__item">
                    <img
                      src="/assets/images/logo/brandlogo3.png"
                      alt=""
                      title=""
                    />
                  </div>
                  <div className="logo-bar__item">
                    <img
                      src="/assets/images/logo/brandlogo4.png"
                      alt=""
                      title=""
                    />
                  </div>
                  <div className="logo-bar__item">
                    <img
                      src="/assets/images/logo/brandlogo5.png"
                      alt=""
                      title=""
                    />
                  </div>
                  <div className="logo-bar__item">
                    <img
                      src="/assets/images/logo/brandlogo6.png"
                      alt=""
                      title=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/*Store Feature*/}
        <div className="store-feature section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <ul className="display-table store-info">
                  <li className="display-table-cell">
                    <i className="icon anm anm-truck-l" />
                    <h5>New Arrivals Weekly</h5>
                    <span className="sub-text">Fresh Styles Every Week</span>
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
        {/*End Logo Slider*/}
        {/*Featured Product*/}
        <div className="product-rows section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-header text-center">
                  <h2 className="h2">Featured collection</h2>
                  <p>Our most popular products based on sales</p>
                </div>
              </div>
            </div>
            <div className="grid-products">
              <div className="row">
                {sortedProducts &&
                  sortedProducts.map((product) => (
                    <div className="col-6 col-sm-6 col-md-4 col-lg-4 item grid-view-item style2">
                      <div className="grid-view_image">
                        {/* start product image */}
                        <Link to={`/women/product/${product._id}`}>
                          {product.Images &&
                            product.Images.filter(
                              (image) => image.isPrimary
                            ).map((image) => (
                              <a href="#" className="grid-view-item__link">
                                {/* image */}
                                <img
                                  className="grid-view-item__image primary lazyload"
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
                            ))}
                          {/* <a
                      href=""
                      className="grid-view-item__link"
                    >
                      <img
                        className="grid-view-item__image primary   lazyload"
                        data-src="/assets/images/product-images/productimage1_1_1.jpg"
                        src="/assets/images/product-images/productimage1_1_1.jpg"
                        alt="image"
                        title="product"
                      />
                      <img
                        className="grid-view-item__image hover   lazyload"
                        data-src="/assets/images/product-images/productimage1_1_1.jpg"
                        src="/assets/images/product-images/productimage1_1_1.jpg"
                        alt="image"
                        title="product"
                      />
                      <div className="product-labels rectangular">
                        <span className="lbl on-sale">-16%</span>{" "}
                        <span className="lbl pr-label1">new</span>
                      </div>
                    </a> */}
                        </Link>
                        {/* end product image */}
                        {/*start product details */}
                        <div className="product-details hoverDetails text-center mobile">
                          {/* product name */}
                          <div className="product-name">
                            <a href="">{product.name}</a>
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
                          {/* End product price */}
                          {/* product button */}
                          {/* <div className="button-set">
                            <a
                              href="javascript:void(0)"
                              title="Quick View"
                              className="quick-view-popup quick-view"
                              data-toggle="modal"
                              data-target="#content_quickview"
                            >
                              <i className="icon anm anm-search-plus-r" />
                            </a>
                            <form
                              className="variants add"
                              action="#"
                              onclick="window.location.href='cart.html'"
                              method="post"
                            >
                              <button
                                className="btn cartIcon btn-addto-cart"
                                type="button"
                                tabIndex={0}
                              >
                                <i className="icon anm anm-bag-l" />
                              </button>
                            </form>
                            <div className="wishlist-btn">
                              <a
                                className="wishlist add-to-wishlist"
                                href="wishlist.html"
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
                          </div> */}
                          {/* end product button */}
                        </div>
                        {/* Variant */}
                        {/* <ul className="swatches text-center">
                          <li className="swatch medium rounded">
                            <img
                              src="/assets/images/product-images/variant1.jpg"
                              alt="image"
                            />
                          </li>
                          <li className="swatch medium rounded">
                            <img
                              src="/assets/images/product-images/variant2.jpg"
                              alt="image"
                            />
                          </li>
                          <li className="swatch medium rounded">
                            <img
                              src="/assets/images/product-images/variant3.jpg"
                              alt="image"
                            />
                          </li>
                          <li className="swatch medium rounded">
                            <img
                              src="/assets/images/product-images/variant4.jpg"
                              alt="image"
                            />
                          </li>
                          <li className="swatch medium rounded">
                            <img
                              src="/assets/images/product-images/variant5.jpg"
                              alt="image"
                            />
                          </li>
                          <li className="swatch medium rounded">
                            <img
                              src="/assets/images/product-images/variant6.jpg"
                              alt="image"
                            />
                          </li>
                        </ul> */}
                        {/* End Variant */}
                        {/* End product details */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {/*End Featured Product*/}
        {/*Latest Blog*/}
        <div className="latest-blog section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-header text-center">
                  <h2 className="h2">Latest From Customers</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="wrap-blog">
                  <a
                    className="article__grid-image"
                  >
                    <img
                      src="/assets/images/blog/post-img1.jpg"
                      alt="It's all about how you wear"
                      title="It's all about how you wear"
                      className="  lazyloaded"
                    />
                  </a>
                  <div className="article__grid-meta article__grid-meta--has-image">
                    <div className="wrap-blog-inner">
                      <h2 className="h3 article__title">
                        {/* <a href="blog-left-sidebar.html">
                          It's all about how you wear
                        </a> */}
                      </h2>
                      <span className="article__date">Sept 20, 2024</span>
                      <div className="rte article__grid-excerpt">
                        Great shopping experience! The website is user-friendly,
                        and the quality of the underwear is top-notch. Quick
                        delivery and excellent customer service.
                      </div>
                      {/* <ul className="list--inline article__meta-buttons">
                        <li>
                          <a href="blog-article.html">Read more</a>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="wrap-blog">
                  <a
                    className="article__grid-image"
                  >
                    <img
                      src="/assets/images/blog/post-img2.jpg"
                      alt="27 Days of Spring Fashion Recap"
                      title="27 Days of Spring Fashion Recap"
                      className="  lazyloaded"
                    />
                  </a>
                  <div className="article__grid-meta article__grid-meta--has-image">
                    <div className="wrap-blog-inner">
                      <h2 className="h3 article__title">
                        {/* <a href="blog-right-sidebar.html">
                          27 Days of Spring Fashion Recap
                        </a> */}
                      </h2>
                      <span className="article__date">Sept 16, 2024</span>
                      <div className="rte article__grid-excerpt">
                        I love how simple and intuitive the website is to use.
                        The underwear fits perfectly, and the checkout process
                        was hassle-free. Highly recommended!
                      </div>
                      {/* <ul className="list--inline article__meta-buttons">
                        <li>
                          <a href="blog-article.html">Read more</a>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Latest Blog*/}
        {/*Store Feature*/}
        <div className="store-feature section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <ul className="display-table store-info">
                  <li className="display-table-cell">
                    <i className="icon anm anm-truck-l" />
                    <h5>New Arrivals Weekly</h5>
                    <span className="sub-text">Fresh Styles Every Week</span>
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
      </div>
      {/*End Body Content*/}
      {/*Footer*/}
      <Footer />
      {/*?php include 'footer.php'; ?*/}
      {/*End Footer*/}
      {/*Scoll Top*/}
      <span id="site-scroll">
        <i className="icon anm anm-angle-up-r" />
      </span>
      {/*End Scoll Top*/}
      {/*Quick View popup*/}
      <div className="modal fade quick-view-popup" id="content_quickview">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div
                id="ProductSection-product-template"
                className="product-template__container prstyle1"
              >
                <div className="product-single">
                  {/* Start model close */}
                  <a
                    href="javascript:void()"
                    data-dismiss="modal"
                    className="model-close-btn pull-right"
                    title="close"
                  >
                    <span className="icon icon anm anm-times-l" />
                  </a>
                  {/* End model close */}
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="product-details-img">
                        <div className="pl-20">
                          <img
                            src="/assets/images/product-detail-page/camelia-reversible-big1.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="product-single__meta">
                        <h2 className="product-single__title">
                          Product Quick View Popup
                        </h2>
                        <div className="prInfoRow">
                          <div className="product-stock">
                            {" "}
                            <span className="instock ">In Stock</span>{" "}
                            <span className="outstock hide">Unavailable</span>{" "}
                          </div>
                          <div className="product-sku">
                            SKU: <span className="variant-sku">19115-rdxs</span>
                          </div>
                        </div>
                        <p className="product-single__price product-single__price-product-template">
                          <span className="visually-hidden">Regular price</span>
                          <s id="ComparePrice-product-template">
                            <span className="money">$600.00</span>
                          </s>
                          <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                            <span id="ProductPrice-product-template">
                              <span className="money">$500.00</span>
                            </span>
                          </span>
                        </p>
                        <div className="product-single__description rte">
                          Belle Multipurpose Bootstrap 4 Html Template that will
                          give you and your customers a smooth shopping
                          experience which can be used for various kinds of
                          stores such as fashion,...
                        </div>
                        <form
                          method="post"
                          action="http://annimexweb.com/cart/add"
                          id="product_form_10508262282"
                          acceptCharset="UTF-8"
                          className="product-form product-form-product-template hidedropdown"
                          encType="multipart/form-data"
                        >
                          <div
                            className="swatch clearfix swatch-0 option1"
                            data-option-index={0}
                          >
                            <div className="product-form__item">
                              <label className="header">
                                Color: <span className="slVariant">Red</span>
                              </label>
                              <div
                                data-value="Red"
                                className="swatch-element color red available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-red"
                                  type="radio"
                                  name="option-0"
                                  defaultValue="Red"
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-red"
                                  style={{
                                    backgroundImage:
                                      "url(/assets/images/product-detail-page/variant1-1.jpg)",
                                  }}
                                  title="Red"
                                />
                              </div>
                              <div
                                data-value="Blue"
                                className="swatch-element color blue available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-blue"
                                  type="radio"
                                  name="option-0"
                                  defaultValue="Blue"
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-blue"
                                  style={{
                                    backgroundImage:
                                      "url(/assets/images/product-detail-page/variant1-2.jpg)",
                                  }}
                                  title="Blue"
                                />
                              </div>
                              <div
                                data-value="Green"
                                className="swatch-element color green available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-green"
                                  type="radio"
                                  name="option-0"
                                  defaultValue="Green"
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-green"
                                  style={{
                                    backgroundImage:
                                      "url(/assets/images/product-detail-page/variant1-3.jpg)",
                                  }}
                                  title="Green"
                                />
                              </div>
                              <div
                                data-value="Gray"
                                className="swatch-element color gray available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-gray"
                                  type="radio"
                                  name="option-0"
                                  defaultValue="Gray"
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-gray"
                                  style={{
                                    backgroundImage:
                                      "url(/assets/images/product-detail-page/variant1-4.jpg)",
                                  }}
                                  title="Gray"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="swatch clearfix swatch-1 option2"
                            data-option-index={1}
                          >
                            <div className="product-form__item">
                              <label className="header">
                                Size: <span className="slVariant">XS</span>
                              </label>
                              <div
                                data-value="XS"
                                className="swatch-element xs available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-xs"
                                  type="radio"
                                  name="option-1"
                                  defaultValue="XS"
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-xs"
                                  title="XS"
                                >
                                  XS
                                </label>
                              </div>
                              <div
                                data-value="S"
                                className="swatch-element s available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-s"
                                  type="radio"
                                  name="option-1"
                                  defaultValue="S"
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-s"
                                  title="S"
                                >
                                  S
                                </label>
                              </div>
                              <div
                                data-value="M"
                                className="swatch-element m available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-m"
                                  type="radio"
                                  name="option-1"
                                  defaultValue="M"
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-m"
                                  title="M"
                                >
                                  M
                                </label>
                              </div>
                              <div
                                data-value="L"
                                className="swatch-element l available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-l"
                                  type="radio"
                                  name="option-1"
                                  defaultValue="L"
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-l"
                                  title="L"
                                >
                                  L
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Product Action */}
                          <div className="product-action clearfix">
                            <div className="product-form__item--quantity">
                              <div className="wrapQtyBtn">
                                <div className="qtyField">
                                  <a
                                    className="qtyBtn minus"
                                    href="javascript:void(0);"
                                  >
                                    <i
                                      className="fa anm anm-minus-r"
                                      aria-hidden="true"
                                    />
                                  </a>
                                  <input
                                    type="text"
                                    id="Quantity"
                                    name="quantity"
                                    defaultValue={1}
                                    className="product-form__input qty"
                                  />
                                  <a
                                    className="qtyBtn plus"
                                    href="javascript:void(0);"
                                  >
                                    <i
                                      className="fa anm anm-plus-r"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="product-form__item--submit">
                              <button
                                type="button"
                                name="add"
                                className="btn product-form__cart-submit"
                              >
                                <span>Add to cart</span>
                              </button>
                            </div>
                          </div>
                          {/* End Product Action */}
                        </form>
                        <div className="display-table shareRow">
                          <div className="display-table-cell">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*End-product-single*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Quick View popup*/}
      {/* Newsletter Popup */}
      <div className="newsletter-wrap" id="popup-container">
        <div id="popup-window">
          <a className="btn closepopup">
            <i className="icon icon anm anm-times-l" />
          </a>
          {/* Modal content*/}
          <div className="display-table splash-bg">
            <div className="display-table-cell width40">
              <img
                src="/assets/images/newsletter-img.jpg"
                alt="Join Our Mailing List"
                title="Join Our Mailing List"
              />{" "}
            </div>
            <div className="display-table-cell width60 text-center">
              <div className="newsletter-left">
                <h2>Join Our Mailing List</h2>
                <p>
                  Sign Up for our exclusive email list and be the first to know
                  about new products and special offers
                </p>
                <form action="#" method="post">
                  <div className="input-group">
                    <input
                      type="email"
                      className="input-group__field newsletter__input"
                      name="EMAIL"
                      defaultValue=""
                      placeholder="Email address"
                      required=""
                    />
                    <span className="input-group__btn">
                      <button
                        type="submit"
                        className="btn newsletter__submit"
                        name="commit"
                        id="subscribeBtn"
                      >
                        {" "}
                        <span className="newsletter__submit-text--large">
                          Subscribe
                        </span>{" "}
                      </button>
                    </span>
                  </div>
                </form>
                <ul className="list--inline site-footer__social-icons social-icons">
                  <li>
                    <a className="social-icons__link" href="#" title="Facebook">
                      <i
                        className="fa fa-facebook-official"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                  <li>
                    <a className="social-icons__link" href="#" title="Twitter">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      title="Pinterest"
                    >
                      <i className="fa fa-pinterest" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      title="Instagram"
                    >
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a className="social-icons__link" href="#" title="YouTube">
                      <i className="fa fa-youtube" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a className="social-icons__link" href="#" title="Vimeo">
                      <i className="fa fa-vimeo" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Newsletter Popup */}
      {/* Including Jquery */}
      {/*?php include 'script.php'; ?*/}
      {/*End For Newsletter Popup*/}
    </div>
  );
}
