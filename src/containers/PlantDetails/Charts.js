import { size } from 'lodash';
import React , { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {Button} from "reactstrap";
const Charts = () => {
    
  const [soil_chart, setSoil_chart] = useState(true); 


    return (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
          <div style={{ display:"flex",flexDirection:"row",alignItems:"flex-end"}}>
          <Button color="primary" style={{flexBasis:"auto",margin:"8px"}} onClick={() => setSoil_chart(false)}>View Air Sensor Data</Button>
          <Button color="primary" style={{flexBasis:"auto",margin:"8px"}} onClick={() => setSoil_chart(true)}>View Soil Sensor Data</Button>
          </div>
          {soil_chart ? 
        <Line
        data={{
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)'
                
                ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 3,
            },
          ],
        }}
        //height={300}
        //width={500}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      /> : <Line
      data={{
        labels: ['R', 'B', 'Y', 'G', 'P', 'O'],
        datasets: [
          {
            label: '# of votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0)',
              'rgba(0, 0, 0, 0)'
              
              ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 3,
          },
        ],
      }}
      //height={300}
      //width={500}
      options={{
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }}
    /> }
        </div>
    )
}

export default Charts
