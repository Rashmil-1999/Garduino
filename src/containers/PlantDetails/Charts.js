import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "../../axios";
import { toast } from "react-toastify";
import { Button, Container, Row, Col } from "reactstrap";
// import Chart from "react-google-charts";

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
    <Container>
      <Row className='justify-content-center'>
        <Col className='col-sm-6 col-xs-6 flex-shrink-1'>
          <Button
            color='primary'
            style={{ marginBottom: "15px" }}
            onClick={() => setSoil_chart(false)}>
            View Air Sensor Data
          </Button>
        </Col>
        <Col className='col-sm-6 col-xs-6'>
          <Button
            color='primary'
            style={{ marginBottom: "15px" }}
            onClick={() => setSoil_chart(true)}>
            View Soil Sensor Data
          </Button>
        </Col>
      </Row>

      <div
        style={{
          background: "#E4F4E8",
          //alignSelf: "center",
          //borderRadius: "5px",
          //display: "flex",
          width: "100%",
          height: "auto",
          //marginTop: "15px",
          //marginBottom: "1rem",
          //position: "relative",
          //margin: "auto",
        }}>
        {soil_chart ? (
          <Line
            style={{}}
            //width: "100%",
            //marginTop: "15px",
            //marginBottom: "1rem",

            data={{
              labels: sensorData.days ? sensorData.days : [],
              datasets: [
                {
                  label: "Average Soil Temperature (°C)",
                  data: sensorData.soilAvgTemperature
                    ? sensorData.soilAvgTemperature
                    : [],
                  backgroundColor: ["#62AEFF"],
                  borderColor: ["#62AEFF"],
                  borderWidth: 3,
                  fill: false,
                },
                {
                  label: "Average Soil Moisture (%)",
                  data: sensorData.soilAvgMoisture
                    ? sensorData.soilAvgMoisture
                    : [],
                  backgroundColor: ["#2AA747"],
                  borderColor: ["#2AA747"],
                  borderWidth: 3,
                  fill: false,
                },
              ],
            }}
            //height={300}
            //width={500}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Average Sensor Value Each Day",
                      fontColor: "black",
                      fontSize: 16,
                      fontFamily: "archia",
                    },
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Day",
                      fontColor: "black",
                      fontSize: 16,
                      fontFamily: "archia",
                    },
                  },
                ],
              },
              legend: {
                display: "true",
                position: "top",
                align: "start",

                labels: {
                  fontSize: 15,
                  fontFamily: "archia",
                  fontColor: "black",
                  boxWidth: 15,
                  padding: 25,
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
                  label: "Average Air Humidity (%)",
                  data: sensorData.airAvgHumidity
                    ? sensorData.airAvgHumidity
                    : [],
                  backgroundColor: ["#2AA747"],
                  borderColor: ["#2AA747"],
                  borderWidth: 3,
                  fill: false,
                },
                {
                  label: "Average Air Temperature (°C)",
                  data: sensorData.airAvgTemperature
                    ? sensorData.airAvgTemperature
                    : [],
                  backgroundColor: ["#62AEFF"],
                  borderColor: ["#62AEFF"],
                  borderWidth: 3,
                  fill: false,
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
                  fontSize: 15,
                  fontFamily: "archia",
                  fontColor: "black",
                  boxWidth: 15,
                  padding: 25,
                },
              },
            }}
          />
        )}
      </div>
    </Container>
  );
};

export default Charts;
