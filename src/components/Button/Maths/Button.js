import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import './Button.css';

const button = (props) => {
    return (
        <div className="op-btn d-flex align-items-center justify-content-center">
            <Button color="link" className="text-dark" onClick={() => props.click(props.value)}>
                {props.name}
            </Button>
        </div>
    );
};

button.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
};

export default button;
