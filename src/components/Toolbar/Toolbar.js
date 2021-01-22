import React from 'react'

import LoginSignupNavbar from './LoginSignupNavbar';
import ProfessorNavbar from './ProfessorNavbar';
import StudentNavbar from './StudentNavbar'

function Toolbar(props){
    if (props.user === 'student'){
        return <StudentNavbar />
    }
    if (props.user === 'teacher'){
        return <ProfessorNavbar />
    }
    if(props.user === null){
        return <LoginSignupNavbar/>
    }
}

export default Toolbar