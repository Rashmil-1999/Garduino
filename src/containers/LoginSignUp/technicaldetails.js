import React from "react";
import { Card } from 'reactstrap';
import AliasDrop from "./AliasDrop";
import checkbox from '../../components/Input/Checkbox';
import Input from '../../components/Input/Input';
const TechnicalDetails = ({ setForm, formData, navigation }) => {
    const { temp_21,
        alias_21,
        temp_16,
        alias_16,
        temp_26,
        alias_26,
        temp_19,
        alias_19,
        temp_13,
        alias_13 } = formData;

    const { previous, next } = navigation;

    return (
        <div>
            <h3>Technical Configurations</h3>
            <Card style={{ width: '40em' }} className="my-5 mx-auto shadow p-3 mb-5 bg-white rounded">
                <checkbox label="GPIO 21" />
                <Input type='text'
                    label={"Temp Sensor for pin 21 "}
                    valid={true}
                    value={temp_21}
                    onChange={setForm}
                />
            <AliasDrop name="alias_21" label="Alias for pin 21" value={alias_21} onChange={setForm} />

            <checkbox label="GPIO 16" />
                <Input type='text'
                    label={"Temp sensor for pin 16"}
                    valid={true}
                    value={temp_16}
                    onChange={setForm}
                />
            <AliasDrop name="alias_16" label="Alias for pin 21" value={alias_16} onChange={setForm} />

            <checkbox label="GPIO 26" />
                <Input type='text'
                    label={"Temp sensor for pin 26"}
                    valid={true}
                    value={temp_26}
                    onChange={setForm}
                />
            <AliasDrop name="alias_26" label="Alias for pin 26" value={alias_26} onChange={setForm} />

            <checkbox label="GPIO 19" />
                <Input type='text'
                    label={"Temp sensor for pin 19"}
                    valid={true}
                    value={temp_19}
                    onChange={setForm}
                />
            <AliasDrop name="alias_19" label="Alias for pin 19" value={alias_19} onChange={setForm} />

            <checkbox label="GPIO 13" />
                <Input type='text'
                    label={"Temp sensor for pin 13"}
                    valid={true}
                    value={temp_13}
                    onChange={setForm}
                />
            <AliasDrop name="alias_13" label="Alias for pin 13" value={alias_13} onChange={setForm} />


    


                



                <div>
                    <button onClick={previous}>Previous</button>
                    <button onClick={next}>Next</button>
                </div>
                </Card>
        </div>

    );
};

export default TechnicalDetails;