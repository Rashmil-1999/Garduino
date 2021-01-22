import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'reactstrap';

const learningOutcomeBadges = (props) => {
    return (
        <React.Fragment>
            {props.outcomes.map((outcome, index) => (
                <Badge key={index} color="warning" className="mx-2">{outcome.learning_outcome_id}</Badge>
            ))}
        </React.Fragment>
    );
};

learningOutcomeBadges.propTypes = {
    outcomes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default learningOutcomeBadges;
