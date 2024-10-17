import React, { useState, useEffect } from "react";

import ReactProductSlider from "react-product-slider";
const items = [
  {
    src: "mockImages/slide.jpg",
    alt: "slide",
    thumbnail: "mockImages/thumbnail.jpg",
  },
];
function ProductImageSlider(Product) {
  console.log("Slider prod" , Product)
  const ImageItems = Product.Product.Images.map(imageObj => ({
    src: imageObj.url,
    alt: 'Image',
    thumbnail: imageObj.url
  }));
  console.log(ImageItems)
  return (
      <div className="slider heightslider">
        <ReactProductSlider items={ImageItems} />
      </div>
  );
}
export default ProductImageSlider;