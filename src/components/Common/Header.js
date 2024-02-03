import React, { useRef } from "react";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <div className="row mx-0 w-100">
          <a className="navbar-brand col-4 col-md-2 col-lg-2 me-0 left-logo">
            <img
              src="img/carolina-science-logo.svg"
              alt="Carolina science"
              title="Carolina science"
              tabIndex={props.tabpopup == false ? 0 : -1}
              id="logo1"
            />
          </a>
          <div className="col-4 col-md-8 col-lg-8 d-flex align-items-center text-center px-3 header-title">
            <button
              className="navbar-toggler position-absolute d-md-none collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <nav aria-label="breadcrumb" className="breadcrumb-section">
              <ol
                className="breadcrumb mb-0"
                tabIndex={props.tabpopup == false ? 0 : -1}
                id="title"
              >
                {props.currentTopicIndex == 0 ? (
                  <li className="breadcrumb-item"> {props.lessonName} </li>
                ) : props.currentGroupName == props.currentTopic ? (
                  <li className="breadcrumb-item">{props.currentTopic}</li>
                ) : (
                  <>
                    <li className="breadcrumb-item">
                      {props.currentGroupName}
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      {props.currentTopic}
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </div>
          {/* <a className="navbar-brand col-4 col-md-2 col-lg-2 me-0 right-logo">
            <img
              src="img/opensci-logo.svg"
              alt="Open scienceED"
              title="Open scienceED"
              tabIndex={props.currentTopicIndex != 0 ? -1 : 0}
              id="logo2"
            />
          </a> */}
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
