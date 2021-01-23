import React from "react";

const states = [
    ["NSW", "ch_1"],
    ["VIC", "ch_2"]
];

const AliasDrop = ({ label, ...others }) => (
    <>
        <label>{label}</label>
        <select {...others}>
            {states.map(([value, name]) => (
                <option value={value}>{name}</option>
            ))}
        </select>
    </>
);

export default AliasDrop;