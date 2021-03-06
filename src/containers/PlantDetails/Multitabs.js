import React, { useState } from "react";
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
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { useQuery } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
import { size } from "lodash";

const Multitabs = ({ p_uuid }) => {
  const style = {
    color: "white",
    padding: "10px",
    fontFamily: "cursive",
    fontSize: "20px",
  };
  const text = { textAlign: "left" };
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const { error, loading, data } = useQuery(plant_queries.GET_EACH_PLANT_INFO, {
    variables: { p_uuid },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div className="mt-3">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            General Info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Planting Instructions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Current Sensor Data
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row style={style}>
            <Col sm="12">
              <h2>{data.plants[0].plant_info.common_name}</h2>
              <br />
              <p>{data.plants[0].plant_info.description}</p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row style={style}>
            <Col sm="6">
              <p>{data.plants[0].plant_info.planting_instructions}</p>
            </Col>
            <Col sm="6">
              <p></p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row style={style}>
            <Col sm="12" style={text}>
              <h2>
                Air Humidity is: {data.plants[0].sensor_data[0].air_humidity}
              </h2>
              <h2>
                Air Temperature is :{" "}
                {data.plants[0].sensor_data[0].air_temperature}
              </h2>
              <h2>
                Soil Temperature is: {data.plants[0].sensor_data[0].soil_temp}
              </h2>
              <h2>
                Soil Moisture is : {data.plants[0].sensor_data[0].soil_moisture}
              </h2>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Multitabs;
