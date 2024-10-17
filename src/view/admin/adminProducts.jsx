import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
// import Card from "react-bootstrap/Card";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import AdminHeader from "./adminHeader";
import { useHeader } from "../../contexts/admincontexts/headercontext";
import Form from "react-bootstrap/Form";
import { useProduct } from "../../contexts/Productcontext";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/authContext";

// import AllHeaders from "./allheaders";
// import Product from "../../../../backend/model/Product";

export const AdminProducts = () => {
  const { topics, settopics, parentheaders, setparentheaders } = useHeader();
  const { AllProduct, setProduct } = useProduct();
  const [activeMenu, setactiveMenu] = useState({});
  const toggleSubMenu = (id) => {
    setactiveMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const { userAuth } = useUser();

  const [checkedCategoryContents, setCheckedCategoryContents] = useState({});
  const [checkedtopicContents, setCheckedtopicContents] = useState({});

  const [product, setProductUpload] = useState({
    name: "",
    description: "",
    detail: "",
    Images: [
      {
        url: "",
        isPrimary: false,
      },
    ],
    currentprice: "",
    original: "",
    currentpriceGlobal: "",
    originalGlobal: "",
    GST: "",
    Brand: "",
    Color: "",
    inStock: true,
    isNew_: false,
    isHot: false,
    isSale: false,
    discount: "",
    variants: [
      {
        size: "",
        color: "",
        quantity: "",
      },
    ],
    category: {},
    subCategory: {},
    ProductTags: [],
    relatedProducts: [],
  });

  const handleCheckboxChange = (key, content, isChecked) => {
    const formattedKey = key.replace(/\s+/g, "-");

    setProductUpload((prevState) => ({
      ...prevState,
      category: {
        ...prevState.category,
        [formattedKey]: isChecked ? content : undefined,
      },
    }));
  };
  const handleCheckboxtopicChange = (key, content, isChecked) => {
    const formattedKey = key.replace(/\s+/g, "-");

    setProductUpload((prevState) => ({
      ...prevState,
      subCategory: {
        ...prevState.subCategory,
        [formattedKey]: isChecked ? content : undefined,
      },
    }));

    // console.log(checkedCategoryContents)
    // console.log(checkedtopicContents)
  };
  useEffect(() => {
    console.log("Category", product.category);
    console.log("subCategory", product.subCategory);
  }, [product]);
  // const handleVariants = (e, index) => {
  //   const { name, value, type, checked } = e.target;
  //   const field = name.split(".")[1];

  //   setProductUpload((prevProduct) => {
  //     const newVariants = [...prevProduct.variants];

  //     if (type === "checkbox" && field === "size") {
  //       if (checked) {
  //         if (!newVariants.some((v) => v.size === value)) {
  //           newVariants.push({ size: value, color: "", quantity: "" });
  //         }
  //       } else {
  //         const variantIndex = newVariants.findIndex((v) => v.size === value);
  //         if (variantIndex !== -1) {
  //           newVariants.splice(variantIndex, 1);
  //         }
  //       }
  //     } else {
  //       if (newVariants[index]) {
  //         newVariants[index] = { ...newVariants[index], [field]: value };
  //       } else {
  //         newVariants[index] = {
  //           size: "",
  //           color: "",
  //           quantity: "",
  //           [field]: value,
  //         };
  //       }
  //     }

  //     return { ...prevProduct, variants: newVariants };
  //   });
  // };

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "28A",
    "28B",
    "28C",
    "28D",
    "28DD/E",
    "28DDD/F",
    "30A",
    "30B",
    "30C",
    "30D",
    "30DD/E",
    "30DDD/F",
    "32A",
    "32B",
    "32C",
    "32D",
    "32DD/E",
    "32DDD/F",
    "34A",
    "34B",
    "34C",
    "34D",
    "34DD/E",
    "34DDD/F",
    "36A",
    "36B",
    "36C",
    "36D",
    "36DD/E",
    "36DDD/F",
    "38A",
    "38B",
    "38C",
    "38D",
    "38DD/E",
    "38DDD/F",
    "40A",
    "40B",
    "40C",
    "40D",
    "40DD/E",
    "40DDD/F",
    "42A",
    "42B",
    "42C",
    "42D",
    "42DD/E",
    "42DDD/F",
  ];

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setProductUpload({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProductUpload({
      ...product,
      variants: [...product.variants, { size: "", quantity: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in submit ");

    try {
      const response = await axios.post("http://localhost:5500/api/products", {
        ...product,
      });
      console.log(response.data);

      setProductUpload({
        name: "",
        description: "",
        detail: "",
        Images: [
          {
            url: "",
            isPrimary: false,
          },
        ],
        currentprice: "",
        original: "",
        currentpriceGlobal: "",
        originalGlobal: "",
        GST: "",
        Brand: "",
        Color: "",
        inStock: true,
        isNew_: false,
        isHot: false,
        isSale: false,
        discount: "",
        variants: [
          {
            size: "",
            color: "",
            quantity: "",
          },
        ],
        category: {},
        subCategory: {},
        ProductTags: [],
        relatedProducts: {},
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [file, setfile] = useState();
  // const [image, setimage] = useState();

  const handleFile = async (e, imageType) => {
    console.log("in handlefile");
    const submittedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", submittedFile);

    try {
      console.log("in posting");
      const response = await axios.post(
        "http://localhost:5500/admin/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response.data.url", response.data.url);
      const imgurl = response.data.url;
      console.log("Image url", imgurl);

      setProductUpload((prevProduct) => {
        const newImages = [...prevProduct.Images];

        if (imageType === "mainImage") {
          // Set the first image as primary
          newImages[0] = { url: imgurl, isPrimary: true };
        } else {
          // Add new image to the array
          newImages.push({ url: imgurl, isPrimary: false });
        }

        return {
          ...prevProduct,
          Images: newImages,
        };
      });

      console.log("Updated product state:", product);
    } catch (error) {
      console.log(error);
    }
  };
  const TreatTags = (e) => {
    const StringValues = e.target.value;
    const ArrayValues = StringValues.split(",");
    setProductUpload({
      ...product,
      ProductTags: ArrayValues,
    });
  };
  const handleRelatedProducts = (e, productRelated) => {
    if (e.target.checked) {
      setProductUpload({
        ...product,
        relatedProducts: [...product.relatedProducts, productRelated],
      });
    } else {
      setProductUpload({
        ...product,
        relatedProducts: [],
      });
    }
  };

  const formatPrice = (price) => {
    if (userAuth && userAuth.country === "India") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  useEffect(() => {
    console.log("Product", product);
  }, [product]);

  return (
    <div className="app-wrapper">
      {/* {error && <ErrorPopup error={error} />}
            {message && <MsgPopup msg={message} />} */}
      <AdminHeader />
      {/*End Header*/}
      <div id="page-content ">
        {/*Page Title*/}
        <div className="page section-header text-center page-margin-less">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Customize Products</h1>
            </div>
          </div>
        </div>
        {/*End Page Title*/}
        <div className="container">
          <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="home" title="Products">
              <div className="grid-products grid--view-items">
                <div className="row">
                  {AllProduct &&
                    AllProduct.map((product) => (
                      <div className="col-6 col-sm-6 col-md-3 col-lg-3 item">
                        {/* start product image */}
                        <div className="product-image">
                          <Link to={`/women/product/${product._id}`}>
                            {/* start product image */}
                            {product.Images &&
                              product.Images.filter(
                                (image) => image.isPrimary
                              ).map((image) => (
                                <a href="#">
                                  {/* image */}
                                  <img
                                    className="primary lazyload"
                                    src={image.url}
                                    alt="image"
                                    title="product"
                                  />

                                  <div className="product-labels rectangular">
                                    {product.discount ? (
                                      <span className="lbl on-sale">
                                        -{product.discount}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {product.isNew_ ? (
                                      <span className="lbl pr-label1">new</span>
                                    ) : (
                                      ""
                                    )}
                                    {product.isHot ? (
                                      <span className="lbl pr-label2">Hot</span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  {/* End product label */}
                                </a>
                              ))}
                            {/* countdown end */}
                            {/* Start product button */}

                            {/* end product button */}
                          </Link>
                        </div>
                        {/* end product image */}
                        {/*start product details */}
                        <div className="product-details text-center">
                          <Link to={`/women/product/${product._id}`}>
                            {/* product name */}
                            <div className="product-name">
                              <a href="#">{product.name}</a>
                            </div>
                            {/* End product name */}
                            {/* product price */}
                            <div className="product-price">
                              <span className="old-price">
                                {userAuth?.country === "India"
                                  ? formatPrice(product.original)
                                  : formatPrice(product.originalGlobal)}
                              </span>
                              <span className="price">
                                {userAuth?.country === "India"
                                  ? formatPrice(product.currentprice)
                                  : formatPrice(product.currentpriceGlobal)}
                              </span>
                            </div>
                          </Link>
                          {/* End product price */}

                          {/* End Variant */}
                        </div>
                        {/* countdown end */}
                      </div>
                    ))}
                </div>
              </div>{" "}
            </Tab>
            <Tab eventKey="profile" title="Upload Products">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    <h1 className="page-width">Upload new Product</h1>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                    <div className="mb-4">
                      <form
                        onSubmit={handleSubmit}
                        id="CustomerLoginForm"
                        className="contact-form"
                      >
                        <div className="row">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="CustomerEmail">
                                Product Name
                              </label>
                              <input
                                type="text"
                                placeholder=""
                                className=""
                                autoCorrect="off"
                                autoCapitalize="off"
                                autofocus=""
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={(e) => {
                                  setProductUpload({
                                    ...product,
                                    name: e.target.value,
                                  });
                                }}
                                // value={User.email}
                                // onChange={(e) =>
                                //   setUser({ ...User, email: e.target.value })
                                // }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="description">
                                Short Description
                              </label>
                              <input
                                type="text"
                                defaultValue=""
                                name="description"
                                placeholder=""
                                id="description"
                                className=""
                                value={product.description}
                                onChange={(e) => {
                                  setProductUpload({
                                    ...product,
                                    description: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="detail">
                                More details about product
                              </label>
                              <input
                                type="text"
                                defaultValue=""
                                name="detail"
                                placeholder=""
                                id="detail"
                                className=""
                                value={product.detail}
                                onChange={(e) => {
                                  setProductUpload({
                                    ...product,
                                    detail: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="Brand">Brand</label>
                              <input
                                type="text"
                                defaultValue=""
                                name="Brand"
                                placeholder=""
                                id="Brand"
                                className=""
                                value={product.Brand}
                                onChange={(e) => {
                                  setProductUpload({
                                    ...product,
                                    Brand: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="mainImage">
                                Product Main Image{" "}
                              </label>
                              <input
                                type="file"
                                defaultValue=""
                                name="mainImage"
                                placeholder=""
                                id="mainImage"
                                className=""
                                onChange={(e) => {
                                  console.log("onChange event triggered");

                                  handleFile(e, "mainImage");
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="otherimg">Other Images</label>
                              <input
                                type="file"
                                defaultValue=""
                                name="img1"
                                placeholder=""
                                id="img1"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img1");
                                }}
                              />
                              <input
                                type="file"
                                defaultValue=""
                                name="img2"
                                placeholder=""
                                id="img2"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img2");
                                }}
                              />
                              <input
                                type="file"
                                defaultValue=""
                                name="img3"
                                placeholder=""
                                id="img3"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img3");
                                }}
                              />
                              <input
                                type="file"
                                defaultValue=""
                                name="img4"
                                placeholder=""
                                id="img4"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img4");
                                }}
                              />
                              <input
                                type="file"
                                defaultValue=""
                                name="img5"
                                placeholder=""
                                id="img5"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img5");
                                }}
                              />
                              <input
                                type="file"
                                defaultValue=""
                                name="img6"
                                placeholder=""
                                id="img6"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img6");
                                }}
                              />

                              <input
                                type="file"
                                defaultValue=""
                                name="img7"
                                placeholder=""
                                id="img7"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img7");
                                }}
                              />
                              <input
                                type="file"
                                defaultValue=""
                                name="img8"
                                placeholder=""
                                id="img8"
                                className=""
                                onChange={(e) => {
                                  handleFile(e, "img8");
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="currentpriceGlobal">
                                Current Price in USD (Global){" "}
                                <small>
                                  {" "}
                                  (this price should include all the taxes){" "}
                                </small>
                              </label>
                              <input
                                type="text"
                                name="currentpriceGlobal"
                                id="currentpriceGlobal"
                                value={product.currentpriceGlobal}
                                onChange={(e) =>
                                  setProductUpload({
                                    ...product,
                                    currentpriceGlobal: e.target.value,
                                  })
                                }
                              />

                              <label htmlFor="currentpriceINR">
                                Current Price in INR (India){" "}
                                <small>
                                  {" "}
                                  (this price should include all the taxes){" "}
                                </small>
                              </label>
                              <input
                                type="text"
                                name="currentpriceINR"
                                id="currentpriceINR"
                                value={product.currentprice}
                                onChange={(e) =>
                                  setProductUpload({
                                    ...product,
                                    currentprice: e.target.value,
                                  })
                                }
                              />

                              <br />
                              <br />
                              <br />

                              <label htmlFor="originalGlobal">
                                Original Price in USD
                                <small>
                                  (this price will be shown as cancelled to the
                                  user)
                                </small>
                              </label>
                              <input
                                type="text"
                                name="originalGlobal"
                                id="originalGlobal"
                                value={product.originalGlobal}
                                onChange={(e) =>
                                  setProductUpload({
                                    ...product,
                                    originalGlobal: e.target.value,
                                  })
                                }
                              />

                              <label htmlFor="originalINR">
                                Original Price in INR{" "}
                                <small>
                                  (this price will be shown as cancelled to the
                                  user)
                                </small>
                              </label>
                              <input
                                type="text"
                                name="originalINR"
                                id="originalINR"
                                value={product.original}
                                onChange={(e) =>
                                  setProductUpload({
                                    ...product,
                                    original: e.target.value,
                                  })
                                }
                              />

                              <label htmlFor="GST">
                                Separate GST{" "}
                                <small>
                                  (Enter this if the product has separate GST
                                  rate from default)
                                </small>
                              </label>
                              <input
                                type="text"
                                name="GST"
                                id="GST"
                                value={product.GST}
                                onChange={(e) =>
                                  setProductUpload({
                                    ...product,
                                    GST: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="size">Variants</label>
                              {product.variants.map((variant, index) => (
                                <div key={index}>
                                  <select
                                    value={variant.size}
                                    onChange={(e) =>
                                      handleVariantChange(
                                        index,
                                        "size",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <br />
                                    <br />
                                    <option value="">Select Size</option>
                                    <br />
                                    <br />
                                    {sizes.map((size) => (
                                      <option key={size} value={size}>
                                        {size}
                                      </option>
                                    ))}
                                  </select>
                                  <br />
                                  <br />
                                  <input
                                    type="number"
                                    value={variant.quantity}
                                    onChange={(e) =>
                                      handleVariantChange(
                                        index,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Quantity"
                                  />
                                  <br />
                                  <br />
                                </div>
                              ))}
                              <button type="button" onClick={addVariant}>
                                Add Variant
                              </button>
                            </div>
                          </div>

                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="Brand">
                                Color of the Product{" "}
                              </label>
                              <input
                                type="text"
                                defaultValue=""
                                name="Color"
                                placeholder=""
                                id="Color"
                                className=""
                                value={product.Color}
                                onChange={(e) => {
                                  setProductUpload({
                                    ...product,
                                    Color: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name={`new`}
                                // value={product.inStock}
                                onChange={(e) =>
                                  setProductUpload((prevState) => ({
                                    ...prevState,
                                    isNew_: e.target.checked,
                                  }))
                                }
                              />
                              <label htmlFor="new">Set New tag</label>
                            </div>
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name={`Hot`}
                                // value={product.inStock}
                                onChange={(e) =>
                                  setProductUpload((prevState) => ({
                                    ...prevState,
                                    isHot: e.target.checked,
                                  }))
                                }
                              />
                              <label htmlFor="new">Set Hot tag</label>
                            </div>
                            <div className="form-group">
                              <input
                                type="checkbox"
                                name={`Sale`}
                                // value={product.inStock}
                                onChange={(e) =>
                                  setProductUpload((prevState) => ({
                                    ...prevState,
                                    isSale: e.target.checked,
                                  }))
                                }
                              />
                              <label htmlFor="new">Set Sale tag</label>
                            </div>
                          </div>

                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="mrp">
                                Set Offer{" "}
                                <small>
                                  {" "}
                                  (for eg: DIwali Sale , christmas sale ){" "}
                                </small>{" "}
                              </label>
                              <input
                                type="text"
                                defaultValue=""
                                name="discount"
                                placeholder=""
                                id="discount"
                                className=""
                                value={product.discount}
                                onChange={(e) =>
                                  setProductUpload({
                                    ...product,
                                    discount: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                              <label htmlFor="mrp">
                                Product Tags{" "}
                                <small>(each seperated by comma)</small>
                              </label>
                              <input
                                type="text"
                                name="tags"
                                placeholder=""
                                id="tags"
                                className=""
                                value={product.ProductTags}
                                onChange={(e) => TreatTags(e)}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <li className="lvl1 parent megamenu">
                              {parentheaders &&
                                parentheaders.map((parentheader, index) => (
                                  <>
                                    <input
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          parentheader.key,
                                          parentheader.content,
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <a
                                      onClick={() =>
                                        toggleSubMenu(parentheader.key)
                                      }
                                    >
                                      <Form.Group className="mb-3">
                                        <Form.Control
                                          type="text"
                                          placeholder={`${parentheader.content}`}
                                          aria-label="Disabled input example"
                                          disabled
                                        />
                                        <i className="anm anm-angle-down-l" />
                                      </Form.Group>
                                    </a>
                                    <div className={`megamenu style4 `}>
                                      <ul
                                        className={`grid grid--uniform mmWrapper ${
                                          activeMenu[parentheader.key]
                                            ? "d-block"
                                            : "d-none"
                                        }`}
                                      >
                                        {topics &&
                                          topics
                                            .filter((topic) => {
                                              if (
                                                topic.ParentHeaderName &&
                                                Array.isArray(
                                                  topic.ParentHeaderName
                                                )
                                              ) {
                                                return (
                                                  topic.ParentHeaderName[0] ===
                                                    parentheader.key ||
                                                  topic.ParentHeaderName[1] ===
                                                    parentheader.key
                                                );
                                              }
                                            })
                                            .map((topic, topicIndex) => (
                                              <li
                                                key={topic.key || topicIndex}
                                                className="grid__item lvl-1 col-md-3 col-lg-3"
                                              >
                                                <input
                                                  type="checkbox"
                                                  onChange={(e) =>
                                                    handleCheckboxtopicChange(
                                                      topic.key,
                                                      topic.content,
                                                      e.target.checked
                                                    )
                                                  }
                                                />
                                                <a className="site-nav lvl-1">
                                                  <Form.Group className="mb-3">
                                                    <Form.Control
                                                      type="text"
                                                      placeholder={`${topic.content}`}
                                                      aria-label="Disabled input example"
                                                      disabled
                                                    />
                                                  </Form.Group>
                                                </a>
                                              </li>
                                            ))}
                                      </ul>
                                    </div>
                                  </>
                                ))}
                            </li>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <li className="lvl1 parent megamenu">
                              <div className="form-group">
                                <label htmlFor="Stock">
                                  Set Related Products{" "}
                                  <small>
                                    (on tick the products will be recommended
                                    below this product)
                                  </small>
                                </label>
                                <div className="grid-products grid--view-items">
                                  <div className="row">
                                    {AllProduct &&
                                      AllProduct.map((product) => (
                                        <div className="col-6 col-sm-6 col-md-3 col-lg-3 item">
                                          <input
                                            type="checkbox"
                                            name={`related`}
                                            onChange={(e) =>
                                              handleRelatedProducts(e, product)
                                            }
                                          />
                                          {/* start product image */}
                                          <div className="product-image">
                                            <Link
                                              to={`/women/product/${product._id}`}
                                            >
                                              {/* start product image */}
                                              {product.Images &&
                                                product.Images.filter(
                                                  (image) => image.isPrimary
                                                ).map((image) => (
                                                  <a href="#">
                                                    {/* image */}
                                                    <img
                                                      className="primary lazyload"
                                                      src={image.url}
                                                      alt="image"
                                                      title="product"
                                                    />

                                                    <div className="product-labels rectangular">
                                                      {product.discount ? (
                                                        <span className="lbl on-sale">
                                                          -{product.discount}
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {product.isNew_ ? (
                                                        <span className="lbl pr-label1">
                                                          new
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {product.isHot ? (
                                                        <span className="lbl pr-label2">
                                                          Hot
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>
                                                    {/* End product label */}
                                                  </a>
                                                ))}
                                              {/* end product image */}
                                              {/* countdown start */}
                                              <div
                                                className="saleTime desktop"
                                                data-countdown="2022/03/01"
                                              />
                                              {/* countdown end */}
                                              {/* Start product button */}

                                              <div className="button-set"></div>
                                              {/* end product button */}
                                            </Link>
                                          </div>
                                          {/* end product image */}
                                          {/*start product details */}
                                          <div className="product-details text-center">
                                            <Link
                                              to={`/women/product/${product._id}`}
                                            >
                                              {/* product name */}
                                              <div className="product-name">
                                                <a href="#">{product.name}</a>
                                              </div>
                                              {/* End product name */}
                                              {/* product price */}
                                              <div className="product-price">
                                                <span className="old-price">
                                                  {userAuth?.country === "India"
                                                    ? formatPrice(
                                                        product.original
                                                      )
                                                    : formatPrice(
                                                        product.originalGlobal
                                                      )}
                                                </span>
                                                <span className="price">
                                                  {userAuth?.country === "India"
                                                    ? formatPrice(
                                                        product.currentprice
                                                      )
                                                    : formatPrice(
                                                        product.currentpriceGlobal
                                                      )}
                                                </span>
                                              </div>
                                            </Link>
                                            {/* End product price */}

                                            {/* End Variant */}
                                          </div>
                                          {/* End product details */}
                                          {/* countdown start */}
                                          <div className="timermobile">
                                            <div
                                              className="saleTime desktop"
                                              data-countdown="2022/03/01"
                                            />
                                          </div>
                                          {/* countdown end */}
                                        </div>
                                      ))}
                                  </div>
                                </div>{" "}
                              </div>
                            </li>
                          </div>
                        </div>
                        <div className="row">
                          <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                            <input
                              type="submit"
                              className="btn mb-3"
                              defaultValue="Sign In"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="longer-tab" title="Edit">
              Tab content for Loooonger Tab
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
