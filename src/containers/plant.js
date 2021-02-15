import React from 'react'
import {
  Card,CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import plant_icon from "../assets/images/plant_icon.png"

const Plant = ({each_plant}) => {
    return (
      <Card>
        <CardImg top width="100%" src={plant_icon} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{each_plant.plant_info.common_name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{each_plant.plant_info.description}</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
    )
}

export default Plant;
