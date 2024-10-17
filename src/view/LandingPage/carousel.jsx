import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/Productcontext";
import { searchProducts } from "../../components/searchFunction";

export default function SimpleSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         
    autoplaySpeed: 3000,
    fade: true,             
    cssEase: 'linear',
  };
  const { AllProduct,setProduct,setResults } = useProduct();
  const navigate = useNavigate();
  const handleSearchItem = async () => {
    
    try {
        const Keyword = "newarrivals";
        const SearchResults = searchProducts(AllProduct, Keyword);
        setResults(SearchResults);
         console.log("SearchResults",SearchResults)
         navigate(`/search?keyword=${Keyword}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Slider {...settings}>
  <div className="slide">
    <div className="bg-size">
      <picture>
        <source  
          media="(max-width: 767px)" 
          srcSet="/assets/images/slideshow-banners/activewearmobile.jpg"
        />
        <img  
          className="carousel-image"
          src="/assets/images/slideshow-banners/banner234.jpg"
          alt="Shop Our New Collection"
          title="Shop Our New Collection"
        />
      </picture>
      <div className="slideshow__text-wrap slideshow__overlay classic bottom" onClick={handleSearchItem}>
        <div className="slideshow__text-content top">
          <div className="wrap-caption center">
            <h2 className="h1 mega-title slideshow__title">
              New  Arrivals
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

  <div className="slide">
    <div className="bg-size">
      <picture>
        <source 
          media="(max-width: 767px)" 
          srcSet="/assets/images/slideshow-banners/activewearmobile.jpg"
        />
        <img
          className="carousel-image"
          src="/assets/images/slideshow-banners/banner23456.jpg"
          alt="Summer Bikini Collection"
          title="Summer Bikini Collection"
        />
      </picture>
      <Link to="/women/collections/Activewear">
      <div className="slideshow__text-wrap slideshow__overlay classic bottom">
        <div className="slideshow__text-content top left">
          <div className="wrap-caption ">
            <h2 className="h1 mega-title slideshow__title ">
              Grab the Collection  
            </h2>
            <span className="mega-subtitle slideshow__subtitle">
              Save up to 50% off this weekend only
            </span>
            <span className="btn">Shop now</span>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>

  <div className="slide">
    <div className="bg-size">
      <picture>
        <source 
          media="(max-width: 767px)" 
          srcSet="/assets/images/slideshow-banners/activewearmobile.jpg"
        />
        <img
          className="carousel-image"
          src="/assets/images/slideshow-banners/banner1-2.jpg"
          alt="Summer Bikini Collection"
          title="Summer Bikini Collection"
        />
      </picture>
      <Link to={"/women/collections/Lingerie-Sets"}>
      <div className="slideshow__text-wrap slideshow__overlay classic bottom">
        <div className="slideshow__text-content top left">
          <div className="wrap-caption center">
            <h2 className="h1 mega-title slideshow__title">
              Luxury  Stocks
            </h2>
            <span className="mega-subtitle slideshow__subtitle">
              Weekend sale: Up to 50% off!
            </span>
            <span className="btn">Shop now</span> 
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>
</Slider>
  );
}