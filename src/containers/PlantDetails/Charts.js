import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "../../axios";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

const Charts = ({ p_uuid }) => {
  const [sensorData, setSensorData] = useState([]);
  const [soil_chart, setSoil_chart] = useState(true);

  const createToast = (error, type) => {
    toast(error.message ? error.message : error, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
      type: !type ? "error" : type,
    });
  };
  const getSensorData = async (path, data) => {
    const resp = await axios.getSensorData(path, data);
    console.log(resp);
    // createToast(resp.data[0], "success");
    if (resp.status === "success") {
      setSensorData(resp.data);
      console.log(resp);
    } else {
      console.log(resp);
      createToast(resp, "error");
    }
  };

  useEffect(() => {
    getSensorData("/sensor_data", { p_uuid: p_uuid });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}>
        <Button
          color='primary'
          style={{ flexBasis: "auto", margin: "8px" }}
          onClick={() => setSoil_chart(false)}>
          View Air Sensor Data
        </Button>
        <Button
          color='primary'
          style={{ flexBasis: "auto", margin: "8px" }}
          onClick={() => setSoil_chart(true)}>
          View Soil Sensor Data
        </Button>
      </div>
      {soil_chart ? (
        <Line
          data={{
            labels: sensorData.days ? sensorData.days : [],
            datasets: [
              {
                label: "Average Soil Temperature",
                data: sensorData.soilAvgTemperature
                  ? sensorData.soilAvgTemperature
                  : [],
                backgroundColor: [
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                ],
                borderColor: ["rgba(255, 0, 0, 1)"],
                borderWidth: 3,
              },
              {
                label: "Average Soil Moisture",
                data: sensorData.soilAvgMoisture
                  ? sensorData.soilAvgMoisture
                  : [],
                backgroundColor: [
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                ],
                borderColor: ["rgba(0, 255, 0, 1)"],
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
        />
      ) : (
        <Line
          data={{
            labels: sensorData.days ? sensorData.days : [],
            datasets: [
              {
                label: "Average Air Humidity",
                data: sensorData.airAvgHumidity
                  ? sensorData.airAvgHumidity
                  : [],
                backgroundColor: [
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                ],
                borderColor: ["rgba(255, 0, 0, 1)"],
                borderWidth: 3,
              },
              {
                label: "Average Air Temperature",
                data: sensorData.airAvgTemperature
                  ? sensorData.airAvgTemperature
                  : [],
                backgroundColor: [
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0)",
                ],
                borderColor: ["rgba(0, 255, 0, 1)"],
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
        />
      )}
    </div>
  );
};

export default Charts;
