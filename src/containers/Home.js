import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import DisplayPlant from "../containers/DisplayPlant";
import AddPlantButton from "../components/Button/AddPlantButton";
import AddPlantModal from "../components/Modal/AddPlantModal";

import * as plantQueries from "../queries/plant";
import * as user_queries from "../queries/user";

const Home = ({ userid }) => {
  //const { error, loading, data } = useQuery(plant_queries.GET_PLANT_INFO);
  const { error, loading, data } = useQuery(user_queries.GET_USER_INFO, {
    variables: { userid },
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <DisplayPlant name={data} u_id={userid} />
      <AddPlantButton isDisabled={false} onClick={toggle} />
      <AddPlantModal
        modal={modal}
        toggle={toggle}
        u_uuid={userid}
        sm_data={data.sensor_mapping}
        pi_data={data.plant_info}
      />
    </div>
  );
};
export default Home;
