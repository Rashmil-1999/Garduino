import React, {useState } from 'react';
import {Jumbotron, Card, CardText, CardBody,CardTitle,CardSubtitle, Button, ListGroupItem, ListGroup } from 'reactstrap';

const DisplayPlant = (props) =>{
  console.log("This works");
   return(
    
    <>
    <Jumbotron>
    <p>{props.name} {props.desc}</p>
    </Jumbotron>
         
      <div>
      <Card>
        
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
          <p>{props.name} {props.desc}</p>
        </CardBody>
      </Card>
    </div>
   
    </>
     
      
    );
}

export default DisplayPlant;
