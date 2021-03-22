import React from "react";
import { Route, Router } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import plant_icon from "../../assets/images/plant_icon.png";
import "./PlantCard.css";

const PlantCard = ({ each_plant, u_id }) => {
  const handleCardClick = (e) => {
    console.log(each_plant.p_uuid);
    window.location = `/plants/${each_plant.p_uuid}`;
  };

  return (
    <Card
      style={{
        width: "200px",
        borderColor: each_plant.is_uprooted ? "red" : "green",
        borderWidth: "2px",
      }}
      className={
        each_plant.is_uprooted
          ? "card-hover-uprooted mb-3 mt-3 mr-2 ml-2"
          : "card-hover-not-uprooted mb-3 mt-3 mr-2 ml-2"
      }>
      <CardImg
        top
        width='100%'
        src={plant_icon}
        alt='Card image cap'
        onClick={handleCardClick}
      />
      <CardBody>
        <CardTitle tag='h5'>{each_plant.plant_info.common_name}</CardTitle>
        <CardSubtitle tag='h6' className='mb-2 text-muted'></CardSubtitle>
        <CardText></CardText>
      </CardBody>
    </Card>
  );
};

export default PlantCard;
