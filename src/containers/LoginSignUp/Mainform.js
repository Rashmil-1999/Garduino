import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import UserDetails from "./userdetails";
import TechnicalDetails from "./technicaldetails";
import Review from "./Review";
import Submit from "./Submit";

//  import "./styles.css";

const steps = [
    { id: "userdetails" },
    { id: "technicaldetails" },
    { id: "review" },
    { id: "submit" }
];

const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    no_of_plants: "",
    temp_21: "",
    alias_21: "",
    temp_16: "",
    alias_16: "",
    temp_26: "",
    alias_26: "",
    temp_19: "",
    alias_19: "",
    temp_13: "",
    alias_13: ""
};

const MainForm = ({ images }) => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, navigation };

    switch (id) {
        case "userdetails":
            return <UserDetails {...props} />;
        case "technicaldetails":
            return <TechnicalDetails {...props} />;
        case "review":
            return <Review {...props} />;
        case "submit":
            return <Submit {...props} />;
        default:
            return null;
    }
};

export default MainForm;