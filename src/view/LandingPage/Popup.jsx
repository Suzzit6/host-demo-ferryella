import React, { useState, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

export default function Popup() {
  const [showpopup, setshowpopup] = useState(true);
  const [cookies, setCookie] = useCookies(["visits"]);


  useEffect(() => {
    const visits = cookies.visits > 0 ? parseInt(cookies.visits, 10) : 0;

    // Cookies.set("visits", visits + 1 , {expires:1, path:"/"})
    setCookie("visits", visits + 1, { path: "/" });

    console.log("visits" + visits);
    // console.log(Cookies)

    if (visits === 0 && !cookies.noShowwelcome) {
      setshowpopup(true);
    }
    if (visits > 0) {
      setshowpopup(false);
    }
  }, []);

  const ClosePopUp = () => {
    setshowpopup(false);
  };
  const handleClickOutside = (e) => {
    if (e.target.id === "modalOverly") {
      ClosePopUp();
    }
  };



  return (
    <>
      {showpopup && (
        <div
          id="modalOverly"
          className="modalOverly"
          onClick={handleClickOutside}
        >
          <div
            className="newsletter-wrap"
            id={showpopup ? "popup-container-show" : "popup-container"}
          >
            <div id="popup-window">
              <a className="btn closepopup" onClick={ClosePopUp}>
                <i className="icon icon anm anm-times-l" />
              </a>
              {/* Modal content*/}
              <div className="display-table splash-bg">
                <div className="display-table-cell width40">
                  <img
                    src="assets/images/newsletter-img.jpg"
                    alt="Join Our Mailing List"
                    title="Join Our Mailing List"
                  />{" "}
                </div>
                <div className="display-table-cell width60 text-center">
                  <div className="newsletter-left">
                    <h2>Join Our Mailing List</h2>
                    <p>
                      Sign Up for our exclusive email list and be the first to
                      know about new products and special offers
                    </p>
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
                            id="subscribeBtn"
                          >
                            {" "}
                            <span className="newsletter__submit-text--large">
                              Subscribe
                            </span>{" "}
                          </button>
                        </span>
                      </div>
                    </form>
                    <ul className="list--inline site-footer__social-icons social-icons">
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
                        <a
                          className="social-icons__link"
                          href="#"
                          title="Vimeo"
                        >
                          <i className="fa fa-vimeo" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
