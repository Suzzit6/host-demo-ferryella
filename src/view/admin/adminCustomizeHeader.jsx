import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import AdminHeader from "./adminHeader";
import axios from "axios";
import { useHeader } from "../../contexts/admincontexts/headercontext";
import Button from "react-bootstrap/Button";

export default function adminCustomizeHeader() {
  const [file, setfile] = useState();
  const [image, setimage] = useState();

  const { topics, settopics, parentheaders, setparentheaders } = useHeader();
  const [editableTopics, setEditableTopics] = useState({});
  const [EditedComp, setEditedComp] = useState({});

  const handleFile = (e) => {
    const submittedFile = e.target.files[0];
    setfile(submittedFile);
  };
  const handleUploadfile = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5500/admin/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image url", response.data.url);
      setimage(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  const [activeMenu, setactiveMenu] = useState({});

  const toggleSubMenu = (id) => {
    console.log(activeMenu);
    setactiveMenu((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleEditcomponent = (topicKey, topic) => {
    setEditableTopics((prev) => ({ ...prev, [topicKey]: true }));
    console.log("comp edited", topic);
  };
  const handleSavecomponent = async (topicKey) => {
    setEditableTopics((prev) => ({ ...prev, [topicKey]: false }));
    console.log("comp saved");

    try {
      const editedContent = EditedComp[topicKey];
      console.log(EditedComp);
      const response = await axios.post("http://localhost:5500/headers", {
        editedContent,
        topicKey,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompChange = async (topicKey, newContent) => {
    setEditedComp((prev) => ({ ...prev, [topicKey]: newContent }));
  };

  const handleDeleteComponent = async (topicKey) => {
    try {
      const res = await axios.post("http://localhost:5500/delete-comp", {
        topicKey,
      });
      console.log(res.data.message);
      console.log("comp deleted");
    } catch (error) {
      console.log(error);
    }
  };
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
              <h1 className="page-width">Customize Header</h1>
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
            <Tab eventKey="home" title="Logo">
              <h4>Current Logo</h4>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={"/assets/images/logo2.png"} />
              </Card>
              <br />
              <br />
              <h5>Upload new Logo</h5>
              <input type="file" name="file" onChange={handleFile} />
              <button type="submit" onClick={handleUploadfile}>
                Submit
              </button>
            </Tab>
            <Tab eventKey="profile" title="Subheader">
              <li className="lvl1 parent megamenu">
                {parentheaders &&
                  parentheaders.map((parentheader, index) => (
                    <>
                      <a onClick={() => toggleSubMenu(parentheader.key)}>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder={`${parentheader.content}`}
                            aria-label="Disabled input example"
                            disabled={!editableTopics[parentheader.key]}
                            value={
                              editableTopics[parentheader.key]
                                ? EditedComp[parentheader.key] ||
                                  parentheader.content
                                : parentheader.content
                            }
                            onChange={(e) =>
                              handleCompChange(parentheader.key, e.target.value)
                            }
                          />
                          <i className="anm anm-angle-down-l" />
                        </Form.Group>
                      </a>
                      <div className="btn-top">
                        {editableTopics[parentheader.key] ? (
                          <Button
                            variant="success"
                            onClick={() =>
                              handleSavecomponent(parentheader.key)
                            }
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleEditcomponent(parentheader.key)
                            }
                          >
                            Edit
                          </Button>
                        )}{" "}
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDeleteComponent(parentheader.key)
                          }
                        >
                          Delete
                        </Button>{" "}
                      </div>
                      <div className={`megamenu style4 `}>
                        <ul
                          className={`grid grid--uniform mmWrapper ${
                            activeMenu[parentheader.key] ? "d-block" : "d-none"
                          }`}
                        >
                          {topics &&
                            topics
                              .filter((topic) => {
                                if (
                                  topic.ParentHeaderName &&
                                  Array.isArray(topic.ParentHeaderName)
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
                                  <a className="site-nav lvl-1">
                                    <Form.Group className="mb-3">
                                      <Form.Control
                                        type="text"
                                        // placeholder={`${topic.content}`}
                                        aria-label="Disabled input example"
                                        disabled={!editableTopics[topic.key]}
                                        // readOnly={!editableTopics[topic.key]}
                                        value={
                                          editableTopics[topic.key]
                                            ? EditedComp[topic.key] ||
                                              topic.content
                                            : topic.content
                                        }
                                        onChange={(e) =>
                                          handleCompChange(
                                            topic.key,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Form.Group>
                                  </a>
                                  <div className="btn-top">
                                    {editableTopics[topic.key] ? (
                                      <Button
                                        variant="success"
                                        onClick={() =>
                                          handleSavecomponent(topic.key)
                                        }
                                      >
                                        Save
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="secondary"
                                        onClick={() =>
                                          handleEditcomponent(topic.key)
                                        }
                                      >
                                        Edit
                                      </Button>
                                    )}{" "}
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        handleDeleteComponent(topic.key)
                                      }
                                    >
                                      Delete
                                    </Button>{" "}
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </>
                  ))}
              </li>
            </Tab>
            <div className="row">
              <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                <input
                  type="submit"
                  className="btn mb-3"
                  // value={isDisabled ? "Change Personal Details" : "Submit"}
                  // onClick={
                  //   isDisabled ? handleditdetails : handlesubmitdetails
                  // }
                />
              </div>
            </div>
            <Tab eventKey="longer-tab" title="Your Orders">
              Tab content for Loooonger Tab
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
