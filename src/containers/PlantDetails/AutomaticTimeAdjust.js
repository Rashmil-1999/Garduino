import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";

const AutomaticTimeAdjust = (props) => {
  const { irrgation_timings, alias } = props;

  return (
    <>
      <Card className='mt-4 mb-4 w-50 mx-auto'>
        <CardHeader>
          <CardTitle className='text-center h4 mt-1 mb-1'>
            Automatic Irrigation Time Adjustment
          </CardTitle>
        </CardHeader>

        <CardBody>
          <CardText>This is Automatic irrigation time adjust setting</CardText>
        </CardBody>
      </Card>
    </>
  );
};

export default AutomaticTimeAdjust;
