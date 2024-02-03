import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import leftNavData from "../Lesson/LeftNavData";
import React, { useEffect, useState, useRef } from "react";

function TraitHelp({ closePopUp, thingsToShow }) {
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
              Add a title to your sort by typing in the text field above the
              sortable images.
            </p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Sort-title.gif" />
          </div>
        </div>
      );
    } else if (id === 2) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              To sort images into the appropriate category, drag and drop the
              images from the sortable images carousel.
            </p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Add-images-traits.gif" />
          </div>
        </div>
      );
    } else if (id === 3) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Add a title to each category by typing in the text field provided
              at the top of the category area.
            </p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Catogory-title.gif" />
          </div>
        </div>
      );
    } else if (id === 4) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Delete a category by clicking on the x in the top right corner of
              the category. A pop-up window will appear to confirm that you want
              to delete the category.
            </p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Delete-variationm.gif" />
          </div>
        </div>
      );
    } else if (id === 5) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Remove an image from a category by clicking the x in the top right
              corner of the image.
            </p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Delete-images.gif" />
          </div>
        </div>
      );
    } else if (id === 6) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>Click on the plus sign (+) button to add a new category.</p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Add-variation.gif" />
          </div>
        </div>
      );
    } else if (id === 7) {
      setPopupContent(
        <div className="canvas-procedure-box ">
          <div className="canvas-procedure-text d-flex justify-content-center align-items-center">
            <p>
              Use the Download Images icon, above the sortable images, to view
              and/or download all images used in the sort.
            </p>
          </div>
          <div className="traits-procedure-image">
            <img ref={gifRef} src="./img/TraitInfo/Download-images.gif" />
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
  let homeImage = "./img/TraitInfo/main.png";
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
        dialogClassName="large-modal-popup Help-popup"
      >
        <Modal.Header
          className="model-header-popup"
          onClick={closePopUp}
          closeButton
        >
          <Modal.Title>Drag and Drop Help</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <p className="mb-10 text-center fw-bold">
            Click on an option to learn how to use it on the drag and drop.
          </p>
          <div
            class="accordion accordion-flush image-matches-accordion show traits-main-popup position-relative"
            id="accordionExample1"
          >
            <div
              id="accord1"
              class="accordion-item image-matches-accordion-list"
            >
              <h2 class="accordion-header" id="accord1">
                <button
                  class="accordion-button"
                  type="button"
                  /* data-bs-toggle="collapse"
                  data-bs-target="#collapseaccord1"
                  aria-expanded="true"
                  aria-controls="collapseaccord1" */
                >
                  <span>Organism: Apple</span>
                </button>
              </h2>
              <div
                id="collapseaccord1"
                class="accordion-collapse collapse show"
                aria-labelledby="accord1"
                data-bs-parent="#accordionExample1"
              >
                <div class="accordion-body p-0 ">
                  <div class="container px-0">
                    <div>
                      <div class="tab-content" id="myTabContent">
                        <div
                          class="tab-pane fade show active"
                          id="traitapple0"
                          role="tabpanel"
                          aria-labelledby="Color-tab"
                        >
                          <div>
                            <div
                              onClick={() => handleStepChange(1, 1.8, 10000)}
                              class="trait-input cursor-pointer position-relative"
                            >
                              <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput1"
                                name="traitName"
                                placeholder="<Type your Traits here>"
                                value=""
                              />
                              <div
                                className="popuptext-box postion_1_traits"
                                onClick={() => handleStepChange(1, 1.8, 10000)}
                              >
                                <div>
                                  <a>Sort Title</a>
                                </div>
                                <div className="popup-border"></div>
                              </div>
                            </div>
                            <div class="popup position-relative">
                              <div
                                class="float-end images-list-popup-icon py-1 position-relative"
                                id="traits-popup-download"
                              >
                                <button
                                  onClick={() => handleStepChange(7, 2.4, 4000)}
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdropaccord1"
                                >
                                  <img src="./img/image-popup-icon.svg" />
                                </button>
                                <div
                                  className="popuptext-box postion_8_traits"
                                  onClick={() => handleStepChange(7, 2.4, 4000)}
                                >
                                  <div className="popup-border"></div>
                                  <div>
                                    <a>Download Images</a>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="modal fade"
                                id="staticBackdropaccord1"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabindex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div
                                  class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-dialog-scrollable 
                            modal-lg"
                                >
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1
                                        class="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        Organism: Apple
                                      </h1>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      <div class="float-end">
                                        <a
                                          class="btn btn-primary"
                                          href="./img/apple/AppleCard.png"
                                          download=""
                                        >
                                          Download image
                                        </a>
                                      </div>
                                      <div class="trait-images-listings">
                                        <div class="trait-image">
                                          <img
                                            src="./img/apple/AppleCard.png"
                                            width="100%"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="popuptext-box postion_3_traits"
                                onClick={() => handleStepChange(2, 2.6, 14000)}
                              >
                                <div>
                                  <a>Sortable Images</a>
                                </div>
                                <div className="popup-border"></div>
                              </div>
                            </div>
                            <div
                              onClick={() => handleStepChange(2, 2.6, 14000)}
                              class="image-container-popup cursor-pointer "
                              data-rbd-droppable-id="gallery"
                              data-rbd-droppable-context-id="1"
                              /*  style="background: lightgrey; display: flex; 
                                  padding: 8px; width: 100%; overflow-x: auto;" */
                            >
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #1"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #1"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #1"
                                /*  style="user-select: none; padding: 1px; 
                            height: auto; margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #1</h6>
                                  <img
                                    src="./img/apple/Apple1.jpg"
                                    width="250px"
                                    alt="Apple1"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #2"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #2"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #2"
                                /*  style="user-select: none; padding: 1px; height: auto; 
                            margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #2</h6>
                                  <img
                                    src="./img/apple/Apple2.jpg"
                                    width="250px"
                                    alt="Apple2"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #3"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #3"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #3"
                                /*  style="user-select: none; padding: 1px;
                             height: auto; margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #3</h6>
                                  <img
                                    src="./img/apple/Apple3.jpg"
                                    width="250px"
                                    alt="Apple3"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #4"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #4"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #4"
                                /*  style="user-select: none; padding: 1px; 
                            height: auto; margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #4</h6>
                                  <img
                                    src="./img/apple/Apple4.jpg"
                                    width="250px"
                                    alt="Apple4"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #5"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #5"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #5"
                                /* style="user-select: none; padding: 1px; height: auto; 
                            margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #5</h6>
                                  <img
                                    src="./img/apple/Apple5.jpg"
                                    width="250px"
                                    alt="Apple5"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #6"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #6"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #6"
                                /* style="user-select: none; padding: 1px; height: auto; 
                            margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #6</h6>
                                  <img
                                    src="./img/apple/Apple6.jpg"
                                    width="250px"
                                    alt="Apple6"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #7"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #7"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #7"
                                /* style="user-select: none; padding: 1px; 
                            height: auto; margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #7</h6>
                                  <img
                                    src="./img/apple/Apple7.jpg"
                                    width="250px"
                                    alt="Apple7"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #8"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #8"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #8"
                                /* style="user-select: none; padding: 1px; 
                            height: auto; margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #8</h6>
                                  <img
                                    src="./img/apple/Apple8.jpg"
                                    width="250px"
                                    alt="Apple8"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #9"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #9"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #9"
                                /* style="user-select: none; padding: 1px; 
                            height: auto; margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #9</h6>
                                  <img
                                    src="./img/apple/Apple9.jpg"
                                    width="250px"
                                    alt="Apple9"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #10"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #10"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #10"
                                /* style="user-select: none; padding: 1px; height: auto; margin: 0px 8px 0px 0px; 
                            background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #10</h6>
                                  <img
                                    src="./img/apple/Apple10.jpg"
                                    width="250px"
                                    alt="Apple10"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #11"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #11"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #11"
                                /*  style="user-select: none; padding: 1px; height: auto; 
                            margin: 0px 8px 0px 0px; background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #11</h6>
                                  <img
                                    src="./img/apple/Apple11.jpg"
                                    width="250px"
                                    alt="Apple11"
                                  />
                                </div>
                              </div>
                              <div
                                data-rbd-draggable-context-id="1"
                                data-rbd-draggable-id="Apple #12"
                                tabindex="0"
                                role="button"
                                aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                data-rbd-drag-handle-draggable-id="Apple #12"
                                data-rbd-drag-handle-context-id="1"
                                draggable="false"
                                title="Apple #12"
                                /* style="user-select: none; padding: 1px; height: auto; margin: 0px 8px 0px 0px; 
                            background: rgb(230, 220, 220);" */
                              >
                                <div>
                                  <h6 class="text-center">Apple #12</h6>
                                  <img
                                    src="./img/apple/Apple12.jpg"
                                    width="250px"
                                    alt="Apple12"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="variation-cards py-1">
                              <div class="row ">
                                <div class="col-6">
                                  <div class="card h-100">
                                    <div
                                      class="variation-remove "
                                      onClick={() =>
                                        handleStepChange(4, 1.0, 6000)
                                      }
                                    >
                                      <div className="position-relative">
                                        <img src="./img/variation-remove.svg" />
                                        <div
                                          className="popuptext-box postion_5_traits"
                                          onClick={() =>
                                            handleStepChange(4, 1.0, 6000)
                                          }
                                        >
                                          <div className="popup-border"></div>
                                          <div>
                                            <a>Delete Category</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="card-body">
                                      <div
                                        onClick={() =>
                                          handleStepChange(3, 3.8, 23000)
                                        }
                                        class="trait-input variation-input cursor-pointer position-relative"
                                      >
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="exampleFormControlInput1"
                                          name="name"
                                          placeholder="<Type your variation here>"
                                          value=""
                                        />
                                        <div
                                          className="popuptext-box postion_4_traits"
                                          onClick={() =>
                                            handleStepChange(3, 3.8, 23000)
                                          }
                                        >
                                          <div>
                                            <a>Category Title</a>
                                          </div>
                                          <div className="popup-border"></div>
                                        </div>
                                      </div>
                                      <div class="variation-body">
                                        <div
                                          data-rbd-droppable-id="variant0"
                                          data-rbd-droppable-context-id="1"
                                          /* style="overflow: auto; height: 100%;" */
                                        >
                                          <div class="variation-selection-none variation-selection">
                                            <div
                                              data-rbd-draggable-context-id="1"
                                              data-rbd-draggable-id="variantImage00"
                                              tabindex="0"
                                              role="button"
                                              aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                              data-rbd-drag-handle-draggable-id="variantImage00"
                                              data-rbd-drag-handle-context-id="1"
                                              draggable="false"
                                              title="Apple #2"
                                            >
                                              <div class="variation-selected-list">
                                                <p
                                                  class="text-center py-1"
                                                  id="title-bg-popup"
                                                >
                                                  Apple #2
                                                </p>
                                                <div class="variation-selected-image">
                                                  <img
                                                    src="./img/apple/Apple2.jpg"
                                                    alt="Apple2"
                                                  />
                                                </div>
                                                <div
                                                  class="variation-remove cursor-pointer"
                                                  onClick={() =>
                                                    handleStepChange(
                                                      5,
                                                      0.4,
                                                      3000
                                                    )
                                                  }
                                                >
                                                  <div className="position-relative">
                                                    <img src="./img/variation-selected-remove.svg" />
                                                    <div
                                                      className="popuptext-box postion_6_traits"
                                                      onClick={() =>
                                                        handleStepChange(
                                                          5,
                                                          0.4,
                                                          3000
                                                        )
                                                      }
                                                    >
                                                      <div className="popup-border-100 "></div>
                                                      <div>
                                                        <a>Remove Image</a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              data-rbd-draggable-context-id="1"
                                              data-rbd-draggable-id="variantImage00"
                                              tabindex="0"
                                              role="button"
                                              aria-describedby="rbd-hidden-text-1-hidden-text-1"
                                              data-rbd-drag-handle-draggable-id="variantImage00"
                                              data-rbd-drag-handle-context-id="1"
                                              draggable="false"
                                              title="Apple #2"
                                            >
                                              <div class="variation-selected-list">
                                                <p
                                                  class="text-center py-1"
                                                  id="title-bg-popup"
                                                >
                                                  Apple #2
                                                </p>
                                                <div class="variation-selected-image">
                                                  <img
                                                    src="./img/apple/Apple2.jpg"
                                                    alt="Apple2"
                                                  />
                                                </div>
                                                <div class="variation-remove">
                                                  <img src="./img/variation-selected-remove.svg" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      class="variation-add"
                                      onClick={() =>
                                        handleStepChange(6, 1.4, 8000)
                                      }
                                    >
                                      <div className="position-relative">
                                        <img src="./img/variation-add.svg" />
                                        <div
                                          className="popuptext-box postion_7_traits"
                                          onClick={() =>
                                            handleStepChange(6, 1.4, 8000)
                                          }
                                        >
                                          <div className="popup-border"></div>
                                          <div>
                                            <a>Add Category</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default TraitHelp;
