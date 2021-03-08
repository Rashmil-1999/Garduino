import React from "react";

import { Table } from "reactstrap";

const IrrigationLogTable = (props) => {
  const logs = props.logs;
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Irrigated Mode</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((entry, index) => {
          const tempDate = new Date(entry.time);
          return (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{tempDate.toUTCString()}</td>
              <td>{entry.mode}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default IrrigationLogTable;
