import React, { useState } from "react";
import Header from "../view/header";
import MobileHeader from "../view/mobileheader";
import Footer from "../view/footer";
import { useInfo } from "../contexts/admincontexts/companydetails";

export const privacy = () => {
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
              <h4 className="page-width">Privacy Policy</h4>
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
            {/* <h2>Privacy Policy</h2> */}
            <p>
              Maintaining your privacy while shopping with us is one of our
              highest priorities. Therefore, we only request the necessary
              information required to complete your order or contact you
              regarding its status. The information we collect includes your
              name, email address, phone number, shipping address, and billing
              address. Apart from the Ferryella team, this information is only
              shared with our associated courier partner that will be delivering
              your ordered items. Please note that Ferryella does not store your
              credit/debit card or online bank account information.
            </p>

            <p>
              Ferryella reserves the right to update this Privacy Policy at any
              time. We will notify you of such updates via the email address you
              have shared with us.
            </p>

            <h4>Information Collection and Use</h4>
            <p>
              We recognize and respect your need for privacy and security as you
              visit our site. When you visit our Website, we may require
              customers who purchase products to provide us with contact
              information, including but not limited to the Customer's name,
              company name, address, phone number, email address, cookies, IP
              logs, billing information, billing name, address, credit card
              number, and other personal information as needed.
            </p>
            <p>
              Besides Personal Information, we may also collect information
              regarding your use of the Website. From time to time, we may
              collect or ask for additional Personal Information, which will be
              expressly included as Personal Information. You can opt out of
              providing additional information by not entering it when prompted
              or not using the Website, although this may hinder your ability to
              use certain features of the Website.
            </p>
            <p>
              Information collected is used to provide and maintain the Website
              and may be used at Ferryella's discretion. This information may
              also be used to contact you to discuss your interest in our
              services and to send you information regarding Ferryella, its
              partners, products, promotions, and events. You may be invited to
              receive email correspondence by providing your email address. Your
              email and personal information will not be shared with third
              parties unless necessary to conduct business you have contracted
              with us to perform, to comply with legal processes, or as deemed
              reasonable by Ferryella.
            </p>

            <h4>Information Sharing</h4>
            <p>
              Ferryella provides access to third-party partners to offer
              specific services. Ferryella will share your transaction
              information with third parties as necessary to provide requested
              services, such as with a shipping company to fulfill orders or a
              credit card processing company to bill for goods and services.
            </p>
            <p>
              We reserve the right to transfer any and all information collected
              from users to a third party in the event of a merger, sale, joint
              venture, assignment, transfer, or other disposition of all or part
              of the assets or stock, including in connection with bankruptcy or
              similar proceedings.
            </p>

            <p>
              Additionally, we reserve the right to disclose your personal
              information if we believe it is necessary to:
            </p>
            <ul>
              <li>(1) Comply with legal processes or government requests</li>
              <li>(2) Enforce our Terms of Service</li>
              <li>
                (3) Protect our operations or those of affiliated entities
              </li>
              <li>
                (4) Safeguard the rights, privacy, safety, or property of
                Ferryella, affiliated entities, you, or others
              </li>
              <li>
                (5) Pursue available remedies or limit the damages that we may
                incur
              </li>
            </ul>

            <h4>Security</h4>
            <p>
              Ferryella is committed to ensuring the security, integrity, and
              privacy of your Personal Information and protecting it from
              unauthorized access, alteration, disclosure, or destruction. For
              this, we adopt internal reviews of our data collection, storage,
              and processing practices, and security measures, including
              appropriate encryption and physical security, to safeguard systems
              where your personal data is stored.
            </p>

            <h4>Changes to This Policy</h4>
            <p>
              We reserve the right to modify this Privacy Policy, and any of our
              policies or procedures concerning information collected through
              the site, without prior notice. The last revision date can be
              found at the top of this page. Any changes to the Privacy Policy
              will take effect upon posting on the Website. By using the site
              after such changes, you agree to the updated policy. We encourage
              you to periodically review the policy to stay informed about any
              changes.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default privacy;
