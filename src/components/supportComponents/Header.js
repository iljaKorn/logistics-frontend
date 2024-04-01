import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {unAuthorizeUser} from "../../store/userSlice";

const Header = () => {

    const [isOpen, setOpen] = useState(false);
    const state = useSelector((state) => state);

    const dispatch = useDispatch();
    const unAuth = () => {
        dispatch(unAuthorizeUser());
    }

    return (
        <header className={"header"}>
            <div className={"logo"}>
                <img className={"logo-icon"} src={require('../../images/hermes.png')}
                     alt={"Error"}/>
                <h1 className={"logo_name"}>Hermes</h1>
            </div>

            <nav className={"menu"}>
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
            </nav>

            <div className={"profile"}>
                <button className={"profile-button"} onClick={() => setOpen(!isOpen)}>
                    <img className={"profile-icon"}
                         src={require('../../images/profile.png')}
                         alt={"Error"}/></button>
                <nav className={`profile-main ${isOpen ? "active" : ""}`}>
                    {
                        state.user.isLogged ? <div>
                            <h1>{state.user.user.username}</h1>
                            <button onClick={unAuth}>Выйти</button>
                        </div> : <div>
                            <h1>Пожалуйста, зарегистрируйтесь</h1>
                            <Link className="headLink" to="/auth">Войти</Link>
                        </div>
                    }
                </nav>
            </div>

        </header>)
};

export default Header;