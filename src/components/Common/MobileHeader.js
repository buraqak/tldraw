import React, { useRef } from "react";

const MobileHeader = ({ day, title, currentTopicIndex, unitName }) => {
  var content = "";
  if (currentTopicIndex == 0)
    content = <li className="breadcrumb-item">{unitName}</li>;
  else if (day && day.toLowerCase() == title.toLowerCase()) {
    content = <li className="breadcrumb-item">{title}</li>;
  } else {
    content = (
      <>
        <li className="breadcrumb-item">{day}</li>

        <li className="breadcrumb-item">{title}</li>
      </>
    );
  }
  return (
    <React.Fragment>
      <div className="d-flex align-items-center text-center px-3 py-3 header-title header-title-mobile">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">{content}</ol>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default MobileHeader;
