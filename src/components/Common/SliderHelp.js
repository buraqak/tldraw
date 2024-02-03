import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import leftNavData from "../Lesson/LeftNavData";
import React, { useEffect, useState, useRef } from "react";
function SliderHelp({ closePopUp, thingsToShow }) {
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
              To order the lunar eclipse images correctly, make use of the{" "}
              <b>‘Slider’</b> and proceed to select each image.
            </p>
          </div>
          <div className="slider-procedure-image ">
            <img ref={gifRef} src="./img/SliderInfo/Lunar-Eclipse-New.gif" />
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
  let homeImage = "./img/SliderInfo/Lunar_main.png";
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
          <Modal.Title>Slider Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the Slider.
          </p>
          <div className=" mx-auto " id="slider-popup">
            <div class="mb-20 d-flex align-items-center number-slider">
              <div class="slide-number">
                <p class="single-green-header-title border-0 p-10">1</p>
              </div>
              <div class="slider">
                <div class="carousel">
                  <ol class="carousel-indicators">
                    <li></li>
                    <li class="active"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item d-block">
                      <img
                        class="bd-placeholder-img active"
                        src="./img/m3.png"
                        id="a4df6fa21e8e94d90ad4cd72b7a0e6c3e"
                        alt="The partial lunar eclipse was began at about 6.45 PM UTC"
                        title="The partial lunar eclipse was began at about 6.45 PM UTC"
                      />
                    </div>
                    <a
                      class="carousel-control-prev"
                      style={{ cursor: "default" }}
                      role="button"
                      href="#"
                    >
                      <span
                        aria-hidden="true"
                        class="carousel-control-prev-icon"
                      ></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      style={{ cursor: "default" }}
                      class="carousel-control-next"
                      role="button"
                      href="#"
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleStepChange(1, 1.1, 127500)}
                        aria-hidden="true"
                        class="carousel-control-next-icon"
                      ></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                  <div class="carousel-inner pt-5">
                    <p class="float-end">
                      Reprinted by permission of Kwon O Chul
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="popuptext-box postion_1_slider">
              <div className="popup-border-140"></div>
              <div
                className="cursor-pointer"
                onClick={() => handleStepChange(1, 1.1, 127500)}
              >
                <a>Slider</a>
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

export default SliderHelp;
