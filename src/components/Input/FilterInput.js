import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    InputGroup,
    InputGroupButtonDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    FormGroup,
} from 'reactstrap';

import Autocomplete from 'components/Input/Autocomplete';

/**
 * onChange will give an array of object:
 *
    {
        id: Number, // ID of that filter
        typeName: String, // Name to display
        type: String (for graphql),
        value: String,
        remove: Function,
    }
 */
function FilterInput(props) {
    const { filterItems } = props;

    const [autoId, setAutoId] = useState(1);
    const [currentFilter, setCurrentFilter] = useState(filterItems[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownItems = filterItems.map((f, index) => (
        <DropdownItem key={index} onClick={() => setCurrentFilter(f)}>{f.name}</DropdownItem>
    ));

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

    const onChange = (option) => {
        if (option[0]) {
            const selection = option[0];
            props.onFilterAdd({
                id: autoId,
                displayType: currentFilter.name,
                displayValue: selection.name,
                type: currentFilter.value,
                value: selection.id,
            });

            setAutoId(autoId + 1);
        }
    };

    return (
        <FormGroup row>
            <InputGroup>
                <InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={toggleDropDown}>
                    <DropdownToggle caret>
                        {currentFilter.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Filters</DropdownItem>
                        <DropdownItem divider />
                        {dropdownItems}
                    </DropdownMenu>
                </InputGroupButtonDropdown>

                <Autocomplete labelKey="name" onChange={onChange} customMenuRenderer={currentFilter.menuRenderer}
                  options={currentFilter.options} filter={currentFilter.filter} />
            </InputGroup>
        </FormGroup>
    );
}

FilterInput.propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        filter: PropTypes.func.isRequired,
        menuRenderer: PropTypes.func,
    })).isRequired,

    onFilterAdd: PropTypes.func.isRequired,
};

export default FilterInput;
