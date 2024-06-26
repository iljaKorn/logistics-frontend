import React from 'react';
import {useState} from 'react'
import axios from 'axios';
import {useDispatch} from "react-redux"
import {authorizeUser, setToken} from "../../store/userSlice"
import {useNavigate} from "react-router-dom"
import "../../css/loginPage.css"

function LoginPage() {

    const [isLog, setIsLog] = useState(true);
    const [log, setLog] = useState(() => {
        return {
            username: "",
            password: "",
        }
    });

    const changeInputLog = event => {
        event.persist()
        setLog(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const [register, setRegister] = useState(() => {
        return {
            username: "",
            password: "",
            email: ""
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const dispatch = useDispatch();
    const authorize = (person) => {
        dispatch(authorizeUser(person));
    }

    const navigate = useNavigate()
    const registerRequest = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8081/registration", register).then(res => {
            console.log(res.data)
            setToken(res.data)
            navigate("/")
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }

    const authRequest = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8081/auth", log).then(res => {
            console.log(res.data)
            authorize(res.data)
            navigate("/")
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }

    const changeClass = () => {
        const el1 = document.getElementById("btn_log");
        const el2 = document.getElementById("btn_reg");
        el1.classList.toggle("active")
        el1.classList.toggle("passive");

        el2.classList.toggle("active")
        el2.classList.toggle("passive");
        setIsLog(!isLog);
    }

    return (
        <div className={"content"}>
            <div className={"forms"}>
                <div className={"switch"}>
                    <button id={"btn_log"} className={"passive"} onClick={() => changeClass()}>Вход
                    </button>
                    <button id={"btn_reg"} className={"active"} onClick={() => changeClass()}>Регистрация
                    </button>
                </div>
                {isLog ? <form className={"loginForm"} onSubmit={(e) => authRequest(e)}>

                        <p>
                            <input type="text" placeholder="Введите email" name="username"
                                   value={log.username}
                                   onChange={(e) => changeInputLog(e)} required maxLength="35" size="20"></input>
                        </p>
                        <p>
                            <input type="password" placeholder="Введите пароль" name="password"
                                   value={log.password}
                                   onChange={(e) => changeInputLog(e)} required maxLength="35" size="20"></input>
                        </p>
                        <p>
                            <input className="signin-button" type={"submit"} value={"Войти"}/>
                        </p>
                    </form> :
                    <form className={"regForm"} onSubmit={(e) => registerRequest(e)}>

                        <p>
                            <input type="text" placeholder="Введите имя" name="username"
                                   value={register.username}
                                   onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </p>
                        <p>
                            <input type="text" placeholder="Введите email" name="email"
                                   value={register.email}
                                   onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </p>
                        <p>
                            <input type="password" placeholder="Введите пароль" name="password"
                                   value={register.password}
                                   onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </p>
                        <p>
                            <input type="password" placeholder="Повторите пароль" name="password"
                                   value={register.password}
                                   onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                        </p>
                        <p>
                            <input className="signin-button" type={"submit"} value={"Зарегистрироваться"}/>
                        </p>
                    </form>}
            </div>
        </div>
    );
}

export default LoginPage;