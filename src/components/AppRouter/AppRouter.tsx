import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import PageShop from "../shoppage/PageShop";
import About from "../shoppage/About";
import db from "../firebase.config";
import ProductItemPage from "../shoppage/ProductItemPage";
import Login from "./Login";
import UserPage from "./UserPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/shop" element={<PageShop/>}/>
            <Route path="/shop/:id" element={<ProductItemPage/>} />
            <Route path="/user/:l" element={<UserPage/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Navigate to="/shop" />}/>
        </Routes>
    );
};

export default AppRouter;