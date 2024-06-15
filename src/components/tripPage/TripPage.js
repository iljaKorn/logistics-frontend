import React, {useState, useEffect} from 'react';
import {format} from "date-fns";
import EditableTable from "../table/EditableTable";
import AddTripModal from "./AddTripModal";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { MdDataSaverOn } from "react-icons/md";
import "../../css/tripPage.css"
import "../../css/table.css"

function TripPage(props) {
    const columns = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Отправление",
            accessor: "departed",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Прибытие",
            accessor: "arrival",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Статус",
            accessor: "status",
            editEnable: true,
            isStatus: true,
            statuses: [
                {value: "В процессе", label: "В процессе"},
                {value: "В пути", label: "В пути"},
                {value: "Доставлено", label: "Доставлено"},
                {value: "Задерживается", label: "Задерживается"},
            ],
        },
        {
            Header: "Дата создания",
            accessor: "createDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },
        },
        {
            Header: "Дата прибытия",
            accessor: "arrivalDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },

        },
        {
            Header: "Дата отправления",
            accessor: "dapartedDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },

        },
        {
            Header: "Клиент",
            accessor: "client",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Действия",
            id: "actions",
            disableSortBy: true,
            Cell: ({row, column, cell}) =>
                row.original.isEditing ? (
                    <div className="edit-cell-container">
                        <div className={"edit-cell"}>
                            <button name={"done"} onClick={() => handleButtonClick("save", row.original)}>
                                <MdDataSaverOn className={"table-icon"}></MdDataSaverOn>
                            </button>
                            <button name={"cancel"} onClick={() => handleButtonClick("cancel", row.original)}>
                                <MdCancelPresentation className={"table-icon"}></MdCancelPresentation>
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className="edit-cell-container">
                        <button name={"edit"} onClick={() => handleButtonClick("edit", row.original)}>
                            <CiEdit className={"table-icon"}></CiEdit>
                        </button>
                        <button name={"delete"} onClick={() => handleButtonClick("delete", row.original)}>
                            <MdDelete className={"table-icon"}></MdDelete>
                        </button>
                    </div>
                ),
        },
    ];

    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8081/trips/all",).then(res => {
            setData(res.data)
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }, []);

    const sendChanges = (row) => {
        axios.put("http://localhost:8081/trips/change_rows", row).then(res => {
            console.log(res.data);
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }

    const deleteRow = (id) => {
        axios.delete(`http://localhost:8081/trips/delete/${id}`).then(res => {
            console.log(res.data);
        }).catch(() => {
            alert("Произошла ошибка на сервере!")
        })
    }
    const handleButtonClick = (action, row) => {
        const newData = data.map((rowData, index) => {
            if (rowData.id === row.id) {
                if (action === "edit") {
                    return {...rowData, isEditing: true, prevData: {...rowData}};
                } else if (action === "cancel") {
                    return {...rowData, isEditing: false, ...rowData.prevData};
                } else if (action === "save") {
                    const {prevData, ...updatedRowData} = rowData;
                    sendChanges(updatedRowData)
                    return {...updatedRowData, isEditing: false};
                } else if (action === "delete") {
                    deleteRow(rowData.id)
                    window.location.href = "/trips" // toDo
                }
            }
            return rowData;
        });
        setData(newData);
    };

    return (
        <div className="App">
            <div className={"add-field"}>
                <button className={'createTripButton'} onClick={() => setModalIsOpen(true)}>Создать поездку</button>
                <AddTripModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></AddTripModal>
                <div className={'countTrips'}> Количество: {data.length}</div>
            </div>
            <EditableTable
                columns={columns}
                data={data}
                setData={setData}
                handleButtonClick={handleButtonClick}
            />
        </div>
    );
}

export default TripPage;
