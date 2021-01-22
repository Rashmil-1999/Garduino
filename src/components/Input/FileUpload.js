import React from 'react';
import PropTypes from 'prop-types';

import {
    Label,
    Input,
    FormGroup,
    FormFeedback,
} from 'reactstrap';

const input = (props) => {
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input type="file" onChange={event => props.onChange(event.target.files)} disabled={props.disabled}
              value={props.value ? props.value.fileName : ''}
              placeholder={props.placeholder} invalid={!props.valid} className={props.className} />
            {!props.valid ? <FormFeedback invalid="true">{props.error}</FormFeedback> : null}
        </FormGroup>
    );
};

input.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    valid: PropTypes.bool,
    value: PropTypes.object,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default input;
