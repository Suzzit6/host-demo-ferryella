import React from "react";
import { useEffect, useState } from "react";
import AdminHeader from "./adminHeader";
import "../../assets/css/portal.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useHeader } from "../../contexts/admincontexts/headercontext";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import {
  debouncedFetchCartData,
  fetchCartData,
  removeFromCart,
  removeFromCartAsync,
} from "../../app/cartSlice.js";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export function Orders() {
  // const userCart = useSelector((state) => state.cart);
  const [Orders, setOrders] = useState();
  const [isDisabled, setisDisabled] = useState(true);
  const [Useredited, setUseredited] = useState({
    genGST: null,
    GST1000: null,
    price: null,
  });
  const [PendingOrders, setPendingOrders] = useState();
  const [AcceptedOrders, setAcceptedOrders] = useState();
  const [DispatchedOrders, setDispatchedOrders] = useState();
  const [ShippedOrders, setShippedOrders] = useState();
  const [DeliveredOrders, setDeliveredOrders] = useState();
  useEffect(() => {
    console.log("Useredited", Useredited);
  }, [Useredited]);
  const [activetab, setactivetab] = useState("tab1");
  const [isSideBar, setisSideBar] = useState(false);
  // const { setLoading } = useLoader();

  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };

  const handletabchange = (tab) => {
    // useEffect(() => {
    setactivetab(tab);

    // }, [activetab]);
  };

  const handleditdetails = async (e) => {
    e.preventDefault();
    setisDisabled(false);
  };
  const handleOrderGet = async (e) => {
    const response = await axios.get("http://localhost:5500/api/get-orders");
    setOrders(response.data.orders);
    console.log("orders ", response.data.orders);
  };

  useEffect(() => {
    handleOrderGet();
  }, []);

  useEffect(() => {
    console.log("orders", Orders);
    if (Orders) {
      // const pendingOrderss = Orders.filter(
      //   (orderObject) => orderObject.Order?.OrderedItems?
      // );
      const pendingOrders = Orders?.filter((orderObject) =>
        orderObject.Order?.OrderedItems?.some(
          (item) => item.orderstatus === "pending"
        )
      );
      console.log("pendingOrderedItems", pendingOrders);
      setPendingOrders(pendingOrders);
    }
  }, [Orders]);

  useEffect(() => {
    console.log("Orders", Orders);
    if (Orders) {
      const acceptedOrders = Orders?.filter((orderObject) =>
        orderObject.Order?.OrderedItems?.some(
          (item) => item.orderstatus === "accepted"
        )
      );
      console.log("acceptedOrders", acceptedOrders);
      setAcceptedOrders(acceptedOrders);
    }
  }, [PendingOrders]);
  useEffect(() => {
    console.log("Orders", Orders);
    if (Orders) {
      const dispatchedOrders = Orders?.filter((orderObject) =>
        orderObject.Order?.OrderedItems?.some(
          (item) => item.orderstatus === "dispatched"
        )
      );
      console.log("dispatchedOrders", dispatchedOrders);
      setDispatchedOrders(dispatchedOrders);
    }
  }, [AcceptedOrders, PendingOrders]);

  useEffect(() => {
    console.log("Orders", Orders);
    if (Orders) {
      const shippedorders = Orders?.filter((orderObject) =>
        orderObject.Order?.OrderedItems?.some(
          (item) => item.orderstatus === "shipped"
        )
      );
      console.log("shippedorders", shippedorders);
      setShippedOrders(shippedorders);
    }
  }, [DispatchedOrders, AcceptedOrders, Orders]);

  useEffect(() => {
    console.log("Orders", Orders);
    if (Orders) {
      const deliveredorders = Orders?.filter((orderObject) =>
        orderObject.Order?.OrderedItems?.some(
          (item) => item.orderstatus === "delivered"
        )
      );
      console.log("deliveredorders", deliveredorders);
      setDeliveredOrders(deliveredorders);
    }
  }, [ShippedOrders, DispatchedOrders, AcceptedOrders, Orders]);

  useEffect(() => {
    console.log("Orders", Orders);
    if (Orders) {
      const cancelledorders = Orders?.filter((orderObject) =>
        orderObject.Order?.OrderedItems?.some(
          (item) => item.orderstatus === "cancelled"
        )
      );
      console.log("cancelledorders", cancelledorders);
      setDeliveredOrders(cancelledorders);
    }
  }, [ShippedOrders, DispatchedOrders, AcceptedOrders, Orders]);

  const handleAcceptOrder = async (order, productid, size, paymentId) => {
    const userConfirmed = window.confirm("Do you want to proceed?");
    try {
      if (userConfirmed) {
        console.log(order);
        const response = await axios.post(
          "http://localhost:5500/api/orders/accept-order",
          { order, productid, size, paymentId }
        );
        console.log("response", response);
      } else {
        console.log("No");
      }
    } catch (error) {
      console.log("error in acceot order", error);
    }
  };
  const handleDispatchOrder = async (order, productid, size, paymentId) => {
    const userConfirmed = window.confirm("Do you want to proceed?");
    try {
      if (userConfirmed) {
        console.log(order);
        const response = await axios.post(
          "http://localhost:5500/api/orders/dispatch-order",
          { order, productid, size, paymentId }
        );
        console.log("response in dispatch ", response);
      } else {
        console.log("No");
      }
    } catch (error) {
      console.log("error in dispatch order", error);
    }
  };
  const handleShipOrder = async (order, productid, size, paymentId) => {
    const userConfirmed = window.confirm("Do you want to proceed?");
    try {
      if (userConfirmed) {
        console.log(order);
        const response = await axios.post(
          "http://localhost:5500/api/orders/ship-order",
          { order, productid, size, paymentId }
        );
        console.log("response in ship ", response);
      } else {
        console.log("No");
      }
    } catch (error) {
      console.log("error in ship order", error);
    }
  };
  const handledeliverOrder = async (order, productid, size, paymentId) => {
    const userConfirmed = window.confirm("Do you want to proceed?");
    try {
      if (userConfirmed) {
        console.log(order);
        const response = await axios.post(
          "http://localhost:5500/api/orders/deliver-order",
          { order, productid, size, paymentId }
        );
        console.log("response in deliver ", response);
      } else {
        console.log("No");
      }
    } catch (error) {
      console.log("error in deliver order", error);
    }
  };

  const formatPrice = (price, country) => {
    if (country === "India") {
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

  const handleRejectOrder = async (order, productid, size, paymentId) => {
    const userConfirmed = window.confirm("Do you want to proceed?");
    const orderEmail = order.email;
    console.log("orderEmail", orderEmail);
    try {
      if (userConfirmed) {
        console.log(order);
        const response = await axios.post(
          "http://localhost:5500/api/orders/cancel-order",
          { orderEmail, productid, size, paymentId }
        );
        console.log("response in cancel ", response);
      } else {
        console.log("No");
      }
    } catch (error) {
      console.log("error in cancel order", error);
    }
  };

  return (
    <div className="app-wrapper">
      <AdminHeader />
      {/*End Header*/}
      <div id="page-content ">
        {/*Page Title*/}
        <div className="page section-header text-center page-margin-less">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Orders Control Panel</h1>
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
            <Tab eventKey="profile" title="Pending">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {PendingOrders?.map((order, outerIndex) =>
                    order.Order.OrderedItems.filter(
                      (item) => item.orderstatus === "pending"
                    ).map((product, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        className={`col-12 col-sm-6 col-md-4 mb-4 ${
                          innerIndex > 2 ? "mt-4" : ""
                        }`}
                      >
                        <Card style={{ width: "18rem" }}>
                          {product.Product.Images && (
                            <Card.Img
                              variant="top"
                              src={
                                product.Product.Images.find(
                                  (image) => image.isPrimary
                                )?.url
                              }
                            />
                          )}
                          {/* <Card.Img
                          variant="top"
                          src={"https://ferryella.s3.eu-north-1.amazonaws.com/4c2e0107-ec62-4a5c-86c7-01219abfe598-banner6.jpg"}
                        /> */}
                          <Card.Body>
                            <Card.Title>{product.Product.name}</Card.Title>
                            <Card.Text>
                              product price:
                              {order.Order.country === "India"
                                ? formatPrice(
                                    product.Product.currentprice,
                                    order.Order.country
                                  )
                                : formatPrice(
                                    product.Product.currentpriceGlobal,
                                    order.Order.country
                                  )}{" "}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              {" "}
                              Ordered by: {order.Order.fullname}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              email:{order.Order.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              address : {order.Order.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              city:{order.Order.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              State:{order.Order.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Country:{order.Order.country}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Mobile:{order.Order.mobile}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Secondary Mobile:{order.Order.secondaryMobile}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>product price:{order.Order.country === "India" ? product.Product.currentprice : product.Product.currentpriceGlobal}</ListGroup.Item> */}
                            <ListGroup.Item>
                              quantity:{product.quantity}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Total Paid:{order.Order.TotalAmt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              OrderID:{order.paymentId.slice(-11)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Payment Status :
                              {order.paymentId ? `paid` : "unpaid"}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {`${` paymentId: ${order.paymentId}`}`}{" "}
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link
                              className="pointer"
                              onClick={() =>
                                handleAcceptOrder(
                                  order.Order,
                                  product.Product._id,
                                  product.size,
                                  order.paymentId
                                )
                              }
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Accept Order"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Reject Order"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            {/* <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              
                            </Card.Link> */}
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Tab>

            <Tab eventKey="accepted" title="Accepted">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {AcceptedOrders?.map((order, outerIndex) =>
                    order.Order.OrderedItems.filter(
                      (item) => item.orderstatus === "accepted"
                    ).map((product, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        className={`col-12 col-sm-6 col-md-4 mb-4 ${
                          innerIndex > 2 ? "mt-4" : ""
                        }`}
                      >
                        <Card style={{ width: "18rem" }}>
                          {product.Product.Images && (
                            <Card.Img
                              variant="top"
                              src={
                                product.Product.Images.find(
                                  (image) => image.isPrimary
                                )?.url
                              }
                            />
                          )}
                          {/* <Card.Img
                          variant="top"
                          src={"https://ferryella.s3.eu-north-1.amazonaws.com/4c2e0107-ec62-4a5c-86c7-01219abfe598-banner6.jpg"}
                        /> */}
                          <Card.Body>
                            <Card.Title>{product.Product.name}</Card.Title>
                            <Card.Text>
                              product price:
                              {order.Order.country === "India"
                                ? formatPrice(
                                    product.Product.currentprice,
                                    order.Order.country
                                  )
                                : formatPrice(
                                    product.Product.currentpriceGlobal,
                                    order.Order.country
                                  )}{" "}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              {" "}
                              Ordered by: {order.Order.fullname}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              email:{order.Order.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              address : {order.Order.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              city:{order.Order.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              State:{order.Order.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Country:{order.Order.country}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Mobile:{order.Order.mobile}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Secondary Mobile:{order.Order.secondaryMobile}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>product price:{order.Order.country === "India" ? product.Product.currentprice : product.Product.currentpriceGlobal}</ListGroup.Item> */}
                            <ListGroup.Item>
                              quantity:{product.quantity}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Total Paid:{order.Order.TotalAmt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            OrderID :{order.paymentId.slice(-11)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Payment Status :
                              {order.paymentId ? `paid` : "unpaid"}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {`${` paymentId: ${order.paymentId}`}`}{" "}
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link
                              className="pointer"
                              onClick={() =>
                                handleDispatchOrder(
                                  order.Order,
                                  product.Product._id,
                                  product.size,
                                  order.paymentId
                                )
                              }
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Move Order to Dispatched"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Reject Order"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            {/* <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              
                            </Card.Link> */}
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Tab>
            <Tab eventKey="Dispatched" title="Dispatched">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {DispatchedOrders?.map((order, outerIndex) =>
                    order.Order.OrderedItems.filter(
                      (item) => item.orderstatus === "dispatched"
                    ).map((product, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        className={`col-12 col-sm-6 col-md-4 mb-4 ${
                          innerIndex > 2 ? "mt-4" : ""
                        }`}
                      >
                        <Card style={{ width: "18rem" }}>
                          {product.Product.Images && (
                            <Card.Img
                              variant="top"
                              src={
                                product.Product.Images.find(
                                  (image) => image.isPrimary
                                )?.url
                              }
                            />
                          )}
                          {/* <Card.Img
                          variant="top"
                          src={"https://ferryella.s3.eu-north-1.amazonaws.com/4c2e0107-ec62-4a5c-86c7-01219abfe598-banner6.jpg"}
                        /> */}
                          <Card.Body>
                            <Card.Title>{product.Product.name}</Card.Title>
                            <Card.Text>
                              product price:
                              {order.Order.country === "India"
                                ? formatPrice(
                                    product.Product.currentprice,
                                    order.Order.country
                                  )
                                : formatPrice(
                                    product.Product.currentpriceGlobal,
                                    order.Order.country
                                  )}{" "}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              {" "}
                              Ordered by: {order.Order.fullname}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              email:{order.Order.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              address : {order.Order.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              city:{order.Order.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              State:{order.Order.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Country:{order.Order.country}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Mobile:{order.Order.mobile}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Secondary Mobile:{order.Order.secondaryMobile}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>product price:{order.Order.country === "India" ? product.Product.currentprice : product.Product.currentpriceGlobal}</ListGroup.Item> */}
                            <ListGroup.Item>
                              quantity:{product.quantity}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Total Paid:{order.Order.TotalAmt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            OrderID :{order.paymentId.slice(-11)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Payment Status :
                              {order.paymentId ? `paid` : "unpaid"}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {`${` paymentId: ${order.paymentId}`}`}{" "}
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link
                              className="pointer"
                              onClick={() =>
                                handleShipOrder(
                                  order.Order,
                                  product.Product._id,
                                  product.size,
                                  order.paymentId
                                )
                              }
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Move Order to Shipped"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Reject Order"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            {/* <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              
                            </Card.Link> */}
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Tab>
            <Tab eventKey="Shipped" title="Shipped">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {ShippedOrders?.map((order, outerIndex) =>
                    order.Order.OrderedItems.filter(
                      (item) => item.orderstatus === "shipped"
                    ).map((product, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        className={`col-12 col-sm-6 col-md-4 mb-4 ${
                          innerIndex > 2 ? "mt-4" : ""
                        }`}
                      >
                        <Card style={{ width: "18rem" }}>
                          {product.Product.Images && (
                            <Card.Img
                              variant="top"
                              src={
                                product.Product.Images.find(
                                  (image) => image.isPrimary
                                )?.url
                              }
                            />
                          )}
                          {/* <Card.Img
                          variant="top"
                          src={"https://ferryella.s3.eu-north-1.amazonaws.com/4c2e0107-ec62-4a5c-86c7-01219abfe598-banner6.jpg"}
                        /> */}
                          <Card.Body>
                            <Card.Title>{product.Product.name}</Card.Title>
                            <Card.Text>
                              product price:
                              {order.Order.country === "India"
                                ? formatPrice(
                                    product.Product.currentprice,
                                    order.Order.country
                                  )
                                : formatPrice(
                                    product.Product.currentpriceGlobal,
                                    order.Order.country
                                  )}{" "}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              {" "}
                              Ordered by: {order.Order.fullname}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              email:{order.Order.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              address : {order.Order.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              city:{order.Order.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              State:{order.Order.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Country:{order.Order.country}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Mobile:{order.Order.mobile}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Secondary Mobile:{order.Order.secondaryMobile}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>product price:{order.Order.country === "India" ? product.Product.currentprice : product.Product.currentpriceGlobal}</ListGroup.Item> */}
                            <ListGroup.Item>
                              quantity:{product.quantity}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Total Paid:{order.Order.TotalAmt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            OrderID:{order.paymentId.slice(-11)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Payment Status :
                              {order.paymentId ? `paid` : "unpaid"}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {`${` paymentId: ${order.paymentId}`}`}{" "}
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link
                              className="pointer"
                              onClick={() =>
                                handledeliverOrder(
                                  order.Order,
                                  product.Product._id,
                                  product.size,
                                  order.paymentId
                                )
                              }
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Move Order to Delivered"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Reject Order"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            {/* <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              
                            </Card.Link> */}
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>{" "}
            </Tab>
            <Tab eventKey="Delivered" title="Delivered">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {DeliveredOrders?.map((order, outerIndex) =>
                    order.Order.OrderedItems.filter(
                      (item) => item.orderstatus === "delivered"
                    ).map((product, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        className={`col-12 col-sm-6 col-md-4 mb-4 ${
                          innerIndex > 2 ? "mt-4" : ""
                        }`}
                      >
                        <Card style={{ width: "18rem" }}>
                          {product.Product.Images && (
                            <Card.Img
                              variant="top"
                              src={
                                product.Product.Images.find(
                                  (image) => image.isPrimary
                                )?.url
                              }
                            />
                          )}
                          {/* <Card.Img
                          variant="top"
                          src={"https://ferryella.s3.eu-north-1.amazonaws.com/4c2e0107-ec62-4a5c-86c7-01219abfe598-banner6.jpg"}
                        /> */}
                          <Card.Body>
                            <Card.Title>{product.Product.name}</Card.Title>
                            <Card.Text>
                              product price:
                              {order.Order.country === "India"
                                ? formatPrice(
                                    product.Product.currentprice,
                                    order.Order.country
                                  )
                                : formatPrice(
                                    product.Product.currentpriceGlobal,
                                    order.Order.country
                                  )}{" "}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              {" "}
                              Ordered by: {order.Order.fullname}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              email:{order.Order.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              address : {order.Order.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              city:{order.Order.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              State:{order.Order.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Country:{order.Order.country}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Mobile:{order.Order.mobile}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Secondary Mobile:{order.Order.secondaryMobile}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>product price:{order.Order.country === "India" ? product.Product.currentprice : product.Product.currentpriceGlobal}</ListGroup.Item> */}
                            <ListGroup.Item>
                              quantity:{product.quantity}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Total Paid:{order.Order.TotalAmt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            OrderID:{order.paymentId.slice(-11)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Payment Status :
                              {order.paymentId ? `paid` : "unpaid"}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {`${` paymentId: ${order.paymentId}`}`}{" "}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>{" "}
            </Tab>
            <Tab eventKey="Cancelled" title="Cancelled">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {ShippedOrders?.map((order, outerIndex) =>
                    order.Order.OrderedItems.filter(
                      (item) => item.orderstatus === "shippped"
                    ).map((product, innerIndex) => (
                      <div
                        key={`${outerIndex}-${innerIndex}`}
                        className={`col-12 col-sm-6 col-md-4 mb-4 ${
                          innerIndex > 2 ? "mt-4" : ""
                        }`}
                      >
                        <Card style={{ width: "18rem" }}>
                          {product.Product.Images && (
                            <Card.Img
                              variant="top"
                              src={
                                product.Product.Images.find(
                                  (image) => image.isPrimary
                                )?.url
                              }
                            />
                          )}
                          {/* <Card.Img
                          variant="top"
                          src={"https://ferryella.s3.eu-north-1.amazonaws.com/4c2e0107-ec62-4a5c-86c7-01219abfe598-banner6.jpg"}
                        /> */}
                          <Card.Body>
                            <Card.Title>{product.Product.name}</Card.Title>
                            <Card.Text>
                              product price:
                              {order.Order.country === "India"
                                ? formatPrice(
                                    product.Product.currentprice,
                                    order.Order.country
                                  )
                                : formatPrice(
                                    product.Product.currentpriceGlobal,
                                    order.Order.country
                                  )}{" "}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              {" "}
                              Ordered by: {order.Order.fullname}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              email:{order.Order.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              address : {order.Order.address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              city:{order.Order.city}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              State:{order.Order.state}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Country:{order.Order.country}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Mobile:{order.Order.mobile}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Secondary Mobile:{order.Order.secondaryMobile}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>product price:{order.Order.country === "India" ? product.Product.currentprice : product.Product.currentpriceGlobal}</ListGroup.Item> */}
                            <ListGroup.Item>
                              quantity:{product.quantity}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Total Paid:{order.Order.TotalAmt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            OrderID:{order.paymentId.slice(-11)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Payment Status :
                              {order.paymentId ? `paid` : "unpaid"}{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {`${` paymentId: ${order.paymentId}`}`}{" "}
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link
                              className="pointer"
                              onClick={() =>
                                handledeliverOrder(
                                  order.Order,
                                  product.Product._id,
                                  product.size,
                                  order.paymentId
                                )
                              }
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Move Order to Delivered"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              <div className="row">
                                <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                                  <input
                                    type="submit"
                                    className="btn mb-3"
                                    value={"Reject Order"}
                                  />
                                </div>
                              </div>
                            </Card.Link>
                            {/* <Card.Link
                              className="pointer"
                              onClick={handleRejectOrder}
                            >
                              
                            </Card.Link> */}
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>{" "}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
