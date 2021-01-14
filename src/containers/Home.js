import React, {useState } from 'react';
import DisplayPlant from '../components/DisplayPlant'

const Home = () => {
    const info = {no_of_plants:4,
        plants:{name:"Tomato",desc:"hvchjhsh"} }
    
    const [plantinfo,setPlantInfo] = useState(info)
    console.log("This works");
    return(
        <div>
            
            <DisplayPlant name={plantinfo.plants.name} desc={plantinfo.plants.desc}></DisplayPlant>
            
        </div>
    );
}
export default Home;
/*const plantinfo ={
    name:"tomato",
    age:"4"}*/
