import React, { useState } from "react";
import PlantCard from "./PlantCard";
import { CardDeck, Container } from "reactstrap";

const PlantsDeck = ({ info }) => {
  // console.log(info);
  return (
    <>
      <Container>
        <div
          className='text-center'
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}>
          {info.plants.map((plant, index) => (
            <PlantCard key={index} each_plant={plant} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default PlantsDeck;
