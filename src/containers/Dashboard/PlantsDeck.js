import React, { useState } from "react";
import PlantCard from "./PlantCard";
import { CardDeck, Container } from "reactstrap";

const PlantsDeck = ({ info }) => {
  console.log(info);
  return (
    <>
      <Container>
        <CardDeck className='text-center'>
          {info.plants.map((plant, index) => (
            <PlantCard key={index} each_plant={plant} />
          ))}
        </CardDeck>
      </Container>
    </>
  );
};

export default PlantsDeck;
