import React, { useState, useEffect } from "react";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import * as plantQueries from "../../queries/plant_queries";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import { client } from "../../UserApp";

const AddPlantModal = (props) => {
  const { className, modal, toggle } = props;
  const u_uuid = props.u_uuid;
  const [pi_id, setPI_ID] = useState(1);
  const [sm_uuid, setSM_UUID] = useState("");
  const [plantedOn, setPlantedOn] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [fruitCount, setFruitCount] = useState(0);
  const [isValidSensorMap, setIsValidSensorMap] = useState(false);
  const plantOptions = [];
  const sensorMappingOptions = [];
  const { asm_data, sm_data, pi_data } = props;
  const [
    createPlant,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(plantQueries.CREATE_USER_PLANT, {
    client: client,
    onCompleted: (data) => {
      console.log("Plant Created!");
      window.location = `${process.env.REACT_APP_REDIRECT_PATHNAME}`;
    },
  });

  console.log(sm_data, pi_data);
  for (var i = asm_data.length; i < sm_data.length; i++) {
    sensorMappingOptions.push({
      name: sm_data[i].alias,
      value: sm_data[i].sm_uuid,
    });
  }

  for (var i = 0; i < pi_data.length; i++) {
    plantOptions.push({
      name: pi_data[i].common_name,
      value: pi_data[i].pi_id,
    });
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(
          "Latitude: " +
            position.coords.latitude +
            "Longitude: " +
            position.coords.longitude
        );
      },
      (e) => console.error(e)
    );
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        size='lg'
        centered='true'>
        <ModalHeader toggle={toggle} className='text-center'>
          Add a new Plant
        </ModalHeader>
        <ModalBody>
          <ApolloProvider client={client}>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const plantData = {
                  object: {
                    plant_info_id: pi_id,
                    u_uuid: u_uuid,
                    fruit_count: fruitCount,
                    latitude: latitude,
                    longitude: longitude,
                    plant_sensor_mappings: {
                      data: {
                        sm_uuid: sm_uuid,
                      },
                    },
                  },
                };
                if (plantedOn !== "") {
                  plantData.object.planted_on = plantedOn;
                }

                console.log(plantData);

                createPlant({
                  variables: plantData,
                });
              }}>
              <h3 className='text-center'>Enter Plant Details</h3>
              <Row form>
                <Col>
                  <Select
                    label={"Plant "}
                    valid={true}
                    value={pi_id}
                    options={plantOptions}
                    onChange={(curr) => setPI_ID(curr)}
                  />
                </Col>
                <Col>
                  <Input
                    type='number'
                    placeholder={"Optional"}
                    label={"Fruit Count "}
                    valid={true}
                    value={fruitCount}
                    onChange={(curr) => setFruitCount(curr)}
                  />
                </Col>
              </Row>
              <Row form>
                <Col>
                  <Input
                    type='date'
                    placeholder={"Optional"}
                    label={"Planted On "}
                    valid={true}
                    value={plantedOn}
                    onChange={(curr) => setPlantedOn(curr)}
                  />
                </Col>
                <Col>
                  <Input
                    type={latitude ? "number" : "text"}
                    label={"Latitude"}
                    valid={true}
                    disabled={true}
                    value={latitude ? latitude : "Location not accessible"}
                  />
                </Col>
                <Col>
                  <Input
                    type={longitude ? "number" : "text"}
                    label={"Longitude"}
                    valid={true}
                    disabled={true}
                    value={longitude ? longitude : "Location not accessible"}
                  />
                </Col>
              </Row>

              <h3 className='text-center'>Select Channel</h3>
              <Select
                label={"Sensor Mapping channels "}
                valid={isValidSensorMap}
                value={sm_uuid}
                options={sensorMappingOptions}
                onChange={(curr) => {
                  if (curr !== "") {
                    setIsValidSensorMap(true);
                  }
                  setSM_UUID(curr);
                }}
              />
              <Row form className='text-center'>
                <Col className='text-center'>
                  <Button
                    outline
                    color='info'
                    type='submit'
                    className='text-center'
                    disabled={!isValidSensorMap}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          </ApolloProvider>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddPlantModal;
