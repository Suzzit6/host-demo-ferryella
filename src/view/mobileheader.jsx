import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { DynamicContent } from "../components/DynamicContent";

export default function MobileHeader({ isOpen, toggleMenu }) {
  const [activeMenu, setactiveMenu] = useState({});

  const toggleSubMenu = (id) => {
    console.log(activeMenu);
    setactiveMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <div
      className={`mobile-nav-wrapper ${isOpen ? "active" : ""}`}
      role="navigation"
    >
      <div className="closemobileMenu" onClick={toggleMenu}>
        <i className="icon anm anm-times-l pull-right" /> Close Menu
      </div>
      <ul id="MobileNav" className="mobile-nav">
        <li className="lvl1 parent megamenu">
          <a href="#" onClick={() => toggleSubMenu("collections")}>
            Collections <i className="anm anm-angle-down-l" />
          </a>
          <div className={`megamenu style4 `}>
            <ul
              className={`grid grid--uniform mmWrapper ${
                activeMenu["collections"] ? "d-block" : "d-none"
              }`}
            >
              <li className={`grid__item lvl-1 col-md-3 col-lg-3`}>
                <Link
                  to="/women/collections/Underwear"
                  className="site-nav lvl-1"
                >
                  <DynamicContent id="Underwear" parent="collections" />
                </Link>
                <ul className={`subLinks d-block`}>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/EverdayBras"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Everyday Bras" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Specialty-and-Fashion-Bras"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent
                        id="Specialty and Fashion Bras"
                        parent="collections"
                      />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Panties"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Panties" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Lingerie-Sets"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Lingerie Sets" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Shapewear"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Shapewear" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Swimwear"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Swimwear" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/One-Piece-Swimsuits"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent
                        id="One-Piece Swimsuits"
                        parent="collections"
                      />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Bikinis"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Bikinis" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Tankinis"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Tankinis" parent="collections" />
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="grid__item lvl-1 col-md-3 col-lg-3">
                <Link
                  to="/women/collections/Luxury-and-Designer-Collections"
                  className="site-nav lvl-1"
                >
                  <DynamicContent
                    id="Luxury and Designer Collections"
                    parent="collections"
                  />
                </Link>
                <ul className="subLinks d-block">
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
                      <DynamicContent id="Monokinis" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Nightwear"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Nightwear" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Pajama-Sets"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Pajama Sets" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Nightgowns"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Nightgowns" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Activewear"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Activewear" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Yoga-Pants"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Yoga Pants" parent="collections" />
                      <span className="lbl nm_label2">Sale</span>
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Sports-Bras"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Sports Bras" parent="collections" />
                    </Link>
                  </li>
                  <li className="lvl-2">
                    <Link
                      to="/women/collections/Beachwear"
                      className="site-nav lvl-2"
                    >
                      <DynamicContent id="Beachwear" parent="collections" />
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
            </ul>
          </div>
        </li>
        <li className="lvl1 parent megamenu">
          <a  onClick={() => toggleSubMenu("Underwears")}>
            Underwears <i className="anm anm-angle-down-l" />
          </a>
          <div className={`megamenu style2`}>
            <ul
              className={`grid mmWrapper ${
                activeMenu["Underwears"] ? "d-block" : "d-none"
              }`}
            >
              <li className={`grid__item one-whole`}>
                <ul className={`grid  d-block`}>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3 d-block ">
                    <a className="site-nav lvl-1">
                      <DynamicContent id="Everyday Bras" parent="underwears"/>
                    </a>
                    <ul className="subLinks d-block">
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
                    <a href="#" className="site-nav lvl-1">
                    <DynamicContent id="Specialty-&-Fashion Bras" parent="underwears" />
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Push-Up Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Sports Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Bralette
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Strapless Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Balconette Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Underwire Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Plunge Bra <span className="lbl nm_label1">New</span>
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Demi Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Maternity/Nursing Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Shelf Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Padded Bra
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Mastectomy Bra
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Intimates and Accessories
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Garters and Garter Belts
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Stockings and Hosiery
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Adhesive Bras
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Bra Inserts/Pads
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Silicone Nipple Covers
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Body Tape
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lingerie Wash Bags
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lingerie Drawer Organizers
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Panties
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Thong
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          G-String
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Bikini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Briefs
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          High-Waist Briefs
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Boyshorts <span className="lbl nm_label1">New</span>
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Hipster
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Cheeky
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Tanga
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Control Briefs
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          French-Cut
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Seamless Panties
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Period Panties
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
          <a href="#" onClick={() => toggleSubMenu("Nightwears")}>
            Nightwears <i className="anm anm-angle-down-l" />
          </a>
          <div className="megamenu style2">
            <ul
              className={`grid mmWrapper ${
                activeMenu["Nightwears"] ? "d-block" : "d-none"
              }`}
            >
              <li className="grid__item one-whole">
                <ul className={`grid  d-block`}>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Seasonal &amp; Occasion Wear
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Bridal Lingerie
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Bridal Sets
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Honeymoon Lingerie
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Holiday Lingerie
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Seasonal Collections
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Spring Collection
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Summer Collection
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Autumn Collection
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Winter Collection
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Loungewear
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lounge Tops
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lounge Pants
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lounge Shorts
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Pajama Sets
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Shorts Sets
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lounge Pants
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Pants Sets
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Nightgowns
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Short Nightgowns
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Long Nightgowns
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Sleep Wears
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Cotton Sleep Shorts
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Silk Sleep Shorts
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Standard Sleep Shirts
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Long Sleep Shirts
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Standard Sleep Rompers
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-fullwidth.php" className="site-nav lvl-2">
                          Lace Sleep Rompers
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
          <a href="#" onClick={() => toggleSubMenu("Swimwear")}>
            Swimwear &amp; Beachwear
            <i className="anm anm-angle-down-l" />
          </a>
          <div className="megamenu style2">
            <ul
              className={`grid mmWrapper ${
                activeMenu["Swimwear"] ? "d-block" : "d-none"
              }`}
            >
              <li className="grid__item one-whole">
                <ul className={`grid  d-block`}>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Swimsuits
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Classic One-Piece
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Sporty One-Piece
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Cut-Out One-Piece
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Triangle Bikini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Halter Bikini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Bandeau Bikini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          High-Waisted Bikini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Standard Tankini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Long Tankini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Classic Monokini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Cut-Out Monokini
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Standard Swim Dress
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-3.html" className="site-nav lvl-2">
                          Skirted Swim Dress
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Product Features
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Rash Guards
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Short-Sleeve Rash Guards
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Long-Sleeve Rash Guards
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Swim Shorts
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Board Shorts{" "}
                          <span className="lbl nm_label3">Hot</span>
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Bikini Shorts{" "}
                          <span className="lbl nm_label1">New</span>
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Sport Swimsuits
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Competitive Swimsuits
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Water Sports Swimsuits
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="grid__item lvl-1 col-md-3 col-lg-3">
                    <a href="#" className="site-nav lvl-1">
                      Beach Accessories
                    </a>
                    <ul className="subLinks d-block">
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Sarongs
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Kaftans
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Beach Dresses
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Beach Hats
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Beach Bags
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Sunglasses
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Sandals and Footwear
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Flip-Flops
                        </a>
                      </li>
                      <li className="lvl-2">
                        <a href="shop-grid-4.html" className="site-nav lvl-2">
                          Sandals
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* <li class="grid__item lvl-1 col-md-3 col-lg-3"><a href="#" class="site-nav lvl-1">Product Features</a>
                                      <ul class="subLinks d-block">
                                          <li class="lvl-2"><a href="product-accordion.html" class="site-nav lvl-2">Product Accordion</a></li>
                                          <li class="lvl-2"><a href="product-pre-orders.html" class="site-nav lvl-2">Product Pre-orders <span class="lbl nm_label1">New</span></a></li>
                                          <li class="lvl-2"><a href="product-labels-detail.html" class="site-nav lvl-2">Product Labels</a></li>
                                          <li class="lvl-2"><a href="product-discount.html" class="site-nav lvl-2">Product Discount In %</a></li>
                                          <li class="lvl-2"><a href="product-shipping-message.html" class="site-nav lvl-2">Product Shipping Message</a></li>
                                          <li class="lvl-2"><a href="size-guide.html" class="site-nav lvl-2">Size Guide <span class="lbl nm_label1">New</span></a></li>
                                      </ul>
                                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li className="lvl1 parent megamenu">
          <a href="#" onClick={() => toggleSubMenu("Vacation")}>
            Holiday Shop <i className="anm anm-angle-down-l" />
          </a>
          <div className="megamenu style4">
            <ul
              className={`grid grid--uniform mmWrapper  ${
                activeMenu["Vacation"] ? "d-block" : "d-none"
              }`}
            >
              <li className="grid__item lvl-1 col-md-3 col-lg-3">
                <a href="#" className="site-nav lvl-1">
                  Vacation Wear
                </a>
                <ul className="subLinks d-block">
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Tropical Vacation Wear
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Beach Accessories
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Tropical Swimwear
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Tropical Cover-Ups
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Ski Vacation Wear
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Thermal Underwear
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Thermal Leggings
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Bikinis
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Tankinis
                    </a>
                  </li>
                </ul>
              </li>
              <li className="grid__item lvl-1 col-md-3 col-lg-3">
                <a href="#" className="site-nav lvl-1">
                  Seasonal Collections
                </a>
                <ul className="subLinks d-block">
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Seasonal and Special Occasion Wear{" "}
                      <span className="lbl nm_label1">New</span>
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Spring Collection
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Spring Lingerie
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Spring Nightwear
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Summer Collection
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Summer Swimwear
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Summer Loungewear{" "}
                      <span className="lbl nm_label2">Sale</span>
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Autumn Collection
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Winter Collection
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Winter Lingerie
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Intimates and Accessories{" "}
                      <span className="lbl nm_label1">New</span>
                    </a>
                  </li>
                </ul>
                <ul className="subLinks d-block">
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Special Occasion Wear{" "}
                      <span className="lbl nm_label1">New</span>
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Bridal Lingerie
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Bridal Sets
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Honeymoon Lingerie
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Holiday Lingerie
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Valentine’s Day Lingerie
                    </a>
                  </li>
                </ul>
              </li>
              <li className="grid__item lvl-1 col-md-6 col-lg-6">
                <a href="#">
                  <img src="/assets/images/holiday_header.jpg" alt="" title="" />
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="lvl1 parent dropdown">
          <a href="#">Blog</a>
          {/* <ul class="dropdown">
                      <li><a href="blog-left-sidebar.html" class="site-nav">Left Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html" class="site-nav">Right Sidebar</a></li>
                      <li><a href="blog-fullwidth.html" class="site-nav">Fullwidth</a></li>
                      <li><a href="blog-grid-view.html" class="site-nav">Gridview</a></li>
                      <li><a href="blog-article.html" class="site-nav">Article</a></li>
                  </ul> */}
        </li>
        <li className="lvl1 parent megamenu">
          <a href="#" onClick={() => toggleSubMenu("Sale")}>
            Sale <i className="anm anm-angle-down-l" />
          </a>
          <div className="megamenu style4">
            <ul
              className={`grid grid--uniform mmWrapper ${
                activeMenu["Sale"] ? "d-block" : "d-none"
              }`}
            >
              <li className="grid__item lvl-1 col-md-3 col-lg-3 ">
                <a href="#" className="site-nav lvl-1">
                  Underwear and Intimates Sale
                </a>
                <ul className="subLinks d-block">
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Underwear and Intimates Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Bras on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Panties on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Lingerie Sets on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Shapewear on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Intimates and Accessories on Sale
                    </a>
                  </li>
                </ul>
              </li>
              <li className="grid__item lvl-1 col-md-3 col-lg-3">
                <a href="#" className="site-nav lvl-1">
                  Swimwear, Nightwear, and Activewear Sale
                </a>
                <ul className="subLinks d-block">
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Swimwear and Beachwear Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Swimsuits on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Cover-Ups on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Beach Accessories on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Activewear on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Nightwear and Loungewear Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Pajama Sets on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Nightgowns on Sale
                    </a>
                  </li>
                  <li className="lvl-2">
                    <a href="shop-fullwidth.php" className="site-nav lvl-2">
                      Loungewear on Sale
                    </a>
                  </li>
                </ul>
              </li>
              <li className="grid__item lvl-1 col-md-6 col-lg-6">
                <a href="#">
                  <img src="assets/images/sale.jpg" alt="" title="" />
                </a>
              </li>
            </ul>
          </div>
        </li>
        {/* <li class="lvl1"><a href="#"><b>Buy Now!</b> <i class="anm anm-angle-down-l"></i></a></li> */}
      </ul>
      <div className="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-block d-lg-block">
        <div className="text-center">
          <Link to={"/"}>
            {" "}
            <a href="/">
              <img
                src="/assets/images/logo2.png"
                alt="Ferryella"
                title="Ferryella"
                height={75}
                width={136}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
