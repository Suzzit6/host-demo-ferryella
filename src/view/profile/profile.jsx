import React from "react";
import { useEffect, useState } from "react";
import MobileHeader from "../mobileheader";
import Header from "../header";
import Footer from "../footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useUser } from "../../contexts/authContext";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useLoader } from "../../contexts/LoaderContext";
import { MyOrders } from "./myorders";
// import { TrackOrder } from "./trackorder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export function profile() {
  const { userAuth, setuserAuth } = useUser();
  const [isDisabled, setisDisabled] = useState(true);
  const [Useredited, setUseredited] = useState({
    fullname: userAuth?.fullname || "",
    email: userAuth?.email || "",
    mobile: userAuth?.mobile || "",
    address: userAuth?.address || "",
    country: userAuth?.country || "",
    state: userAuth?.state || "",
    city: userAuth?.city || "",
    postcode: userAuth?.postcode || "",
  });
  const [TrackPop, setTrackPop] = useState(false);

  const [activetab, setactivetab] = useState("tab1");
  const [isSideBar, setisSideBar] = useState(false);
  const { setLoading } = useLoader();
  const [PopOrder, setPopOrder] = useState([]);
  const [PopOrderId, setPopOrderId] = useState("");

  const toggleMobileMenu = () => {
    setisSideBar(!isSideBar);
  };
  const toggleTrackPop = () => setTrackPop((prev) => !prev);
  // const toggleOrder = () => setPopOrder(userOrder);

  const handletabchange = (tab) => {
    // useEffect(() => {
    setactivetab(tab);

    // }, [activetab]);
  };

  const handleditdetails = async (e) => {
    e.preventDefault();
    setisDisabled(false);
  };

  const handlesubmitdetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log(userAuth)
      console.log("Useredited.email ", Useredited.email);
      const resp = await axios.post("http://localhost:5500/profile", {
        ...Useredited,
      });
      setLoading(false);
      setisDisabled(true);
      window.location.reload(true);
    } catch (error) {
      console.log("error in profile", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(PopOrder);
    console.log("PopOrderId", PopOrderId);
  }, [PopOrder, PopOrderId]);

  return (
    <div className="pageWrapper">
      <Popup
        open={TrackPop}
        onClose={() => setTrackPop(false)}
        position="right center"
      >
        <div className="container pop-container">
          <div className="row">
            <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
              <div className="row justify-content-between">
                {(() => {
                  if (
                    PopOrder &&
                    PopOrder.Order &&
                    PopOrder.Order.OrderedItems
                  ) {
                    const orderedItem = PopOrder.Order.OrderedItems.find(
                      (item) => item.Product._id === PopOrderId
                    );
                    console.log("orderedItem", orderedItem);
                    if (orderedItem) {
                      return (
                        <div className="order-tracking completed">
                          <span className="is-complete" />
                          <p>
                            Ordered
                            <br />
                            <span>{orderedItem.Orderedate}</span>
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div className="order-tracking completed">
                          <span className="is-complete" />
                          <p>
                            Ordered
                            <br />
                            <span>Order details not available</span>
                          </p>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className="order-tracking completed">
                        <span className="is-complete" />
                        <p>
                          Ordered
                          <br />
                          <span>Order details not available</span>
                        </p>
                      </div>
                    );
                  }
                })()}

                {(() => {
                  if (
                    PopOrder &&
                    PopOrder.Order &&
                    PopOrder.Order.OrderedItems
                  ) {
                    const orderedItem = PopOrder.Order.OrderedItems.find(
                      (item) => item.Product._id === PopOrderId
                    );
                    console.log("orderedItem", orderedItem);
                    if (orderedItem) {
                      return (
                        <div
                          className={`order-tracking ${
                            orderedItem.orderstatus === "dispatched" ||
                            orderedItem.dispatchDate
                              ? "completed"
                              : ""
                          } `}
                        >
                          <span className="is-complete" />
                          <p>
                            Dispatched
                            <br />
                            <span>{orderedItem.dispatchDate}</span>
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`order-tracking ${
                            orderedItem.orderstatus === "dispatched" ||
                            orderedItem.dispatchDate
                              ? "completed"
                              : ""
                          } `}
                        >
                          <span className="is-complete" />
                          <p>
                            Dispatched
                            <br />
                            <span>Order details not available</span>
                          </p>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className={`order-tracking`}>
                        <span className="is-complete" />
                        <p>
                          Dispatched
                          <br />
                          <span></span>
                        </p>
                      </div>
                    );
                  }
                })()}

                {(() => {
                  if (
                    PopOrder &&
                    PopOrder.Order &&
                    PopOrder.Order.OrderedItems
                  ) {
                    const orderedItem = PopOrder.Order.OrderedItems.find(
                      (item) => item.Product._id === PopOrderId
                    );
                    console.log("orderedItem", orderedItem);
                    if (orderedItem) {
                      return (
                        <div
                          className={`order-tracking ${
                            orderedItem.orderstatus === "shipped" ||
                            orderedItem.shipDate
                              ? "completed"
                              : ""
                          } `}
                        >
                          <span className="is-complete" />
                          <p>
                            Shipped
                            <br />
                            <span>{orderedItem.shipDate}</span>
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`order-tracking ${
                            orderedItem.orderstatus === "shipped" ||
                            orderedItem.shipDate
                              ? "completed"
                              : ""
                          } `}
                        >
                          <span className="is-complete" />
                          <p>
                            Shipped
                            <br />
                            <span>Order details not available</span>
                          </p>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className="order-tracking">
                        <span className="is-complete" />
                        <p>
                          Shipped
                          <br />
                          <span></span>
                        </p>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  if (
                    PopOrder &&
                    PopOrder.Order &&
                    PopOrder.Order.OrderedItems
                  ) {
                    const orderedItem = PopOrder.Order.OrderedItems.find(
                      (item) => item.Product._id === PopOrderId
                    );
                    console.log("orderedItem", orderedItem);
                    if (orderedItem) {
                      return (
                        <div
                          className={`order-tracking ${
                            orderedItem.orderstatus === "delivered" ||
                            orderedItem.deliverdate
                              ? "completed"
                              : ""
                          } `}
                        >
                          <span className="is-complete" />
                          <p>
                            Delivered
                            <br />
                            <span>{orderedItem.deliverdate}</span>
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className={`order-tracking ${
                            orderedItem.orderstatus === "delivered" ||
                            orderedItem.deliverdate
                              ? "completed"
                              : ""
                          } `}
                        >
                          <span className="is-complete" />
                          <p>
                            Delivered
                            <br />
                            <span>Order details not available</span>
                          </p>
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className="order-tracking">
                        <span className="is-complete" />
                        <p>
                          Delivered
                          <br />
                          <span></span>
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
            {(() => {
              if (PopOrder && PopOrder.Order && PopOrder.Order.OrderedItems) {
                const orderedItem = PopOrder.Order.OrderedItems.find(
                  (item) => item.Product._id === PopOrderId
                );
                const orderId = PopOrder.paymentId.slice(-11);

                if (orderedItem) {
                  return (
                    <div> 
                      OrderId : {orderId}
                      <br />
                      paymentId : {PopOrder.paymentId}
                    </div>
                  );
                } else {
                  return "";
                }
              } else {
                return "";
              }
            })()}{" "}
          </div>
        </div>
      </Popup>

      {/*Header*/}
      {/* <div className={`${TrackPop ? "d-block" : "d-none"}`}> */}
      {/* <TrackOrder /> */}
      {/* </div> */}
      <Header toggleMenu={toggleMobileMenu} />

      {/*End Header*/}
      {/*Mobile Menu*/}
      <MobileHeader isOpen={isSideBar} toggleMenu={toggleMobileMenu} />
      {/*End Mobile Menu*/}
      {/*Body Content*/}
      <div id="page-content">
        {/*Page Title*/}
        <div className="page section-header text-center page-margin-less">
          <div className="page-title">
            <div className="wrapper">
              <h1 className="page-width">Your Account</h1>
            </div>
          </div>
        </div>
        {/*End Page Title*/}
        <div className="container ">
          <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3 z-ind-max"
            justify
          >
            {userAuth && (
              <Tab eventKey="profile" title="Profile" disabled={false} >
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={Useredited.fullname}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, fullname: e.target.value })
                    }
                    placeholder={userAuth.fullname}
                    disabled={isDisabled}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={Useredited.email}
                    // onChange={{ ...Useredited, email: userAuth.email }}
                    placeholder={userAuth.email}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label> Mobile </Form.Label>
                  <Form.Control
                    value={Useredited.mobile}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, mobile: e.target.value })
                    }
                    placeholder={userAuth.mobile}
                    disabled={isDisabled}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={Useredited.address}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, address: e.target.value })
                    }
                    placeholder={userAuth.address}
                    disabled={isDisabled}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    value={Useredited.country}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, country: e.target.value })
                    }
                    placeholder={userAuth.country}
                    disabled={isDisabled}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    value={Useredited.state}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, state: e.target.value })
                    }
                    placeholder={userAuth.state}
                    disabled={isDisabled}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={Useredited.city}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, city: e.target.value })
                    }
                    placeholder={userAuth.city}
                    disabled={isDisabled}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>PostalCode</Form.Label>
                  <Form.Control
                    value={Useredited.postcode}
                    onChange={(e) =>
                      setUseredited({ ...Useredited, postcode: e.target.value })
                    }
                    placeholder={userAuth.postcode}
                    disabled={isDisabled}
                  />
                </Form.Group>
                {/* <div className="row">
                  <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                    <input
                      type="submit"
                      className="btn mb-3"
                      value={isDisabled ? "Change Personal Details" : "Submit"}
                      onClick={
                        isDisabled ? handleditdetails : handlesubmitdetails
                      }
                    />
                  </div>
                </div> */}
              </Tab>
            )}
            <Tab eventKey="Your-Orders" title="Your Orders">
              <MyOrders
                toggleTrackPop={toggleTrackPop}
                setPopOrder={setPopOrder}
                setPopOrderId={setPopOrderId}
              />
            </Tab>
            {/* <Tab eventKey="longer-tab" title="Your Orders">
              Tab content for Loooonger Tab
            </Tab> */}
          </Tabs>
        </div>
      </div>
      {/*End Body Content*/}
      {/*Footer*/}
      <Footer />
      {/*End Footer*/}
    </div>
  );
}
