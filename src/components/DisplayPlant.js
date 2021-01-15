import React, {useState } from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const DisplayPlant = (props) =>{

   return(
    

         <div className="container mt-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <p>{props.name} {props.desc}</p>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>

     
      
    );
}

export default DisplayPlant;
