import React from "react";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

import Input from "../../components/Input/Input";

const TechnicalDetails = ({ plantCount, techDetails, navigation }) => {
  const { previous, next } = navigation;

  if (plantCount === 0) {
    return (
      <Card
        style={{ width: "40em" }}
        className='my-5 mx-auto shadow p-3 mb-5 bg-white rounded'>
        <CardBody>
          <CardTitle tag='h5'>Plant Count not Specified</CardTitle>
          <CardText>
            Go back to the User Details page to set plant count.
          </CardText>
          <Button
            outline
            color='info'
            className='text-center'
            onClick={previous}>
            Previous
          </Button>
        </CardBody>
      </Card>
    );
  }

  let sensorFields = [];
  for (var i = 0; i < plantCount; i++) {
    sensorFields.push(
      <Container key={techDetails[i].channel.alias}>
        <Row>
          <Col>
            <Input
              type='text'
              placeholder={"Alias"}
              label={"Alias: "}
              valid={true}
              value={techDetails[i].channel.alias}
              disabled={true}
            />
          </Col>
          <Col>
            <Input
              type='number'
              placeholder={"GPIO Pin"}
              label={"GPIO Pin Number: "}
              valid={true}
              value={techDetails[i].channel.pin_num}
              disabled={true}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              type='text'
              placeholder={"Address starting with (28-)"}
              label={"Temperature Sensor Address: "}
              valid={true}
              value={techDetails[i].temp}
              onChange={techDetails[i].setTemp}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      <Card
        style={{ width: "40em" }}
        className='my-5 mx-auto shadow p-3 mb-5 bg-white rounded'>
        <CardBody>
          <CardText>
            <h3>Technical Configurations</h3>
            {sensorFields}
          </CardText>
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              <Button outline color='info' onClick={previous}>
                Previous
              </Button>
            </Col>
            <Col>
              <Button outline color='info' onClick={next}>
                Next
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TechnicalDetails;
