import React, { useMemo, useEffect } from "react";

export function ProductPrice({ product, userAuth, Info, updateGstTotal }) {
  const calculatePrice = (price, Info) => {
    let gstamt;
    if (price > Info?.priceGST) {
      gstamt = (Info.defaultGST / 100) * price;
    } else {
      gstamt = (Info?.GST1000 / 100) * price;
    }
    return { formattedPrice: formatPrice(price), gstAmount: gstamt.toFixed(2) };
  };
  const formatPrice = (price) => {
    if (userAuth && userAuth?.country === "India") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    }
    const amt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
    return amt;
  };

  const { formattedPrice, gstAmount } = useMemo(() => {
    const price =
      userAuth?.country === "India"
        ? product.Product.currentprice
        : product.Product.currentpriceGlobal;
    return calculatePrice(price, Info);
  }, [product, userAuth, Info]);

  useEffect(() => {
    updateGstTotal(parseFloat(gstAmount));
    console.log("gst total and updated",gstAmount,",",updateGstTotal );
  }, [gstAmount, updateGstTotal]);

  return (
    <div className="col-12 col-sm-6 my-auto text-sm-right text-left">
      <h6 className="mb-0">{formattedPrice}</h6>
    </div>
  );
}
