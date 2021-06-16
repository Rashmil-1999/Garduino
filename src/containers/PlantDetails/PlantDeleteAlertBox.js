import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
import { Alert, Button } from "reactstrap";
import { client } from "../../UserApp";
import LoadingPopup from "../../components/Loader/LoadingPopup";

const PlantDeleteAlertBox = (props) => {
  const { p_uuid, visible, onDismiss } = props;
  const [
    uprootPlant,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(plant_queries.UPROOT_USER_PLANT, {
    client: client,
    onCompleted: (data) => {
      console.log(data);
      console.log("Plant Uprooted!");
      window.location.pathname = `/plants/${p_uuid}`;
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const spinningPopupToggle = () => setIsOpen(!isOpen);

  return (
    <Alert color='danger' className='mt-4' isOpen={visible} toggle={onDismiss}>
      <h4 color='danger'>Caution!</h4>
      <p>
        Deleting this plant is irreversible! Are you sure you want to uproot
        this plant? You will still be able to access the data and see the
        information of the plant but won't be able to manage it anymore.
      </p>
      <hr />
      <p className='mb-0 text-center'>
        <Button
          color='danger'
          onClick={() => {
            spinningPopupToggle();
            uprootPlant({
              variables: {
                p_uuid: p_uuid,
              },
            });
          }}>
          Uproot?
        </Button>
      </p>
      {mutationLoading && <LoadingPopup isOpen />}
    </Alert>
  );
};

export default PlantDeleteAlertBox;
