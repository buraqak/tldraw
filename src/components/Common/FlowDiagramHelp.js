import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import leftNavData from "../Lesson/LeftNavData";
import React, { useEffect, useState, useRef } from "react";

function FlowDiagramHelp({ closePopUp, thingsToShow }) {
  const [activeKey, setActiveKey] = useState("Main");
  /* Popup Start Here */
  var popUp = false;
  const [showMainPopup, setShowMainPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [popupContent, setPopupContent] = useState("0");
  const [popupDuration, setPopupDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const gifRef = useRef(null);
  const openMainPopup = () => {
    setShowMainPopup(true);
  };
  /* const showPopup = () => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // Reset the GIF to the beginning
    }
  }; */
  const closeMainPopup = () => {
    setShowMainPopup(false);
  };
  const closeshowPopup = () => {
    gifRef.current.src = null;
    setPopupDuration(0);
    setShowPopup(false);
    setPopupContent("");
    setProgress(0); // Reset progress to 0
    //timestamp(0);
  };

  const handleStepChange = (id, durationInMinutes, progressDuration) => {
    const specifiedDuration = durationInMinutes * 60 * 100; // Convert specified duration to milliseconds

    //setPopupContent(content);

    setPopupDuration(specifiedDuration);
    setShowPopup(true);
    popUp = true;
    if (gifRef.current) {
      gifRef.current.src = null;
    }
    if (id === 1) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Color’</b> option to change the color of a block.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Color-selection.gif" />
          </div>
        </div>
      );
    } else if (id === 2) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              To link two blocks together, drag the node connector from one
              block to another.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Connecting-Blocks.gif" />
          </div>
        </div>
      );
    } else if (id === 3) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              To edit the text in an input block, select the block. The text may
              be formatted to make it bold, italic, and/or underlined.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Edit-text.gif" />
          </div>
        </div>
      );
    } else if (id === 4) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Zoom In/Out’</b> option to zoom in for a closer look
              at your flowchart.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Zoom-in-Zoom-out.gif" />
          </div>
        </div>
      );
    } else if (id === 5) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Fit to Screen’</b> to view your entire flowchart.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Fit-to-screen.gif" />
          </div>
        </div>
      );
    } else if (id === 6) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Lock/Unlock’</b> option to lock all elements of your
              flowchart into position.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Lock-and-Unlock.gif" />
          </div>
        </div>
      );
    } else if (id === 7) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Add’</b> option to add input blocks.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Add-Blocks.gif" />
          </div>
        </div>
      );
    } else if (id === 8) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Delete’</b> option to delete the selected input box.
            </p>
          </div>
          <div className="flow-procedure-image ">
            <img ref={gifRef} src="./img/FlowChartInfo/Delete-blocks.gif" />
          </div>
        </div>
      );
    }
    let start;
    const step = (timestamp) => {
      //if (!showPopup) return false;
      if (!start) start = timestamp;
      // console.log(timestamp, popUp);
      const elapsed = timestamp - start;

      setProgress(Math.min((elapsed / progressDuration) * 100, 100));

      if (elapsed < progressDuration && gifRef?.current?.src) {
        requestAnimationFrame(step);
        //  console.log(progressDuration);
        //  console.log(elapsed);
      } else {
        // Close the popup after the specified duration
        if (gifRef.current) gifRef.current.src = null;
        popUp = false;
        setShowPopup(false);
        setPopupDuration(0);
        setPopupContent("");
        setProgress(0); // Reset progress to 0
        return null;
      }
    };

    requestAnimationFrame(step);
  };
  /*popup end */
  let homeImage = "./img/FlowChartInfo/main.png";
  if (thingsToShow.line) homeImage = "./img/CanvasInfo/Line.png";
  if (thingsToShow.circle) homeImage = "./img/CanvasInfo/shape.png";
  if (thingsToShow.pan) homeImage = "./img/CanvasInfo/pan.png";

  useEffect(() => {
    if (thingsToShow.line) {
      setActiveKey("Graph");
    } else if (thingsToShow.circle) {
      setActiveKey("Circle");
    } else if (thingsToShow.graph) {
      setActiveKey("graph");
    }
  }, []);

  return (
    <div>
      <Modal
        show={true}
        aria-labelledby="myExtraLargeModalLabel"
        // show={showMainPopup}
        onHide={closeMainPopup}
        dialogClassName="large-modal-popup help-popup"
      >
        <Modal.Header
          className="model-header-popup"
          onClick={closePopUp}
          closeButton
        >
          <Modal.Title>Flowchart Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the flowchart.
          </p>
          <div className=" popup-flowchar">
            <div className="border p-2 w-100 position-relative">
              <div class="row mx-0 border-bottom grey-section py-0 ">
                <div class="col-12 col-lg-6 mx-auto ">
                  <div class="row">
                    <div class="d-flex justify-content-center gap-2 col-12  col-lg-12  px-0 py-1 ">
                      <div class="color-button position-relative" tabindex="-1">
                        <div
                          class="flow-chart-color"
                          onClick={() => handleStepChange(1, 3.1, 19000)}
                          tabindex="-1"
                        >
                          <input
                            type="button"
                            className="fc-popup-color-btn"
                            value="Color"
                          />
                        </div>
                        <div className="popuptext-box postion_1_flow">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleStepChange(1, 3.1, 18000)}
                          >
                            <a>Color Selection</a>
                          </div>
                          <div className="popup-border-260"></div>
                        </div>
                      </div>
                      <div className="position-relative">
                        <div
                          class="variation-add flow_add_button mr-4 "
                          onClick={() => handleStepChange(7, 4.0, 25000)}
                        >
                          <button type="button" tabindex="-1">
                            Add
                          </button>
                        </div>
                        <div className="popuptext-box postion_7_flow coloum-gap-0 ">
                          <div className="popup-border-ttob"></div>
                          <div className="popup-border-h25"></div>
                          <div
                            className="flow-popup-text cursor-pointer margin-top-minus5"
                            onClick={() => handleStepChange(7, 4.0, 25000)}
                          >
                            <a>Add Blocks</a>
                          </div>
                        </div>
                      </div>
                      <div className="position-relative">
                        <div
                          class="variation-remove flow_delete_button disabled "
                          onClick={() => handleStepChange(8, 1.5, 7500)}
                        >
                          <button type="button" tabindex="-1">
                            Delete
                          </button>
                        </div>
                        <div className="popuptext-box postion_8_flow">
                          <div className="popup-border-280"></div>
                          <div
                            className="cursor-pointer"
                            onClick={() => handleStepChange(8, 1.5, 7500)}
                          >
                            <a>Delete Blocks</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mx-0">
                <div className="col-1 px-0">
                  <div className="position-relative h-100">
                    <div className="  w-75 position-absolute bottom-0">
                      <div className="position-relative">
                        <img
                          className="cursor-pointer"
                          onClick={() => handleStepChange(4, 2.3, 14000)}
                          src="./img/FlowChartInfo/flow-icons.png"
                        />
                        <div className="popuptext-box postion_4_flow coloum-gap-0">
                          <div className="flow-popup-zoom">
                            <div
                              className="cursor-pointer"
                              onClick={() => handleStepChange(4, 2.3, 14000)}
                            >
                              <a>Zoom In/Out</a>
                            </div>
                            <div className="popup-border-90"></div>
                          </div>
                          <div className="flow-popup-zoom-box"></div>
                        </div>
                      </div>
                      <div>
                        <div className="position-relative">
                          <img
                            className="cursor-pointer"
                            onClick={() => handleStepChange(5, 5.1, 31000)}
                            src="./img/FlowChartInfo/flow-icons-fit.png"
                          />

                          <div className="popuptext-box postion_5_flow">
                            <div
                              className="cursor-pointer"
                              onClick={() => handleStepChange(5, 5.1, 31000)}
                            >
                              <a>Fit to Screen</a>
                            </div>
                            <div className="popup-border-100 "></div>
                          </div>
                        </div>
                      </div>
                      <div className="position-relative">
                        <img
                          className="cursor-pointer"
                          onClick={() => handleStepChange(6, 4.3, 26000)}
                          src="./img/FlowChartInfo/flow-icons-lock.png"
                        />
                        <div className="popuptext-box postion_6_flow">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleStepChange(6, 4.3, 26000)}
                          >
                            <a>Lock/Unlock</a>
                          </div>
                          <div className="popup-border-100"></div>
                        </div>
                      </div>
                      {/* <div className="position-relative">
                        <div
                          className="w-100 border-bottom  py-2 d-flex justify-content-center cursor-pointer"
                          onClick={() => handleStepChange(4, 2.3, 14000)}
                        >
                          <svg
                            className="svg-icons"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                          >
                            <path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path>
                          </svg>
                        </div>
                        <div
                          className="w-100 border-bottom  py-2 d-flex justify-content-center cursor-pointer"
                          onClick={() => handleStepChange(4, 2.3, 14000)}
                        >
                          <svg
                            className="svg-icons"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 5"
                          >
                            <path d="M0 0h32v4.2H0z"></path>
                          </svg>
                        </div>
                        
                      </div>
                      
                      */}
                    </div>
                  </div>
                </div>
                <div
                  className="col-9"
                  style={{ marginTop: "20px", paddingBottom: "60px" }}
                >
                  <div className="row  d-flex justify-content-center ">
                    <div className="px-4 py-3   border d-flex justify-content-center align-items-middle rounded position-relative popup-node-green">
                      <div className="popup-node-green-dot"></div>
                      <p>+</p>
                      <div className="popup-node-green-dot-bellow"></div>
                    </div>
                  </div>
                  <div className="position-relative">
                    <div
                      class="row"
                      onClick={() => handleStepChange(2, 3.3, 18000)}
                    >
                      <div class="col-1"></div>
                      <div class="col-5  border-right border-bottom popup-flow-node-link"></div>
                      <div class="col-6"></div>
                    </div>
                    <div
                      class="row"
                      onClick={() => handleStepChange(2, 3.3, 18000)}
                    >
                      <div class="col-1"></div>
                      <div class="col-5  popup-flow-borderleft popup-flow-node-link"></div>
                      <div class="col-6"></div>
                    </div>
                    <div className="popuptext-box postion_2_flow">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleStepChange(2, 3.3, 18000)}
                      >
                        <a>Connecting Blocks</a>
                      </div>
                      <div className="popup-border-140"></div>
                    </div>
                  </div>
                  <div className="row  d-flex justify-content-between ">
                    <div className="width-20  position-relative  ">
                      <div
                        className="cursor-pointer px-1 py-3 border d-flex justify-content-center align-items-middle rounded position-relative popup-node-pink"
                        onClick={() => handleStepChange(3, 3.6, 21000)}
                      >
                        <div className="popup-node-green-dot"></div>
                        <p>Hi ...</p>
                        <div className="popup-node-green-dot-bellow"></div>
                      </div>
                      <div className="popuptext-box postion_3_flow">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleStepChange(3, 3.6, 21000)}
                        >
                          <a>Edit Text</a>
                        </div>
                        <div className="popup-border-100"></div>
                      </div>
                    </div>
                    <div className="px-4 py-3   border d-flex justify-content-center align-items-middle rounded position-relative popup-node-blue">
                      <div className="popup-node-green-dot"></div>
                      <p>+</p>
                      <div className="popup-node-green-dot-bellow"></div>
                    </div>
                  </div>
                  <div className="row py-2 d-flex justify-content-center ">
                    <div className="px-4 py-3   border d-flex justify-content-center align-items-middle rounded position-relative popup-node-yellow">
                      <div className="popup-node-green-dot"></div>
                      <p>+</p>
                      <div className="popup-node-green-dot-bellow"></div>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="position-relative h-100">
                    <div
                      class="react-flow__panel-popup react-flow__minimap bottom right position-absolute bottom-0"
                      data-testid="rf__minimap"
                    >
                      <svg
                        width=""
                        height="150"
                        viewBox="-17.375 -217 1086.75 828"
                        role="img"
                        aria-labelledby="react-flow__minimap-desc-1"
                      >
                        <title id="react-flow__minimap-desc-1">
                          React Flow mini map
                        </title>
                        <rect
                          class="react-flow__minimap-node"
                          x="500"
                          y="50"
                          rx="5"
                          ry="5"
                          width="52"
                          height="44"
                          fill="#e2e2e2"
                          stroke="transparent"
                          stroke-width="2"
                          shape-rendering="crispEdges"
                        ></rect>
                        <rect
                          class="react-flow__minimap-node"
                          x="700"
                          y="200"
                          rx="5"
                          ry="5"
                          width="52"
                          height="44"
                          fill="#e2e2e2"
                          stroke="transparent"
                          stroke-width="2"
                          shape-rendering="crispEdges"
                        ></rect>
                        <rect
                          class="react-flow__minimap-node"
                          x="300"
                          y="200"
                          rx="5"
                          ry="5"
                          width="52"
                          height="44"
                          fill="#e2e2e2"
                          stroke="transparent"
                          stroke-width="2"
                          shape-rendering="crispEdges"
                        ></rect>
                        <rect
                          class="react-flow__minimap-node"
                          x="500"
                          y="300"
                          rx="5"
                          ry="5"
                          width="52"
                          height="44"
                          fill="#e2e2e2"
                          stroke="transparent"
                          stroke-width="2"
                          shape-rendering="crispEdges"
                        ></rect>
                        <path
                          class="react-flow__minimap-mask"
                          d="M-43.25,-242.875h1138.5v879.75h-1138.5z
        M8.5,-29.5h1035v453h-1035z"
                          fill="rgb(240, 240, 240, 0.6)"
                          fill-rule="evenodd"
                          stroke="none"
                          stroke-width="1"
                          pointer-events="none"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              {/* <div
                className="popuptext-box postion_1_flow"
                onClick={() => handleStepChange(1, 3.1, 18000)}
              >
                <div>
                  <a>Color Selection</a>
                </div>
                <div className="popup-border-260"></div>
              </div>
 */}
              {/* <div
                className="popuptext-box postion_2_flow"
                onClick={() => handleStepChange(2, 3.3, 18000)}
              >
                <div>
                  <a>Connecting Blocks</a>
                </div>
                <div className="popup-border-140"></div>
              </div> */}
              {/* <div
                className="popuptext-box postion_3_flow"
                onClick={() => handleStepChange(3, 3.6, 21000)}
              >
                <div>
                  <a>Edit Text</a>
                </div>
                <div className="popup-border-100"></div>
              </div> */}
              {/* <div
                className="popuptext-box postion_4_flow coloum-gap-0"
                onClick={() => handleStepChange(4, 2.3, 14000)}
              >
                <div className="flow-popup-zoom">
                  <div>
                    <a>Zoom In/Out</a>
                  </div>
                  <div className="popup-border-90"></div>
                </div>
                <div className="flow-popup-zoom-box"></div>
              </div> */}
              {/* <div
                className="popuptext-box postion_5_flow"
                onClick={() => handleStepChange(5, 5.1, 31000)}
              >
                <div>
                  <a>Fit to Screen</a>
                </div>
                <div className="popup-border-100 "></div>
              </div>
              <div
                className="popuptext-box postion_6_flow"
                onClick={() => handleStepChange(6, 4.3, 26000)}
              >
                <div>
                  <a>Lock/Unlock</a>
                </div>
                <div className="popup-border-100"></div>
              </div> */}
              {/*  <div
                className="popuptext-box postion_7_flow coloum-gap-0 "
                onClick={() => handleStepChange(7, 4.0, 25000)}
              >
                <div className="popup-border-ttob"></div>
                <div className="popup-border-h25"></div>
                <div className="flow-popup-text">
                  <a>Add Blocks</a>
                </div>
              </div> */}
              {/* <div
                className="popuptext-box postion_8_flow"
                onClick={() => handleStepChange(8, 1.5, 7500)}
              >
                <div className="popup-border-280"></div>
                <div>
                  <a>Delete Blocks</a>
                </div>
              </div> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        dialogClassName="large-modal-popup help-gif-popup "
        aria-labelledby="myExtraLargeModalLabel"
        // show={showMainPopup}

        show={showPopup}
        /* onShow={handleSubPopupShow} */
        onHide={closeshowPopup}
        /* backdrop="static" */ // This prevents closing when clicking outside
        keyboard={false}
      >
        {/* <Modal.Header>
                <Modal.Title className="model-header-popup">
                  Canvas Help
                </Modal.Title>
              </Modal.Header> */}
        <Modal.Body>
          {popupContent}{" "}
          <div
            className="popup-progress-bar"
            style={{ display: "flex", zIndex: "999" }}
          >
            <div
              style={{
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                border: "1px solid #2c2d30",
                borderTopRightRadius: "25px",
                borderBottomRightRadius: "25px",
                width: "95%",
                height: "20px",
                marginRight: "20px",
                backgroundColor: "#e8e8e8",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#595959",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",

                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
              ></div>
            </div>
            <p style={{ textAlign: "center", marginTop: "5px" }}>
              {Math.round(progress)}%
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FlowDiagramHelp;
