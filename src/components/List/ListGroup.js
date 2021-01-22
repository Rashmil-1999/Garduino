import React from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';

import PropTypes from 'prop-types';

const group = (props) => {
    return (
        <ListGroup>
            {props.items.map((item, index) => (
                <ListGroupItem key={index} onDragOver={() => props.dragOver(index)}
                  active={props.active ? props.active : index === props.draggedIndex}>
                    {props.render ? props.render(item, index) : item}
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

group.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    render: PropTypes.func,
    dragOver: PropTypes.func,
    active: PropTypes.bool,
    draggedIndex: PropTypes.number,
};

export default group;
