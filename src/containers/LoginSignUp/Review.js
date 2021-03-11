import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useMutation,
  ApolloProvider,
} from "@apollo/client";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

import * as user_queries from "../../queries/user_queries";
import Input from "../../components/Input/Input";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { createToast } from "../../utils/toast";

const Review = ({ userFormData, techDetails, navigation }) => {
  const { fname, lname, email, password, plantsno } = userFormData;

  const { go } = navigation;

  let sensorFields = [];
  let sensorMappings = [];
  for (var i = 0; i < plantsno; i++) {
    sensorFields.push(
      <Container key={techDetails[i].channel.alias}>
        <Row className='mb-2'>
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
              disabled={true}
            />
          </Col>
        </Row>
      </Container>
    );
    sensorMappings.push({
      alias: techDetails[i].channel.alias,
      pin_num: techDetails[i].channel.pin_num,
      temp_sensor: techDetails[i].temp,
    });
  }

  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      headers: {
        "x-hasura-admin-secret": "garduino123",
      },
    }),
    cache: new InMemoryCache(),
  });

  const [
    createUser,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(user_queries.CREATE_USER, {
    client: client,
    onCompleted: (data) => {
      console.log("User Created!");
      window.location = `${process.env.REACT_APP_LOGIN_URL}`;
    },
  });

  return (
    <ApolloProvider client={client}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let role = 1;

          const userData = {
            object: {
              first_name: fname,
              last_name: lname,
              email: email,
              password: password,
              plant_count: plantsno,
              role: role,
              sensor_mappings: {
                data: sensorMappings,
              },
              irrigation_modes: {
                data: {
                  ch_1: 0,
                  ch_2: 0,
                  ch_3: 0,
                  ch_4: 0,
                  ch_5: 0,
                  ch_6: 0,
                  ch_7: 0,
                  ch_8: 0,
                  manual: false,
                },
              },
            },
          };

          console.log(userData);
          createUser({
            variables: userData,
          });
        }}>
        <Card
          style={{ width: "50em" }}
          className='my-5 mx-auto shadow p-3 mb-5 bg-white rounded'>
          <CardBody>
            <CardTitle tag='h3' className='mb-5'>
              Review your data
            </CardTitle>
            <Container className='mb-3'>
              <Row className='mb-2'>
                <Col xs='8'>
                  <CardSubtitle tag='h5' className='mb-3'>
                    User Details
                  </CardSubtitle>
                </Col>
                <Col xs='4'>
                  <Button
                    outline
                    color='info'
                    onClick={() => go("userdetails")}>
                    Edit
                  </Button>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col>
                  <Input
                    type='text'
                    placeholder={"First Name"}
                    label={"First Name "}
                    valid={true}
                    value={fname}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Input
                    type='text'
                    placeholder={"Last Name"}
                    label={"Last Name "}
                    valid={true}
                    value={lname}
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    type='email'
                    placeholder={"Email"}
                    label={"Email-id "}
                    valid={true}
                    value={email}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Input
                    type='number'
                    placeholder={"Plants Count"}
                    label={"Plants Count "}
                    valid={true}
                    value={plantsno}
                    disabled={true}
                  />
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className='mb-3'>
                <Col xs='8'>
                  <CardSubtitle tag='h5' className='mb-3'>
                    Technical Details
                  </CardSubtitle>
                </Col>
                <Col xs='4'>
                  <Button
                    outline
                    color='info'
                    onClick={() => go("technicaldetails")}>
                    Edit
                  </Button>
                </Col>
              </Row>
            </Container>
            {sensorFields}
            <Button outline color='info' type='submit'>
              SignUp
            </Button>
          </CardBody>
        </Card>
      </form>
      {mutationLoading && <LoadingPopup isOpen />}
      {mutationError && createToast({ message: "some Error Occurred" })}
    </ApolloProvider>
  );
};

export default Review;
