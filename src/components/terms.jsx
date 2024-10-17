import React, { useState } from "react";
import Header from "../view/header";
import MobileHeader from "../view/mobileheader";
import Footer from "../view/footer";
import { useInfo } from "../contexts/admincontexts/companydetails";

export const terms = () => {
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
              <h4 className="page-width">Terms and Conditions</h4>
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
        <div className="container ">
          <div className="row">
            {/* <h4>Terms and Conditions</h4> */}
            <p>
              Please read the following terms and conditions very carefully as
              your use of this service is subject to your acceptance and
              compliance with the following terms and conditions ("Terms"). By
              subscribing to or using any of our services, you agree that you
              have read, understood, and are bound by the Terms, regardless of
              how you subscribe to or use the services. If you do not wish to be
              bound by the Terms, you must not subscribe to or use our services.
            </p>
            <p>
              In these Terms, references to "you", "User" shall mean the end
              user accessing the Website, its contents, and using the Services
              offered through the Website. "Service Providers" refer to
              independent third-party service providers, and "we", "us", and
              "our" refer to Ferryella.
            </p>

            <h4>Introduction</h4>
            <p>
              <a href="http://www.ferryella.com">www.ferryella.com</a> (the
              "Website") is an Internet-based content and e-commerce portal
              owned and operated by Ferryella Ventures Private Limited ("the
              Company"), a company incorporated under the laws of India.
            </p>
            <p>
              The use of this site is governed by these policies, terms, and
              conditions. Please read them carefully. Your use of this site and
              placement of an order indicates your acceptance of these terms and
              conditions. Ferryella reserves the right to make changes to this
              site and these terms and conditions at any time without prior
              notice.
            </p>

            <h4>User Account, Password & Security</h4>
            <p>
              Upon completing the Website's registration process, you will
              receive a password and account designation. You are responsible
              for maintaining the confidentiality of your password and account
              and for all activities that occur under your password or account.
              You agree to:
            </p>
            <ul>
              <li>
                (a) Immediately notify the Company of any unauthorized use of
                your password or account or any other breach of security.
              </li>
              <li>
                (b) Ensure that you log out from your account at the end of each
                session.
              </li>
            </ul>
            <p>
              The Company will not be liable for any loss or damage arising from
              your failure to comply with this Section.
            </p>

            <h4>Privacy Policy Headings</h4>
            <p>
              Headings and subheadings in these Terms are for convenience and
              identification only. They are not intended to describe, interpret,
              define, or limit the scope, extent, or intent of the Terms or any
              right to use the Website contained herein or any other section or
              pages of the Website or any Linked Sites in any manner.
            </p>

            <h4>Severability</h4>
            <p>
              If any provision of the Terms is found to be invalid or
              unenforceable in whole or in part, such invalidity or
              unenforceability shall attach only to that provision or part of
              that provision. The rest of the Terms shall remain in full force
              and effect.
            </p>

            <h4>Use of the Website</h4>
            <p>
              By accessing the Website, you warrant and represent to the Website
              owner that you are legally entitled to do so and to make use of
              the information made available via the Website. We may contact you
              via call or SMS regarding order status updates.
            </p>

            <h4>Indemnification</h4>
            <p>
              You agree to indemnify, defend, and hold harmless{" "}
              <a href="http://www.ferryella.com">www.ferryella.com</a> from and
              against any and all losses, liabilities, claims, damages, costs,
              and expenses (including legal fees) asserted against or incurred
              by <a href="http://www.ferryella.com">www.ferryella.com</a>{" "}
              arising from any breach or non-performance of any representation,
              warranty, or agreement made or obligation to be performed by you
              according to these Terms.
            </p>

            <h4>Pricing</h4>
            <p>
              Prices for products are described on our Website and are
              incorporated into these Terms by reference. All prices are in
              Indian Rupees. Prices, products, and Services may change at the
              Company's discretion.
            </p>

            <h4>Shipping</h4>
            <p>
              Title and risk of loss for all products ordered by you shall pass
              to you upon Ferryella's shipment to the shipping carrier.
            </p>

            <h4>Governing Law</h4>
            <p>
              These Terms and all transactions entered into on or through the
              Website and the relationship between you and Ferryella shall be
              governed by the laws of India, without reference to its conflict
              of laws principles.
            </p>
            <p>
              Any claims, disputes, or differences arising in connection with
              the Website, the Terms, or transactions made on or through the
              Website shall be subject to the exclusive jurisdiction of the
              courts of India. You hereby accept and agree to the
              jurisdiction of such courts.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default terms;
