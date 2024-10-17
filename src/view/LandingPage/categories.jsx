import React from "react";
import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div className="categ-products">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 item categ-view-item style2">
          <div className="categ-view_image">
            {/* start product image */}
            <Link to="/women/collections/Beachwear">
            <a href="" className="categ-view-item__link">
              {/* image */}
              <img
                className="categ-view-item__image primary   lazyload"
                data-src="assets/images/collection/categ2.jpg"
                src="assets/images/collection/categ2.jpg"
                alt="image"
                title="product"
                // height={"777px"}
              />
              {/* End image */}
              {/* Hover image */}
              <img
                className="categ-view-item__image hover lazyload"
                data-src="assets/images/collection/fashion.jpg"
                src="assets/images/product-images/product-image1.jpg"
                alt="image"
                title="product"
              />
              <div class="collection-grid-item__title-wrapper">
                <h3 class="collection-grid-item__title btn btn--secondary no-border">
                  Beachwear
                </h3>
              </div>
              {/* End hover image */}
              {/* product label */}
              {/* <div className="product-labels rectangular">
                        <span className="lbl on-sale">-16%</span>{" "}
                        <span className="lbl pr-label1">new</span>
                      </div> */}
              {/* End product label */}
            </a>
            </Link>
            {/* end product image */}
            {/*start product details */}

            {/* Variant */}

            {/* End Variant */}
            {/* End product details */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 item categ-view-item style2">
          <div className="categ-view_image">
            {/* start product image */}
            <Link to={"/women/collections/Nightgowns"}>
            <a href="" className="categ-view-item__link">
              {/* image */}
              <img
                className="categ-view-item__image primary   lazyload"
                data-src="assets/images/collection/categ3.jpg"
                src="assets/images/collection/categ3.jpg"
                alt="image"
                title="product"
                // height={"777px"}
              />
              {/* End image */}
              {/* Hover image */}
              <img
                className="categ-view-item__image hover   lazyload"
                data-src="assets/images/product-images/product-image2-1.jpg"
                src="assets/images/product-images/product-image2-1.jpg"
                alt="image"
                title="product"
              />
              <div class="collection-grid-item__title-wrapper">
                <h3 class="collection-grid-item__title btn btn--secondary no-border">
                  Gowns
                </h3>
              </div>
              {/* End hover image */}
              {/* product label */}

              {/* End product label */}
            </a>
            </Link>
            {/* end product image */}
            {/*start product details */}

            {/* Variant */}

            {/* End Variant */}
            {/* End product details */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 item categ-view-item style2">
          <div className="categ-view_image">
            {/* start product image */}
            <Link to={"/women/collections/Activewear"} >
            <a href="" className="categ-view-item__link">
              {/* image */}
              <img
                className="categ-view-item__image primary   lazyload"
                data-src="assets/images/collection/categ1.jpg"
                src="assets/images/collection/categ1.jpg"
                alt="image"
                title="product"
                // height={"777px"}
              />
              {/* End image */}
              {/* Hover image */}
              <img
                className="categ-view-item__image hover   lazyload"
                data-src="assets/images/product-images/product-image3-1.jpg"
                src="assets/images/product-images/product-image3-1.jpg"
                alt="image"
                title="product"
              />
              <div class="collection-grid-item__title-wrapper">
                <h3 class="collection-grid-item__title btn btn--secondary no-border">
                  ActiveWear
                </h3>
              </div>
              {/* End hover image */}
              {/* product label */}

              {/* End product label */}
            </a>
            </Link>
            {/* end product image */}
            {/*start product details */}

            {/* Variant */}

            {/* End Variant */}
            {/* End product details */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 item categ-view-item style2">
          <div className="categ-view_image">
            {/* start product image */}
            <Link to={"/women/collections/Nightwear"} >
            <a href="" className="categ-view-item__link">
              {/* image */}
              <img
                className="categ-view-item__image primary   lazyload"
                data-src="assets/images/collection/categ2.jpg"
                src="assets/images/collection/categ2.jpg"
                alt="image"
                title="product"
                // height={"777px"}
              />
              {/* End image */}
              {/* Hover image */}
              <img
                className="categ-view-item__image hover   lazyload"
                data-src="assets/images/product-images/product-image5-1.jpg"
                src="assets/images/product-images/product-image5-1.jpg"
                alt="image"
                title="product"
              />
              <div class="collection-grid-item__title-wrapper">
                <h3 class="collection-grid-item__title btn btn--secondary no-border">
                  NightWear
                </h3>
              </div>
              {/* End hover image */}
              {/* product label */}
              {/* <div className="product-labels">
                <span className="lbl on-sale">Sale</span>
              </div> */}
              {/* End product label */}
            </a>
            </Link>
            {/* end product image */}
            {/*start product details */}

            {/* Variant */}

            {/* End Variant */}
            {/* End product details */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 item categ-view-item style2">
          <div className="categ-view_image">
            {/* start product image */}
            <Link to={"/women/collections/EverdayBras"} >
            <a href="" className="categ-view-item__link">
              {/* image */}
              <img
                className="categ-view-item__image primary   lazyload"
                data-src="assets/images/collection/categ1.jpg"
                src="assets/images/collection/categ1.jpg"
                alt="image"
                title="product"
                // height={"777px"}
              />
              {/* End image */}
              {/* Hover image */}
              <img
                className="categ-view-item__image hover   lazyload"
                data-src="assets/images/product-images/product-image5-1.jpg"
                src="assets/images/product-images/product-image5-1.jpg"
                alt="image"
                title="product"
              />
              <div class="collection-grid-item__title-wrapper">
                <h3 class="collection-grid-item__title btn btn--secondary no-border">
                  Padded/Unpaded Bras
                </h3>
              </div>
              {/* End hover image */}
              {/* product label */}
              {/* <div className="product-labels">
                <span className="lbl on-sale">Sale</span>
              </div> */}
              {/* End product label */}
            </a>
            </Link>
            {/* end product image */}
            {/*start product details */}

            {/* Variant */}

            {/* End Variant */}
            {/* End product details */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 item categ-view-item style2">
          <div className="categ-view_image">
            {/* start product image */}
            <Link to={"/women/collections/Lingerie-Sets"} >
            <a href="" className="categ-view-item__link">
              {/* image */}
              <img
                className="categ-view-item__image primary   lazyload"
                data-src="assets/images/collection/categ3.jpg"
                src="assets/images/collection/categ3.jpg"
                alt="image"
                title="product"
                // height={"777px"}
              />
              {/* End image */}
              {/* Hover image */}
              <img
                className="categ-view-item__image hover   lazyload"
                data-src="assets/images/product-images/product-image16-1.jpg"
                src="assets/images/product-images/product-image16-1.jpg"
                alt="image"
                title="product"
              />

              <div class="collection-grid-item__title-wrapper">
                <h3 class="collection-grid-item__title btn btn--secondary no-border">
                  Lingeries
                </h3>
              </div>
              {/* End hover image */}
            </a>
            </Link>
            {/* end product image */}
            {/*start product details */}

            {/* End product details */}
          </div>
        </div>
      </div>
    </div>
  );
}
