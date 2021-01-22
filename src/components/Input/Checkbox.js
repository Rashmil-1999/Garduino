import React from 'react';
import PropTypes from 'prop-types';

import {
    Label,
    FormGroup,
} from 'reactstrap';

const checkbox = (props) => {
    let className = 'form-control';
    if (props.className) {
        className += props.className;
    }
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <input type="checkbox" onChange={event => props.onChange(event.target.value, event.target.checked)}
              disabled={props.disabled} value={props.value} className={className} checked={props.checked} />
        </FormGroup>
    );
};

checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

export default checkbox;
