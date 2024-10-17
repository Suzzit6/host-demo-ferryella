import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../src/contexts/authContext";

export function MiniCart() {
  const { userAuth, setuserAuth } = useUser();
  
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <>
      <div id="header-cart" classname="block block-cart">
        <ul classname="mini-products-list">
          <li classname="item">
            <a classname="product-image" href="#">
              <img
                src="/assets/images/product-images/cape-dress-1.jpg"
                alt="3/4 Sleeve Kimono Dress"
                title=""
              />
            </a>
            <div classname="product-details">
              <a href="#" classname="remove">
                <i classname="anm anm-times-l" aria-hidden="true"></i>
              </a>
              <i classname="anm anm-times-l" aria-hidden="true">
                <a href="#" classname="edit-i remove">
                  <i classname="anm anm-edit" aria-hidden="true"></i>
                </a>
                <i classname="anm anm-edit" aria-hidden="true">
                  <a classname="pName" href="cart.html">
                    Sleeve Kimono Dress with slght blue
                  </a>
                  <div classname="variant-cart">Black / XL</div>
                  <div className="wrapQtyBtn">
                    <div className="qtyField">
                      <button
                        className="qtyBtn minus"
                        onClick={decreaseQuantity}
                        type="button"
                      >
                        <i className="fa anm anm-minus-r" aria-hidden="true" />
                      </button>
                      <input
                        type="text"
                        id="Quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="product-form__input qty"
                      />
                      <button
                        className="qtyBtn plus"
                        onClick={increaseQuantity}
                        type="button"
                        
                      >
                        <i className="fa anm anm-plus-r" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <i classname="fa anm anm-minus-r" aria-hidden="true">
                    <i classname="fa anm anm-plus-r" aria-hidden="true">
                      <div classname="priceRow">
                        <div classname="product-price">
                          <span classname="money">$59.00</span>
                        </div>
                      </div>
                    </i>
                  </i>
                </i>
              </i>
            </div>
            <i classname="anm anm-times-l" aria-hidden="true">
              <i classname="anm anm-edit" aria-hidden="true">
                <i classname="fa anm anm-minus-r" aria-hidden="true">
                  <i classname="fa anm anm-plus-r" aria-hidden="true"></i>
                </i>
              </i>
            </i>
          </li>
          {/* <i classname="anm anm-times-l" aria-hidden="true">
            <i classname="anm anm-edit" aria-hidden="true">
              <i classname="fa anm anm-minus-r" aria-hidden="true">
                <i classname="fa anm anm-plus-r" aria-hidden="true">
                  <li classname="item">
                    <a classname="product-image" href="#">
                      <img
                        src="/assets/images/product-images/cape-dress-2.jpg"
                        alt="Elastic Waist Dress - Black / Small"
                        title=""
                      />
                    </a>
                    <div classname="product-details">
                      <a href="#" classname="remove">
                        <i classname="anm anm-times-l" aria-hidden="true"></i>
                      </a>
                      <i classname="anm anm-times-l" aria-hidden="true">
                        <a href="#" classname="edit-i remove">
                          <i classname="anm anm-edit" aria-hidden="true"></i>
                        </a>
                        <i classname="anm anm-edit" aria-hidden="true">
                          <a classname="pName" href="cart.html">
                            Elastic Waist Dress
                          </a>
                          <div classname="variant-cart">Gray / XXL</div>
                          <div classname="wrapQtyBtn">
                            <div classname="qtyField">
                              <span classname="label">Qty:</span>
                              <a
                                classname="qtyBtn minus"
                                href="javascript:void(0);"
                              >
                                <i
                                  classname="fa anm anm-minus-r"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <i
                                classname="fa anm anm-minus-r"
                                aria-hidden="true"
                              >
                                <input
                                  type="text"
                                  id="Quantity"
                                  name="quantity"
                                  defaultvalue="{1}"
                                  classname="product-form__input qty"
                                />
                                <a
                                  classname="qtyBtn plus"
                                  href="javascript:void(0);"
                                >
                                  <i
                                    classname="fa anm anm-plus-r"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <i
                                  classname="fa anm anm-plus-r"
                                  aria-hidden="true"
                                ></i>
                              </i>
                            </div>
                            <i
                              classname="fa anm anm-minus-r"
                              aria-hidden="true"
                            >
                              <i
                                classname="fa anm anm-plus-r"
                                aria-hidden="true"
                              ></i>
                            </i>
                          </div>
                          <i classname="fa anm anm-minus-r" aria-hidden="true">
                            <i classname="fa anm anm-plus-r" aria-hidden="true">
                              <div classname="priceRow">
                                <div classname="product-price">
                                  <span classname="money">$99.00</span>
                                </div>
                              </div>
                            </i>
                          </i>
                        </i>
                      </i>
                    </div>
                    <i classname="anm anm-times-l" aria-hidden="true">
                      <i classname="anm anm-edit" aria-hidden="true">
                        <i classname="fa anm anm-minus-r" aria-hidden="true">
                          <i
                            classname="fa anm anm-plus-r"
                            aria-hidden="true"
                          ></i>
                        </i>
                      </i>
                    </i>
                  </li>
                  <i classname="anm anm-times-l" aria-hidden="true">
                    <i classname="anm anm-edit" aria-hidden="true">
                      <i classname="fa anm anm-minus-r" aria-hidden="true">
                        <i classname="fa anm anm-plus-r" aria-hidden="true"></i>
                      </i>
                    </i>
                  </i>
                </i>
              </i>
            </i>
          </i> */}
        </ul>
        <i classname="anm anm-times-l" aria-hidden="true">
          <i classname="anm anm-edit" aria-hidden="true">
            <i classname="fa anm anm-minus-r" aria-hidden="true">
              <i classname="fa anm anm-plus-r" aria-hidden="true">
                <i classname="anm anm-times-l" aria-hidden="true">
                  <i classname="anm anm-edit" aria-hidden="true">
                    <i classname="fa anm anm-minus-r" aria-hidden="true">
                      <i classname="fa anm anm-plus-r" aria-hidden="true">
                        <div classname="total">
                          <div classname="total-in">
                            <span classname="label">Cart Subtotal:</span>
                            <span classname="product-price">
                              <span classname="money">$748.00</span>
                            </span>
                          </div>
                          <div classname="buttonSet text-center">
                            <a
                              href="cart.html"
                              classname="btn btn-secondary btn--small"
                            >
                              View Cart more and more
                            </a>
                            <a
                              href="checkout.html"
                              classname="btn btn-secondary btn--small"
                            >
                              Checkout jjjoo
                            </a>
                          </div>
                        </div>
                      </i>
                    </i>
                  </i>
                </i>
              </i>
            </i>
          </i>
        </i>
      </div>
      <i classname="anm anm-times-l" aria-hidden="true">
        <i classname="anm anm-edit" aria-hidden="true">
          <i classname="fa anm anm-minus-r" aria-hidden="true">
            <i classname="fa anm anm-plus-r" aria-hidden="true">
              <i classname="anm anm-times-l" aria-hidden="true">
                <i classname="anm anm-edit" aria-hidden="true">
                  <i classname="fa anm anm-minus-r" aria-hidden="true">
                    <i classname="fa anm anm-plus-r" aria-hidden="true"></i>
                  </i>
                </i>
              </i>
            </i>
          </i>
        </i>
      </i>
    </>
  );
}
