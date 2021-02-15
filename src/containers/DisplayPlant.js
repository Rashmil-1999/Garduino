import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {Card,CardText,CardBody,CardTitle,CardSubtitle,} from "reactstrap";
import * as plant_queries from "../queries/plant";
import Plants from "./plants";
import Header from "../containers/Header";

const DisplayPlant = ({ name,u_id }) => {
  const { error, loading, data } = useQuery(plant_queries.GET_USER_PLANT_INFO, {variables: { u_id },});
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  return (
    <div className='container mt-4'>
      <Header u_name={name} />
      <br/>
      <Card>
        <CardBody>
          <CardTitle tag='h5'> </CardTitle>
          <CardSubtitle tag='h5' >Here are your plants:     </CardSubtitle>
          <br/>
          <CardText>
            <Plants info={data}></Plants>
          </CardText>
            {/*<p>{props.name.plant_info[0].common_name +" " + props.name.plant_info[0].pi_id + " " + props.id} </p>*/}
          
        </CardBody>
      </Card>
    </div>
    );
  };

export default DisplayPlant;
