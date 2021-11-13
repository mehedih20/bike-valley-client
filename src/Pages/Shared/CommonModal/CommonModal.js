import React from "react";
import { Modal, Button } from "react-bootstrap";

function CommonModal(props) {
  const { onHide } = props;

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="text-center fs-3">Are you sure?</h4>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="danger fs-4" onClick={() => onHide(true)}>
          Confirm
        </Button>
        <Button variant="success fs-4" onClick={() => onHide(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommonModal;
