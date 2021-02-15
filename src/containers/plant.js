import React from 'react';
import { Route, Router,  } from "react-router-dom";
import {
  Card,CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import plant_icon from "../assets/images/plant_icon.png";
import PlantDetails from "../containers/PlantDetails";


const Plant = ({ each_plant,u_id }) => {
  
const handleCardClick = (e) =>{
    const p_id = each_plant.p_uuid
    window.location = `/plants/${p_id}`
    
  }

    return (
      <Card style={{ width: "250px"}} >
        <CardImg top width="100%" src={plant_icon} alt="Card image cap" onClick={handleCardClick}/>
        <CardBody>
          <CardTitle tag="h5">{each_plant.plant_info.common_name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{each_plant.plant_info.description}</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
    )
}

export default Plant;
