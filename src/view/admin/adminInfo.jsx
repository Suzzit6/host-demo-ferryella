import React from "react";
import { useEffect, useState } from "react";
import AdminHeader from "./adminHeader";
import "../../assets/css/portal.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useHeader } from "../../contexts/admincontexts/headercontext";
import Form from "react-bootstrap/Form";

export function adminInfo() {
  const [isDisabled, setisDisabled] = useState(true);
  const [Useredited, setUseredited] = useState({
    genGST: null,
    GST1000: null,
    price: null,
  });
useEffect(() => {
  console.log("Useredited" , Useredited)
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

  const handlesubmitdetails = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      // console.log(userAuth)
      console.log("Useredited.email ", Useredited.email);
      const resp = await axios.post("http://localhost:5500/admin/edit-tax", {
        ...Useredited,
      });
      // setLoading(false);
      setisDisabled(true);
      window.location.reload(true);
    } catch (error) {
      console.log("error in profile", error);
      setLoading(false);
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
              <h1 className="page-width">Edit Company Details</h1>
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
            {/* <Tab eventKey="home" title="Products">
              <h4>Products</h4>
            </Tab> */}
            <Tab eventKey="profile" title="Edit Tax Rates (only for invoice purposes this won't add to the products)">
              <div className="page section-header text-center page-margin-less">
                <div className="page-title">
                  <div className="wrapper">
                    {/* <h1 className="page-width">Edit Tax Rates</h1> */}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
                    <div className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>GST Rate is Set to percent</Form.Label>
                        <Form.Control
                          defaultValue={"5"}
                          onChange={(e) =>
                            setUseredited({
                              ...Useredited,
                              genGST: e.target.value,
                            })
                          }
                          // placeholder={userAuth.address}
                          disabled={isDisabled}
                        />
                        <Form.Label>
                          {" "}
                          for all the Products and percent
                        </Form.Label>
                        <Form.Control
                          defaultValue={"12"}
                          onChange={(e) =>
                            setUseredited({
                              ...Useredited,
                              GST1000: e.target.value,
                            })
                          }
                          // placeholder={userAuth.address}
                          disabled={isDisabled}
                        />
                        for Products priced Above INR
                        {/* <Form.Label> for all the Products and</Form.Label> */}
                        <Form.Control
                          defaultValue={"1000"}
                          onChange={(e) =>
                            setUseredited({
                              ...Useredited,
                              price: e.target.value,
                            })
                          }
                          // placeholder={userAuth.address}
                          disabled={isDisabled}
                        />
                      </Form.Group>

                      <div className="row">
                        <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                          <input
                            type="submit"
                            className="btn mb-3"
                            value={isDisabled ? "Change TAX Details" : "Submit"}
                            onClick={
                              isDisabled
                                ? handleditdetails
                                : handlesubmitdetails
                            }
                          />
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </Tab>

            {/* <Tab eventKey="longer-tab" title="Edit">
              Tab content for Loooonger Tab
            </Tab> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
