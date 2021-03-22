import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const ManualControl = (props) => {
  return (
    <>
      <Card className='mt-4 mb-4 w-50 mr-auto ml-auto'>
        <CardHeader className='text-center'>Manual Control</CardHeader>
        <CardBody>This is where you contol manual settings</CardBody>
      </Card>
    </>
  );
};

export default ManualControl;
