import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormFeedback, Label } from 'reactstrap';

const select = (props) => {
    const classes = ['form-control'];
    if (props.valid !== undefined && !props.valid) {
        classes.push('is-invalid');
    }

    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <select className={classes.join(' ')} value={props.current} disabled={props.disabled}
              onChange={event => props.onChange(event.target.value)}>

                <option >--------</option>

                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <FormFeedback>{props.error}</FormFeedback>
        </FormGroup>
    );
};

select.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    current: PropTypes.string,
    disabled: PropTypes.bool,
};

export default select;
