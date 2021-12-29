import React, {useContext} from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {ContextGlobal} from "../firebase.config";

const UserPage = () => {
    const  {aunty} = useContext(ContextGlobal)
    const {user} = useAuthState(aunty)

    return (
        <div>
            <img src={user.photoURL}/>
            <pre> Welcome, {user.displayName} its ur personal page </pre>
            {user.emailVerified}
            email: {user.email}
            {user.phoneNumber}
        </div>
    );
};

export default UserPage;