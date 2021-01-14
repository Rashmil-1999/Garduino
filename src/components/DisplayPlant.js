import React, {useState } from 'react';
import {Jumbotron, Card, CardText, Button, ListGroupItem, ListGroup } from 'reactstrap';

const DisplayPlant = (props) =>{
  console.log("This works");
   return(
    
    <>
         <p>{props.name} {props.desc}</p>
    {/* <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
    <p>{props.name} {props.desc}</p>
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Cras justo odio</ListGroupItem>
    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card> */}
    </>
     
      
    );
}

export default DisplayPlant;
