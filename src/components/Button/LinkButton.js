import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const button = (props) => {
    let icon = null;
    if (props.icon) {
        icon = <i className={props.icon} />;
    }

    return (
        <Button tag={Link} to={props.to} color={props.color ? props.color : 'primary'} disabled={props.disabled} onClick={props.onClick} style={props.style}
          className={props.className} size={props.size}>
            {props.name}{icon}
        </Button>
    );
};

button.propTypes = {
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    icon: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick : PropTypes.func,
};

export default button;

