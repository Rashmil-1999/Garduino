import React from 'react';
import PropTypes from 'prop-types';

import './Button.css'

const button = props => {
    const classes = ["btn", "btn-default", "btn-custom"]
    if (props.isLoading) {
        classes.push("btn-waiting")
    }
    if (props.classes) {
        classes.push(...props.classes)
    }
    return (
        <button className={classes.join(" ")} onClick={props.onClick}
                disabled={props.isDisabled || props.isLoading}>
            {props.isLoading ?
                <div><i className="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Loading</div> : props.name}
        </button>
    );
};

button.propTypes = {
    name: PropTypes.oneOf(PropTypes.string, PropTypes.object).isRequired,
    classes: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,

};

export default button;
