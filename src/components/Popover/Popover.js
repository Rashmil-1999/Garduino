import React from 'react';
import PropTypes from 'prop-types';

import { Popover, PopoverBody } from 'reactstrap';

const popover = (props) => {
    return (
        <Popover isOpen={props.open} target={props.id} toggle={props.toggle}>
            <PopoverBody>{props.children}</PopoverBody>
        </Popover>
    );
};

popover.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default popover;
