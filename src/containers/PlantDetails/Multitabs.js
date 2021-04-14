import React, { useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  CardHeader,
  Table,
} from "reactstrap";

import classnames from "classnames";
import { useQuery } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
import IrrigationLogTable from "./IrrigationLogTable";

import Charts from "../PlantDetails/Charts";

const Multitabs = ({ p_uuid }) => {
  const [activeTab, setActiveTab] = useState("1");

  const style = {
    color: "black",
    padding: "10px",
    fontSize: "20px",
    textAlign: "left",
  };
  const text = { textAlign: "left" };

  const tabToggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { error, loading, data } = useQuery(plant_queries.GET_EACH_PLANT_INFO, {
    variables: { p_uuid },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container className='mb-3'>
      <div className='mt-3 mb-3 p-4'>
        <Card
          className='p-3'
          style={{ borderColor: "grey", borderWidth: "1px" }}>
          {console.log("This is data:" + data.plants[0].plant_info.common_name)}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  tabToggle("1");
                }}>
                General Info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  tabToggle("2");
                }}>
                Planting Instructions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => {
                  tabToggle("3");
                }}>
                Current Sensor Data
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "4" })}
                onClick={() => {
                  tabToggle("4");
                }}>
                Irrigation Log
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "5" })}
                onClick={() => {
                  tabToggle("5");
                }}>
                Visualization of Sensor Data
              </NavLink>
            </NavItem>
            
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <Container>
                <Row style={style}>
                  <Col sm='12'>
                    <p className='h3 text-center'>
                      {data.plants[0].plant_info.common_name
                        ? data.plants[0].plant_info.common_name
                        : "Common Name not available"}
                    </p>
                    <br />
                    <p className='text-justified'>
                      {data.plants[0].plant_info.description
                        ? data.plants[0].plant_info.description
                            .split("==")
                            .map((item, i) => {
                              return <p key={i}>{item}</p>;
                            })
                        : "Description Not Available"}
                    </p>
                  </Col>
                </Row>
              </Container>
            </TabPane>
            <TabPane tabId='2'>
              <Row style={style}>
                <Col>
                  <p>
                    {data.plants[0].plant_info.planting_instructions
                      ? data.plants[0].plant_info.planting_instructions
                          .split("==")
                          .map((item, i) => {
                            return <p key={i}>{item}</p>;
                          })
                      : "Planting Instructions Not Available"}
                  </p>
                  <p>
                    {data.plants[0].plant_info.soil_quality_suited
                      ? data.plants[0].plant_info.soil_quality_suited
                          .split("==")
                          .map((item, i) => {
                            return <p key={i}>{item}</p>;
                          })
                      : "Planting Instructions Not Available"}
                  </p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='3'>
              <Row style={style}>
                <Col sm='12' style={text}>
                  {console.log(data.plants[0].sensor_data)}
                  {data.plants[0].sensor_data.length === 0 ? (
                    "Sensor Data Not Available"
                  ) : (
                    <div>
                      <Table size="sm">
                        <thead>
                          <tr style={{color:"black"}}>
                            <th>#</th>
                            <th>Sensor Name</th>
                            <th>Sensor Value</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize:"17px"}}>
                          <tr>
                            <th scope="row">1</th>
                            <td>Air Humidity</td>
                            <td>{data.plants[0].sensor_data[0].air_humidity}%</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Air Temperature</td>
                            <td>{data.plants[0].sensor_data[0].air_temperature}°C</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>Soil Moisture</td>
                            <td>{data.plants[0].sensor_data[0].soil_moisture}%</td>
                          </tr>
                          <tr>
                            <th scope="row">4</th>
                            <td>Soil Temperature</td>
                            <td>{data.plants[0].sensor_data[0].soil_temp}°C</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='4'>
              {data.plants[0].user.irrigation_logs.length === 0 ? (
                "Irrigation Log Empty"
              ) : (
                <IrrigationLogTable
                  logs={data.plants[0].user.irrigation_logs}
                />
              )}
            </TabPane>
            <TabPane tabId='5'>
              <br></br>

              <Charts p_uuid={p_uuid}></Charts>
            </TabPane>
            
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default Multitabs;
