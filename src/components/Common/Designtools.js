import React, { useState } from "react";
import DrawingBoard from "./DrawingBoard";
import { Tldraw, useEditor } from "@tldraw/tldraw";

import { useEffect } from "react";

/*toggle sidebar*/
function Designtools() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  /*toggle sidebar end*/
  const editor = useEditor();
  const SelectTool = () => {};
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
              <img
                className="w-25"
                src="./img/pencil-icon.png"
                onClick={() => SelectTool(pencil)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                className="w-25"
                src="./img/text-icon.png"
                onClick={() => SelectTool(text)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                src="./img/group-icon.png"
                onClick={() => SelectTool(group)}
                alt=""
              />
            </div>
            <div className=" tools-icon">
              <img
                className="w-25"
                src="./img/connectors-icon.png"
                onClick={() => SelectTool(connectors)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                className="w-25"
                src="./img/chart-icon.png"
                onClick={() => SelectTool(chart)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                src="./img/layer-up-icon.png"
                onClick={() => SelectTool(layerup)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                className="w-25"
                src="./img/link-icon.png"
                onClick={() => SelectTool(link)}
                alt=""
              />
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
              <img
                src="./img/pen-icon.png"
                onClick={() => SelectTool(pen)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                src="./img/shapes-icon.png"
                onClick={() => SelectTool(shapes)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                src="./img/image-icon.png"
                onClick={() => SelectTool(image)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                className="w-25"
                src="./img/line-icon.png"
                onClick={() => SelectTool(line)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                className="w-25"
                src="./img/data-table-icon.png"
                onClick={() => SelectTool(table)}
                alt=""
              />
            </div>

            <div className="tools-icon">
              <img
                src="./img/layer-down-icon.png"
                onClick={() => SelectTool(layerdown)}
                alt=""
              />
            </div>
            <div className="tools-icon">
              <img
                className="w-25"
                src="./img/delete-icon.png"
                onClick={() => SelectTool(erase)}
                alt=""
              />
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
            <Tldraw hideUi />

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
