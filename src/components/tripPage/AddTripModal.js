import React, {useState} from 'react';
import '../../css/modal.css'
import axios from "axios";
import {useNavigate} from "react-router-dom"

function AddTripModal({modalIsOpen, setModalIsOpen}) {

    const navigate = useNavigate()

    const [newTrip, setNewTrip] = useState(() => {
        return {
            departed: "",
            arrived: "",
            departedDate: "",
            arrivedDate: "",
            client: ""
        }
    })

    const changeNewTrip = event => {
        event.persist()
        setNewTrip(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const addRequest = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8081/trips/add", newTrip).then(res => {
            window.location.href = "/trips" // toDo
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }

    return (
        <div className={modalIsOpen ? "modal active" : "modal"} onClick={() => setModalIsOpen(false)}>
            <div className={modalIsOpen ? "modal-content active" : "modal-content"}
                 onClick={(e) => e.stopPropagation()}>
                <form onSubmit={(e) => { addRequest(e) }}>
                    <p>
                        <label>Отбытие </label>
                        <input type="text" name="departed" value={newTrip.departed}
                               onChange={(e) => changeNewTrip(e)}
                               required maxLength="35" size="20"></input>
                    </p>
                    <p>
                        <label>Дата отбытия </label>
                        <input type="date" name="departedDate" value={newTrip.departedDate}
                               onChange={(e) => changeNewTrip(e)}
                               required maxLength="35" size="20"></input>
                    </p>
                    <p>
                        <label>Прибытие </label>
                        <input type="text" name="arrived" value={newTrip.arrived}
                               onChange={(e) => changeNewTrip(e)}
                               required maxLength="35" size="20"></input>
                    </p>
                    <p>
                        <label>Дата прибытия </label>
                        <input type="date" name="arrivedDate" value={newTrip.arrivedDate}
                               onChange={(e) => changeNewTrip(e)}
                               required maxLength="35" size="20"></input>
                    </p>
                    <p>
                        <label>Клиент </label>
                        <input type="text" name="client" value={newTrip.client}
                               onChange={(e) => changeNewTrip(e)}
                               required maxLength="35" size="20"></input>
                    </p>
                    <p className="signin button">
                        <input type={"submit"} value={"Создать"}/>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AddTripModal;