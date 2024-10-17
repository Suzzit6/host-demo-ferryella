import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AdminHeader from "./adminHeader";
import { useHeader } from "../../contexts/admincontexts/headercontext";
import Form from "react-bootstrap/Form";

export const AllHeaders = () => {
    const { topics, settopics, parentheaders, setparentheaders } = useHeader();

    const [activeMenu, setactiveMenu] = useState({});
    const toggleSubMenu = (id) => {
      console.log(activeMenu);
      setactiveMenu((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }))
      
    };
    return (
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

                                    disabled
                                />
                                <i className="anm anm-angle-down-l" />
                            </Form.Group>
                        </a>
                        <div className={`megamenu style4 `}>
                            <ul
                                className={`grid grid--uniform mmWrapper ${
                                    activeMenu[parentheader.key] ? 'd-block' : 'd-none'
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
                                                    topic.ParentHeaderName[0] === parentheader.key ||
                                                    topic.ParentHeaderName[1] === parentheader.key
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
    );
};

export default AllHeaders;
