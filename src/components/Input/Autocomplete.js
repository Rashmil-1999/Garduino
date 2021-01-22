import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FormFeedback } from 'reactstrap';
import { Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';

function Autocomplete(props) {
    const typeaheadRef = useRef();

    const mapResults = (results) => {
        if (props.customMenuRenderer) {
            return props.customMenuRenderer(results);
        }
        return results.map((result, index) => (
            <MenuItem key={index} option={result} position={index}>
                {result[props.labelKey]}
            </MenuItem>
        ));
    };

    const onValueChangeHandler = (outcome) => {
        typeaheadRef.current.clear();
        props.onChange(outcome);
    };

    return (
        <div>
            <Typeahead ref={typeaheadRef}
              id={props.id}
              isInvalid={!props.valid}
              labelKey={props.labelKey}
              onChange={onValueChangeHandler}
              filterBy={(option, filterProps) => props.filter(option, filterProps)}
              clearButton
              minLength={3}
              placeholder={props.placeholder}
              options={props.options}
              renderMenu={(results, menuProps) => (<Menu {...menuProps}>{mapResults(results)}</Menu>)} />
            <FormFeedback className="d-flex">{props.error}</FormFeedback>
        </div>
    );
}

Autocomplete.propTypes = {
    id: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    customMenuRenderer: PropTypes.func,
    error: PropTypes.string,
    valid: PropTypes.bool,
};

export default Autocomplete;
