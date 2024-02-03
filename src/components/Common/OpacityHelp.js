import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import leftNavData from "../Lesson/LeftNavData";
import React, { useEffect, useState, useRef } from "react";
function CanvasHelp({ closePopUp, thingsToShow }) {
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
              Use the <b>‘Pen’</b> option to draw on the canvas.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Pen.gif" />
          </div>
        </div>
      );
    } else if (id === 2) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>'Add Text’</b> option to create a text box on the
              canvas.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Text.gif" />
          </div>
        </div>
      );
    } else if (id === 3) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Select’</b> option to move objects around on the
              canvas.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Select.gif" />
          </div>
        </div>
      );
    } else if (id === 4) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Eraser’</b> option to remove parts of the objects on
              the canvas.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Eraser.gif" />
          </div>
        </div>
      );
    } else if (id === 5) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Undo’</b> option to reverse the previous action.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Undo.gif" />
          </div>
        </div>
      );
    } else if (id === 6) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Delete’</b> option to remove selected text or images
              from the canvas.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Delete.gif" />
          </div>
        </div>
      );
    } else if (id === 7) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Color Selection’</b> option to modify the color of an
              object. The color may be chosen before the object is created or
              used to change the color when an object has been selected.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Palette.gif" />
          </div>
        </div>
      );
    } else if (id === 8) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Upload’</b> option to import an image from your device
              to the canvas and Use the <b>‘Clear All’</b> option to erase
              everything on the canvas.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img
              ref={gifRef}
              src="./img/CanvasInfo/File-Upload-and-Clear-all.gif"
            />
          </div>
        </div>
      );
    } else if (id === 9) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Download’</b> option to save the canvas you have
              created on your device.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-Download.gif" />
          </div>
        </div>
      );
    } else if (id === 10) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>'Line Width’</b> option to increase stroke size.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img ref={gifRef} src="./img/CanvasInfo/Info-LineWidth.gif" />
          </div>
        </div>
      );
    } else if (id === 11) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Line’</b> tool to create straight lines. These lines
              can be used when labeling parts of an image on the canvas.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Line.gif" />
          </div>
        </div>
      );
    } else if (id === 12) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Pan’</b> option to shift the position of the entire
              canvas.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img ref={gifRef} src="./img/CanvasInfo/Pan.gif" />
          </div>
        </div>
      );
    } else if (id === 13) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Zoom In/Out’</b> option to zoom in for a closer look
              at objects on the canvas.
            </p>
          </div>
          <div className="canvas-procedure-image1  ">
            <img ref={gifRef} src="./img/CanvasInfo/Zoom-in-zoom-out.gif" />
          </div>
        </div>
      );
    } else if (id === 14) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Fit to Screen’</b> option to display your entire
              canvas.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Fit-to-screen.gif" />
          </div>
        </div>
      );
    } else if (id === 15) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Opacity’</b> option to adjust the transparency of
              objects. Select an object to adjust its opacity.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/CanvasInfo/Opacity.gif" />
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
  let homeImage = "./img/CanvasInfo/Info-Intro.png";
  if (thingsToShow.graph) homeImage = "./img/CanvasInfo/Line_main.png";
  if (thingsToShow.circle) homeImage = "./img/CanvasInfo/shape.png";
  if (thingsToShow.pan) homeImage = "./img/CanvasInfo/pan.png";

  useEffect(() => {
    if (thingsToShow.pan) {
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
          <Modal.Title>Canvas Help</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the canvas.
          </p>
          <div className="canvas-mainpopup-box justify-content-center">
            <div className="canvas-procedure-image">
              <div class="drawing-section pb-0">
                <div class="drawing-header-pan">
                  <div class="d-grid justify-content-center align-items-center drawing-header-navi">
                    <ul
                      class="d-grid justify-content-center align-items-center drawing-colors_popup cursor-pointer"
                      onClick={() => handleStepChange(7, 5.6, 35000)}
                    >
                      <li class="color red"></li>
                      <li class="color yellow"></li>
                      <li class="color blue"></li>
                      <li class="color green"></li>
                      <li class="color orange"></li>
                      <li class="color lavender"></li>

                      <li class="color white"></li>
                      <li class="color black"></li>
                    </ul>
                  </div>
                </div>
                <div class="d-grid align-items-center drawing-body-pan">
                  <div class="d-grid-column drawing-navi left">
                    <ul class="d-grid justify-content-center align-items-center">
                      <div
                        onClick={() => handleStepChange(1, 1.6, 9500)}
                        type="button"
                        class="button "
                        id="drawPencil_popup"
                        aria-label="Pen"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/Pencil.svg" />
                      </div>
                      <li
                        onClick={() => handleStepChange(2, 1.5, 8500)}
                        type="button"
                        class="button"
                        id="insertText"
                        aria-label="Add Text"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/drawing-type.svg" />
                      </li>
                      <li
                        onClick={() => handleStepChange(11, 2, 16000)}
                        type="button"
                        class="button"
                        id="insertText"
                        aria-label="Add line"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/drawing-line.svg" />
                      </li>
                      <li
                        onClick={() => handleStepChange(3, 2, 12000)}
                        type="button"
                        id="selectObject"
                        class="button"
                        aria-label="Select"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/drawing-resizer.svg" />
                      </li>
                      <li
                        onClick={() => handleStepChange(12, 2, 22000)}
                        type="button"
                        id="moveObject"
                        class="button"
                        aria-label="Pan"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/drawing-pan.svg" />
                      </li>
                      <li
                        onClick={() => handleStepChange(13, 2, 26000)}
                        type="button"
                        id="FitToScreen"
                        aria-label="Zoom in"
                        class="button"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/drawing-Zoom-In.svg" />
                      </li>
                      <li
                        onClick={() => handleStepChange(14, 2, 20000)}
                        type="button"
                        id="FitToScreen"
                        aria-label="Fit to screen"
                        class="button"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/drawing-resize.svg" />
                      </li>

                      <li
                        class="button"
                        onClick={() => handleStepChange(5, 1.8, 11000)}
                      >
                        <a href="#">
                          <img
                            src="./img/drawing-reset.svg"
                            alt="drawing-reset"
                            title="drawing-reset"
                          />
                        </a>
                      </li>
                      <li
                        onClick={() => handleStepChange(6, 1.1, 6500)}
                        type="button"
                        id="deleteObject"
                        class="button"
                        aria-label="Delete"
                        data-mui-internal-clone-element="true"
                      >
                        <img src="./img/Delete-Image.svg" disabled="" />
                      </li>
                    </ul>
                  </div>
                  <div class="d-grid-column drawing-canvas-pan"></div>
                  <div class="d-grid-column drawing-navi right">
                    <ul class="d-grid justify-content-center align-items-center ">
                      <li
                        class="drawing cursor-pointer"
                        id="opacityPencil"
                        onClick={() => handleStepChange(15, 1.3, 47000)}
                      >
                        <img
                          src="./img/drawing-opacity.svg"
                          class="cursor-pointer"
                          aria-label="Line opacity"
                          data-mui-internal-clone-element="true"
                        />
                      </li>
                      <li class="pb-3" data-mui-internal-clone-element="true">
                        <div class="d-flex justify-content-center drawing-range">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            orient="vertical"
                            class="pen-range cursor-context"
                            tabindex="-1"
                            value="100"
                          />
                        </div>
                      </li>
                      <li
                        onClick={() => handleStepChange(10, 1.3, 8000)}
                        class="drawing pb-3 pb-lg-3 pe-2 pe-lg-0 cursor-pointer"
                        id="drawPencil"
                      >
                        <img
                          src="./img/brush_size.png"
                          width="32px"
                          height="32px"
                          class=" cursor-pointer"
                          aria-label="Line Width"
                          data-mui-internal-clone-element="true"
                        />
                      </li>{" "}
                      <li class="" data-mui-internal-clone-element="true">
                        <div class="d-flex justify-content-center drawing-range">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            orient="vertical"
                            class="pen-range cursor-context"
                            tabindex="-1"
                            value="5"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="d-flex justify-content-center align-items-center drawing-footer-pan mb-50">
                  <div
                    class="upload"
                    onClick={() => handleStepChange(8, 4.6, 29000)}
                  >
                    <div class="icon">
                      <img src="./img/upload.svg" alt="upload" title="upload" />
                    </div>
                    <p class="m-0 fw-300">Click here to upload your file.</p>
                  </div>
                  <div
                    onClick={() => handleStepChange(9, 0.95, 12000)}
                    type="button"
                    class="ml-20 drawing-save"
                    aria-label="Download"
                    data-mui-internal-clone-element="true"
                  >
                    <img
                      class="drawing-save-icon cursor-pointer"
                      src="./img/drawing-save.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="popuptext-box postion_1_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(1, 1.6, 9500)}
                >
                  <a>Pen</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_2_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(2, 1.5, 8500)}
                >
                  <a>Add Text</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_11_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(11, 2, 16000)}
                >
                  <a>Line</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_3_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(3, 2, 12000)}
                >
                  <a>Select</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_4_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(12, 2, 22000)}
                >
                  <a>Pan</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_12_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(13, 2, 26000)}
                >
                  <a>Zoom In/Out</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_13_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(14, 2, 20000)}
                >
                  <a>Fit to Screen</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_5_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(5, 1.8, 11000)}
                >
                  <a>Undo</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_6_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(6, 1.1, 6500)}
                >
                  <a>Delete</a>
                </div>
                <div className="popup-border"></div>
              </div>
              <div className="popuptext-box postion_7_pan">
                <div className="popup-border-right"></div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(7, 5.6, 35000)}
                >
                  <a>Color Selection </a>
                </div>
              </div>
              <div className="popuptext-box postion_8_pan">
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(8, 4.6, 29000)}
                >
                  <a>File Upload & Clear All</a>
                </div>
                <div className="popup-border-280 "></div>
              </div>
              <div className="popuptext-box postion_9_pan">
                <div className="popup-border-download"></div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(9, 0.95, 12000)}
                >
                  <a>Download</a>
                </div>
              </div>
              <div className="popuptext-box postion_10_pan">
                <div className="popup-border-linewidth"></div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(10, 1.3, 8000)}
                >
                  <a>Line Width </a>
                </div>
              </div>
              <div className="popuptext-box postion_14_pan">
                <div className="popup-border-linewidth"></div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleStepChange(15, 1.3, 47000)}
                >
                  <a>Opacity</a>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        dialogClassName="large-modal-popup help-gif-popup"
        aria-labelledby="myExtraLargeModalLabel"
        // show={showMainPopup}

        show={showPopup}
        /* onShow={handleSubPopupShow} */
        /* onHide={() => setShowPopup(false)} */
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

export default CanvasHelp;
