import React, { useEffect, useState } from "react";
import { useInfo } from "../contexts/admincontexts/companydetails";

export default function Footer() {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { Info } = useInfo();

  const handleToggle = (section) => {
    if (isMobile) {
      setActiveSection((prevSection) =>
        prevSection === section ? null : section
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      if (!mobileView) {
        setActiveSection(null); // Reset active section if not in mobile view
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <footer id="footer">
      <div className="newsletter-section">
        <div className="container">
          {/* <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-7 w-100 d-flex justify-content-start align-items-center">
              <div className="display-table">
                <div className="display-table-cell footer-newsletter">
                  <div className="section-header text-center">
                    <label className="h2">
                      <span>sign up for </span>newsletter
                    </label>
                  </div>
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
                          id="Subscribe"
                        >
                          <span className="newsletter__submit-text--large">
                            Subscribe
                          </span>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex justify-content-end align-items-center">
              <div className="footer-social">
                <ul className="list--inline site-footer__social-icons social-icons">
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Facebook"
                    >
                      <i className="icon icon-facebook" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Twitter"
                    >
                      <i className="icon icon-twitter" />{" "}
                      <span className="icon__fallback-text">Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Pinterest"
                    >
                      <i className="icon icon-pinterest" />{" "}
                      <span className="icon__fallback-text">Pinterest</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Instagram"
                    >
                      <i className="icon icon-instagram" />{" "}
                      <span className="icon__fallback-text">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Tumblr"
                    >
                      <i className="icon icon-tumblr-alt" />{" "}
                      <span className="icon__fallback-text">Tumblr</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on YouTube"
                    >
                      <i className="icon icon-youtube" />{" "}
                      <span className="icon__fallback-text">YouTube</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      target="_blank"
                      title="Belle Multipurpose Bootstrap 4 Template on Vimeo"
                    >
                      <i className="icon icon-vimeo-alt" />{" "}
                      <span className="icon__fallback-text">Vimeo</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="site-footer">
        <div className="container">
          {/*Footer Links*/}
          <div className="footer-top">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4
                  className={`h4 ${
                    activeSection === "quickShop" ? "active" : ""
                  }`}
                  onClick={() => handleToggle("quickShop")}
                >
                  Quick Shop
                </h4>
                {(activeSection === "quickShop" || !isMobile) && (
                  <ul>
                    <li>
                      <a href="/women/collections/EverdayBras">Underwear</a>
                    </li>
                    <li>
                      <a href="/women/collections/Nightwear">Nightwear</a>
                    </li>
                    <li>
                      <a href="/women/collections/Swimwear">Swimwear</a>
                    </li>
                    <li>
                      <a href="/women/collections/Activewear">Sportswear</a>
                    </li>
                    {/* <li>
                      <a href="#">Sale</a>
                    </li> */}
                  </ul>
                )}
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4
                  className={`h4 ${
                    activeSection === "informations" ? "active" : ""
                  }`}
                  onClick={() => handleToggle("informations")}
                >
                  Informations
                </h4>
                {(activeSection === "informations" || !isMobile) && (
                  <ul>
                    <li>
                      <a href="/contactus">About us</a>
                    </li>
                    <li>
                      <a href="/contactus">Contact us</a>
                    </li>
                    <li>
                      <a href="/privacy">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="/terms">Terms & Conditions</a>
                    </li>
                    {/* <li>
                      <a href="#">FAQ</a>
                    </li> */}
                  </ul>
                )}
              </div>
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4
                  className={`h4 ${
                    activeSection === "Customer" ? "active" : ""
                  }`}
                  onClick={() => handleToggle("Customer")}
                >
                  Customer Services
                </h4>
                {(activeSection === "Customer" || !isMobile) && (
                  <ul>
                    <li>
                      <a href="/contactus">Contact Us</a>
                    </li>
                    {/* <li>
                      <a href="#">Orders and Returns</a>
                    </li> */}
                    <li>
                      <a href="/contactus">Support Center</a>
                    </li>
                  </ul>
                )}
              </div>
              {/* <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                <h4 className="h4 view-footer">Customer Services</h4>
                <ul>
                  <li>
                    <a href="#">Request Personal Data</a>
                  </li>
                  <li>
                    <a href="#">FAQ's</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Orders and Returns</a>
                  </li>
                  <li>
                    <a href="#">Support Center</a>
                  </li>
                </ul>
              </div> */}
              <div className="col-12 col-sm-12 col-md-3 col-lg-3 contact-box">
                <h4 className="h4 view-footer">Contact Us</h4>
                <ul className="addressFooter">
                  <li>
                    <i className="icon anm anm-map-marker-al" />
                    <p>
                      {Info.InvoiceAddress_line1}
                      <br />
                      {Info.InvoiceAddress_line2}
                      <br />
                      {Info.InvoiceAddress_line3}
                    </p>
                  </li>
                  <li className="phone">
                    <i className="icon anm anm-phone-s" />
                    <p>{Info.support}</p>
                  </li>
                  <li className="email">
                    <i className="icon anm anm-envelope-l" />
                    <p>{Info.InvoiceEmail}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*End Footer Links*/}
          <hr />
          <div className="footer-bottom">
            <div className="row">
              {/*Footer Copyright*/}
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-1 order-md-0 order-lg-0 order-sm-1 copyright text-sm-center text-md-left text-lg-left">
                <span /> <a href="/">Ferryella</a>
              </div>
              {/*End Footer Copyright*/}
              {/*Footer Payment Icon*/}
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-0 order-md-1 order-lg-1 order-sm-0 payment-icons text-right text-md-center">
                <ul className="payment-icons list--inline">
                  <li>
                    <i className="icon fa fa-cc-visa" aria-hidden="true" />
                  </li>
                  <li>
                    <i
                      className="icon fa fa-cc-mastercard"
                      aria-hidden="true"
                    />
                  </li>
                  <li>
                    <i className="icon fa fa-cc-discover" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="icon fa fa-cc-paypal" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="icon fa fa-cc-amex" aria-hidden="true" />
                  </li>
                  <li>
                    <i className="icon fa fa-credit-card" aria-hidden="true" />
                  </li>
                </ul>
              </div>
              {/*End Footer Payment Icon*/}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
