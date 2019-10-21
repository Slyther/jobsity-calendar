import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = (props) => {
  return (
    <Modal show={props.showConfirmationModal} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.deleteAll ? 'Clear Day?' : 'Delete Reminder?'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.deleteAll
          ? 'Are you sure you want to clear the schedule for the day?'
          : 'Are you sure you want to delete this reminder?'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (props.deleteAll) {
              props.onDeleteAll();
            } else {
              props.onDeleteOne();
            }
            props.onCancel();
          }}>
          {props.deleteAll ? 'Clear Day?' : 'Delete Reminder?'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  showConfirmationModal: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  deleteAll: PropTypes.bool,
  onDeleteAll: PropTypes.func.isRequired,
  onDeleteOne: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  deleteAll: true,
  onDeleteOne: (f) => f,
};

export default ConfirmationModal;
