import React, { useState } from "react";
import { useForm, useStep } from "react-hooks-helper";

import UserDetails from "./UserDetails";
import TechnicalDetails from "./TechnicalDetails";
import Review from "./Review";

const SignUp = (props) => {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [plantsno, setPlantsNo] = useState(0);

  const [channel_1, setChannel1] = useState({
    alias: "ch_1",
    pin_num: 21,
  });
  const [channel_2, setChannel2] = useState({
    alias: "ch_2",
    pin_num: 20,
  });
  const [channel_3, setChannel3] = useState({
    alias: "ch_3",
    pin_num: 16,
  });
  const [channel_4, setChannel4] = useState({
    alias: "ch_4",
    pin_num: 26,
  });
  const [channel_5, setChannel5] = useState({
    alias: "ch_5",
    pin_num: 19,
  });
  const [channel_6, setChannel6] = useState({
    alias: "ch_6",
    pin_num: 13,
  });
  const [channel_7, setChannel7] = useState({
    alias: "ch_7",
    pin_num: 6,
  });
  const [channel_8, setChannel8] = useState({
    alias: "ch_8",
    pin_num: 5,
  });

  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");
  const [temp5, setTemp5] = useState("");
  const [temp6, setTemp6] = useState("");
  const [temp7, setTemp7] = useState("");
  const [temp8, setTemp8] = useState("");

  const steps = [
    { id: "userdetails" },
    { id: "technicaldetails" },
    { id: "review" },
  ];

  const userFormData = {
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    password2: password2,
    plantsno: plantsno,
    setfName: setfName,
    setlName: setlName,
    setEmail: setEmail,
    setPassword: setPassword,
    setPassword2: setPassword2,
    setPlantsNo: setPlantsNo,
  };

  const technicalFormData = [
    {
      channel: channel_1,
      setChannel: setChannel1,
      temp: temp1,
      setTemp: setTemp1,
    },
    {
      channel: channel_2,
      setChannel: setChannel2,
      temp: temp2,
      setTemp: setTemp2,
    },
    {
      channel: channel_3,
      setChannel: setChannel3,
      temp: temp3,
      setTemp: setTemp3,
    },
    {
      channel: channel_4,
      setChannel: setChannel4,
      temp: temp4,
      setTemp: setTemp4,
    },
    {
      channel: channel_5,
      setChannel: setChannel5,
      temp: temp5,
      setTemp: setTemp5,
    },
    {
      channel: channel_6,
      setChannel: setChannel6,
      temp: temp6,
      setTemp: setTemp6,
    },
    {
      channel: channel_7,
      setChannel: setChannel7,
      temp: temp7,
      setTemp: setTemp7,
    },
    {
      channel: channel_8,
      setChannel: setChannel8,
      temp: temp8,
      setTemp: setTemp8,
    },
  ];

  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  switch (id) {
    case "userdetails":
      return (
        <UserDetails userFormData={userFormData} navigation={navigation} />
      );
    case "technicaldetails":
      return (
        <TechnicalDetails
          plantCount={plantsno}
          techDetails={technicalFormData}
          navigation={navigation}
        />
      );
    case "review":
      return (
        <Review
          userFormData={userFormData}
          techDetails={technicalFormData}
          navigation={navigation}
        />
      );
    default:
      return null;
  }
};

export default SignUp;
