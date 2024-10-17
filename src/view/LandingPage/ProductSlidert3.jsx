import React from "react";
import Slider from "react-slick";

export default function ProductSlidert3() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,         
        autoplaySpeed: 3000,    
        // fade: true,             
        // cssEase: 'linear',
      };
  
  return (
    <Slider {...settings}>
      <div className="col-12 item">
        {/* start product image */}
        <div>
        <div className="product-image">
          {/* start product image */}
          <a href="short-description.html">
            {/* image */}
            <img
              className="primary   lazyload"
              data-src="assets/images/product-images/product-image11.jpg"
              src="assets/images/product-images/product-image11.jpg"
              alt="image"
              title="product"
            />
            {/* End image */}
            {/* Hover image */}
            <img
              className="hover   lazyload"
              data-src="assets/images/product-images/product-image11-1.jpg"
              src="assets/images/product-images/product-image11-1.jpg"
              alt="image"
              title="product"
            />
            {/* End hover image */}
          </a>
          {/* end product image */}
          {/* Start product button */}
          <form
            className="variants add"
            action="#"
            onclick="window.location.href='cart.html'"
            method="post"
          >
            <button className="btn btn-addto-cart" type="button" tabIndex={0}>
              Add To Cart
            </button>
          </form>
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
            <a href="short-description.html">Azur Bracelet in Blue Azurite</a>
          </div>
          {/* End product name */}
          {/* product price */}
          <div className="product-price">
            <span className="price">$168.00</span>
          </div>
          {/* End product price */}
          <div className="product-review">
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star-o" />
            <i className="font-13 fa fa-star-o" />
          </div>
        </div>
        </div>
        {/* End product details */}
      </div>
      <div className="col-12 item">
        <div>
        {/* start product image */}
        <div className="product-image">
          {/* start product image */}
          <a href="short-description.html">
            {/* image */}
            <img
              className="primary   lazyload"
              data-src="assets/images/product-images/product-image12.jpg"
              src="assets/images/product-images/product-image12.jpg"
              alt="image"
              title="product"
            />
            {/* End image */}
            {/* Hover image */}
            <img
              className="hover   lazyload"
              data-src="assets/images/product-images/product-image12-1.jpg"
              src="assets/images/product-images/product-image12-1.jpg"
              alt="image"
              title="product"
            />
            {/* End hover image */}
          </a>
          {/* end product image */}
          {/* Start product button */}
          <form
            className="variants add"
            action="#"
            onclick="window.location.href='cart.html'"
            method="post"
          >
            <button className="btn btn-addto-cart" type="button" tabIndex={0}>
              Select Options
            </button>
          </form>
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
            <a href="short-description.html">Bi-Goutte Earrings</a>
          </div>
          {/* End product name */}
          {/* product price */}
          <div className="product-price">
            <span className="price">$58.00</span>
          </div>
          {/* End product price */}
          <div className="product-review">
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
          </div>
        </div>
        </div>
        {/* End product details */}
      </div>

      <div className="col-12 item">
        <div>
        {/* start product image */}
        <div className="product-image">
          {/* start product image */}
          <a href="short-description.html">
            {/* image */}
            <img
              className="primary   lazyload"
              data-src="assets/images/product-images/product-image13.jpg"
              src="assets/images/product-images/product-image13.jpg"
              alt="image"
              title="product"
            />
            {/* End image */}
            {/* Hover image */}
            <img
              className="hover   lazyload"
              data-src="assets/images/product-images/product-image13-1.jpg"
              src="assets/images/product-images/product-image13-1.jpg"
              alt="image"
              title="product"
            />
            {/* End hover image */}
          </a>
          {/* end product image */}
          {/* Start product button */}
          <form
            className="variants add"
            action="#"
            onclick="window.location.href='cart.html'"
            method="post"
          >
            <button className="btn btn-addto-cart" type="button" tabIndex={0}>
              Add To Cart
            </button>
          </form>
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
            <a href="short-description.html">Ashton Necklace</a>
          </div>
          {/* End product name */}
          {/* product price */}
          <div className="product-price">
            <span className="price">$228.00</span>
          </div>
          {/* End product price */}
          <div className="product-review">
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star-o" />
          </div>
        </div>
        </div>
        {/* End product details */}
      </div>

      <div className="col-12 item">
        <div>
        {/* start product image */}
        <div className="product-image">
          {/* start product image */}
          <a href="short-description.html">
            {/* image */}
            <img
              className="primary   lazyload"
              data-src="assets/images/product-images/product-image14.jpg"
              src="assets/images/product-images/product-image14.jpg"
              alt="image"
              title="product"
            />
            {/* End image */}
            {/* Hover image */}
            <img
              className="hover   lazyload"
              data-src="assets/images/product-images/product-image14-1.jpg"
              src="assets/images/product-images/product-image14-1.jpg"
              alt="image"
              title="product"
            />
            {/* End hover image */}
          </a>
          {/* end product image */}
          {/* Start product button */}
          <form
            className="variants add"
            action="#"
            onclick="window.location.href='cart.html'"
            method="post"
          >
            <button className="btn btn-addto-cart" type="button" tabIndex={0}>
              Add To Cart
            </button>
          </form>
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
            <a href="short-description.html">Ara Ring</a>
          </div>
          {/* End product name */}
          {/* product price */}
          <div className="product-price">
            <span className="price">$198.00</span>
          </div>
          {/* End product price */}
          <div className="product-review">
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star-o" />
            <i className="font-13 fa fa-star-o" />
          </div>
        </div>
        </div>
        {/* End product details */}
      </div>

      <div className="col-12 item">
        {/* start product image */}
        <div className="product-image">
          {/* start product image */}
          <a href="short-description.html">
            {/* image */}
            <img
              className="primary   lazyload"
              data-src="assets/images/product-images/product-image15.jpg"
              src="assets/images/product-images/product-image15.jpg"
              alt="image"
              title="product"
            />
            {/* End image */}
            {/* Hover image */}
            <img
              className="hover   lazyload"
              data-src="assets/images/product-images/product-image15-1.jpg"
              src="assets/images/product-images/product-image15-1.jpg"
              alt="image"
              title="product"
            />
            {/* End hover image */}
          </a>
          {/* end product image */}
          {/* Start product button */}
          <form
            className="variants add"
            action="#"
            onclick="window.location.href='cart.html'"
            method="post"
          >
            <button className="btn btn-addto-cart" type="button" tabIndex={0}>
              Add To Cart
            </button>
          </form>
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
            <a href="short-description.html">Ara Ring</a>
          </div>
          {/* End product name */}
          {/* product price */}
          <div className="product-price">
            <span className="price">$198.00</span>
          </div>
          {/* End product price */}
          <div className="product-review">
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
            <i className="font-13 fa fa-star" />
          </div>
        </div>
        {/* End product details */}
      </div>
    </Slider>
  );
}
