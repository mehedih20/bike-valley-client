import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";

function OrderModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4 className="text-center fs-3">
          Order successful! <FcCheckmark />
        </h4>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="success fs-4" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderModal;
