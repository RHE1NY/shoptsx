import React, {useContext} from 'react';
import {Link, NavLink} from "react-router-dom";
import '../../main.css'
import {ContextGlobal} from "../firebase.config";
import {useAuthState} from "react-firebase-hooks/auth";

const NavBar = () => {

    const  {aunty} = useContext(ContextGlobal)
    const {user} = useAuthState(aunty)

    return (
        <header>
            <div className="container">
                <div className="logo"><img src="../img/download.png" alt="logo" width="70px" height="70px"></img>
                </div>
                <Link  to="/shop" className="logo-text">
                    TEST
                </Link>
                <nav className="menu">
                    <Link to="/shop" className="menu-item active">Товары</Link>
                    <Link to="/about" className="menu-item">О нас</Link>
                    {user
                        ?
                        <span>Привет,    <Link className="product-name" to={`/user/${user.l}`}> {user.displayName}</Link>
                        <pre> <button onClick={() => aunty.signOut()} className="menu-item">
                            Выйти
                        </button></pre>
                        </span>
                        :
                        <NavLink className="menu-item" to="/login">
                            Логин
                        </NavLink>
                    }
                </nav>
            </div>
        </header>
    );
};

export default NavBar;