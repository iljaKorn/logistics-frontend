import React, {useState, useEffect} from 'react';
import {format} from "date-fns";
import EditableTable from "../table/EditableTable";
import axios from "axios";
import AddTripModal from "./AddTripModal";
import "../../css/tripPage.css"
import "../../css/table.css"

function TripPage(props) {
    const columns = [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Departed",
            accessor: "departed",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Arrival",
            accessor: "arrival",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Status",
            accessor: "status",
            editEnable: true,
            isStatus: true,
            statuses: [
                {value: "Processing", label: "Processing"},
                {value: "OnTheWay", label: "OnTheWay"},
                {value: "Delivered", label: "Delivered"},
                {value: "Delayed", label: "Delayed"},
            ],
        },
        {
            Header: "Create Date",
            accessor: "createDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },
        },
        {
            Header: "Arrival Date",
            accessor: "arrivalDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },

        },
        {
            Header: "Departed Date",
            accessor: "dapartedDate",
            editEnable: true,
            type: "date",
            Cell: ({value}) => {
                return format(new Date(value), 'dd/MM/yyyy')
            },

        },
        {
            Header: "Client",
            accessor: "client",
            editEnable: true,
            type: "text",
        },
        {
            Header: "Actions",
            id: "actions",
            disableSortBy: true,
            Cell: ({row, column, cell}) =>
                row.original.isEditing ? (
                    <div className="edit-cell-container">
                        <div className={"edit-cell"}>
                            <button name={"done"} onClick={() => handleButtonClick("save", row.original)}>
                                Save
                            </button>
                            <button name={"cancel"} onClick={() => handleButtonClick("cancel", row.original)}>
                                Cancel
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className="edit-cell-container">
                        <button onClick={() => handleButtonClick("edit", row.original)}>
                            Edit
                        </button>
                        <button onClick={() => handleButtonClick("delete", row.original)}>
                            Delete
                        </button>
                    </div>
                ),
        },
    ];

    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        console.log("Data updated:", data);
    }, [data]);
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
                <button onClick={() => setModalIsOpen(true)}>Создать поездку</button>
                <AddTripModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></AddTripModal>
                <div> Количество: {data.length}</div>
            </div>
            <EditableTable
                columns={columns}
                data={data}
                setData={setData}
                handleButtonClick={handleButtonClick}
            />

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default TripPage;
