import React, {useState } from 'react';
import {Jumbotron, Card, CardText, Button } from 'reactstrap';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import Dropdown from '../../components/Dropdown/SignUp/Dropdown'

  

const SignUp = (props) => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [plantsno, setPlantsNo] = useState('')
    
    const onSignUp = (postMutation) => {
        let roleId = 1
        if (name === 'Miloni') {
            roleId = 2
        }
        
        const variables = {
            name: name,
            email: email,
            password: password
            
        }
        console.log(variables);
        postMutation({ variables }).then(
            resp => {
                console.log(resp)
                window.location = `${process.env.REACT_APP_LOGIN_URL}`
            }
        )
    }
    /*const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${name}`)*/
    

    return(
        <>
        <form onSubmit={onSignUp}>
    <Jumbotron style={{ paddingBottom:"0.4em", background: "transparent linear-gradient(260deg, #04CBAA 0%, #67C5DD 100%) 0% 0% no-repeat padding-box" }} fluid>
    </Jumbotron>
    <Card style={{ width: '40em'}} className="my-5 mx-auto shadow p-3 mb-5 bg-white rounded">
    <CardText>
        
        <Input type='text' placeholder={'Name'} label={'Name '} valid={true} value={name} onChange={(curr) => setName(curr)} />
        <Input type='email' placeholder={'E-mail'} label={'Email '} valid={true} value={email} onChange={(curr) => setEmail(curr)} />
        <Input type='password' placeholder={'password'} label={'Password '} valid={true} value={password} onChange={(curr) => setPassword(curr)} />
        <Input type='password' placeholder={'Confirm password'} label={'Confirm Password '} valid={true} value={password2} onChange={(curr) => setPassword2(curr)} />
        <Input type='text' placeholder={'No of plants'} label={'Enter No of plants '} valid={true} value={plantsno} onChange={(curr) => setPlantsNo(curr)} />
        <label>Enter the no of plants in your garden</label>
        <Dropdown onChange={(curr) => setPlantsNo(curr)}  />
    </CardText>
    </Card>
    
    <input type="submit" value="Submit" />
    <Link className="nav-link" to={"/"}>login</Link>
        </form>
        <Jumbotron style={{ paddingTop:"0.4em",background: "transparent linear-gradient(260deg, #04CBAA 0%, #67C5DD 100%) 0% 0% no-repeat padding-box" }} fluid>
    </Jumbotron>
        </>
);
    }
export default SignUp;