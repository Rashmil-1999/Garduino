import React, { useState } from "react";

import { Collapse } from "reactstrap";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { parse } from "graphql";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return (
      <div
        style={{
          fontFamily: "Montserrat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "13px",
        }}>
        Complete!
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div style={{ color: "#aaa", fontSize: "10px" }}>Remaining</div>
      <div style={{ fontSize: "20px" }}>{remainingTime}</div>
      <div style={{ color: "#aaa", fontSize: "10px" }}>seconds</div>
    </div>
  );
};

const CircularTimer = (props) => {
  const { isPlaying, key, time, stopTimer } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          key={key}
          duration={parseInt(time)}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          size={100}
          onComplete={() => {
            console.log("This will print");
            stopTimer();
            return [false, 2];
          }}>
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
};

export default CircularTimer;
