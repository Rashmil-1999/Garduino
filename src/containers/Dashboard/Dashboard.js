import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import DisplayPlant from "./DisplayPlant";
import AddPlantButton from "../../components/Button/AddPlantButton";
import AddPlantModal from "./AddPlantModal";
import LoadingPopup from "../../components/Loader/LoadingPopup";

// import * as plantQueries from "../queries/plant_queries";
import * as user_queries from "../../queries/user_queries";

const Dashboard = ({ userid }) => {
  //const { error, loading, data } = useQuery(plant_queries.GET_PLANT_INFO);
  const { error, loading, data } = useQuery(user_queries.GET_USER_INFO, {
    variables: { userid },
  });

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  if (loading) return loading && <LoadingPopup isOpen />;
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      {console.log(data)}
      <DisplayPlant u_id={userid} asm_data={data.all_sensor_mappings} />
      <AddPlantButton isDisabled={false} onClick={toggle} />
      <AddPlantModal
        modal={modal}
        toggle={toggle}
        u_uuid={userid}
        sm_data={data.sensor_mapping}
        asm_data={data.all_sensor_mappings}
        pi_data={data.plant_info}
      />
    </div>
  );
};
export default Dashboard;
