import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import DisplayPlant from "../components/DisplayPlant";
import * as plant_queries from "../queries/plant";

const Home = () => {
  const { error, loading, data } = useQuery(plant_queries.GET_PLANT_INFO);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <DisplayPlant name={data} />
    </div>
  );
};
export default Home;
