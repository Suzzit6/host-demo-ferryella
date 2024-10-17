import Footer from "../../view/footer";
import Header from "../../view/header";
import MobileHeader from "../../view/mobileheader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorPopup from "../../components/ErrorPopup";
// import { GoogleLogin } from "react-google-login";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuth } from "../../components/googleOAuth";
import MsgPopup from "../../components/MessagePopup";
import { useNavigate } from "react-router-dom";

const googleClientID =
  "613011644713-8ulrf00dkg201cq3bc4r5855ed2a1qv8.apps.googleusercontent.com";
const googleSecret = "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";
axios.defaults.withCredentials = true;

export function register() {
  const [otp, setOtp] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, seterror] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [errorKey, setErrorKey] = useState(0);

  const [timer, setTimer] = useState(40);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    console.log("error " + error);
  }, [error]);

  const [User, setUser] = useState({
    fullname: null,
    email: null,
    password: null,
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopUp = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlesendotp = async (e) => {
    e.preventDefault();
    handleOpenPopUp();
    try {
      const fullname = User.fullname;
      const email = User.email;
      const response = await axios.post("http://localhost:5500/send-otp", {
        fullname,
        email,
      });
      setTimer(40);
      setIsActive(true);
      setMessage("OTP sent Successfully");
      setOtpSent(true);
    } catch (error) {
      console.log("Error caught:", error);
      console.log("Error response:", error.response);
      console.log("Error data:", error.response?.data);

      if (error.response.data.error === "Email Already Registered") {
        handleClosePopup();

        seterror("Email Already Registered");
        return setErrorKey((prevKey) => prevKey + 1);
      }
      if (error.response.data.error === "Disposable Email Detected") {
        handleClosePopup();

        seterror("Disposable Email Detected, Please Use Permanent Email");
        return setErrorKey((prevKey) => prevKey + 1);
      }
      setTimeout(() => seterror("Something Went Wrong !! "), 0);
      return setErrorKey((prevKey) => prevKey + 1);
    }
  };
  const reloadAndNavigate = (path) => {
    window.location.href = path;
  };

  const handleVerifyotp = async (e) => {
    e.preventDefault();
    handleClosePopup();
    try {
      const response = await axios.post(
        "http://localhost:5500/register",
        {
          ...User,
          otp,
        },
        {
          withCredentials: true,
        }
      );
      console.log("User " + { response });
      reloadAndNavigate("/");
      setMessage("User registered successfully");
    } catch (error) {
      if (error.response.status.error === "Invalid OTP") {
        seterror(null);
        setTimeout(() => seterror("Invalid OTP"), 0);
        return;
      }
      console.log("Error while veryfying otp" + error);
      seterror(null);
      setTimeout(() => seterror("Something went wrong please try again"), 0);
      return;
    }
  };
  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  return (
    <GoogleOAuthProvider clientId={googleClientID}>
      <div className="pageWrapper">
        <Header toggleMenu={toggleMobileMenu} />
        <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
        {/*Body Content*/}
        <div id="page-content">
          {/*Page Title*/}
          <div className="page section-header text-center page-margin-less">
            <div className="page-title">
              <div className="wrapper">
                <h1 className="page-width">Create an Account</h1>
              </div>
            </div>
          </div>
          {/*End Page Title*/}
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3 margin-bottom content-center">
                <GoogleOAuth />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                {/* <GoogleLogin
                clientId={googleClientID}
                onSuccess={handleGoogleSignup}
                onError={handleGoogleFailure}
                uxMode="popup"
              /> */}

                {error && <ErrorPopup key={errorKey} error={error} />}
                {/* {message && <MsgPopup msg={message} />} */}

                <div className="mb-4">
                  <form
                    id="CustomerLoginForm"
                    acceptCharset="UTF-8"
                    className="contact-form"
                    onSubmit={handlesendotp}
                  >
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label htmlFor="FirstName">Full Name</label>
                          <input
                            type="text"
                            name="customer[first_name]"
                            placeholder=""
                            id="FirstName"
                            autofocus=""
                            value={User.fullname}
                            onChange={(e) =>
                              setUser({ ...User, fullname: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label htmlFor="CustomerEmail">Email</label>
                          <input
                            type="email"
                            name="customer[email]"
                            placeholder=""
                            id="CustomerEmail"
                            className=""
                            autoCorrect="off"
                            autoCapitalize="off"
                            autofocus=""
                            value={User.email}
                            onChange={(e) =>
                              setUser({ ...User, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="form-group">
                          <label htmlFor="CustomerPassword">Password</label>
                          <input
                            type="password"
                            defaultValue=""
                            name="customer[password]"
                            placeholder=""
                            id="CustomerPassword"
                            className=""
                            value={User.password}
                            onChange={(e) =>
                              setUser({ ...User, password: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                        <input type="submit" className="btn mb-3" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Body Content*/}
        {/*Footer*/}
        <Footer />
        {/*End Footer*/}
        {/* Including Jquery */}
        {isPopupOpen && (
          <div
            className="newsletter-wrap h-60 "
            id={isPopupOpen ? "popup-container-show" : "popup-container"}
          >
            <div id="popup-window ">
              {/* <a className="btn closepopup" onClick={handleClosePopup}>
              <i className="icon icon anm anm-times-l" />
            </a> */}
              {/* Modal content*/}
              <div className="display-table splash-bg">
                {/* <div className="display-table-cell width40">
                <img
                  src="assets/images/newsletter-img.jpg"
                  alt="Join Our Mailing List"
                  title="Join Our Mailing List"
                />{" "}
              </div> */}
                <div className="display-table-cell width60 text-center margin50">
                  <div className="newsletter-left">
                    <h1>Verify Email</h1>
                    <p>Enter the OTP which has been sent to {User.email}</p>
                    <form onSubmit={handleVerifyotp}>
                      <div className="input-group margin50">
                        <input
                          type="password"
                          className="input-group__field newsletter__input "
                          name="password"
                          defaultValue=""
                          placeholder="One Time Password"
                          required=""
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <span className="input-group__btn">
                          <button
                            type="submit"
                            className="btn newsletter__submit"
                            name="commit"
                            id="subscribeBtn"
                          >
                            {" "}
                            <span className="newsletter__submit-text--large">
                              Submit
                            </span>{" "}
                          </button>
                        </span>
                        <br />
                        <span className="top10">
                          {timer > 0 ? (
                            <span> Resend OTP 0:{timer} </span>
                          ) : (
                            <a
                              onClick={handlesendotp}
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                              Resend OTP{" "}
                            </a>
                          )}

                          <a
                            className="margin-left4px"
                            onClick={handleClosePopup}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            Change Email?{" "}
                          </a>
                        </span>
                      </div>
                    </form>
                    {/* <ul className="list--inline site-footer__social-icons social-icons">
                    <li>
                      <a
                        className="social-icons__link"
                        href="#"
                        title="Facebook"
                      >
                        <i
                          className="fa fa-facebook-official"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-icons__link"
                        href="#"
                        title="Twitter"
                      >
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-icons__link"
                        href="#"
                        title="Pinterest"
                      >
                        <i className="fa fa-pinterest" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-icons__link"
                        href="#"
                        title="Instagram"
                      >
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-icons__link"
                        href="#"
                        title="YouTube"
                      >
                        <i className="fa fa-youtube" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a className="social-icons__link" href="#" title="Vimeo">
                        <i className="fa fa-vimeo" aria-hidden="true" />
                      </a>
                    </li>
                  </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}
