import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "./categories";
import ProductList from "./fetchProducts";
import { useEffect, useState } from "react";
import Header from "../view/header";
import MobileHeader from "../view/mobileheader";
import Footer from "../view/footer";
import FilterProduct from "./filteredProduct";
import { useLoader } from "../contexts/LoaderContext";
import { getOrCreateGuestId } from "./createGuest";
import { searchProducts } from "./searchFunction";
import { useProduct } from "../contexts/Productcontext";

export function ProductDisplay() {
  const { setLoading } = useLoader();

  const navigate = useNavigate();

  const [isSideBar, setisSideBar] = useState(false);
  const [activeMenu, setactiveMenu] = useState({
    size: true,
    color: true,
    brands: true,
    checked: false,
  });

  const toggleSubMenu = (id) => {
    console.log("activeMenu", activeMenu);
    setactiveMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  const handletabchange = (tab) => {
    // useEffect(() => {
    setactivetab(tab);

    // }, [activetab]);
  };

  const { category, subcategory } = useParams();
  const categoryName = categories[category]?.name || category;
  const subcategoryName = subcategory
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
    : "";

  const [productData, setProductData] = useState(null);
  const [FilteredProducts, setFilteredProducts] = useState();
  const [ProductMessage, setProductMessage] = useState();
  const [Brands, setBrands] = useState();

  const handleProductData = (data) => {
    setProductData(data);
  };

  const filterBySize = (products, size) => {
    setLoading(true);

    setProductMessage();

    return products.filter((product) => {
      setLoading(false);
      return product.variants.some((variant) => variant.size === size);
    });
  };
  const filterByColor = (products, color) => {
    setLoading(true);
    setProductMessage();

    const filteredColors = products.filter((product) => {
      console.log("product.Color", product.Color);
      return product.Color === color;
    });
    console.log("filteredColors", filteredColors);
    setLoading(false);
    return filteredColors;
  };

  const handleFilterSize = (size) => {
    setLoading(true);
    setProductMessage();
    if (FilteredProducts) {
      console.log("in size filtered", size);
      const sizefilter = filterBySize(FilteredProducts, size);

      setFilteredProducts(sizefilter);
      console.log("sizefilter", sizefilter);
      setLoading(false);
    }
    const sizeFilteredProducts = filterBySize(productData, size);

    if (!sizeFilteredProducts.length) {
      setFilteredProducts(" ");
      setProductMessage("No products Matching the filter");
      setLoading(false);
    }
    setFilteredProducts((prevProduct) => {
      console.log("prevProduct", prevProduct);
      if (
        JSON.stringify(prevProduct) === JSON.stringify(sizeFilteredProducts)
      ) {
        setLoading(false);
        return [];
      }
      setLoading(false);
      return sizeFilteredProducts;
    });
    console.log(sizeFilteredProducts);
    setLoading(false);
  };
  const [UniqueSizes, setUniqueSizes] = useState();
  const [uniqueColors, setUniqueColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [ProductTags, setProductTags] = useState();
  useEffect(() => {
    if (productData) {
      const sizeSet = new Set();
      productData.forEach((product) => {
        product.variants.forEach((variant) => {
          sizeSet.add(variant.size);
        });
      });
      setUniqueSizes(Array.from(sizeSet).sort());
      const colors = new Set(productData.map((product) => product.Color));
      setUniqueColors(Array.from(colors));
      const brands = new Set(productData.map((product) => product.Brand));
      setBrands(Array.from(brands));
      const tags = new Set(
        productData.flatMap((product) => product.ProductTags)
      );
      setProductTags(Array.from(tags).sort());
    }
  }, [productData]);

  useEffect(() => {
    console.log(selectedColor);
  }, [selectedColor]);
  useEffect(() => {
    console.log("FilteredProducts", FilteredProducts);
  }, [FilteredProducts]);

  const filteredProducts = selectedColor
    ? productData.filter((product) => product.Color === selectedColor)
    : productData;

  const handleSelectedColor = async (color) => {
    setProductMessage();
    setSelectedColor((prevSize) => (prevSize === color ? [] : color));

    if (FilteredProducts) {
      console.log("in Color filtered", color);
      const colorfilter = FilteredProducts.filter(
        (product) => product.Color === selectedColor
      );
      setFilteredProducts(colorfilter);
      console.log("colorfilter", colorfilter);
    }

    const colorFilteredProducts = filterByColor(productData, color);
    console.log("colorFilteredProducts", colorFilteredProducts);

    if (!colorFilteredProducts.length) {
      setFilteredProducts("");
      setProductMessage("No products Matching the filter");
      console.log("No products matched the color filter");
    }
    setFilteredProducts((prevProduct) => {
      console.log("prevProduct", prevProduct);
      if (
        JSON.stringify(prevProduct) === JSON.stringify(colorFilteredProducts)
      ) {
        return [];
      }
      return colorFilteredProducts;
    });
    console.log(colorFilteredProducts);
  };
  const filterByBrand = (products, brand) => {
    const filteredbrand = products.filter((product) => {
      console.log("product.brand", product.Brand);
      return product.Brand === brand;
    });
    return filteredbrand;
  };

  const [selectedbrand, setselectedbrand] = useState({});
  const handleSelectedBrand = async (brand) => {
    setProductMessage();
    setselectedbrand((prevSize) => (prevSize === brand ? null : brand));

    if (FilteredProducts) {
      console.log("in Color filtered", brand);
      const brandfilter = FilteredProducts.filter(
        (product) => product.Brand === selectedbrand
      );
      setFilteredProducts(brandfilter);
      console.log("colorfilter", brandfilter);
    }

    const filteredbrand = filterByBrand(productData, brand);
    console.log("colorFilteredProducts", filteredbrand);

    if (!filteredbrand.length) {
      setFilteredProducts(" ");
      setProductMessage("No products Matching the filter");
    }
    setFilteredProducts((prevProduct) => {
      console.log("prevProduct", prevProduct);
      if (JSON.stringify(prevProduct) === JSON.stringify(filteredbrand)) {
        return [];
      }
      return filteredbrand;
    });
    console.log(filteredbrand);
  };

  const [selectedSize, setselectedSize] = useState({});

  const handleToggleClass = (size) => {
    setProductMessage();

    setselectedSize((prevSize) => (prevSize === size ? null : size));
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
        seterror("Error Adding to Cart");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  const { AllProduct, setProduct,setResults } = useProduct();

const handleSearchItem = async (Keyword) => {
    
    try {
      if (Keyword !== "") {
        const SearchResults = searchProducts(AllProduct, Keyword);
        setResults(SearchResults);
         console.log("SearchResults",SearchResults)
          navigate(`/search?keyword=${Keyword}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pageWrapper">
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
      {/*Header*/}
      <Header toggleMenu={toggleMobileMenu} />

      {/*End Header*/}
      {/*Mobile Menu*/}
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      {/*End Mobile Menu*/}
      <div id="page-content">
        {/*Collection Banner*/}
        <div className="collection-header">
          <div className="collection-hero">
            <div className="collection-hero__image">
              <img
                className="  lazyload"
                data-src="/assets/images/tabsbanner.jpg"
                src="/assets/images/tabsbanner.jpg"
                alt="Women"
                title="Women"
              />
            </div>
            <div className="collection-hero__title-wrapper">
              <h1 className="collection-hero__title page-width">
                {" "}
                {subcategoryName ? subcategoryName : ""}
              </h1>
            </div>
          </div>
        </div>
        {/*End Collection Banner*/}
        <div className="container-fluid page-margin">
          <div className="row">
            {/*Sidebar*/}
            <div className="col-12 col-sm-12 col-md-3 col-lg-2 sidebar filterbar">
              <div className="closeFilter d-block d-md-none d-lg-none">
                <i className="icon icon anm anm-times-l" />
              </div>
              <div className="sidebar_tags">
                {/*Categories*/}
                <div className="sidebar_widget filterBox filter-widget size-swacthes">
                  <div
                    className={`widget-title ${
                      activeMenu["size"] ? "active" : ""
                    }`}
                    onClick={() => toggleSubMenu("size")}
                  >
                    <h2>Size</h2>
                  </div>
                  <div className="filter-color swacth-list">
                    <ul className={activeMenu["size"] ? "d-block" : "d-none"}>
                      {UniqueSizes ? (
                        UniqueSizes.map((size) => (
                          <li>
                            <span
                              className={
                                size === selectedSize
                                  ? "checked swacth-btn"
                                  : "swacth-btn"
                              }
                              onClick={() => {
                                handleFilterSize(size);
                                handleToggleClass(size);
                              }}
                            >
                              {size}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li>
                          <span>No Size Available to filter</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                {/*End Size Swatches*/}
                {/*Color Swatches*/}
                <div className="sidebar_widget filterBox filter-widget">
                  <div
                    className={`widget-title ${
                      activeMenu["color"] ? "active" : ""
                    }`}
                    onClick={() => toggleSubMenu("color")}
                  >
                    <h2>Color</h2>
                  </div>
                  <div
                    className={`filter-color swacth-list clearfix ${
                      activeMenu["color"] ? "d-block" : "d-none"
                    }`}
                  >
                    {uniqueColors.map((color) => (
                      <p
                        // className="swacth-btn"
                        key={color}
                        onClick={() => {
                          handleSelectedColor(color);
                        }}
                        style={{
                          fontSize: "13px",
                          cursor: "pointer",
                          fontWeight:
                            color === selectedColor ? "bold" : "normal",
                        }}
                      >
                        {color}{" "}
                      </p>
                    ))}
                  </div>
                </div>
                {/*End Color Swatches*/}
                {/*Brand*/}
                <div className="sidebar_widget filterBox filter-widget">
                  <div
                    className={`widget-title ${
                      activeMenu["brands"] ? "active" : ""
                    }`}
                    onClick={() => toggleSubMenu("brands")}
                  >
                    <h2>Brands</h2>
                  </div>

                  <ul className={activeMenu["brands"] ? "d-block" : "d-none"}>
                    {Brands?.map((brand) => (
                      <p
                        className="swacth-btn"
                        key={brand}
                        onClick={() => {
                          handleSelectedBrand(brand);
                        }}
                        style={{
                          fontSize: "13px",
                          cursor: "pointer",
                          fontWeight:
                            brand === selectedbrand ? "bold" : "normal",
                        }}
                      >
                        {brand}{" "}
                      </p>
                    ))}
                    {/* <li>
                      <input
                        type="checkbox"
                        defaultValue="oxymat"
                        id="check3"
                      />
                      <label htmlFor="check3">
                        <span>
                          <span />
                        </span>
                        Oxymat
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        defaultValue="vanelas"
                        id="check4"
                      />
                      <label htmlFor="check4">
                        <span>
                          <span />
                        </span>
                        Vanelas
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        defaultValue="pagini"
                        id="check5"
                      />
                      <label htmlFor="check5">
                        <span>
                          <span />
                        </span>
                        Pagini
                      </label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        defaultValue="monark"
                        id="check6"
                      />
                      <label htmlFor="check6">
                        <span>
                          <span />
                        </span>
                        Monark
                      </label>
                    </li> */}
                  </ul>
                </div>
                {/*End Brand*/}
                {/*Popular Products*/}
                <div className="sidebar_widget">
                  <div className="widget-title">
                    <h2>Popular Products</h2>
                  </div>
                  {/* <div className="widget-content">
                    <div className="list list-sidebar-products">
                      <div className="grid">
                        <div className="grid__item">
                          <div className="mini-list-item">
                            <div className="mini-view_image">
                              <a className="grid-view-item__link" href="#">
                                <img
                                  className="grid-view-item__image"
                                  src="/assets/images/product-images/mini-product-img.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            <div className="details">
                              {" "}
                              <a className="grid-view-item__title" href="#">
                                Cena Skirt
                              </a>
                              <div className="grid-view-item__meta">
                                <span className="product-price__price">
                                  <span className="money">$173.60</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid__item">
                          <div className="mini-list-item">
                            <div className="mini-view_image">
                              {" "}
                              <a className="grid-view-item__link" href="#">
                                <img
                                  className="grid-view-item__image"
                                  src="/assets/images/product-images/mini-product-img1.jpg"
                                  alt=""
                                />
                              </a>{" "}
                            </div>
                            <div className="details">
                              {" "}
                              <a className="grid-view-item__title" href="#">
                                Block Button Up
                              </a>
                              <div className="grid-view-item__meta">
                                <span className="product-price__price">
                                  <span className="money">$378.00</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid__item">
                          <div className="mini-list-item">
                            <div className="mini-view_image">
                              {" "}
                              <a className="grid-view-item__link" href="#">
                                <img
                                  className="grid-view-item__image"
                                  src="/assets/images/product-images/mini-product-img2.jpg"
                                  alt=""
                                />
                              </a>{" "}
                            </div>
                            <div className="details">
                              {" "}
                              <a className="grid-view-item__title" href="#">
                                Balda Button Pant
                              </a>
                              <div className="grid-view-item__meta">
                                <span className="product-price__price">
                                  <span className="money">$278.60</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid__item">
                          <div className="mini-list-item">
                            <div className="mini-view_image">
                              {" "}
                              <a className="grid-view-item__link" href="#">
                                <img
                                  className="grid-view-item__image"
                                  src="/assets/images/product-images/mini-product-img3.jpg"
                                  alt=""
                                />
                              </a>{" "}
                            </div>
                            <div className="details">
                              {" "}
                              <a className="grid-view-item__title" href="#">
                                Border Dress in Black/Silver
                              </a>
                              <div className="grid-view-item__meta">
                                <span className="product-price__price">
                                  <span className="money">$228.00</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/*End Popular Products*/}
                {/*Banner*/}
                {/* <div className="sidebar_widget static-banner">
                  <img src="/assets/images/side-banner-2.jpg" alt="" />
                </div> */}
                {/*Banner*/}
                {/*Information*/}
                {/* <div className="sidebar_widget">
                  <div className="widget-title">
                    <h2>Information</h2>
                  </div>
                  <div className="widget-content">
                    <p>
                      Use this text to share information about your brand with
                      your customers. Describe a product, share announcements,
                      or welcome customers to your store.
                    </p>
                  </div>
                </div> */}
                {/*end Information*/}
                {/*Product Tags*/}
                <div className="sidebar_widget">
                  <div className="widget-title">
                    <h2> People Also Search For </h2>
                  </div>
                  <div className="widget-content">
                    <ul className="product-tags">
                      {ProductTags &&
                        ProductTags.map((tag) => (
                          <li>
                            <a
                              href="#"
                              title={`Show products matching tag ${tag}`}
                              onClick={() => handleSearchItem(tag)} 
                            >
                              {tag}
                            </a>
                          </li>
                        ))}
                    </ul>
                    {/* <span className="btn btn--small btnview">View all</span>{" "} */}
                  </div>
                </div>
                {/*end Product Tags*/}
              </div>
            </div>
            {/*End Sidebar*/}
            {/*Main Content*/}

            {FilteredProducts?.length > 0 ? (
              <FilterProduct filteredList={FilteredProducts} />
            ) : (
              <ProductList
                subCategory={subcategoryName}
                onDataFetched={handleProductData}
              />
            )}
          </div>
        </div>
        {/*End Body Content*/}
        {/*Footer*/}
        <Footer />
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
                              SKU:{" "}
                              <span className="variant-sku">19115-rdxs</span>
                            </div>
                          </div>
                          <p className="product-single__price product-single__price-product-template">
                            <span className="visually-hidden">
                              Regular price
                            </span>
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
                            Belle Multipurpose Bootstrap 4 Html Template that
                            will give you and your customers a smooth shopping
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
                            // onSubmit={handlereload}
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
                                  <span onClick={handleCart}>Add to cart</span>
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
      </div>
    </div>
  );
}
