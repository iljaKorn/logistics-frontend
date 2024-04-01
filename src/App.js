import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/mainPage/Home";
import LoginPage from "./components/loginPage/LoginPage"
import Header from "./components/supportComponents/Header";
import Footer from "./components/supportComponents/Footer";

const App = () => {

    return (<div>

        <Router>
            <Header />
            <Routes>

                <Route exact path="/" element={<Home></Home>}/>

                <Route exact path="/auth" element={<LoginPage ></LoginPage>}/>

            </Routes>
            <Footer></Footer>
        </Router>
    </div>)
}

export default App