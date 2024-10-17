import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import MobileLoginGroup from "./LandingPage/MobileLoginGroup";
import { useUser } from "../contexts/authContext";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import MobileHeader from "./mobileheader";
import { useHeader } from "../contexts/admincontexts/headercontext";
import { DynamicContent } from "../components/DynamicContent";
// import { useCart } from "../contexts/cartcontext";
import { useDispatch, useSelector } from "react-redux";
import {
  debouncedFetchCartData,
  fetchCartData,
  removeFromCart,
} from "../app/cartSlice.js";
import { useLoader } from "../contexts/LoaderContext.jsx";
import { getOrCreateGuestId } from "../components/createGuest.jsx";
import { useProduct } from "../contexts/Productcontext.jsx";
import { searchProducts } from "../components/searchFunction.jsx";

export default function Header({ toggleMenu }) {
  // customization logic
  const [logo, setlogo] = useState("");
  const { setLoading } = useLoader();

  const { userAuth, setuserAuth } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const { topics, settopics, parentheaders, setparentheaders } = useHeader();
  const [alltopics, setalltopics] = useState();
  const [subtopics, setsubtopics] = useState();
  const [MiniCartActive, setMiniCartActive] = useState(false);
  // const {userCart} = useCart();
  const dispatch = useDispatch();
  const { AllProduct, setProduct, setResults } = useProduct();
  const [Keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const userCart = useSelector((state) => state.cart);

  useEffect(() => {
    setLoading(true);
    if (userAuth?.id) {
      debouncedFetchCartData(dispatch, userAuth?.id);
    }
    if (!userAuth) {
      console.log("User not found");
    }
    setLoading(false);
  }, [dispatch]);

  const handleUserAction = () => {
    if (userAuth) {
      debouncedFetchCartData(dispatch, userAuth?.id);
    }
    if (!userAuth) {
      fetchFromguest();
    }
  };

  const fetchFromguest = async () => {
    const guestId = await getOrCreateGuestId(userAuth);
    dispatch(fetchCartData(guestId));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const reloadAndNavigate = (path) => {
    window.location.href = path;
  };

  const handleLogout = async () => {
    try {
      console.log("fetching step 2");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setuserAuth(null);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const [quantity, setQuantity] = useState();

  // const decreaseQuantity = () => {
  //   setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  // };

  // const increaseQuantity = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const handleQuantityChange = (e) => {
  //   const value = parseInt(e.target.value, 10);
  //   if (!isNaN(value) && value > 0) {
  //     setQuantity(value);
  //   }
  // };

  // const  userID = userAuth?.id
  // // console.log(userAuth.userCart)
  // const handleCartUpdate = async(product) =>{
  //     console.log("product",product)
  //     // const ProductQuantity = product.quantity
  //      try {
  //        const response = await axios.post(
  //          `http://localhost:5500/api/update-cart`,
  //          {
  //           product,
  //           quantity,
  //            userID
  //          }
  //        );
  //        console.log(response.data.message)
  //      } catch (error) {
  //        console.log(error)
  //      }
  // }
  const [Subtotal, setSubtotal] = useState("NaN");

  useEffect(() => {
    if (userCart) {
      if (userAuth?.country === "India") {
        const total = userCart.reduce(
          (acc, product) =>
            acc + product.Product.currentprice * product.quantity,
          0
        );
        setSubtotal(total);
      } else {
        const total = userCart.reduce(
          (acc, product) =>
            acc + product.Product.currentpriceGlobal * product.quantity,
          0
        );
        setSubtotal(total);
      }
    }
  }, [userCart]);

  const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array");
      return 0;
    }
    if (userAuth?.country === "India") {
      return cart.reduce((sum, item) => {
        if (
          item &&
          item.Product &&
          typeof item.Product.currentprice === "number"
        ) {
          return sum + item.Product.currentprice;
        } else {
          console.warn("Invalid item in cart India:", item);
          return sum;
        }
      }, 0);
    } else {
      return cart.reduce((sum, item) => {
        if (
          item &&
          item.Product &&
          typeof item.Product.currentpriceGlobal === "number"
        ) {
          return sum + item.Product.currentpriceGlobal;
        } else {
          console.warn("Invalid item in cart Global:", item);
          return sum;
        }
      }, 0);
    }
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
  const handleSearchItem = async () => {
    try {
      if (Keyword !== "") {
        const SearchResults = searchProducts(AllProduct, Keyword);
        setResults(SearchResults);
        console.log("SearchResults", SearchResults);
        navigate(`/search?keyword=${Keyword}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cartRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside of the cart popup
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setMiniCartActive(false); // Close the cart when clicked outside
      }
    };

    if (MiniCartActive) {
      // Add click listener when cart is active
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Remove click listener when cart is not active
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [MiniCartActive, setMiniCartActive]);

  return (
    <>
      <div className="top-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 col-sm-8 col-md-5 col-lg-4 display-flex ">
              <div className="container padding-top4">
                <div className=" nav-search">
                  <input
                    type="search"
                    placeholder="Search Products"
                    className="search-input"
                    value={Keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div className="search-icon" onClick={handleSearchItem}>
                    <a>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* <p className="phone-no">
            <i className="anm anm-phone-s" /> +440 0(111) 044 833
          </p>
          <p> Free Shipping and Cash On Delivery/p> */}
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 d-none d-md-block d-lg-block">
              <div className="text-center">
                <Link to={"/"}>
                  {" "}
                  <a href="/">
                    <img
                      src="/assets/images/logo2.png"
                      alt="Ferryella logo"
                      title="Ferryella logo"
                      height={75}
                      width={136}
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-4 col-sm-3 col-md-3 col-lg-2 d-lg-block">
              <div className="header_logingroup">
                <div className="site-cart ">
                  <a
                    className="site-header__cart"
                    title="Cart"
                    onClick={() => {
                      setMiniCartActive((prev) => !prev);
                    }}
                  >
                    <i className="icon anm anm-bag-l" />
                    <span
                      id="CartCount"
                      className="site-header__cart-count dis-block"
                      data-cart-render="item_count"
                    >
                      {userCart && userCart.length}
                    </span>
                  </a>
                </div>
                {/*Minicart Popup*/}
                <div
                  id="header-cart"
                  ref={cartRef}
                  className={`block block-cart  ${
                    MiniCartActive ? "disp-block" : "disp-none"
                  } `}
                >
                  <ul className="mini-products-list">
                    <span
                      className="blackColor"
                      onClick={() => {
                        setMiniCartActive((prev) => !prev);
                      }}
                    >
                      Close
                    </span>
                    {userCart &&
                      userCart.map((product) => (
                        <li className="item">
                          {product.Product.Images &&
                            product.Product.Images.filter(
                              (image) => image.isPrimary
                            ).map((image) => (
                              <a className="product-image" href="#">
                                <img
                                  src={image.url}
                                  alt={product.Product.name}
                                  title=""
                                />
                              </a>
                            ))}

                          <div className="product-details">
                            <a className="pName" href="cart">
                              {product.Product.name}
                            </a>
                            <div className="variant-cart">
                              {product.Product.Color} / {product.size} /{" "}
                              {product.quantity}
                            </div>

                            <div className="priceRow">
                              <div className="product-price">
                                <span className="money">
                                  {userAuth?.country === "India"
                                    ? formatPrice(
                                        product.Product.currentprice *
                                          product.quantity
                                      )
                                    : formatPrice(
                                        product.Product.currentpriceGlobal *
                                          product.quantity
                                      )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {
                    userCart && (
                      <div className="total">
                        <div className="total-in">
                          <span className="label">Cart Subtotal:</span>
                          <span className="product-price">
                            <span className="money">
                              {userAuth?.country === "India"
                                ? // formatPrice(product?.currentprice)
                                  formatPrice(Subtotal)
                                : formatPrice(Subtotal)}
                            </span>
                          </span>
                        </div>
                        <div className="buttonSet text-center">
                          {/* <Link to={"/user/cart"}> */}
                          <a
                            href="/user/cart"
                            className="btn btn-secondary btn--small"
                          >
                            View Cart
                          </a>{" "}
                          {/* </Link> */}
                          {/* <Link to={"/user/checkout"}> */}
                          {/* <a
                            href="/user/checkout"
                            className="btn btn-secondary btn--small"
                          >
                            Checkout
                          </a> */}
                          {/* </Link> */}
                        </div>
                      </div>
                    )
                    //  ))
                  }
                </div>
                {/*EndMinicart Popup*/}
                <Link to={"/user/wishlist"}>
                  <div className="site-header__search">
                    <button type="button" className="heart-icon">
                      <i class="fa-regular fa-heart"></i>
                    </button>
                  </div>
                </Link>

                <div className="site-header__search">
                  {/* <button type="button" className="search-trigger">
                      <i class="fa-regular fa-user"></i>
                    </button> */}

                  <NavDropdown
                    title={<i className="prof-icon fa-regular fa-user" />} // FontAwesome icon
                    id="nav-dropdown"
                    className="search-trigger"
                  >
                    {(userAuth && userAuth?.fullname) ||
                    userAuth?.fullname !== "" ? (
                      <>
                        {" "}
                        <NavDropdown.Item href="/user/profile">
                          Profile
                        </NavDropdown.Item>{" "}
                        <NavDropdown.Item href="/user/profile">
                          My Orders
                        </NavDropdown.Item>{" "}
                        <NavDropdown.Item href="/user/cart">
                          Cart
                        </NavDropdown.Item>{" "}
                        <NavDropdown.Item onClick={handleLogout}>
                          LogOut
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <>
                        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                        <NavDropdown.Item href="/register">
                          Register
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/user/profile">
                          My Orders
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Top Header*/}
      {/*Header*/}
      <div
        className={` header-wrap classicHeader animated d-flex border-top ${
          isScrolled ? "stickyNav" : ""
        } `}
      >
        <div className="container-fluid">
          {/* <div className=" "> */}
          {/*Desktop Logo*/}
          {/* <div class="logo col-md-2 col-lg-2 d-none d-lg-block">
              <a href="index.html">
                  <img src="/assets/images/logo.svg" alt="Belle Multipurpose Html Template" title="Belle Multipurpose Html Template" />
              </a>
           </div> */}
          {/*End Desktop Logo*/}
          <div className="col-2 col-sm-3 col-md-3 col-lg-8">
            <div className="d-block d-lg-none">
              <button
                type="button"
                className="btn--link site-header__menu js-mobile-nav-toggle mobile-nav--open"
                onClick={toggleMenu}
              >
                <i className="icon anm anm-times-l" />
                <i className="anm anm-bars-r" />
              </button>
            </div>
            {/*Desktop Menu*/}
            <nav className="grid__item" id="AccessibleNav">
              {/* for mobile */}
              <ul id="siteNav" className="site-nav medium right hidearrow">
                <li className="lvl1 parent megamenu">
                  <a className="pointer" data-dynamic-id="collections">
                    <DynamicContent id="Collections" parent="collections" />
                    <i className="anm anm-angle-down-l" />
                  </a>
                  <div className="megamenu style4">
                    <ul className="grid grid--uniform mmWrapper">
                      <li className="grid__item lvl-1 col-md-3 col-lg-3">
                        <a
                          className="site-nav lvl-1"
                          data-dynamic-id="Underwear"
                          data-parent="collections"
                        >
                          <DynamicContent id="Underwear" parent="collections" />
                        </a>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <Link to={"/women/collections/EverdayBras"}>
                              {/* <DynamicContent
                                  id="Everyday Bras"
                                  parent="collections"
                                 
                              > */}
                              <a
                                className="site-nav lvl-2 pointer"
                                data-dynamic-id="Everyday-wears"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Everyday Wears"
                                  parent="collections"
                                />
                              </a>
                              {/* </DynamicContent> */}
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to={
                                "/women/collections/Specialty-and-Fashion-Bras"
                              }
                            >
                              <a
                                className="site-nav lvl-2"
                                data-dynamic-id="Specialty-and-Fashion-Bras"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Specialty and Fashion Bras"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Panties"}>
                              <a
                                className="site-nav lvl-2"
                                data-dynamic-id="Cloth"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Cloth"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Lingerie-Sets"}>
                              <a
                                href="shop-fullwidth.php"
                                className="site-nav lvl-2"
                                data-dynamic-id="Cloth-Sets"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Cloth Sets"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Shapewear"}>
                              <a
                                href="shop-fullwidth"
                                className="site-nav lvl-2"
                                data-dynamic-id="Shapewear"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Shapewear"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Swimwear"}>
                              <a
                                href="shop-fullwidth.php"
                                className="site-nav lvl-2"
                                data-dynamic-id="Swimwear"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Swimwear"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Swimsuits"}>
                              <a
                                href="shop-fullwidth.php"
                                className="site-nav lvl-2"
                                data-dynamic-id="One-Piece-Swimsuits"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="One-Piece Swimsuits"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Bikinis"}>
                              <a
                                href="shop-fullwidth.php"
                                className="site-nav lvl-2"
                                data-dynamic-id="Bikinis"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Bikinis"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link to={"/women/collections/Tankinis"}>
                              <a
                                href="shop-fullwidth.php"
                                className="site-nav lvl-2"
                                data-dynamic-id="Tankinis"
                                data-parent="collections"
                              >
                                <DynamicContent
                                  id="Tankinis"
                                  parent="collections"
                                />
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="grid__item lvl-1 col-md-3 col-lg-3">
                        <a
                          href="#"
                          className="site-nav lvl-1"
                          data-dynamic-id="Luxury-and-Designer-Collections"
                          data-parent="collections"
                        >
                          <DynamicContent
                            id="Luxury and Designer Collections"
                            parent="collections"
                          />
                        </a>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Seasonal-and-Special-Occasion-Wear"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Seasonal and Special Occasion Wear"
                                parent="collections"
                              />
                              <span className="lbl nm_label1">New</span>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Monokinis"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Monokinis"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Nightwear"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Nightwear"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Pajama-Sets"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Pajama Sets"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Nightgowns"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Nightgowns"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Activewear"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Activewear"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Yoga-Pants"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Yoga Pants"
                                parent="collections"
                              />
                              <span className="lbl nm_label2">Sale</span>
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Sports-Bras"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Sports Bras"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Beachwear"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Beachwear"
                                parent="collections"
                              />
                            </Link>
                          </li>
                          <li className="lvl-2">
                            <Link
                              to="/women/collections/Intimates-and-Accessories"
                              className="site-nav lvl-2"
                            >
                              <DynamicContent
                                id="Intimates and Accessories"
                                parent="collections"
                              />
                              <span className="lbl nm_label1">New</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="grid__item lvl-1 col-md-6 col-lg-6">
                        <a href="#">
                          <img
                            src="/assets/images/collection/categ3.jpg"
                            alt=""
                            title=""
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="lvl1 parent megamenu">
                  <a href="#" data-dynamic-id="Underwears">
                    <DynamicContent id="Underwears" />{" "}
                    <i className="anm anm-angle-down-l" />
                  </a>
                  <div className="megamenu style2">
                    <ul className="grid mmWrapper">
                      <li className="grid__item one-whole">
                        <ul className="grid">
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="#"
                              className="site-nav lvl-1"
                              data-dynamic-id="Everyday-Bras"
                              data-parent="underwears"
                            >
                              <DynamicContent
                                id="Everyday Bras"
                                parent="underwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/T-shirt-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="T-shirt-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="T-shirt Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Full-Coverage-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Full-Coverage-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Full-Coverage Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Wire-Free-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Wire-Free-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Wire-Free Bra"
                                    parent="underwears"
                                  />
                                  <span className="lbl nm_label1">New</span>
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Convertible-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Convertible-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Convertible Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Racerback-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Racerback-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Racerback Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Longline-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Longline-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Longline Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Minimizer-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Minimizer-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Minimizer Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Training-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Training-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Training Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="#"
                              className="site-nav lvl-1"
                              data-dynamic-id="Specialty-Fashion-Bras"
                              data-parent="underwears"
                            >
                              <DynamicContent
                                id="Specialty & Fashion Bras"
                                parent="underwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Push-Up-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Push-Up-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Push-Up Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Sports-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sports-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Sports Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Bralette"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Clothlette"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Clothlette"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Strapless-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Strapless-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Strapless Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Balconette-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Balconette-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Balconette Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Underwire-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Underwire-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Underwire Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Plunge-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Plunge-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Plunge Bra"
                                    parent="underwears"
                                  />
                                  <span className="lbl nm_label1">New</span>
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Demi-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Demi-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Demi Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Maternity-Nursing-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Maternity-Nursing-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Nursing Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Shelf-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Shelf-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Shelf Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Padded-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Padded-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Padded Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/underwears/Mastectomy-Bra"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Mastectomy-Bra"
                                  data-parent="underwears"
                                >
                                  <DynamicContent
                                    id="Mastectomy Bra"
                                    parent="underwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="lvl1 parent megamenu">
                  <a href="#" data-dynamic-id="Nightwears">
                    <DynamicContent id="Nightwears" />
                    <i className="anm anm-angle-down-l" />
                  </a>
                  <div className="megamenu style2">
                    <ul className="grid mmWrapper">
                      <li className="grid__item one-whole">
                        <ul className="grid">
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/nightwears/Seasonal-Occasion-Wear"
                              className="site-nav lvl-1"
                              data-dynamic-id="Seasonal-Occasion-Wear"
                              data-parent="nightwears"
                            >
                              <DynamicContent
                                id="Seasonal & Occasion Wear"
                                parent="nightwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Bridal-Lingerie"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Bridal-Lingerie"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Bridal Lingerie"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Bridal-Sets"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Bridal-Sets"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Bridal Sets"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Honeymoon-Lingerie"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Honeymoon-Lingerie"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Honeymoon Lingerie"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Holiday-Lingerie"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Holiday-Lingerie"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Holiday Lingerie"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Seasonal-Collections"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Seasonal-Collections"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Seasonal Collections"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Spring-Collection"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Spring-Collection"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Spring Collection"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Summer-Collection"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Summer-Collection"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Summer Collection"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Autumn-Collection"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Autumn-Collection"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Autumn Collection"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Winter-Collection"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Winter-Collection"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Winter Collection"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/nightwears/Loungewear"
                              className="site-nav lvl-1"
                              data-dynamic-id="Loungewear"
                              data-parent="nightwears"
                            >
                              <DynamicContent
                                id="Loungewear"
                                parent="nightwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Lounge-Tops"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Lounge-Tops"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Lounge Tops"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Lounge-Pants"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Lounge-Pants"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Lounge Pants"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Lounge-Shorts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Lounge-Shorts"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Lounge Shorts"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/nightwears/Pajama-Sets"
                              className="site-nav lvl-1"
                              data-dynamic-id="Pajama-Sets"
                              data-parent="nightwears"
                            >
                              <DynamicContent
                                id="Pajama Sets"
                                parent="nightwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Shorts-Sets"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Shorts-Sets"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Shorts Sets"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Lounge-Pants"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Lounge-Pants"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Lounge Pants"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Pants-Sets"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Pants-Sets"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Pants Sets"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/nightwears/Nightgowns"
                              className="site-nav lvl-1"
                              data-dynamic-id="Nightgowns"
                              data-parent="nightwears"
                            >
                              <DynamicContent
                                id="Nightgowns"
                                parent="nightwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Short-Nightgowns"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Short-Nightgowns"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Short Nightgowns"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Long-Nightgowns"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Long-Nightgowns"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Long Nightgowns"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/nightwears/Sleep-Wears"
                              className="site-nav lvl-1"
                              data-dynamic-id="Sleep-Wears"
                              data-parent="nightwears"
                            >
                              <DynamicContent
                                id="Sleep Wears"
                                parent="nightwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Cotton-Sleep-Shorts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Cotton-Sleep-Shorts"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Cotton Sleep Shorts"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Silk-Sleep-Shorts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Silk-Sleep-Shorts"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Silk Sleep Shorts"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Standard-Sleep-Shirts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Standard-Sleep-Shirts"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Standard Sleep Shirts"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Long-Sleep-Shirts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Long-Sleep-Shirts"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Long Sleep Shirts"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Standard-Sleep-Rompers"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Standard-Sleep-Rompers"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Standard Sleep Rompers"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/nightwears/Lace-Sleep-Rompers"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Lace-Sleep-Rompers"
                                  data-parent="nightwears"
                                >
                                  <DynamicContent
                                    id="Lace Sleep Rompers"
                                    parent="nightwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="lvl1 parent megamenu">
                  <a
                    href="/women/swimwears/Swimwear-Beachwear"
                    data-dynamic-id="Swimwear-Beachwear"
                  >
                    <DynamicContent
                      id="Swimwear & Beachwear"
                      parent="swimwears"
                    />
                    <i className="anm anm-angle-down-l" />
                  </a>
                  <div className="megamenu style2">
                    <ul className="grid mmWrapper">
                      <li className="grid__item one-whole">
                        <ul className="grid">
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/swimwears/Swimsuits"
                              className="site-nav lvl-1"
                              data-dynamic-id="Swimsuits"
                              data-parent="swimwears"
                            >
                              <DynamicContent
                                id="Swimsuits"
                                parent="swimwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Classic-One-Piece"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Classic-One-Piece"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Classic One-Piece"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Sporty-One-Piece"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sporty-One-Piece"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Sporty One-Piece"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Cut-Out-One-Piece"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Cut-Out-One-Piece"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Cut-Out One-Piece"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Triangle-Bikini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Triangle-Bikini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Triangle Bikini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Halter-Bikini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Halter-Bikini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Halter Bikini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Bandeau-Bikini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Bandeau-Bikini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Bandeau Bikini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/High-Waisted-Bikini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="High-Waisted-Bikini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="High-Waisted Bikini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Standard-Tankini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Standard-Tankini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Standard Tankini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Long-Tankini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Long-Tankini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Long Tankini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Classic-Monokini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Classic-Monokini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Classic Monokini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Cut-Out-Monokini"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Cut-Out-Monokini"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Cut-Out Monokini"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Standard-Swim-Dress"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Standard-Swim-Dress"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Standard Swim Dress"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Skirted-Swim-Dress"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Skirted-Swim-Dress"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Skirted Swim Dress"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/swimwears/Guards"
                              className="site-nav lvl-1"
                              data-dynamic-id="Guards"
                              data-parent="swimwears"
                            >
                              <DynamicContent id="Guards" parent="swimwears" />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Rash-Guards"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Rash-Guards"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Rash Guards"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Short-Sleeve-Rash-Guards"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Short-Sleeve-Rash-Guards"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Short-Sleeve Rash Guards"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Long-Sleeve-Rash-Guards"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Long-Sleeve-Rash-Guards"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Long-Sleeve Rash Guards"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Swim-Shorts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Swim-Shorts"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Swim Shorts"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Board-Shorts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Board-Shorts"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Board Shorts"
                                    parent="swimwears"
                                  />{" "}
                                  <span className="lbl nm_label3">Hot</span>
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Bikini-Shorts"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Bikini-Shorts"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Bikini Shorts"
                                    parent="swimwears"
                                  />{" "}
                                  <span className="lbl nm_label1">New</span>
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Sport-Swimsuits"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sport-Swimsuits"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Sport Swimsuits"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Competitive-Swimsuits"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Competitive-Swimsuits"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Competitive Swimsuits"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Water-Sports-Swimsuits"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Water-Sports-Swimsuits"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Water Sports Swimsuits"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="grid__item lvl-1 col-md-3 col-lg-3">
                            <a
                              href="/women/swimwears/Beach-Accessories"
                              className="site-nav lvl-1"
                              data-dynamic-id="Beach-Accessories"
                              data-parent="swimwears"
                            >
                              <DynamicContent
                                id="Beach Accessories"
                                parent="swimwears"
                              />
                            </a>
                            <ul className="subLinks">
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Sarongs"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sarongs"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Sarongs"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Kaftans"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Kaftans"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Kaftans"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Beach-Dresses"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Beach-Dresses"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Beach Dresses"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Beach-Hats"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Beach-Hats"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Beach Hats"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Beach-Bags"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Beach-Bags"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Beach Bags"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Sunglasses"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sunglasses"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Sunglasses"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Sandals-Footwear"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sandals-Footwear"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Sandals and Footwear"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Flip-Flops"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Flip-Flops"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Flip-Flops"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                              <li className="lvl-2">
                                <a
                                  href="/women/swimwears/Sandals"
                                  className="site-nav lvl-2"
                                  data-dynamic-id="Sandals"
                                  data-parent="swimwears"
                                >
                                  <DynamicContent
                                    id="Sandals"
                                    parent="swimwears"
                                  />
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="lvl1 parent megamenu">
                  <a href="#" data-dynamic-id="Holiday-Shop">
                    <DynamicContent id="Holiday Shop" parent="holiday" />{" "}
                    <i className="anm anm-angle-down-l" />
                  </a>
                  <div className="megamenu style4">
                    <ul className="grid grid--uniform mmWrapper">
                      <li className="grid__item lvl-1 col-md-3 col-lg-3">
                        <a
                          href="/women/holiday/Vacation-Wear"
                          className="site-nav lvl-1"
                          data-dynamic-id="Vacation-Wear"
                          data-parent="holiday"
                        >
                          <DynamicContent id="Vacation Wear" parent="holiday" />
                        </a>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Tropical-Vacation-Wear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Tropical-Vacation-Wear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Tropical Vacation Wear"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Beach-Accessories"
                              className="site-nav lvl-2"
                              data-dynamic-id="Beach-Accessories"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Beach Accessories"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Tropical-Swimwear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Tropical-Swimwear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Tropical Swimwear"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Tropical-Cover-Ups"
                              className="site-nav lvl-2"
                              data-dynamic-id="Tropical-Cover-Ups"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Tropical Cover-Ups"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Ski-Vacation-Wear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Ski-Vacation-Wear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Ski Vacation Wear"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Thermal-Underwear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Thermal-Underwear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Thermal Underwear"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Thermal-Leggings"
                              className="site-nav lvl-2"
                              data-dynamic-id="Thermal-Leggings"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Thermal Leggings"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Bikinis"
                              className="site-nav lvl-2"
                              data-dynamic-id="Bikinis"
                              data-parent="holiday"
                            >
                              <DynamicContent id="Bikinis" parent="holiday" />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Tankinis"
                              className="site-nav lvl-2"
                              data-dynamic-id="Tankinis"
                              data-parent="holiday"
                            >
                              <DynamicContent id="Tankinis" parent="holiday" />
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="grid__item lvl-1 col-md-3 col-lg-3">
                        <a
                          href="/women/holiday/Seasonal-Collections"
                          className="site-nav lvl-1"
                          data-dynamic-id="Seasonal-Collections"
                          data-parent="holiday"
                        >
                          <DynamicContent
                            id="Seasonal Collections"
                            parent="holiday"
                          />
                        </a>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Seasonal-Special-Occasion-Wear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Seasonal-Special-Occasion-Wear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Seasonal and Special Occasion Wear"
                                parent="holiday"
                              />
                              <span className="lbl nm_label1">New</span>
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Spring-Collection"
                              className="site-nav lvl-2"
                              data-dynamic-id="Spring-Collection"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Spring Collection"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Spring-Lingerie"
                              className="site-nav lvl-2"
                              data-dynamic-id="Spring-Lingerie"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Spring Lingerie"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Spring-Nightwear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Spring-Nightwear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Spring Nightwear"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Summer-Collection"
                              className="site-nav lvl-2"
                              data-dynamic-id="Summer-Collection"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Summer Collection"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Summer-Swimwear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Summer-Swimwear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Summer Swimwear"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Summer-Loungewear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Summer-Loungewear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Summer Loungewear"
                                parent="holiday"
                              />
                              <span className="lbl nm_label2">Sale</span>
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Autumn-Collection"
                              className="site-nav lvl-2"
                              data-dynamic-id="Autumn-Collection"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Autumn Collection"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Winter-Collection"
                              className="site-nav lvl-2"
                              data-dynamic-id="Winter-Collection"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Winter Collection"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Winter-Lingerie"
                              className="site-nav lvl-2"
                              data-dynamic-id="Winter-Lingerie"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Winter Lingerie"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Intimates-Accessories"
                              className="site-nav lvl-2"
                              data-dynamic-id="Intimates-Accessories"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Intimates and Accessories"
                                parent="holiday"
                              />
                              <span className="lbl nm_label1">New</span>
                            </a>
                          </li>
                        </ul>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Special-Occasion-Wear"
                              className="site-nav lvl-2"
                              data-dynamic-id="Special-Occasion-Wear"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Special Occasion Wear"
                                parent="holiday"
                              />
                              <span className="lbl nm_label1">new</span>
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Bridal-Lingerie"
                              className="site-nav lvl-2"
                              data-dynamic-id="Bridal-Lingerie"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Bridal Lingerie"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Bridal-Sets"
                              className="site-nav lvl-2"
                              data-dynamic-id="Bridal-Sets"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Bridal Sets"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Honeymoon-Lingerie"
                              className="site-nav lvl-2"
                              data-dynamic-id="Honeymoon-Lingerie"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Honeymoon Lingerie"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Holiday-Lingerie"
                              className="site-nav lvl-2"
                              data-dynamic-id="Holiday-Lingerie"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Holiday Lingerie"
                                parent="holiday"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/holiday/Valentines-Day-Lingerie"
                              className="site-nav lvl-2"
                              data-dynamic-id="Valentines-Day-Lingerie"
                              data-parent="holiday"
                            >
                              <DynamicContent
                                id="Valentine’s Day Lingerie"
                                parent="holiday"
                              />
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="grid__item lvl-1 col-md-6 col-lg-6">
                        <a
                          href="/women/holiday/Holiday-Image"
                          data-dynamic-id="Holiday-Image"
                          data-parent="holiday"
                        >
                          <img
                            src="/assets/images/collection/categ1.jpg"
                            alt="Holiday Shop"
                            title="Holiday Shop"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="lvl1 parent megamenu">
                  <a href="#" data-dynamic-id="Sale" data-parent="sale">
                    <DynamicContent id="Sale" parent="sale" />
                    <i className="anm anm-angle-down-l" />
                  </a>
                  <div className="megamenu style4">
                    <ul className="grid grid--uniform mmWrapper">
                      <li className="grid__item lvl-1 col-md-3 col-lg-3">
                        <a
                          href="/women/sale/Underwear-Intimates-Sale"
                          className="site-nav lvl-1"
                          data-dynamic-id="Underwear-Intimates-Sale"
                          data-parent="sale"
                        >
                          <DynamicContent
                            id="Underwear and Intimates Sale"
                            parent="sale"
                          />
                        </a>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Bras-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Cloths-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent id="Cloths on Sale" parent="sale" />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Panties-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Cloth-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Cloth on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Lingerie-Sets-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Cloth-Sets-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Cloth Sets on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Shapewear-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Shapewear-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Shapewear on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Intimates-Accessories-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Intimates-Accessories-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Intimates and Accessories on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="grid__item lvl-1 col-md-3 col-lg-3">
                        <a
                          href="/women/sale/Swimwear-Nightwear-Activewear-Sale"
                          className="site-nav lvl-1"
                          data-dynamic-id="Swimwear-Nightwear-Activewear-Sale"
                          data-parent="sale"
                        >
                          <DynamicContent
                            id="Swimwear, Nightwear, and Activewear Sale"
                            parent="sale"
                          />
                        </a>
                        <ul className="subLinks">
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Swimwear-Beachwear-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Swimwear-Beachwear-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Swimwear and Beachwear Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Swimsuits-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Swimsuits-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Swimsuits on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Cover-Ups-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Cover-Ups-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Cover-Ups on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Beach-Accessories-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Beach-Accessories-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Beach Accessories on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Activewear-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Activewear-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Activewear on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Nightwear-Loungewear-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Nightwear-Loungewear-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Nightwear and Loungewear Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Pajama-Sets-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Pajama-Sets-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Pajama Sets on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Nightgowns-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Nightgowns-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Nightgowns on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                          <li className="lvl-2">
                            <a
                              href="/women/sale/Loungewear-Sale"
                              className="site-nav lvl-2"
                              data-dynamic-id="Loungewear-Sale"
                              data-parent="sale"
                            >
                              <DynamicContent
                                id="Loungewear on Sale"
                                parent="sale"
                              />
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="grid__item lvl-1 col-md-6 col-lg-6">
                        <a
                          href="/women/sale/Sale-Image"
                          data-dynamic-id="Sale-Image"
                          data-parent="sale"
                        >
                          {/* <img
                            src="/assets/images/collection/categ1.jpg"
                            alt="Sale"
                            title="Sale"
                          /> */}
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="lvl1 parent dropdown">
                  <a href="/contactus">
                    <DynamicContent id="Contact-us" parent="contact-us" />{" "}
                    <i className="anm anm-angle-down-l" />
                  </a>
                </li>

                {/* <li class="lvl1"><a href="#"><b>Buy Now!</b> <i class="anm anm-angle-down-l"></i></a></li> */}
              </ul>
            </nav>
            {/*End Desktop Menu*/}
          </div>
          {/*Mobile Logo*/}
          <div className="col-6 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo">
            <div className="logo">
              <Link to={"/"}>
                <a href="/">
                  <img
                    src="/assets/images/logo2.png"
                    alt="Ferryella"
                    title="Ferryella"
                    height={90}
                    width={138}
                  />
                </a>
              </Link>
            </div>
          </div>
          {/*Mobile Logo*/}
          {/*Mobile Login Group*/}
          <MobileLoginGroup />

          {/*Mobile Login Group*/}
          {/* </div> */}
        </div>
      </div>
      {/*End Header*/}
    </>
  );
}
