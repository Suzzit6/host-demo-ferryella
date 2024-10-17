import React, { useState } from "react";
import Header from "../view/header";
import MobileHeader from "../view/mobileheader";
import Footer from "../view/footer";
import { useInfo } from "../contexts/admincontexts/companydetails";

export const ContactUs = () => {
    const { Info } = useInfo();
  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };
  return (
    <>
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      <div id="page-content">
        {/*Page Title*/}
        <div className="page section-header text-center margin-top-product">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Contact Us</h1>
            </div>
          </div>
        </div>
        {/*End Page Title*/}
        {/* <div className="map-section map">
          <iframe
            src="https://www.google.com/maps/embed?pb="
            height={350}
            allowFullScreen=""
          />
          <div className="container">
            <div className="row">
              <div className="map-section__overlay-wrapper">
                <div className="map-section__overlay">
                  <h3 className="h4">Our store</h3>
                  <div className="rte-setting">
                    <p>
                      123 Fake St.
                      <br />
                      Toronto, Canada
                    </p>
                    <p>
                      Mon - Fri, 10am - 9pm
                      <br />
                      Saturday, 11am - 9pm
                      <br />
                      Sunday, 11am - 5pm
                    </p>
                  </div>
                  <p>
                    <a
                      href="https://maps.google.com/?daddr=80%20Spadina%20Ave,%20Toronto"
                      className="btn btn--secondary btn--small"
                      target="_blank"
                    >
                      Get directions
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="bredcrumbWrap">
          <div className="container breadcrumbs">
            <a href="index.html" title="Back to the home page">
              Home
            </a>
            <span aria-hidden="true">›</span>
            <span>Contact Us</span>
          </div>
        </div> */}
        <div className="container centre-content">
          <div className="row">
            {/* <div className="col-12 col-sm-12 col-md-8 col-lg-8 mb-4">
              <h2>Drop Us A Line</h2>
              <p>
                Lorem Ipsum é um texto modelo da indústria tipográfica e de
                impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado
                por estas indústrias desde o ano de 1500
              </p>
              <div className="formFeilds contact-form form-vertical">
                <form
                  action="http://annimexweb.com/items/belle/assets/php/mail.php"
                  method="post"
                  id="contact_form"
                  className="contact-form"
                >
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="ContactFormName"
                          name="name"
                          placeholder="Name"
                          defaultValue=""
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="ContactFormEmail"
                          name="email"
                          placeholder="Email"
                          defaultValue=""
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="form-group">
                        <input
                          required=""
                          type="tel"
                          id="ContactFormPhone"
                          name="phone"
                          pattern="[0-9\-]*"
                          placeholder="Phone Number"
                          defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          id="ContactSubject"
                          name="subject"
                          placeholder="Subject"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <textarea
                          required=""
                          rows={10}
                          id="ContactFormMessage"
                          name="message"
                          placeholder="Your Message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <input
                        type="submit"
                        className="btn"
                        defaultValue="Send Message"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
              <div className="open-hours">
                <strong>Consumer Support</strong>
                {/* <br />
                Mon - Sat : 9am - 11pm
                <br />
                Sunday: 11am - 5pm */}
              </div>
              <hr />
              <ul className="addressFooter">
                <p>
                  <i className="icon anm anm-map-marker-al" />
                  <p>{Info.InvoiceAddress_line1}</p>
                  <p>{Info.InvoiceAddress_line2}</p>
                  <p>{Info.InvoiceAddress_line3}</p>
                </p>
                <p className="phone">
                  <i className="icon anm anm-phone-s" />
                  <p>{Info.support}</p>
                </p>
                <p className="email">
                  <i className="icon anm anm-envelope-l" />
                  <p>{Info.InvoiceEmail}</p>
                </p>
              </ul>
              <hr />
              {/* <ul className="list--inline site-footer__social-icons social-icons">
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
                    <i className="icon icon-twitter" />
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
                    <i className="icon icon-pinterest" />
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
                    <i className="icon icon-instagram" />
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
                    <i className="icon icon-tumblr-alt" />
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
                    <i className="icon icon-youtube" />
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
                    <i className="icon icon-vimeo-alt" />
                    <span className="icon__fallback-text">Vimeo</span>
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
