import React from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap';

function ConfirmationModal(props) {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader>Confirm your action</ModalHeader>
            <ModalBody>
                {props.body}
            </ModalBody>
            <ModalFooter>
                <Button name="Cancel" onClick={props.toggle} color="info">Cancel</Button>
                <Button name="Confirm" onClick={() => {
                    props.toggle();
                    props.confirm();
                }}>
                    Confirm
                </Button>
            </ModalFooter>
        </Modal>
    );
}

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    body: PropTypes.node,
    confirm: PropTypes.func,
    toggle: PropTypes.func,
};

export default ConfirmationModal;
