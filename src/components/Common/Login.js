import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LoginName = (props) => {
  const [inputName, setinputName] = useState(false);
  const handleClose = () => setinputName(false);
  useEffect(() => {
    if (props.value == "") {
      setinputName(true);
    } else {
      setinputName(false);
    }
  }, []);
  const shadow = {
    background: "rgba(0, 0, 0, .65)",
  };
  return (
    <React.Fragment>
      <Modal
        className="name-modal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        data-backdrop="static"
        centered
        show={inputName}
        onHide={() => handleClose}
        style={{ ...shadow }}
      >
        <Modal.Header>
          <Modal.Title id="student_name">Enter Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            name="studentName"
            value={props.value}
            onChange={props.handleChange}
            className="form-control"
            rows="1"
            placeholder="Enter name"
          ></textarea>
        </Modal.Body>
        <Modal.Footer closeButton>
          <Button
            disabled={props.value.length < 1}
            variant="primary"
            onClick={handleClose}
          >
            Go
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default LoginName;