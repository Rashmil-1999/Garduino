import React from 'react';
import PropTypes from 'prop-types';

import RichTextEditorPopup from '../RichText/RichTextEditorPopup';
import {InputGroup, InputGroupAddon, Input, FormFeedback} from 'reactstrap'

function InputRichTextEditor(props) {

    const [richTextPopup, setRichTextPopup] = React.useState(false)

    const onRichTextPopupOpenHandler = () => {
        setRichTextPopup(true)
    }

    const onRichTextPopupCloseHandler = () => {
        setRichTextPopup(false)
    }

    const onRichTextPopupSubmitHandler = (value) => {
        setRichTextPopup(false)
        props.change(value);
    }


    return (
        <div>
            {richTextPopup ?
                <RichTextEditorPopup hide={onRichTextPopupCloseHandler} value={props.value}
                                     submit={onRichTextPopupSubmitHandler}/> : null}

            <InputGroup>
                <Input type='text' onChange={(event) => props.change(event.target.value)}
                       value={props.value} placeholder={props.placeholder}
                       invalid={props.valid !== undefined && !props.valid}/>
                <InputGroupAddon addonType="append">
                    <button className="btn btn-outline-secondary" type="button" onClick={onRichTextPopupOpenHandler}>
                        Rich Text
                    </button>
                </InputGroupAddon>
            </InputGroup>
            <FormFeedback>{props.errorText}</FormFeedback>
        </div>
    );
}

InputRichTextEditor.propTypes = {
    change: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool,
    error: PropTypes.string
};

export default InputRichTextEditor;
