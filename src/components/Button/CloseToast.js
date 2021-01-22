import React from 'react';
import PropTypes from 'prop-types';

import closeBtn from '../../assets/images/close_toast.svg';

const CloseToast = ({ closeToast }) => (
    <img className="img" onClick={closeToast} src={closeBtn} alt="" />
);

CloseToast.propTypes = {
    closeToast: PropTypes.func,
};

export default CloseToast;
