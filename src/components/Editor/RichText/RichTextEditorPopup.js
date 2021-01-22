import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Button, Modal, ModalBody, ModalFooter,} from 'reactstrap';

import RichTextEditor from './RichTextEditor';

function RichTextPopupEditor(props) {

    const [text, setText] = useState('')

    const onTextChangeHandler = (text) => {
        setText(text)
    }

    const onSubmitClickHandler = () => {
        props.submit(text)
    }

    useEffect(() => {
        setText(props.value)
    }, [props.value])

    return (
        <Modal isOpen scrollable centered>
            <ModalBody>
                <RichTextEditor change={onTextChangeHandler} value={text}/>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-info" onClick={onSubmitClickHandler}>OK</Button>
                <Button className="btn btn-info" onClick={props.hide}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

RichTextPopupEditor.propTypes = {
    submit: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default RichTextPopupEditor;
