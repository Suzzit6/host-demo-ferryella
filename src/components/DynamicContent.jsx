import React from 'react';
import { useHeader } from '../contexts/admincontexts/headercontext';
import { Link, useNavigate, NavLink } from "react-router-dom";

export  function DynamicContent({ id, parent }) {

  const dynamicContent = useHeader();
  const normalizedInputId = id.replace(/\s+/g, '-').toLowerCase();
  
  // Access the actual dynamic content
  const actualDynamicContent = dynamicContent.dynamicContent || {};
  // console.log("actualDynamicContent", actualDynamicContent) 

  // Find the matching key in actualDynamicContent
  const matchingKey = Object.keys(actualDynamicContent).find(content => 
    content.toLowerCase() === normalizedInputId ||
    content.replace(/[-_\s]+/g, '').toLowerCase() === normalizedInputId.replace(/[-_\s]+/g, '')
  );
  // console.log("matchingKey", matchingKey)

  const content = matchingKey ? actualDynamicContent[matchingKey] : null;
  
  return (
    <span>
      {/* <Link  className="no-text-dec" to={`/women/${id}`}> */}
      {content || `${id}`}
      {/* </Link> */}
    </span>

  );
}