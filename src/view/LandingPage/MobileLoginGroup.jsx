import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/authContext";
import { useDispatch, useSelector } from "react-redux";
import { debouncedFetchCartData, removeFromCart } from "../../app/cartSlice.js";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate, NavLink } from "react-router-dom";

export default function MobileLoginGroup() {
  const { userAuth, setuserAuth } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [MiniCartActive, setMiniCartActive] = useState(false);

  const dispatch = useDispatch();

  const userCart = useSelector((state) => state.cart);
  useEffect(() => {
    if (userAuth?.id) {
      debouncedFetchCartData(dispatch, userAuth?.id);
    }
  }, [dispatch, userAuth?.id]);

  const handleUserAction = () => {
    debouncedFetchCartData(dispatch, userAuth?.id);
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
    <div className="col-sm-4 col-md-4 col-lg-4 d-sm-block d-lg-none header_logingroup_mobile">
      {/* <div className=""> */}
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
            className="site-header__cart-count"
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
                  product.Product.Images.filter((image) => image.isPrimary).map(
                    (image) => (
                      <a className="product-image">
                        <img
                          src={image.url}
                          alt={product.Product.name}
                          title=""
                        />
                      </a>
                    )
                  )}

                <div className="product-details">
                  {/* <a href="#" className="remove" onClick={handleDeleteItem}> */}
                  {/* <i className="fas fa-trash-alt" aria-hidden="true"></i>
                           </a> */}
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
                              product.Product.currentprice * product.quantity
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
                <Link to={"/user/cart"}>
                  {" "}
                  <a href="cart.html" className="btn btn-secondary btn--small">
                    View Cart
                  </a>{" "}
                </Link>
                {/* <a
                  href="/user/checkout"
                  className="btn btn-secondary btn--small"
                >
                  Checkout
                </a> */}
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
          {(userAuth && userAuth?.fullname) || userAuth?.fullname !== "" ? (
            <>
              {" "}
              <NavDropdown.Item href="/user/profile">
                Profile
              </NavDropdown.Item>{" "}
              <NavDropdown.Item href="/user/profile">
                My Orders
              </NavDropdown.Item>{" "}
              <NavDropdown.Item href="/user/cart">Cart</NavDropdown.Item>{" "}
              <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item>
            </>
          ) : (
            <>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              <NavDropdown.Item href="/user/profile">
                My Orders
              </NavDropdown.Item>
            </>
          )}
        </NavDropdown>
      </div>
      {/* <div className="site-cart ">
                <a href="#;" className="site-header__cart" title="Cart">
                  
                </a>
                
              </div> */}
      {/* </div> */}
    </div>
  );
}
