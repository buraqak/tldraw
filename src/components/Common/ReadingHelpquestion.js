import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";

import React, { useEffect, useState, useRef } from "react";
function ReadingHelp({ closePopUp, thingsToShow }) {
  const [activeKey, setActiveKey] = useState("Main");

  let homeImage = "./img/ReadingInfo/Reading_Comment.png";
  if (thingsToShow.line) homeImage = "./img/ReadingInfo/Star-text.png";
  if (thingsToShow.zoom) homeImage = "./img/ReadingInfo/strick_main.png";
  if (thingsToShow.pan) homeImage = "./img/ReadingInfo/Question_mark.png";

  useEffect(() => {
    /*  if (thingsToShow.line) {
      setActiveKey("Graph");
    } else if (thingsToShow.circle) {
      setActiveKey("Circle");
    } else if (thingsToShow.graph) {
      setActiveKey("graph");
    } */
  }, []);
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
              Use the <b>‘Bold’</b> option to reformat the selected text by
              making it bold.
            </p>
          </div>
          <div className="canvas-procedure-image mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Bold.gif" />
          </div>
        </div>
      );
    } else if (id === 2) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Italic’</b> option to reformat the selected text by
              making it italic.
            </p>
          </div>
          <div className="canvas-procedure-image mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Italic.gif" />
          </div>
        </div>
      );
    } else if (id === 3) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Underline’</b> option to reformat the selected text by
              underling it.
            </p>
          </div>
          <div className="canvas-procedure-image mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Underline.gif" />
          </div>
        </div>
      );
    } else if (id === 4) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Text Color’</b> option to reformat the selected text
              by changing its color.
            </p>
          </div>
          <div className="canvas-procedure-image mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Text-color.gif" />
          </div>
        </div>
      );
    } else if (id === 5) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Text Highlight’</b> option to reformat the selected
              text by highlighting it.
            </p>
          </div>
          <div className="canvas-procedure-image mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Text-highlight.gif" />
          </div>
        </div>
      );
    } else if (id === 6) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Circle’</b> option to add a circle around the selected
              text.
            </p>
          </div>
          <div className="canvas-procedure-image mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Circle.gif" />
          </div>
        </div>
      );
    } else if (id === 10) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>'Question Mark’</b> option to reformat the selected
              text by making it bold and adding a question mark at the end of
              the selection.
            </p>
          </div>
          <div className="canvas-procedure-image ">
            <img ref={gifRef} src="./img/ReadingInfo/Questionmark.gif" />
          </div>
        </div>
      );
    } else if (id === 8) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the <b>‘Delete’</b> option to undo any format changes, remove
              a circle, or delete a comment.
            </p>
          </div>
          <div className="canvas-procedure-image1  mt-lg-4 pt-lg-4">
            <img ref={gifRef} src="./img/ReadingInfo/Delete.gif" />
          </div>
        </div>
      );
    }

    let start;
    const step = (timestamp) => {
      //if (!showPopup) return false;
      if (!start) start = timestamp;
      //console.log(timestamp, popUp);
      const elapsed = timestamp - start;

      setProgress(Math.min((elapsed / progressDuration) * 100, 100));

      if (elapsed < progressDuration && gifRef?.current?.src) {
        requestAnimationFrame(step);
        // console.log(progressDuration);
        // console.log(elapsed);
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
          <Modal.Title>Reading Annotations Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the Reading Annotation.
          </p>
          <p className="border p-3 reading-popup-box mx-auto position-relative">
            <p className="text-center fw-700 mb-10 d-flex justify-content-center line-height-22 align-items-center position-relative mb-10">
              How Light Warms Up Matter
            </p>
            <p className="mb-10 line-height-22">
              <strong>Light does a few different things</strong> when it shines
              on matter. When light shines on something, some of the light
              reflects off the particles. This is called <em>reflection</em>.
              <u>When light reflects off a mirror</u>, for example, we see an
              image reflected back at our eye.{" "}
              <span style={{ color: "rgb(254, 105, 42)" }}>
                This only happens when light shines on a surface that is very
                smooth
              </span>
              , like the surface of mirrors and glass. If the surface is bumpy,
              light still reflects off particles,{" "}
              <span style={{ backgroundColor: "rgb(210, 112, 255)" }}>
                but it scatters in all directions,
              </span>{" "}
              and only some of that light reaches our eyes.
            </p>
            <p
              className="mb-10 line-height-22"
              style={{ paddingBottom: "130px" }}
            >
              Sometimes light moves right past the particles. This is called
              transmission.{" "}
              <strong className="ql-custom-question">
                When light transmits through a transparent material, like a
                window, we can see everything on the other side.
              </strong>{" "}
              Sometimes light transmits through one transparent material, like a
              clear plastic cup, but cannot transmit as well through the drink
              inside, like coffee or tea.
            </p>

            <div className="reading-bubbleicon-popup">
              <div className="ql-bubble position-relative">
                <div className="ql-tooltip">
                  <span className="ql-tooltip-arrow"></span>
                  <div className="ql-toolbar popup-featues">
                    <span className="ql-formats">
                      <button type="button" class="ql-bold position-relative">
                        <svg
                          className="cursor-pointer"
                          viewBox="0 0 18 18"
                          onClick={() => handleStepChange(1, 2, 20000)}
                        >
                          <path
                            class="ql-stroke"
                            d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                          ></path>{" "}
                          <path
                            class="ql-stroke"
                            d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                          ></path>{" "}
                        </svg>
                        <div className="popuptext-box postion_1_reading">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleStepChange(1, 2, 20000)}
                          >
                            <a>Bold</a>
                          </div>
                          <div className="popup-border-90"></div>
                        </div>
                      </button>
                      <button type="button" class="ql-italic position-relative">
                        <svg
                          className="cursor-pointer"
                          viewBox="0 0 18 18"
                          onClick={() => handleStepChange(2, 1.5, 17000)}
                        >
                          {" "}
                          <line
                            class="ql-stroke"
                            x1="7"
                            x2="13"
                            y1="4"
                            y2="4"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="5"
                            x2="11"
                            y1="14"
                            y2="14"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="8"
                            x2="10"
                            y1="14"
                            y2="4"
                          ></line>{" "}
                        </svg>
                        <div className="popuptext-box postion_2_reading coloum-gap-0 ">
                          <div
                            className="text-title-popup mt-5 cursor-pointer"
                            onClick={() => handleStepChange(2, 2, 17000)}
                          >
                            <a>Italic</a>
                          </div>

                          <div className="popup-border-170 height-20"></div>
                          <div className="popup-border-ttob"></div>
                        </div>
                      </button>
                      <button
                        type="button"
                        class="ql-underline position-relative"
                      >
                        <svg
                          className="cursor-pointer"
                          viewBox="0 0 18 18"
                          onClick={() => handleStepChange(3, 2, 20000)}
                        >
                          {" "}
                          <path
                            class="ql-stroke"
                            d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
                          ></path>{" "}
                          <rect
                            class="ql-fill"
                            height="1"
                            rx="0.5"
                            ry="0.5"
                            width="12"
                            x="3"
                            y="15"
                          ></rect>{" "}
                        </svg>
                        <div className="popuptext-box postion_3_reading  coloum-gap-0">
                          <div
                            className="text-title-popup mt-40 cursor-pointer"
                            onClick={() => handleStepChange(3, 2, 20000)}
                          >
                            <a>Underline</a>
                          </div>
                          <div className="popup-border-240 height-50"></div>
                          <div className="popup-border-ttob height-50"></div>
                        </div>
                      </button>
                      <button class="ql-color ql-picker ql-color-picker position-relative">
                        <span
                          onClick={() => handleStepChange(4, 2, 20000)}
                          class="ql-picker-label"
                          tabindex="-1"
                          role="button"
                          aria-expanded="false"
                          aria-controls="ql-picker-options-2"
                          data-value="#FE692A"
                        >
                          <svg
                            className="cursor-pointer"
                            viewBox="0 0 18 18"
                            onClick={() => handleStepChange(4, 2, 20000)}
                          >
                            <line
                              class="ql-color-label ql-stroke ql-transparent"
                              x1="3"
                              x2="15"
                              y1="15"
                              y2="15"
                            ></line>
                            <polyline
                              class="ql-stroke"
                              points="5.5 11 9 3 12.5 11"
                            ></polyline>
                            <line
                              class="ql-stroke"
                              x1="11.63"
                              x2="6.38"
                              y1="9"
                              y2="9"
                            ></line>
                          </svg>
                        </span>
                        <div className="popuptext-box postion_4_reading coloum-gap-0">
                          <div
                            className="text-title-popup mt-80 cursor-pointer"
                            onClick={() => handleStepChange(4, 2, 20000)}
                          >
                            <a>Text Color</a>
                          </div>
                          <div className="popup-border-310 height-90"></div>
                          <div className="popup-border-ttob height-90"></div>
                        </div>
                      </button>
                      <button className="position-relative">
                        <svg
                          className="cursor-pointer"
                          viewBox="0 0 18 18"
                          onClick={() => handleStepChange(5, 1.8, 22000)}
                        >
                          {" "}
                          <g class="ql-fill ql-color-label">
                            {" "}
                            <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon>{" "}
                            <rect height="1" width="1" x="4" y="4"></rect>{" "}
                            <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon>{" "}
                            <rect height="1" width="1" x="2" y="6"></rect>{" "}
                            <rect height="1" width="1" x="3" y="5"></rect>{" "}
                            <rect height="1" width="1" x="4" y="7"></rect>{" "}
                            <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon>{" "}
                            <rect height="1" width="1" x="2" y="12"></rect>{" "}
                            <rect height="1" width="1" x="2" y="9"></rect>{" "}
                            <rect height="1" width="1" x="2" y="15"></rect>{" "}
                            <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon>{" "}
                            <rect height="1" width="1" x="3" y="8"></rect>{" "}
                            <path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"></path>{" "}
                            <path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"></path>{" "}
                            <path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"></path>{" "}
                            <rect height="1" width="1" x="12" y="2"></rect>{" "}
                            <rect height="1" width="1" x="11" y="3"></rect>{" "}
                            <path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"></path>{" "}
                            <rect height="1" width="1" x="2" y="3"></rect>{" "}
                            <rect height="1" width="1" x="6" y="2"></rect>{" "}
                            <rect height="1" width="1" x="3" y="2"></rect>{" "}
                            <rect height="1" width="1" x="5" y="3"></rect>{" "}
                            <rect height="1" width="1" x="9" y="2"></rect>{" "}
                            <rect height="1" width="1" x="15" y="14"></rect>{" "}
                            <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon>{" "}
                            <rect height="1" width="1" x="13" y="7"></rect>{" "}
                            <rect height="1" width="1" x="15" y="5"></rect>{" "}
                            <rect height="1" width="1" x="14" y="6"></rect>{" "}
                            <rect height="1" width="1" x="15" y="8"></rect>{" "}
                            <rect height="1" width="1" x="14" y="9"></rect>{" "}
                            <path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"></path>{" "}
                            <rect height="1" width="1" x="14" y="3"></rect>{" "}
                            <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon>{" "}
                            <rect height="1" width="1" x="15" y="2"></rect>{" "}
                            <rect height="1" width="1" x="12" y="5"></rect>{" "}
                            <rect height="1" width="1" x="13" y="4"></rect>{" "}
                            <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon>{" "}
                            <rect height="1" width="1" x="9" y="14"></rect>{" "}
                            <rect height="1" width="1" x="8" y="15"></rect>{" "}
                            <path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"></path>{" "}
                            <rect height="1" width="1" x="5" y="15"></rect>{" "}
                            <path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"></path>{" "}
                            <rect height="1" width="1" x="11" y="15"></rect>{" "}
                            <path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"></path>{" "}
                            <rect height="1" width="1" x="14" y="15"></rect>{" "}
                            <rect height="1" width="1" x="15" y="11"></rect>{" "}
                          </g>{" "}
                          <polyline
                            class="ql-stroke"
                            points="5.5 13 9 5 12.5 13"
                          ></polyline>{" "}
                          <line
                            class="ql-stroke"
                            x1="11.63"
                            x2="6.38"
                            y1="11"
                            y2="11"
                          ></line>{" "}
                        </svg>
                        <div className="popuptext-box postion_5_reading coloum-gap-0">
                          <div className="popup-border-ttob height-90"></div>
                          <div className="popup-border-240 height-90"></div>

                          <div
                            className="text-title-popup mt-80 pl-5 cursor-pointer"
                            onClick={() => handleStepChange(5, 1.8, 22000)}
                          >
                            <a>Text Highlight</a>
                          </div>
                        </div>
                      </button>
                      <button type="button" class="ql-clean position-relative">
                        <svg
                          className="cursor-pointer"
                          viewBox="0 0 18 18"
                          onClick={() => handleStepChange(8, 2.4, 36000)}
                        >
                          {" "}
                          <line
                            class="ql-stroke"
                            x1="5"
                            x2="13"
                            y1="3"
                            y2="3"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="6"
                            x2="9.35"
                            y1="12"
                            y2="3"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="11"
                            x2="15"
                            y1="11"
                            y2="15"
                          ></line>{" "}
                          <line
                            class="ql-stroke"
                            x1="15"
                            x2="11"
                            y1="11"
                            y2="15"
                          ></line>{" "}
                          <rect
                            class="ql-fill"
                            height="1"
                            rx="0.5"
                            ry="0.5"
                            width="7"
                            x="2"
                            y="14"
                          ></rect>{" "}
                        </svg>
                        <div className="popuptext-box postion_8_reading coloum-gap-0">
                          <div className="popup-border-ttob height-50"></div>
                          <div className="popup-border-230 height-50"></div>

                          <div
                            className="text-title-popup mt-40 pl-5 cursor-pointer"
                            onClick={() => handleStepChange(8, 2.4, 36000)}
                          >
                            <a>Delete</a>
                          </div>
                        </div>
                      </button>

                      <span className="position-relative">
                        <button
                          onClick={() => handleStepChange(6, 1.1, 14000)}
                          type="button"
                          class="ql-circle cursor-pointer"
                        >
                          {" "}
                        </button>
                        <div className="popuptext-box postion_6_reading coloum-gap-0">
                          <div className="popup-border-ttob"></div>
                          <div className="popup-border-170 height-20"></div>
                          <div
                            style={{ color: "#000" }}
                            className="text-title-popup mt-8 pl-5 cursor-pointer"
                            onClick={() => handleStepChange(6, 1.1, 14000)}
                          >
                            <a>Circle</a>
                          </div>
                        </div>
                      </span>
                      <span className="position-relative">
                        <button
                          onClick={() => handleStepChange(10, 1.1, 15000)}
                          type="button"
                          class="ql-question "
                        >
                          <img
                            className="cursor-pointer"
                            src="./img/questionMark.svg"
                            width="`20px`"
                            height="`20px`/"
                          />
                        </button>
                        <div className="popuptext-box postion_7_reading_question">
                          <div className="popup-border-80"></div>
                          <div
                            className="cursor-pointer w-120"
                            onClick={() => handleStepChange(10, 1.1, 15000)}
                            style={{ color: "#000" }}
                          >
                            <a>Question Mark</a>
                          </div>
                        </div>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </p>
        </Modal.Body>
      </Modal>

      <Modal
        dialogClassName="large-modal-popup help-gif-popup"
        show={showPopup}
        /* onShow={handleSubPopupShow} */
        onHide={closeshowPopup}
        aria-labelledby="myExtraLargeModalLabel"
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

export default ReadingHelp;
