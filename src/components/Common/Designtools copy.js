import React, { useState } from "react";
// import DrawingBoard from "./DrawingBoard";
import { Tldraw } from "@tldraw/tldraw";

import { useEffect } from "react";

/*toggle sidebar*/
function Designtools() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  /*toggle sidebar end*/

  return (
    <div className="d-flex">
      <div className={`tools-box ${sidebarOpen ? "" : "collapsed"}`}>
        <button id="toggleSidebar" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <img src="./img/close-tools.png" alt="Close Tools" />
          ) : (
            <img src="./img/open-tools.png" alt="Open Tools" />
          )}
        </button>
        <div className="tools-title">Tools</div>
        <div className="tools-icon-box">
          <div className="tools-icon-left-box">
            <div className="tools-icon">
              <img src="./img/serch-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/pencil-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/text-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img src="./img/group-icon.png" alt="" />
            </div>
            <div className=" tools-icon">
              <img className="w-25" src="./img/connectors-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/data-table-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img src="./img/layer-up-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/link-icon.png" alt="" />
            </div>
          </div>
          <div
            className={`tools-icon-right-box ${sidebarOpen ? "" : "collapsed"}`}
            id="sidebar"
          >
            <div className="tools-icon">
              <img className="w-25" src="./img/arrow-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img src="./img/pen-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img src="./img/shapes-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img src="./img/image-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/line-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/chart-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img src="./img/layer-down-icon.png" alt="" />
            </div>
            <div className="tools-icon">
              <img className="w-25" src="./img/delete-icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="design-board-section ps-0">
        {/*  <div className="header-section ">
          <div className="header-record-section">
            <button className="record-button">
              <img src="./img/record-mic.png" alt="" />
              &nbsp; Record
            </button>
            <div className="record-arrow-section">
              <button className="arrow-button me-3">
                <img src="./img/undo-arrow.png" alt="" />
              </button>
              <button className="arrow-button ">
                <img src="./img/redo-arrow.png" alt="" />
              </button>
            </div>
          </div>

          <div className="file-name-section ">
            <div className="file-name-box"></div>
            <button className="file-name-box-arrow">
              <img src="./img/down-arrow.png" alt="" />
            </button>
          </div>
          <button className="share-button">
            <img src="./img/share-arrow.png" alt="" /> Share
          </button>
        </div> */}
        <div className="design-board-area-box">
          <div className="design-board-area">
            <Tldraw />

            <button className="template-button">
              <img src="./img/template-img.png" alt="Button Image" />
              &nbsp; Background
            </button>
          </div>
          <div className="footer-area">
            <button className="footer-button">Word Wall</button>
            <button className="footer-button">Initial Ideas</button>
            <button className="footer-button footer-active">Data Sheets</button>
            <button className="footer-button footer-plus-button ">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Designtools;
