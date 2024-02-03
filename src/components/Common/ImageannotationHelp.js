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
            <p style={{ fontSize: "20px" }}>
              <b> Point Comment</b>
              <ul className="pt-10">
                {" "}
                <li>
                  {" "}
                  To add a comment connected to a specific point on the image,
                  click anywhere on the image to add a black dot then add a
                  comment in the text box provided.{" "}
                </li>
              </ul>
            </p>
          </div>
          <div className="canvas-procedure-image pt-4 mt-4 ">
            <img
              ref={gifRef}
              src="./img/ImageInfo/Point-and-area-comment.gif"
            />
          </div>
        </div>
      );
    } else if (id === 2) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p style={{ fontSize: "20px" }}>
              <b className="pt-20">Area Comment</b>
              <ul className="pt-10">
                {" "}
                <li>
                  To add a comment that describes a specific area of the image,
                  click and drag to select the area of interest, then add a
                  comment in the text box provided.
                </li>
              </ul>
            </p>
          </div>
          <div className="canvas-procedure-image pt-4 mt-4 ">
            <img ref={gifRef} src="./img/ImageInfo/Area-comment.gif" />
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
          <Modal.Title>Image Annotation​ Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the Image Annotation.
          </p>
          <p className="border p-3 image-annotation-popup mx-auto position-relative">
            <p className="text-center fw-700 mb-10 d-flex justify-content-center line-height-22 align-items-center position-relative mb-10">
              A Summary of Some Historical Investigations
            </p>
            <div className="w-100 mx-auto position-relative">
              <img src="./img/7_6_2_boston_graph1.jpg" alt="" />
              <div className="img-magnifier-point cursor-pointer">
                <div className="position-relative">
                  <div className="popuptext-box postion_2_imageannotations">
                    <div className="popup-border-240 cursor-context"></div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleStepChange(1, 2, 23000)}
                    >
                      <a>Point Comment</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-magnifier-box cursor-pointer ">
                <div className="dashed-border-box">
                  <div
                    className="plain-border-box"
                    onClick={() => handleStepChange(2, 2, 24000)}
                  ></div>
                  <div className="popuptext-box postion_1_imageannotations">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleStepChange(2, 2, 24000)}
                    >
                      <a>Area Comment</a>
                    </div>
                    <div className="popup-border-170 cursor-context"></div>
                  </div>
                </div>
                <div
                  className="white-border-box"
                  onClick={() => handleStepChange(1, 2, 23000)}
                >
                  Trend line goes down
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
