import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/mainPage/Home";
import Header from "./components/supportComponents/Header";
import Footer from "./components/supportComponents/Footer";

const App = () => {

    const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged") === "true");

    return (<div>

        <Router>
            <Header isLogged={isLogged}/>
            <Routes>

                <Route exact path="/" element={<Home></Home>}/>

            </Routes>
            <Footer></Footer>
        </Router>
    </div>)
}

export default App