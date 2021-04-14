import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import circuit_2 from "../../assets/images/circuit-design-4.png";

import {
  Container,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  UncontrolledCollapse,
} from "reactstrap";

const PlantInformation = () => {
  const { error, loading, data } = useQuery(
    plant_queries.GET_DETAILED_PLANT_INFO
  );
  if (loading) return <LoadingPopup isOpen />;
  if (error) return `Error! ${error.message}`;
  return (
    <div
      style={{
        background:
          "url('https://mudpi.app/img/circuit-flipped-green.png') -5% 0% / 60% no-repeat",
        position: "relative",
      }}>
      <img
        src={circuit_2}
        alt='Curcuit Img'
        style={{
          // WebkitTransform: "scaleX(-1)",
          transform: "translateX(25%) translateY(-25%) scale(0.5)",
          zIndex: "0",
          position: "absolute",
          top: "0%",
          right: "0%",
        }}></img>
      <Container className='p-4'>
        <Card className='mt-4 mb-3'>
          <CardHeader>
            <CardTitle className='h1 text-center'>
              Repository of Plants
            </CardTitle>
          </CardHeader>
          <CardBody>
            {console.log(data)}
            <div id='accordion'>
              {data.plant_info.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardHeader id={"heading" + index}>
                      <h5 className='mb-0 text-center'>
                        <button
                          className='btn btn-link lead'
                          id={"collapse" + index}>
                          {item.common_name}
                        </button>
                      </h5>
                    </CardHeader>
                    <UncontrolledCollapse toggler={"#collapse" + index}>
                      <CardBody>
                        <p className='h4'>Description</p>
                        {item.description
                          ? item.description.split("==").map((item, i) => {
                              return <p key={i}>{item}</p>;
                            })
                          : "Description Not Available :("}
                        <br />
                        <p className='h4'>Planting Instructions</p>
                        {item.planting_instructions
                          ? item.planting_instructions
                              .split("==")
                              .map((item, i) => {
                                return <p key={i}>{item}</p>;
                              })
                          : "Planting Instructions Not Available"}
                        <br />
                        <p className='h4'>Soil Quality Suited</p>
                        {item.soil_quality_suited
                          ? item.soil_quality_suited
                              .split("==")
                              .map((item, i) => {
                                return <p key={i}>{item}</p>;
                              })
                          : "Soil Quality Information Not Available"}
                      </CardBody>
                    </UncontrolledCollapse>
                  </Card>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default PlantInformation;
