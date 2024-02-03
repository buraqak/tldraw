import { useEffect, useState } from "react";
import Annotation from "react-image-annotation";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ImageannotationHelp from "./ImageannotationHelp";
import ReadingHelp from "./ReadingHelp";
import {
  PointSelector,
  RectangleSelector,
  OvalSelector,
} from "react-image-annotation/lib/selectors";

function AnnotationComponent({ id, updateAnnotation, source, altText, marks }) {
  const [annotations, setAnnotations] = useState(marks);
  const [annotation, setAnnotation] = useState({});

  function onChange(_annotation) {
    setAnnotation(_annotation);
  }

  function onSubmit(_annotation) {
    const { geometry, data } = _annotation;

    setAnnotation({});
    let __annotations = annotations.concat({
      geometry,
      data: {
        ...data,
        id: Math.random(),
      },
    });
    setAnnotations(__annotations);
  }

  useEffect(() => {
    updateAnnotation(id, annotations);
  }, [annotations]);

  function resetAnnotations() {
    setAnnotations([]);
    setAnnotation({});
    handleClose();
  }
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [isShowHelp, setIsShowHelp] = useState(false);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className="name-modal"
        aria-labelledby="contained-modal-title-vcenter"
        data-backdrop="static"
        centered
      >
        <Modal.Header>
          <Modal.Title id="student_name">Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pdf-download-modal">
          Continue to reset the annotations made?
          <br />
          <div className="d-flex justify-content-center mt-3">
            <div className="text-center submit me-3">
              <Button
                variant="primary"
                onClick={() => {
                  resetAnnotations();
                }}
              >
                Yes
              </Button>
            </div>
            <div className="text-center submit">
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                }}
              >
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {console.log("Alt:", altText)}
      <div className="col-11 col-lg-8 mx-auto">
        <h4 style={{ color: "333" }} className="text-center mb-20 ">
          {isShowHelp ? (
            <ImageannotationHelp
              closePopUp={() => setIsShowHelp(false)}
              thingsToShow={{
                pen: true,
                line: false,
                pan: false,
                zoom: false,
                opacity: false,
                circle: false,
                fitToScreen: false,
              }}
            />
          ) : null}
          Image Annotation
          <img
            src="./img/CanvasInfo/help_icon_1.png"
            className="cursor-pointer canvas-help-icon help_icon_35 position-absolute help-icon-50 "
            title={"Help"}
            onClick={() => setIsShowHelp(true)}
          />
        </h4>
        <div title={altText}>
          <Annotation
            activeAnnotations={annotations}
            src={source}
            alt={altText}
            title={altText}
            annotations={annotations}
            type={RectangleSelector.TYPE}
            value={annotation}
            onChange={onChange}
            onSubmit={onSubmit}
            allowTouch
          />
        </div>
      </div>
      <div className="d-flex justify-content-end mt-40 me-2">
        <button
          className="blue-button"
          onClick={() => {
            setShow(true);
          }}
        >
          Reset annotation{" "}
        </button>
      </div>
    </div>
  );
}

export default AnnotationComponent;
