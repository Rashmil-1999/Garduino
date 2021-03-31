import React, { useState } from "react";

import {
  Container,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";

const EditPlant = () => {
  return (
    <Container>
      <Card className='mt-4'>
        <CardHeader>
          <CardTitle className='h1 text-center'>Plant Edit</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Edit Your plants here</CardText>
        </CardBody>
      </Card>
    </Container>
  );
};

export default EditPlant;
