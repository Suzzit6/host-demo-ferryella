import React, { useState } from "react";
import Footer from "../../view/footer";
import Header from "../../view/header";
import MobileHeader from "../../view/mobileheader";
import axios from "axios";
import ErrorPopup from "../../components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/authContext";
import { useLoader } from "../../contexts/LoaderContext";
import { stubTrue } from "lodash";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuth } from "../../components/googleOAuth";

const googleClientID =
  "613011644713-8ulrf00dkg201cq3bc4r5855ed2a1qv8.apps.googleusercontent.com";
const googleSecret = "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";
axios.defaults.withCredentials = true;

export function login() {
  const [message, setMessage] = useState(null);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const [errorKey, setErrorKey] = useState(0);

  const [User, setUser] = useState({
    email: null,
    password: null,
  });
  const { setuserAuth } = useUser();
  const reloadAndNavigate = (path) => {
    window.location.href = path;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5500/login",
        {
          ...User,
        },
        {
          withCredentials: true,
        }
      );
      // setuserAuth(response.data.user)
      console.log("response", response);
      console.log("response.data", response.data.message);
      console.log("response.data.user", response.data.user);
      setLoading(false);
      // if (response) {
      reloadAndNavigate("/");
      // }
      // navigate("/")
    } catch (error) {
      setLoading(false);
      if (error.response.status.error === "Wrong Password") {
        seterror("Please Enter a Correct Password");
        return setErrorKey((prevKey) => prevKey + 1); // Increment the key
      }
      if (error.response.status.error === "User Not Registered") {
        seterror("User Not Registered");
        return setErrorKey((prevKey) => prevKey + 1);
      }
      if (error.response.data.error === "Wrong Password") {
        seterror("Please Enter a Correct Password");
        return setErrorKey((prevKey) => prevKey + 1);
      }
      // return seterror("Something went wrong please try again");
      seterror("Error Logging in, Please Try again");
      return setErrorKey((prevKey) => prevKey + 1);
    }
  };

  const [isSideBar, setisSideBar] = useState(false);
  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  return (
    <GoogleOAuthProvider clientId={googleClientID}>

    <div className="pageWrapper">
      {/* {message && <MsgPopup msg={message} />} */}
      {/*Header*/}
      <Header toggleMenu={toggleMobileMenu} />
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      {/*End Mobile Menu*/}
      {/*Body Content*/}
      <div id="page-content ">
        {/*Page Title*/}
        <div className="page section-header text-center page-margin-less">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Login</h1>
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

              {error && <ErrorPopup key={errorKey} error={error} />}

              <div className="mb-4">
                <form
                  onSubmit={handleLoginSubmit}
                  // method="post"
                  // action="#"
                  id="CustomerLoginForm"
                  className="contact-form"
                >
                  <div className="row">
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
                      <input
                        type="submit"
                        className="btn mb-3"
                        defaultValue="Sign In"
                      />
                      <p className="mb-4">
                        <a href="#" id="RecoverPassword">
                          Forgot your password?
                        </a>{" "}
                        &nbsp; | &nbsp;
                        <a href="/register" id="customer_register_link">
                          Create account
                        </a>
                      </p>
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
    </div>
    </GoogleOAuthProvider>
  );
}
