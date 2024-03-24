import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header className={"header"}>
            <div className={"logo"}>
                <img className={"icon"} src={require('../../images/hermes.png')}
                     alt={"Error"}/>
                <h1 className={"logo_name"}>Hermes</h1>
            </div>

            <div className={"menu"}>
                <div className={"menu_el"}>
                    <Link className="headLink" to="/">Главная</Link>
                </div>

                <div className={"menu_el"}>
                    <Link className="headLink" to="/trips">Поездки</Link>
                </div>

                <div className={"menu_el"}>
                    <Link className="headLink" to="/transport">Автопарк</Link>
                </div>

                <div className={"menu_el"}>
                    <Link className="headLink" to="/cargo">Грузы</Link>
                </div>

            </div>

            <div className={"profile"}>
                <Link className="headLink" to="/"><img className={"icon"} src={require('../../images/profile.png')}
                                                       alt={"Error"}/></Link>
            </div>

        </header>)
};

export default Header;