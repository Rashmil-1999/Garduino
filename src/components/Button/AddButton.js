import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
} from 'reactstrap';

const addButton = (props) => {
    return (
        <Button color="link" className="py-0" onClick={props.click}>Add</Button>
    );
};

addButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default addButton;
