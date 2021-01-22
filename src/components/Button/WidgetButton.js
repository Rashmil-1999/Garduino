import React from 'react';
import PropTypes from 'prop-types';

const button = props => {
    return (
        <div className='rdw-dropdown-wrapper rdw-fontsize-wrapper' onClick={props.click}>
            <i className="rdw-dropdown-selectedtext fa fa-bars" aria-hidden="true"/>
        </div>
    );
};

button.propTypes = {
    click: PropTypes.func.isRequired
};

export default button;