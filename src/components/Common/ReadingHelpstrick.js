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
              Use the <b>‘Strikethrough’</b> option to reformat the selected
              text by striking a line through it.
            </p>
          </div>
          <div className="canvas-procedure-image1  mt-4 ">
            <img ref={gifRef} src="./img/ReadingInfo/Strikethorugh.gif" />
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
          <Modal.Title>Reading Annotations Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the Reading Annotation.
          </p>
          <p className="border p-3 w-75 mx-auto position-relative">
            <div className="table-responsive">
              <table className="table mb-0 table-bordered green-table">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center align-middle" colspan="5">
                      All data reported is for measurements at sea level
                      elevation and at 15 ℃
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="color-light-blue text-center align-middle fw-700 text-i">
                      Substance/Mixture
                    </td>
                    <td className="color-light-blue text-center align-middle fw-700 text-i">
                      Approximate % of this gas in the air outside
                    </td>
                    <td className="color-light-blue text-center align-middle fw-700 text-i">
                      Boiling point (in °C)
                    </td>
                    <td className="color-light-blue text-center align-middle fw-700 text-i">
                      Density (g/L) measured at 0°C
                    </td>
                    <td className="color-light-blue text-center align-middle fw-700 text-i">
                      Flammability{" "}
                      <p className="fw-400">
                        {" "}
                        Notes on how the gas interacts with flame
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center align-middle">
                      <p>
                        <strong>nitrogen </strong>(substance)
                      </p>
                    </td>

                    <td className="text-center align-middle">78%</td>

                    <td className="text-center align-middle">-196%</td>
                    <td className="text-center align-middle">1.250</td>
                    <td className="text-center align-middle">
                      Will extinguish a flame.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center align-middle">
                      <p>
                        <strong>oxygen </strong>
                        <br />
                        (substance)
                      </p>
                    </td>

                    <td className="text-center align-middle">21%</td>
                    <td className="text-center align-middle">-183</td>
                    <td className="text-center align-middle">1.430</td>
                    <td className="text-center align-middle">
                      <span
                        className="text-decoration-line-through cursor-pointer"
                        onClick={() => handleStepChange(1, 1.1, 13000)}
                      >
                        {" "}
                        Will increase a flame or cause a glowing ember to burst
                        into flame.
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center align-middle">
                      <p>
                        <strong>argon</strong>
                        <br />
                        (substance)
                      </p>
                    </td>
                    <td className="text-center align-middle">~1%</td>
                    <td className="text-center align-middle">-186</td>
                    <td className="text-center align-middle">1.780</td>
                    <td className="text-center align-middle">
                      Will extinguish a flame.
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center align-middle">
                      <p>
                        <strong>carbon&nbsp;dioxide</strong>
                        <br />
                        (substance)
                      </p>
                    </td>
                    <td className="text-center align-middle">~0.04%</td>
                    <td className="text-center align-middle">
                      <p>N/A</p>
                      <p>
                        Changes straight from solid to gas with no liquid phase.
                      </p>
                      <p>This occurs at -78.4</p>
                    </td>
                    <td className="text-center align-middle">1.960</td>
                    <td className="text-center align-middle">
                      Will extinguish a flame.
                    </td>
                  </tr>
                  {/* <tr>
                    <td className="text-center align-middle">
                      <p>
                        <strong>neon</strong>
                        <br />
                        (substance)
                      </p>
                    </td>
                    <td className="text-center align-middle">~0.0018%</td>
                    <td className="text-center align-middle">-246</td>
                    <td className="text-center align-middle">0.900</td>
                    <td className="text-center align-middle">
                      Will extinguish a flame.
                    </td>
                  </tr> */}
                  {/* 
                     
                      <tr>
                        <td
                          className="text-center align-middle"
                          
                        >
                          <TableContentSelection
                            index={25}
                            active={props.selectedValues[25]}
                            updateSelectedValues={props.updateSelectedValues}
                            tabpopup={props.tabpopup}
                            displayValue={
                              "<strong>helium</strong><br/>(substance)"
                            }
                          />
                        </td>
                        <td
                          className="text-center align-middle"
                          
                        >
                          <TableContentSelection
                            index={26}
                            active={props.selectedValues[26]}
                            updateSelectedValues={props.updateSelectedValues}
                            tabpopup={props.tabpopup}
                            displayValue={"~0.0005%*"}
                          />
                        </td>
                        <td
                          className="text-center align-middle"
                          
                        >
                          <TableContentSelection
                            index={27}
                            active={props.selectedValues[27]}
                            updateSelectedValues={props.updateSelectedValues}
                            tabpopup={props.tabpopup}
                            displayValue={"-268"}
                          />
                        </td>
                        <td
                          className="text-center align-middle"
                          
                        >
                          <TableContentSelection
                            index={28}
                            active={props.selectedValues[28]}
                            updateSelectedValues={props.updateSelectedValues}
                            tabpopup={props.tabpopup}
                            displayValue={"0.179"}
                          />
                        </td>
                        <td
                          className="text-center align-middle"
                          
                        >
                          <TableContentSelection
                            index={29}
                            active={props.selectedValues[29]}
                            updateSelectedValues={props.updateSelectedValues}
                            tabpopup={props.tabpopup}
                            displayValue={"Will extinguish a flame."}
                          />
                        </td>
                      </tr> */}
                </tbody>
              </table>
            </div>

            <div className="popuptext-box postion_1_strickthrough">
              <div className="popup-border-80"></div>
              <div
                className="cursor-pointer"
                onClick={() => handleStepChange(1, 1.1, 13000)}
              >
                <a>Strikethrough</a>
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
