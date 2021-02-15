import React, { useState } from 'react'

const Addnewplant = () => {
    
    const [plantname, setplantname] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>


        </form>
    
    )
}

export default Addnewplant;
