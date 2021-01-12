import React from 'react';
import Cookies from 'universal-cookie';

const LogOut = (props) => {

    const logout = () => {
        const cookie = new Cookies();
        cookie.remove(process.env.REACT_APP_USER_TOKEN)
        window.location = `${process.env.REACT_APP_LOGIN_URL}`;

    }
    return (
        <button class="ui sign-out icon button" onClick={() => logout()}>
            <i class="sign-out icon"></i>
        </button>

    );
}

export default LogOut;