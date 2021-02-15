import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddPlantButton = (props) => {
  const PlantButtonstyle = {
    position: "fixed",
    right: "10px",
    bottom: "10px",
    borderRadius: "40px",
    width: "80px",
    height: "80px",
  };
  return (
    <Button
      color='warning'
      className='py-0 float-right float-bottom mr-2 mb-2'
      onClick={props.onClick}
      disabled={props.isDisabled}
      style={PlantButtonstyle}>
      {/* <i class='icon-plus' aria-hidden='true'></i> */}
      <FontAwesomeIcon icon={faPlus} size='2x' />
    </Button>
  );
};

AddPlantButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddPlantButton;
