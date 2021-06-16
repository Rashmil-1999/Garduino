import React from 'react';
import Cookies from 'universal-cookie';

const LogOut = (props) => {

    const logout = () => {
        const cookie = new Cookies();
        cookie.remove(process.env.REACT_APP_USER_TOKEN)
        window.location.pathname = `${process.env.REACT_APP_LOGIN_URL}`;

    }
    return (
         logout()
           
        

    );
}

export default LogOut;