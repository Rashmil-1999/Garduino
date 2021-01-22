import React from 'react';
import PropTypes from 'prop-types';

const checkbox = (props) => {
    const clazzez = `d-flex align-items-center${props.className ? ` ${props.className}` : ''}`;
    return (
        <div className={clazzez}>
            <input type="radio" onChange={event => props.change(event.target.value)}
              name={props.name} value={props.value} checked={props.checked} />{' '}
            <div className="ml-2">
                {props.children}
            </div>
        </div>
    );
};

checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool.isRequired,
    change: PropTypes.func.isRequired,
};

export default checkbox;
