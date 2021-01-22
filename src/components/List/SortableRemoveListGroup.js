import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";
import ListGroup from "./SortableListGroup";

const SortableRemovableListGroup = props => {
  return (
    <>
      <ListGroup
        render={item => (
          <div className="d-flex justify-content-between">
            <div>{props.render ? props.render(item) : item}</div>
            <div>
              <Button onClick={() => props.onRemove(item)} name="Remove" />
            </div>
          </div>
        )}
        items={props.items}
        onSort={props.onSort}
      />
    </>
  );
};

SortableRemovableListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  render: PropTypes.func,
};

export default SortableRemovableListGroup;
