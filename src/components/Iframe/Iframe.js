import React from 'react';
import PropTypes from 'prop-types';

const iframe = (props) => {
    return (
        <div className="p-1 mb-4" style={{ border: '1px solid #dee2e6', borderRadius: '.25rem' }}>
            <div className="iframe-container text-center" style={{ maxHeight: '200px' }}>
                <iframe src={props.uRL} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen title={props.uRL} />
            </div>
        </div>
    );
};

iframe.propTypes = {
    uRL: PropTypes.string.isRequired,
};

export default iframe;
