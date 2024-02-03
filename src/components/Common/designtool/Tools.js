import React, { useState, useRef } from "react";
import { Tldraw, track, useEditor } from "@tldraw/tldraw";

const Tools = ({
  data,
  handleImageClick,
  handleImageChange,
  fileInputRef,
  /* handleRedo,
  handleUndo, */
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ColorPanel, setColorPanel] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [activeTool, setActiveTool] = useState("");

  const handleToolClick = (toolId) => {
    // Set the clicked tool as active
    //setActiveTool(toolId);

    // Set the current tool using data.setCurrentTool if needed
    data && data.setCurrentTool && data.setCurrentTool(toolId);
  };

  //pentool
  const penTool = () => {
    handleToolClick("draw");
    setColorPanel(true);
    const targetElement = document.querySelector(".tlui-style-panel__wrapper");

    if (targetElement) {
      targetElement.style.display = "block";
    }
  };
  const textTool = () => {
    handleToolClick("text");
    setColorPanel(true);
    const targetElement = document.querySelector(".tlui-style-panel__wrapper");

    if (targetElement) {
      targetElement.style.display = "block";
    }
  };
  //undo n redo
  const handleUndo = () => {
    if (editor) {
      editor.undo();
      setActiveTool(true);
    }
    //handleToolClick("undo");
  };

  const handleRedo = () => {
    if (editor) {
      editor.redo();
    }
  };
  return (
    <div className={`tools-box ${sidebarOpen ? "" : "collapsed"}`}>
      <button id="toggleSidebar" onClick={toggleSidebar}>
        {!sidebarOpen ? (
          <img src="./img/design-tools/close-tools.png" alt="Close Tools" />
        ) : (
          <img src="./img/design-tools/open-tools.png" alt="Open Tools" />
        )}
      </button>

      <div className="tools-title">Tools</div>
      <div className="tools-icon-box">
        <div className="tools-icon-left-box">
          <div
            onClick={() => data.setCurrentTool("undo")}
            /* onClick={handleUndo} */
            className={`tools-icon ${activeTool === "undo" ? "active" : ""}`}
          >
            <img src="./img/design-tools/undo-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${activeTool === "zoom" ? "active" : ""}`}
            onClick={() => data.setCurrentTool("zoom")}
          >
            <img src="./img/design-tools/zoom.png" alt="" />
          </div>
          <div
            id="color-panel"
            onClick={penTool}
            className={`tools-icon ${activeTool === "draw" ? "active" : ""}`}
          >
            <img src="./img/design-tools/pencil-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "text-icon" ? "active" : ""
            }`}
            onClick={textTool}
            /*  onClick={() => data.setCurrentTool("text")} */
          >
            <img src="./img/design-tools/text-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "group-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/group-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "connectors-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/connectors-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "chart-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/chart-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "layer-up-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/layer-up-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "link-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/link-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "download-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/download-icon.png" alt="" />
          </div>
        </div>
        <div
          className={`tools-icon-right-box ${sidebarOpen ? "" : "collapsed"}`}
          id="sidebar"
        >
          <div
            className={`tools-icon ${activeTool === "redo" ? "active" : ""}`}
            onClick={handleRedo}
          >
            <img src="./img/design-tools/redo-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${activeTool === "select" ? "active" : ""}`}
            onClick={() => handleToolClick("select")}
          >
            <img
              className="w-50"
              src="./img/design-tools/select-icon.png"
              alt=""
            />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "highlight-icon" ? "active" : ""
            }`}
          >
            <img
              className="w-75"
              src="./img/design-tools/highlight-icon.png"
              alt=""
            />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "shapes-icon" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/shapes-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${activeTool === "select" ? "active" : ""}`}
            /* onClick={handleImageClick} */
            onClick={() => data.setCurrentTool("media")}
          >
            <input ref={fileInputRef} type="file" style={{ display: "none" }} />
            {/* <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

           
            <img
              src="./img/design-tools/image-icon.png"
              alt="Upload Image"
              style={{ cursor: "pointer" }}
            /> */}{" "}
            <img
              onClick={() => fileInputRef.current.click()}
              src="./img/design-tools/image-icon.png"
              alt="Upload Image"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className={`tools-icon ${activeTool === "line" ? "active" : ""}`}
            onClick={() => handleToolClick("line")}
          >
            <img src="./img/design-tools/line-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "data-table" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/data-table-icon.png" alt="" />
          </div>

          <div
            className={`tools-icon ${
              activeTool === "layer-down" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/layer-down-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${activeTool === "eraser" ? "active" : ""}`}
            onClick={() => handleToolClick("eraser")}
          >
            <img src="./img/design-tools/delete-icon.png" alt="" />
          </div>
          <div
            className={`tools-icon ${
              activeTool === "template" ? "active" : ""
            }`}
          >
            <img src="./img/design-tools/template-icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
