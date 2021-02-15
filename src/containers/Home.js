import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import DisplayPlant from "../containers/DisplayPlant";
import * as plant_queries from "../queries/plant";
import * as user_queries from "../queries/user";

const Home = ({ userid }) => {
  //const { error, loading, data } = useQuery(plant_queries.GET_PLANT_INFO);
  const { error, loading, data } = useQuery(user_queries.GET_USER_INFO, {variables: { userid },});
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <DisplayPlant name={data} u_id={userid} />
    </div>
  );
};
export default Home;
