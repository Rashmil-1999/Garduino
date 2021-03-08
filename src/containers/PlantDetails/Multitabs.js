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
  Container,
  Row,
  Col,
  CardHeader,
} from "reactstrap";
import classnames from "classnames";
import { useQuery } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";

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
    <Container>
      <div className='mt-3'>
        <Card className='p-3'>
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
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <Row style={style}>
                <Col sm='12'>
                  <h2>
                    {data.plants[0].plant_info.common_name
                      ? data.plants[0].plant_info.common_name
                      : "Common Name not available"}
                  </h2>
                  <br />
                  <p>
                    {data.plants[0].plant_info.description
                      ? data.plants[0].plant_info.description
                      : "Description Not Available"}
                  </p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='2'>
              <Row style={style}>
                <Col sm='6'>
                  <p>
                    {data.plants[0].plant_info.planting_instructions
                      ? data.plants[0].plant_info.planting_instructions
                      : "Planting Instructions Not Available"}
                  </p>
                </Col>
                <Col sm='6'>
                  <p></p>
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
                      <h2>
                        Air Humidity is:{" "}
                        {data.plants[0].sensor_data[0].air_humidity}
                      </h2>
                      <h2>
                        Air Temperature is :{" "}
                        {data.plants[0].sensor_data[0].air_temperature}
                      </h2>
                      <h2>
                        Soil Temperature is:{" "}
                        {data.plants[0].sensor_data[0].soil_temp}
                      </h2>
                      <h2>
                        Soil Moisture is :{" "}
                        {data.plants[0].sensor_data[0].soil_moisture}
                      </h2>
                    </div>
                  )}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default Multitabs;
