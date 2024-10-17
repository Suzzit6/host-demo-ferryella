import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CAlert } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CCarousel, CCarouselItem,CImage  } from "@coreui/react";

const Slider = () => {
  return (
    <CCarousel controls>
      {/* // <SimpleSlider />
        // <div className="App">
        //   <LandingPage />
        // </div> */}
      <CCarouselItem>
        <div className="slide">
          <div className=" lazyload bg-size">
            {/* <img className=" " src="" alt="Shop Our New Collection" /> */}
            <CImage
              className="lazyload bg-img"
              title="Shop Our New Collection"
              src={"/assets/images/slideshow-banners/banner1.jpeg"}
              data-src="/assets/images/slideshow-banners/banner1.jpeg"
              alt="slide 1"
            />
            <div className="slideshow__text-wrap slideshow__overlay classic bottom">
              <div className="slideshow__text-content bottom">
                <div className="wrap-caption center">
                  <h2 className="h1 mega-title slideshow__title">
                    New Intimates Arrivals
                  </h2>
                  <span className="mega-subtitle slideshow__subtitle">
                    Classic to Trendy, We've Got Your Style
                  </span>
                  <span className="btn">Shop now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCarouselItem>

      <CCarouselItem>
        <div className="slide">
          <div className=" lazyload bg-size">
            {/* <img
   
    // src=
    alt="Summer Bikini Collection"
    title="Summer Bikini Collection"
  /> */}
            <CImage
              className=" lazyload bg-img"
              data-src="/assets/images/slideshow-banners/banner7.png"
              src={"/assets/images/slideshow-banners/banner7.png"}
              alt="slide 1"
            />

            <div className="slideshow__text-wrap slideshow__overlay classic bottom">
              <div className="slideshow__text-content bottom left">
                <div className="wrap-caption center">
                  <h2 className="h1 mega-title slideshow__title">
                    Activewear Collection
                  </h2>
                  <span className="mega-subtitle slideshow__subtitle">
                    Save up to 50% off this weekend only
                  </span>
                  <span className="btn">Shop now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCarouselItem>

      <CCarouselItem>
        <div className="slide">
          <div className=" lazyload bg-size">
            {/* <img /> */}
            <CImage
              className="lazyload bg-img"
              data-src="/assets/images/slideshow-banners/banner8.jpg"
              src="/assets/images/slideshow-banners/banner8.jpg"
              alt="Summer Bikini Collection"
              title="Summer Bikini Collection"
            />
            <div className="slideshow__text-wrap slideshow__overlay classic bottom">
              <div className="slideshow__text-content bottom left">
                <div className="wrap-caption center">
                  <h2 className="h1 mega-title slideshow__title">
                    Luxury lingerie collection
                  </h2>
                  <span className="mega-subtitle slideshow__subtitle">
                    Weekend sale: Up to 50% off!
                  </span>
                  <span className="btn">Shop now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCarouselItem>
    </CCarousel>
  );
};

export default Slider;
