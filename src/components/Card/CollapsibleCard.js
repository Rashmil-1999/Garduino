import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
Card, CardHeader, CardBody, Collapse, FormFeedback, Badge,
 } from 'reactstrap';
import AddButton from '../Button/AddButton';
import RemoveButton from '../Button/RemoveButton';

function CollapsibleCard(props) {
    const [collapsed, setCollapsed] = useState(false);

    const onAddClickHandler = (event) => {
        event.preventDefault();
        props.add();
        event.stopPropagation();
    };

    const onRemoveClickHandler = (event) => {
        event.preventDefault();
        props.remove();
        event.stopPropagation();
    };

    const getHeaderClazz = () => {
        const clazzez = [];
        if (props.valid !== undefined && !props.valid) {
            clazzez.push('text-danger');
        }
        if (props.isDragging) {
            clazzez.push('bg-info');
        }
        return clazzez.join(' ');
    };

    useEffect(() => {
        if (props.collapsedDefault) {
            setCollapsed(props.collapsedDefault);
        }
    }, [props.collapsedDefault]);

    return (
        <Card className={props.className}>
            <CardHeader onClick={() => setCollapsed(!collapsed)}
              className={getHeaderClazz()}>
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="mb-0">{props.label}{props.badge ? <span>&nbsp;<Badge>{props.badge}</Badge></span> : null}</h5>
                        <FormFeedback className="d-flex">{props.error}</FormFeedback>
                    </div>
                    <div className="d-flex">
                        {props.add ? <AddButton click={onAddClickHandler} /> : null}
                        {props.remove ? <RemoveButton click={onRemoveClickHandler} /> : null}
                    </div>
                </div>
            </CardHeader>
            <Collapse isOpen={!collapsed}>
                <CardBody>
                    {props.children}
                </CardBody>
            </Collapse>
        </Card>
    );
}

CollapsibleCard.propTypes = {
    label: PropTypes.string.isRequired,
    badge: PropTypes.string,
    collapsedDefault: PropTypes.bool,
    className: PropTypes.string,
    remove: PropTypes.func,
    add: PropTypes.func,
    valid: PropTypes.bool,
    error: PropTypes.string,
    isDragging: PropTypes.bool,
};

export default CollapsibleCard;
