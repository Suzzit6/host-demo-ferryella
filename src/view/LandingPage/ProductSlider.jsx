import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/authContext";

export default function SimpleSlider({ sortedNewArrivals }) {
  const userAuth = useUser();
  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // fade: true,
    // cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024, // screen width 1024px or less
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // screen width 600px or less
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480, // screen width 480px or less
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
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
  return (
    <Slider {...settings}>
      {sortedNewArrivals &&
        sortedNewArrivals.map((product) => (
          <div className="col-12 item">
            {/* start product image */}
            <div className="product-image">
              {/* start product image */}
              <Link to={`/women/product/${product._id}`}>
                {/* <a href="/women/products/Lingerie-Sets"> */}
                {/* image */}
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
              </Link>
              {/* end product image */}
              {/* countdown start */}
              <div className="saleTime desktop" data-countdown="2022/03/01" />
              {/* countdown end */}
              {/* Start product button */}
              {/* <form
                className="variants add"
                action="#"
                onclick="window.location.href='cart.html'"
                method="post"
              >
                <button
                  className="btn btn-addto-cart"
                  type="button"
                  tabIndex={0}
                >
                  Add To Cart
                </button>
              </form> */}
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
                  <a className="wishlist add-to-wishlist" href="wishlist.html">
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
                <a href="short-description.html">{product.name}</a>
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
              {/* <div className="product-review">
                <i className="font-13 fa fa-star" />
                <i className="font-13 fa fa-star" />
                <i className="font-13 fa fa-star" />
                <i className="font-13 fa fa-star-o" />
                <i className="font-13 fa fa-star-o" />
              </div> */}
              {/* Variant */}
              {/* <ul className="swatches">
                <li className="swatch medium rounded">
                  <img
                    src={"assets/images/product-images/variant1.jpg"}
                    alt="image"
                  />
                </li>
                <li className="swatch medium rounded">
                  <img
                    src={"assets/images/product-images/variant2.jpg"}
                    alt="image"
                  />
                </li>
                <li className="swatch medium rounded">
                  <img
                    src={"/assets/images/product-images/variant3.jpg"}
                    alt="image"
                  />
                </li>
                <li className="swatch medium rounded">
                  <img
                    src={"/assets/images/product-images/variant4.jpg"}
                    alt="image"
                  />
                </li>
                <li className="swatch medium rounded">
                  <img
                    src={"/assets/images/product-images/variant5.jpg"}
                    alt="image"
                  />
                </li>
                <li className="swatch medium rounded">
                  <img
                    src={"/assets/images/product-images/variant6.jpg"}
                    alt="image"
                  />
                </li>
              </ul> */}
              {/* End Variant */}
            </div>
            {/* End product details */}
          </div>
        ))}
    </Slider>
  );
}
