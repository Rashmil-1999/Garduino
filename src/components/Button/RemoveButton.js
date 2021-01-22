import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
} from 'reactstrap';

const removeButton = (props) => {
    return (
        <Button color="link" className="py-0" onClick={props.click}>Remove</Button>
    );
};

removeButton.propTypes = {
    click: PropTypes.func.isRequired,
};

export default removeButton;
