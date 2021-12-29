import React, {useContext} from 'react';
import {ContextGlobal} from "../firebase.config";
import firebase from "firebase";
import "firebase/auth"

export const aunty = firebase.auth();

const Login = () => {
    const {aunty} = useContext(ContextGlobal)
    async function login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await aunty.signInWithPopup(provider);
        if(aunty) {
            return window.location.replace("/shop");
        } else {
            return alert("Try again");
        }
    }

    return (
        <div>
            <button onClick={login}>Войти с помощью Google</button>
        </div>
    );
};

export default Login;