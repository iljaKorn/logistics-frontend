import React from 'react';
import {useState} from 'react'
import axios from 'axios';
import {useDispatch} from "react-redux"
import {authorizeUser} from "../../store/userSlice"
import {useNavigate} from "react-router-dom"

function LoginPage() {

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
    const toServer = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8081/registration", register).then(res => {
            console.log(res.data)
            authorize(res.data)
            //window.location.href = "/"
            navigate("/")
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }

    return (
        <div>
            <form onSubmit={(e) => toServer(e)}>
                <h1> Sign up </h1>
                <p>
                    <label>Your username</label>
                    <input type="text" placeholder="Иванов Иван Иванович" id="usermame" name="username"
                           value={register.username}
                           onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                </p>
                <p>
                    <label className="youmail"> Your email</label>
                    <input type="text" placeholder="example@example.ru" id="email" name="email" value={register.email}
                           onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                </p>
                <p>
                    <label className="youpasswd">Your password </label>
                    <input type="password" placeholder="********" id="password" name="password"
                           value={register.password}
                           onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                </p>
                <p>
                    <label className="youpasswd">Please confirm your
                        password </label>
                    <input type="password" placeholder="********" id="password_confirm" name="password"
                           value={register.password}
                           onChange={(e) => changeInputRegister(e)} required maxLength="35" size="20"></input>
                </p>
                <p className="signin button">
                    <input type={"submit"} value={"Click"}/>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;