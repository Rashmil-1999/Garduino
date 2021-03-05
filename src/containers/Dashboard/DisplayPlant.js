import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import * as plant_queries from "../../queries/plant_queries";
import PlantsDeck from "./PlantsDeck";
import Header from "./Header";

const DisplayPlant = ({ name, u_id }) => {
  const { error, loading, data } = useQuery(plant_queries.GET_USER_PLANT_INFO, {
    variables: { u_id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className='container'>
      <Header u_name={name} />
      <br />
      <Card
        className='mt-4 shadow p-3 mb-5 bg-wite mx-auto'
        style={{ borderRadius: "15px" }}>
        <CardBody>
          <CardTitle tag='h5'> </CardTitle>
          <CardSubtitle tag='h5'>Here are your plants: </CardSubtitle>
          <br />
          <CardText>
            <PlantsDeck info={data} u_id={u_id} />
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default DisplayPlant;
