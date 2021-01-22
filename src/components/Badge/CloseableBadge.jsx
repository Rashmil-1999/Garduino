import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'reactstrap';

const closeIconStyles = {
    color: 'inherit',
    border: 'none',
    background: 'inherit',
    fontSize: '100%',
    padding: '2px 4px 2px 4px',
};

const badge = (props) => {
    return (
        <Badge className={props.className}>
            {props.children}
            <button type="button" style={closeIconStyles} aria-label="Close" onClick={props.onClose} >
                <span aria-hidden="true">&times;</span>
            </button>
        </Badge>
    );
};

badge.propTypes = {
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default badge;