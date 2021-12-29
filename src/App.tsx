import React from 'react';
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import AppRouter from "./components/AppRouter/AppRouter";


function App() {

  return (
    <BrowserRouter>
      <NavBar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
