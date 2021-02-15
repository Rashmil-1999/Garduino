import React, { useState, useEffect } from "react";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import * as plantQueries from "../../queries/plant";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import { client } from "../../UserApp";

const AddPlantModal = (props) => {
  const { className, modal, toggle } = props;
  const u_uuid = props.u_uuid;
  const [pi_id, setPI_ID] = useState(1);
  const [sm_uuid, setSM_UUID] = useState();
  const [plantedOn, setPlantedOn] = useState("");
  const [fruitCount, setFruitCount] = useState(0);
  const plantOptions = [];
  const sensorMappingOptions = [];
  const { sm_data, pi_data } = props;
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
  for (var i = 0; i < sm_data.length; i++) {
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

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
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
              <h3>Select a plant to grow</h3>
              <Select
                label={"Plant "}
                valid={true}
                value={pi_id}
                options={plantOptions}
                onChange={(curr) => setPI_ID(curr)}
              />
              <Input
                type='number'
                placeholder={"Optional"}
                label={"Fruit Count"}
                valid={true}
                value={fruitCount}
                onChange={(curr) => setFruitCount(curr)}
              />
              <h3>Select the available channel</h3>
              <Select
                label={"Sensor Mapping channels "}
                valid={true}
                value={sm_uuid}
                options={sensorMappingOptions}
                onChange={(curr) => setSM_UUID(curr)}
              />
              <Button outline color='info' type='submit'>
                Submit
              </Button>
            </form>
          </ApolloProvider>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddPlantModal;
