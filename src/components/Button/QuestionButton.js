import React from 'react';
import PropTypes from 'prop-types';

const button = props => {
    return (
        <div id={props.id} onClick={props.click}>
            <span><i className='fa fa-question-circle'/></span>
        </div>
    );
};

button.propTypes = {
    id: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
};

export default button;
