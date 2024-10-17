import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
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
  return (
    <Slider {...settings}>
      <div className="collection-grid-item">
        <a href="collection-page.html" className="collection-grid-item__link">
          <img
            data-src="assets/images/collection/fashion.jpg"
            src="assets/images/collection/fashion.jpg"
            alt="Fashion"
            className="  lazyload"
          />
          <div className="collection-grid-item__title-wrapper">
            <h3 className="collection-grid-item__title btn btn--secondary no-border">
              Beachwear
            </h3>
          </div>
        </a>
      </div>
      <div className="collection-grid-item">
        <a href="collection-page.html" className="collection-grid-item__link">
          <img
            className="  lazyload"
            data-src="assets/images/collection/nightwear_categ.jpeg"
            src="assets/images/collection/nightwear_categ.jpeg"
            alt="Cosmetic"
          />
          <div className="collection-grid-item__title-wrapper">
            <h3 className="collection-grid-item__title btn btn--secondary no-border">
              Gowns
            </h3>
          </div>
        </a>
      </div>

      <div className="collection-grid-item   lazyloaded">
        <a href="collection-page.html" className="collection-grid-item__link">
          <img
            data-src="assets/images/collection/activewearcateg1.jpg"
            src="assets/images/collection/activewearcateg1.jpg"
            alt="Bag"
            className="  lazyload"
          />
          <div className="collection-grid-item__title-wrapper">
            <h3 className="collection-grid-item__title btn btn--secondary no-border">
              Activewear
            </h3>
          </div>
        </a>
      </div>

      <div className="collection-grid-item">
        <a href="collection-page.html" className="collection-grid-item__link">
          <img
            data-src="assets/images/collection/pyajamacateg.png"
            src="assets/images/collection/pyajamacateg.png"
            alt="Accessories"
            className="  lazyload"
          />
          <div className="collection-grid-item__title-wrapper">
            <h3 className="collection-grid-item__title btn btn--secondary no-border">
              Nightwears
            </h3>
          </div>
        </a>
      </div>

      <div className="collection-grid-item">
        <a href="collection-page.html" className="collection-grid-item__link">
          <img
            data-src="assets/images/collection/bra.jpg"
            src="assets/images/collection/bra.jpg"
            alt="Shoes"
            className="  lazyload"
          />
          <div className="collection-grid-item__title-wrapper">
            <h3 className="collection-grid-item__title btn btn--secondary no-border">
              Padded/Unpadded Bra
            </h3>
          </div>
        </a>
      </div>

      <div className="collection-grid-item">
        <a href="collection-page.html" className="collection-grid-item__link">
          <img
            data-src="assets/images/collection/jewellry.jpg"
            src="assets/images/collection/jewellry.jpg"
            alt="Jewellry"
            className="  lazyload"
          />
          <div className="collection-grid-item__title-wrapper">
            <h3 className="collection-grid-item__title btn btn--secondary no-border">
              Jewellry
            </h3>
          </div>
        </a>
      </div>
    </Slider>
  );
}
