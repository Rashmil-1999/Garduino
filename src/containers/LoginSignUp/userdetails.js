import React from "react";
import { Card, CardText } from 'reactstrap';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Login/Button"

const UserDetails = ({ setForm, formData, navigation }) => {
    const { firstName, lastName, email, password, confirm_password, no_of_plants } = formData;

    const { next } = navigation;

    return (

        <Card style={{ width: '40em' }} className="my-5 mx-auto shadow p-3 mb-5 bg-white rounded">
            <CardText>
                <h1>User details</h1>
                <Input type='text'
                    placeholder={"First Name"}
                    label={"First Name "}
                    valid={true}
                    value={firstName}
                    onChange={setForm}
                />
                <Input type='text'
                    placeholder={"Last Name"}
                    label={"Last Name "}
                    valid={true}
                    value={lastName}
                    onChange={setForm}
                />
                <Input type='text'
                    placeholder={"Email"}
                    label={"Email id "}
                    valid={true}
                    value={email}
                    onChange={setForm}
                />
                <Input type='text'
                    placeholder={"Password"}
                    label={"Enter Password "}
                    valid={true}
                    value={password}
                    onChange={setForm}
                />
                <Input type='text'
                    placeholder={"Confirm Password"}
                    label={"Confirm Password "}
                    valid={true}
                    value={confirm_password}
                    onChange={setForm}
                />
                <Input type='text'
                    placeholder={"no_of_plants"}
                    label={"Enter no of plants "}
                    valid={true}
                    value={no_of_plants}
                    onChange={setForm}
                />
                <button outline color="primary" onClick={next}>Next</button>
            </CardText>
        </Card>
    );
};

export default UserDetails;