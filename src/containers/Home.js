import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import DisplayPlant from "../components/DisplayPlant";
import * as queries from "../queries/Home";

const Home = () => {
  /*const info=[{name:"Tomato",desc:"hvchjhsh"},{name:"AloeVera",desc:"bhgshg"},{name:"Bell pepper",desc:"hvsdjh"}]
    const [plantinfo,setPlantInfo] = useState(info)
    return (
        <div>
            {plantinfo.map((plant,index)=>(
            <DisplayPlant name={plant.name} desc={plant.desc}></DisplayPlant>
            ))}
        </div>
    );*/
  const { error, loading, data } = useQuery(queries.GET_PLANT_INFO);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <DisplayPlant name={data}></DisplayPlant>
    </div>
  );
};
export default Home;
