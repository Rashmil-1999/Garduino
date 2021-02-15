import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import DisplayPlant from "../components/DisplayPlant";
import * as queries from "../queries/Home";
import StudentNavbar from "../components/Toolbar/StudentNavbar";

const Home = () => {
  const { error, loading, data } = useQuery(queries.GET_PLANT_INFO);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    
    <div>
      < StudentNavbar/>
      <DisplayPlant name={data} />
    </div>
  );
};
export default Home;
