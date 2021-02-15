import React from "react";
import { Card, CardText, Button } from "reactstrap";

import Select from "../../components/Input/Select";
import Input from "../../components/Input/Input";

const UserDetails = (props) => {
  const {
    fname,
    lname,
    email,
    password,
    password2,
    plantsno,
    setfName,
    setlName,
    setEmail,
    setPassword,
    setPassword2,
    setPlantsNo,
  } = props.userFormData;

  const { next } = props.navigation;

  let options = [];
  for (var i = 0; i < 9; i++) {
    options.push({ name: i, value: i });
  }

  return (
    <Card
      style={{ width: "40em" }}
      className='my-5 mx-auto shadow p-3 mb-5 bg-white rounded'>
      <CardText>
        <h1>Enter User details</h1>
        <Input
          type='text'
          placeholder={"First Name"}
          label={"First Name "}
          valid={true}
          value={fname}
          onChange={(curr) => setfName(curr)}
        />
        <Input
          type='text'
          placeholder={"Last Name"}
          label={"Last Name "}
          valid={true}
          value={lname}
          onChange={(curr) => setlName(curr)}
        />
        <Input
          type='email'
          placeholder={"Email"}
          label={"Email-id "}
          valid={true}
          value={email}
          onChange={(curr) => setEmail(curr)}
        />
        <Input
          type='password'
          placeholder={"Password"}
          label={"Password "}
          valid={true}
          value={password}
          onChange={(curr) => setPassword(curr)}
        />
        <Input
          type='password'
          placeholder={"Confirm Password"}
          label={"Confirm Password "}
          valid={password === password2 ? true : false}
          value={password2}
          onChange={(curr) => setPassword2(curr)}
        />
        <Select
          label={"Plants Count "}
          valid={true}
          value={plantsno}
          options={options}
          onChange={(curr) => setPlantsNo(curr)}
        />
        {/* <button outline color='primary' onClick={next}>
          Next
        </button> */}
        <Button outline color='info' onClick={next}>
          Next
        </Button>
      </CardText>
    </Card>
  );
};

export default UserDetails;
